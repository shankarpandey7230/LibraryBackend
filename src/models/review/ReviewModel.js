import ReviewSchema from "./ReviewSchema.js";

// insert new review
export const createReviews = (reviewsObj) => {
  return ReviewSchema(reviewsObj).save();
};

// // whether its for user or admin

// export const getReviews = (filter) => {
//   return ReviewSchema.find(filter);
// };

// // update review table
// export const updateReview = (filter, obj) => {
//   return ReviewSchema.findOneAndUpdate(filter, obj);
// };

// // delete review
// export const deleteReview = (filter) => {
//   return ReviewSchema.findOneAndDelete(filter);
// };
