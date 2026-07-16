const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ثبت‌نام یا ورود با شماره تلفن
router.post('/login', async (req, res) => {
  try {
    const { phone, name } = req.body;
    if (!phone) return res.status(400).json({ error: 'شماره تلفن الزامی است' });

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, name: name || 'مهمان' });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'خطا در ورود', details: err.message });
  }
});

// افزودن/حذف فیلم به علاقه‌مندی‌ها
router.post('/:userId/favorites/:movieId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'کاربر یافت نشد' });

    const idx = user.favorites.findIndex((id) => id.toString() === req.params.movieId);
    if (idx > -1) {
      user.favorites.splice(idx, 1);
    } else {
      user.favorites.push(req.params.movieId);
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'خطا', details: err.message });
  }
});

// دریافت لیست علاقه‌مندی‌ها
router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) return res.status(404).json({ error: 'کاربر یافت نشد' });
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'خطا', details: err.message });
  }
});

module.exports = router;
