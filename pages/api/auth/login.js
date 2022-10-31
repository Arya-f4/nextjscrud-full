import bcrypt from 'bcryptjs';
import connectMongo from '../../../libs/db';
import Users from '../../../models/userModel';
import jwt from 'jsonwebtoken';
import db from '../../../libs/db';

export default async function handler(req, res) {

  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const checkUser = await Users.findOne({ email, passwordHash });

  const token = jwt.sign({
    _id: checkUser._id,
    email: checkUser.email

  }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.status(200);
  res.json({

    message: ' Login sukses pak bos',
    token
  });
  if (!checkUser) {
    return res.json({ status: "not Able to find the user" })

  }

  else {
    res.redirect('/register')
  }





}