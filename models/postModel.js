import { Schema, model, models } from 'mongoose';


const postsSchema = new Schema({
  nama_manusia: {
    type: String,
    required: true
  },
  no_hp: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  email: {

    type: String,
    required: true
  }

});

const Posts = models.Posts || model('Posts', postsSchema);

export default Posts