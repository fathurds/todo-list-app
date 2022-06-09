# Todo List App

Project Todo List App ini saya beri nama [Fath Todo](https://fath-todo.vercel.app/) yang diambil dari nama saya sendiri dan tema dari project yang saya buat. Project ini adalah salah satu tugas yang diberikan selama melakukan bootcamp di Alterra Academy. Pada project ini memiliki fitur CRUD untuk bagian menambah, mengubah atau menghapus todo yang kita buat.

https://fath-todo.vercel.app/

<hr />

## Fath Todo

Web Todo List yang saya buat ini menggunakan framework ReactJS dan menggunakan CSS framework Tailwindcss. Untuk deployment, saya mendeploy ke situs Vercel.

<hr />

## Keterangan

Pada saat di home jika kita tidak memiliki token akan masuk ke halaman login. Ketika sudah login, akan ada tampilan tabel dan tombol untuk menambahkan tabel. Pada isi tabel ada tombol edit yang ketika ditekan akan muncul popup untuk mengedit todo yang ada di list, tombol delete yang ketika ditekan akan menghapus todo yang ada di list, serta tombol done yang ketika ditekan akan mengubah status dari belum selesai ke selesai.

<hr />

<b>List Todo</b>
````
GET
https://peaceful-citadel-71310.herokuapp.com/todo
````
<b>Create Todo</b>
````
POST
https://peaceful-citadel-71310.herokuapp.com/todo
````
<b>Delete Todo</b>
````
DELETE
https://peaceful-citadel-71310.herokuapp.com/todo/:id
````
<b>Update Todo</b>
````
PUT
https://peaceful-citadel-71310.herokuapp.com/todo/:id
````
<b>Login</b>
````
POST
https://peaceful-citadel-71310.herokuapp.com/todo/signin
````
<b>Register</b>
````
POST
https://peaceful-citadel-71310.herokuapp.com/todo/signup
````