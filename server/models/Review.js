const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewTitle: {
      type: String,
      required: 'Title must be entered to leave a review',
      minlength: 1,
      maxlength: 100
    },
    reviewText: {
      type: String,
      required: 'Text must be entered to leave a review',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Count number of reactions on a review
reviewSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Review = model('Review', reviewSchema);

module.exports = Review;