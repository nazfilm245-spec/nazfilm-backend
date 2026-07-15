const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ وصل شد MongoDB به دیتابیس'))
  .catch(err => console.error('❌ خطا در اتصال به دیتابیس:', err.message));

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('سرور نازفیلم فعال است 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 سرور نازفیلم روی پورت ${PORT} اجرا شد`);
});
