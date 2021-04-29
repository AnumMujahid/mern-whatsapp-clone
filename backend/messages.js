import mongoose from 'mongoose';
const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: {type: Date, default: Date.now},
});

export default mongoose.model('Message', messageSchema);
