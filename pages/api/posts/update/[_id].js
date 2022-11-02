
import Posts from '../../../../models/postModel';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();

  const { _id } = req.query;
  const { nama_manusia, no_hp, alamat, email } = req.body;
  const update = await Posts.findOneAndUpdate({ _id }, { nama_manusia, no_hp, alamat, email });

  const updatedData = await Posts.findOne({ _id });
  res.status(200);
  res.json({
    message: 'Post Updated pak sukses',
    data: updatedData
  });
}
