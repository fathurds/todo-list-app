import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/id';
import Swal from 'sweetalert2';

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [id, setId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const getTodo = () => {
    axios.get("https://peaceful-citadel-71310.herokuapp.com/todo", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(data => {
        setTodoList(data.data.data);
      })
      .catch(err => {
        console.log(err, ' ==> error dari todo list');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      setIsLoading(true);
      getTodo();
    }
  }, [navigate])

  const handleSuccess = (title, text) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: `"${title}" berhasil ${text}.`
    })
  }

  const addTodo = () => {
    setIsLoading(true);
    const body = {
      title,
      description,
      due_date: dueDate
    }

    axios.post("https://peaceful-citadel-71310.herokuapp.com/todo", body, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        getTodo();
        const modalAdd = document.querySelector('#modalAdd');
        modalAdd.classList.toggle('hidden');
        modalAdd.classList.toggle('flex');
        handleSuccess(title, 'ditambahkan');
        setTitle('');
        setDescription('');
        setDueDate('');
        setMessage(null);
      })
      .catch(err => {
        setMessage(err.response.data.message, ' ==> error di add');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const deleteTodo = (id) => {
    setIsLoading(true);

    const config = {
      headers: {
        token: localStorage.getItem("token")
      }
    }

    axios.delete("https://peaceful-citadel-71310.herokuapp.com/todo/" + id, config)
      .then((data) => {
        getTodo();
      })
      .catch((err) => {
        console.log(err, ' ==> dari delete');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const updateTodo = (id) => {
    setIsLoading(true);

    const body = {
      title,
      description,
      due_date: dueDate
    }

    axios.put(`https://peaceful-citadel-71310.herokuapp.com/todo/${id}`, body, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        getTodo();
        const modalEdit = document.querySelector('#modalEdit');
        modalEdit.classList.toggle('hidden');
        modalEdit.classList.toggle('flex');
        handleSuccess(title, 'diupdate');
        setTitle('');
        setDescription('');
        setDueDate('');
        setId(null);
        setMessage(null);
      })
      .catch(err => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const completeTodo = (id, title, status) => {
    setIsLoading(true);

    const body = {
      status
    }

    axios.put(`https://peaceful-citadel-71310.herokuapp.com/todo/${id}`, body, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(data => {
        getTodo();
        handleSuccess(title, 'diupdate');
      })
      .catch(err => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  return (
    <div className='container mx-auto'>
      <div className='border-b-4 py-5 border-sky-600'>
        <h1 className='text-center text-slate-700'>Fath Todo App</h1>
      </div>
      <div className='flex justify-end gap-2 mx-2 my-3'>
        <h6>Hallo, {localStorage.getItem('email')}</h6>
        <button className='bg-red-500 text-slate-100 px-4 py-1 rounded-lg hover:bg-red-400 transition' onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}>Logout</button>
      </div>

      <div className='px-3'>
        <div className='text-right'>
          <button className='btn-primary w-32' onClick={() => {
            const modalAdd = document.querySelector('#modalAdd');
            modalAdd.classList.toggle('hidden')
            modalAdd.classList.toggle('flex')
          }}>Add Todo</button>
        </div>
        <table className='border-collapse border border-slate-400 w-full'>
          <thead>
            <tr>
              <th className='border border-slate-300'>Todo</th>
              <th className='border border-slate-300'>Description</th>
              <th className='border border-slate-300'>Status</th>
              <th className='border border-slate-300'>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((el, i) => (
              <tr key={i}>
                <td className='border border-slate-300 px-2'>
                  <h6 className='text-md'>{el.title}</h6>
                  <p className='text-sm text-right'>{moment(el.due_date).format('LL')}</p>
                </td>
                <td className='border border-slate-300 px-2'>{el.description}</td>
                <td className='border border-slate-300 px-2 text-center'>{el.status ? 'Completed' : "Not Complete"}</td>
                <td className='border border-slate-300 px-2 py-2'>
                  <div className='flex flex-wrap gap-1 lg:flex-nowrap'>
                    <button className='btn-primary py-1 px-0 my-0 w-full' onClick={() => {
                      el.status ? completeTodo(el.id, el.title, false) : completeTodo(el.id, el.title, true);
                    }}>{el.status ? "Undone" : 'Done'}</button>
                    <button className='btn-warning py-1 px-0 my-0' onClick={() => {
                      setTitle(el.title);
                      setDescription(el.description);
                      setDueDate(el.due_date);
                      setId(el.id)

                      const modalEdit = document.querySelector('#modalEdit');
                      modalEdit.classList.toggle('hidden')
                      modalEdit.classList.toggle('flex')
                    }}>Edit</button>
                    <button className='btn-danger py-1 px-0 my-0' onClick={() => {
                      Swal.fire({
                        title: 'Apa kamu yakin?',
                        text: "Kamu tidak bisa mengembalikannya lagi!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#0ea5e9',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ya, hapus saja!',
                        cancelButtonText: 'Batal'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            'Terhapus!',
                            'Todo berhasil dihapus.',
                            'success'
                          )
                          deleteTodo(el.id);
                        }
                      })
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS ADD */}
      <div className="bg-black bg-opacity-50 absolute inset-0 hidden justify-center items-center" id="modalAdd">
        <div className="bg-gray-200 py-2 px-3 rounded-lg shadow-xl text-gray-800 w-[400px]">
          <div className="flex justify-between items-center mb-3">
            <div />
            <h4 className="text-lg font-bold text-center text-slate-700">Add Todo</h4>
            <svg className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" id="close-modal" fill="currentColor" viewBox="0 0 20 20" onClick={() => {
              const modalAdd = document.querySelector('#modalAdd');
              modalAdd.classList.toggle('hidden');
              modalAdd.classList.toggle('flex');
              setTitle('');
              setDescription('');
              setDueDate('');
              setMessage(null);
            }}>
              <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <div className="px-3">
            {message && (
              <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline capitalize">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setMessage(null)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
              </div>
            )}
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Title</span>
              <input type="text" className='form-data' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Description</span>
              <textarea className='form-data' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Date</span>
              <input type="date" value={dueDate} className='form-data' onChange={(e) => setDueDate(e.target.value)} />
            </label>
            <button className='btn-primary w-full' disabled={isLoading || !title || !description || !dueDate ? true : false} onClick={addTodo}>Save</button>
          </div>

        </div>
      </div>


      {/* MODALS Edit */}
      <div className="bg-black bg-opacity-50 absolute inset-0 hidden justify-center items-center" id="modalEdit">
        <div className="bg-gray-200 py-2 px-3 rounded-lg shadow-xl text-gray-800 w-[400px]">
          <div className="flex justify-between items-center mb-3">
            <div />
            <h4 className="text-lg font-bold text-center text-slate-700">Add Todo</h4>
            <svg className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full" id="close-modal" fill="currentColor" viewBox="0 0 20 20" onClick={() => {
              const modalEdit = document.querySelector('#modalEdit');
              modalEdit.classList.toggle('hidden');
              modalEdit.classList.toggle('flex');
              setTitle('');
              setDescription('');
              setDueDate('');
              setMessage(null);
            }}>
              <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </div>
          <div className="px-3">
            {message && (
              <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline capitalize">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setMessage(null)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
              </div>
            )}
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Title</span>
              <input type="text" className='form-data' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Description</span>
              <textarea className='form-data' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label className="block mb-4">
              <span className="block font-medium text-slate-700">Date</span>
              <input type="date" value={dueDate} className='form-data' onChange={(e) => setDueDate(e.target.value)} />
            </label>
            <button className='btn-primary w-full' disabled={isLoading || !title || !description || !dueDate ? true : false} onClick={() => updateTodo(id)}>Save</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home