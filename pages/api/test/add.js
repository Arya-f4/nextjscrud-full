import connectMongo from '../../../utils/connectMongo';
import Test from '../../../models/userModel';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function addTest(req, res) {
  try {
    const { email, password } = req.body;
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('Creating Docs TO MONGO');
    const test = await Test.create(req.body);
    console.log('Created Docs TO MONGO');

    res.json({ test });
  }

  catch (error) {
    console.log(error);
    res.json(error);
  }

}