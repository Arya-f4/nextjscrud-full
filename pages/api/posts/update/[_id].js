import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';
import Posts from '../../../../models/postModel';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();
  const auth = await authorization(req, res);

  const { _id } = req.query;
  const idpure = _id.slice(0, -2);
  const { nama_manusia, no_hp, alamat, email } = req.body;
  const update = await Posts.findOneAndUpdate({ idpure }, { nama_manusia, no_hp, alamat, email });

  const updatedData = await Posts.findOne({ _id });
  res.status(200);
  res.json({
    message: 'Post Updated pak sukses',
    data: updatedData
  });
}