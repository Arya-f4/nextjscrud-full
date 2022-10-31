
import authorization from '../../../../middlewares/authorization';
import Posts from '../../../../models/postModel';
import connectMongo from '../../../../utils/connectMongo';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();
  await connectMongo();
  const { _id } = req.query;
  const idpure = _id.slice(0, -2);
  const auth = await authorization(req, res);
  const deleteRow = await Posts.findOneAndDelete({ idpure });

  res.status(200);
  res.json({
    message: 'Post deleted sukses pak'
  });
}