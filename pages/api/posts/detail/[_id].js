import db from '../../../../libs/db';
import connectMongo from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';
import Posts from '../../../../models/postModel';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const auth = await authorization(req, res);
  await connectMongo();

  const { _id } = req.query;
  const idpure = _id.slice(0, -2);
 

  const posts = await Posts.findOne({ idpure });

  if (!posts) return res.status(404).end();

  res.status(200);
  res.json({
    message: 'Posts data',
    data: posts
  });
}
