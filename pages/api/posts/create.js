
import authorization from '../../../middlewares/authorization';
import connectMongo from '../../../libs/db';
import Posts from '../../../models/postModel';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const auth = await authorization(req, res);
  const { nama_manusia, no_hp, alamat, email } = req.body;


  const create = await Posts.create({

    nama_manusia,
    no_hp,
    alamat,
    email
  });

  const createdData = await Posts.findOne({ create });

  res.status(200);
  res.json({
    message: 'Post created pak',
    data: createdData
  });
}