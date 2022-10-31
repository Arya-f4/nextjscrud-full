import React, { useState } from 'react';
import { authPage } from "../../middlewares/authorizationPage";
import Link from 'next/link';
import Nav from '../../components/Nav';

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token
    }
  }
}
export default function PostCreate(props) {
  const [fields, setFields] = useState({
    nama_manusia: "",
    no_hp: "",
    alamat: "",
    email: ""

  });
  const [status, setStatus] = useState('normal');


  async function createHandler(e) {
    e.preventDefault();
    setStatus('loading');

    const { token } = props;

    const create = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    });
    if (!create.ok) return setStatus('error' + create.status)


    const res = await create.json();

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
      <h1>Create a Post</h1>


      <form onSubmit={createHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Nama Manusia"
          name="nama_manusia"
        />
        <br />
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Nomor HP"
          name="no_hp"
        />
        <br />

        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="Alamat"
          name="alamat"
        ></textarea>
        <br />
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Email"
          name="email"
        />
        <br />
        <button type="submit">Create Post</button>
        <div>Output: {status}</div>

      </form>
    </div>
  );
}