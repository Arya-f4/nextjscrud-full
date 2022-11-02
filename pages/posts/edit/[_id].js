import React, { useState } from 'react';
import { authPage } from "../../../middlewares/authorizationPage";
import Link from 'next/link';
import Nav from '../../../components/Nav';

export async function getServerSideProps(ctx) {

  const { _id } = ctx.query;
  console.log(_id);
  const postsReq = await fetch('http://localhost:3000/api/posts/detail/' + _id);
  console.log(postsReq);

  const res = await postsReq.json();

  return {
    props: {
      posts: res.data
    }
  }
}
export default function PostsEdit(props) {

  const { posts } = props;

  const [fields, setFields] = useState({
    nama_manusia: posts.nama_manusia,
    no_hp: posts.no_hp,
    email: posts.email,
    alamat: posts.alamat,

  });


  const [status, setStatus] = useState('normal');


  async function updateHandler(e) {
    e.preventDefault();

    setStatus('loading');

    const { token } = props;

    const update = await fetch('/api/posts/update/' + posts._id, {
      method: 'PUT',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    });

    if (!update.ok) return setStatus('error' + update.status)


    const res = await update.json();

    setStatus('success');

  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');

    setFields({
      ...fields,
      [name]: e.target.value
    });
  }
  return (

    <div>
      <Nav />
      <h1>Edit a Post</h1>

      <form onSubmit={updateHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Nama Manusia"
          name="nama_manusia"
          defaultValue={posts.nama_manusia}
        />
        <br />
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Nomor HP"
          name="no_hp"
          defaultValue={posts.no_hp}
        />
        <br />

        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="Alamat"
          name="alamat"
          defaultValue={posts.alamat}
        ></textarea>
        <br />
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Email"
          name="email"
          defaultValue={posts.email}
        />
        <br />
        <button type="submit">Save Changes Post</button>
        <div>Output: {status}</div>

      </form>
    </div >
  );
}
