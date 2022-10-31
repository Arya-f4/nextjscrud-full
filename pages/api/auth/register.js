
import bcrypt from 'bcryptjs';
import connectMongo from '../../../libs/db';
import Users from '../../../models/userModel';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    console.log('Hashing Passphrase');

    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    console.log('PassPhrase Hashed');
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('Creating Users TO MONGO');
    const users = await Users.create({
      email,
      password: passwordHash,
    });
    if (!users) {
      return res.json({ status: "User not created" })
    }
    console.log('Created Users TO MONGO');
    const registeredUser = await (await Users.find({ id: users })).filter;

    res.status(200);
    res.json({
      message: 'Hello mas bro registered',
      data: registeredUser
    });
  }

  catch (error) {
    console.log(error);
    res.json(error);
  }


}