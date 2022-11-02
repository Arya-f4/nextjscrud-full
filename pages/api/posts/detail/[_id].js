
import Posts from '../../../../models/postModel';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();


  const { _id } = req.query;


  const posts = await Posts.findOne({ _id });

  if (!posts) return res.status(404).end();

  res.status(200);
  res.json({
    message: 'Posts data',
    data: posts
  });
}
