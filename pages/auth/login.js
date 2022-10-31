import React, { useState, useEffect } from "react";
import Cookie from 'js-cookie';
import Router from 'next/router';
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";
import Head from "next/head";
import theme from '../../utils/theme';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export async function getServerSideProps(ctx) {

  await unauthPage(ctx);

  return { props: {} }
}

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const [status, setStatus] = useState('normal');



  async function loginHandler(e) {
    e.preventDefault();
    setStatus('loading');
    const loginReq = await fetch('../api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    if (!loginReq.ok) return setStatus('error' + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus('success');

    Cookie.set('token', loginRes.token);

    Router.push('/posts');
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');
    setFields({
      ...fields,
      [name]: e.target.value
    })
  }

  return (
    <div>
      <Link href="../">
        <Button variant="contained">
          Back To Home
        </Button>
      </Link>

      <Box component="form" onSubmit={loginHandler.bind(this)} noValidate sx={{ mt: 1 }}>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <input color="primary" onChange={fieldHandler.bind(this)} type="text" name="email" placeholder="Email" />
        <input color="primary" onChange={fieldHandler.bind(this)} type="password" name="password" placeholder="Password" />
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
        <div>Status:{status}</div>
        <Button variant="outlined"><Link href="register/">Register here</Link></Button>

      </Box>
    </div>
  );
}
