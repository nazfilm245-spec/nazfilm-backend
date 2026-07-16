const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    genre: { type: [String], default: [] },
    type: {
      type: String,
      enum: ['film', 'series', 'animation'],
      default: 'film',
    },
    country: { type: String, default: '' },
    isAfghanCinema: { type: Boolean, default: false },
    releaseYear: { type: Number },
    imdbRating: { type: Number, min: 0, max: 10 },
    duration: { type: String, default: '' },

    posterUrl: { type: String, default: '' },
    bannerUrl: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    quality: { type: String, default: '1080p' },

    isVIP: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    director: { type: String, default: '' },
    cast: { type: [String], default: [] },

    seasons: [
      {
        seasonNumber: Number,
        episodes: [
          {
            episodeNumber: Number,
            title: String,
            videoUrl: String,
            duration: String,
          },
        ],
      },
    ],

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', MovieSchema);
