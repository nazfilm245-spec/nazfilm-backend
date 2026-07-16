const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true },
    name: { type: String, default: 'مهمان' },
    isVIP: { type: Boolean, default: false },
    vipExpiresAt: { type: Date, default: null },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
