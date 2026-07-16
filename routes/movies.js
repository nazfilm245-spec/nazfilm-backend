const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// دریافت همه فیلم‌ها (با فیلتر اختیاری) — برای صفحه اصلی
router.get('/', async (req, res) => {
  try {
    const { type, country, search, featured } = req.query;
    const filter = {};

    if (type && type !== 'all') filter.type = type;
    if (country === 'afghan') filter.isAfghanCinema = true;
    if (featured === 'true') filter.isFeatured = true;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت فیلم‌ها', details: err.message });
  }
});

// دریافت یک فیلم با آیدی — برای صفحه جزئیات
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'فیلم یافت نشد' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'خطا در دریافت فیلم', details: err.message });
  }
});

// افزودن فیلم جدید — برای پنل مدیریت
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'خطا در ثبت فیلم', details: err.message });
  }
});

// ویرایش فیلم — برای پنل مدیریت
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: 'فیلم یافت نشد' });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: 'خطا در ویرایش فیلم', details: err.message });
  }
});

// حذف فیلم — برای پنل مدیریت
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'فیلم یافت نشد' });
    res.json({ message: 'فیلم حذف شد' });
  } catch (err) {
    res.status(500).json({ error: 'خطا در حذف فیلم', details: err.message });
  }
});

// افزایش شمارنده بازدید — وقتی کاربر پخش را می‌زند
router.post('/:id/view', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'خطا', details: err.message });
  }
});

module.exports = router;
