import { Schema, model, models } from 'mongoose';


const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }

});


const Users = models.Users || model('Users', usersSchema);

export default Users