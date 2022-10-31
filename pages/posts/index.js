import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { authPage } from "../../middlewares/authorizationPage";
import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Nav from '../../components/Nav';
export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch('http://localhost:3000/api/posts'
    , {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

  const posts = await postReq.json();



  return {
    props: {
      token,
      posts: posts.data
    }
  }
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);


  async function deleteHandler(_id, e) {
    e.preventDefault();

    const { token } = props;
    const ask = confirm('Are you sure sir to delete this?');
    if (ask) {
      const postsFiltered = posts.filter(posts => {
        return posts._id !== _id && posts;
      });
      setPosts(postsFiltered)
      const deletePost = await fetch(`/api/posts/delete/` + _id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const res = await deletePost.json();
      return console.log('Delete');
    }
  }
  function editHandler(_id) {
    Router.push('/posts/edit/' + _id);
  }


  return (

    <>
      <Nav />
      <h1 className={styles.title}>Posts</h1>
      <div className={styles.grid}>
        {posts.map(posts => (

          <a key={posts._id} className={styles.card}>
            <h2>{posts.nama_manusia} &rarr;</h2>
            <h3>{posts.no_hp}</h3>
            <h3>{posts.email}</h3>
            <p>{posts.alamat}</p>
            <p>{posts._id}</p>


            <button onClick={editHandler.bind(this, posts._id)}>Edit</button>
            <button onClick={deleteHandler.bind(this, posts._id)}>Delete</button>
          </a>

        ))}
      </div> </>

  );
}