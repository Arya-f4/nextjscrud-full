import Posts from '../../../models/postModel';
import authorization from '../../../middlewares/authorization';
import connectMongo from '../../../utils/connectMongo';

export default async function handler(req, res) {
  await connectMongo();
  if (req.method !== 'GET') return res.status(405).end();

  const auth = await authorization(req, res);
  const posts = await Posts.find();
  res.status(200);
  res.json({
    message: 'Posts data',
    data: posts
  });
}