import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const urlModel = mongoose.model('URL', URLSchema);

export default urlModel
