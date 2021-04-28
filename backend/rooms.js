import mongoose from 'mongoose';
import Message from './messages.js';

const roomSchema = mongoose.Schema({
  name: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

export default mongoose.model('Room', roomSchema);
