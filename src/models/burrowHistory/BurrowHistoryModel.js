// inserting new burrow

import BurrowHistorySchema from "./BurrowHistorySchema.js";

export const createNewBurrows = async (burrowArr) => {
  const burrows = await Promise.all(
    burrowArr.map(async (burrow) => {
      const activeBurrow = await BurrowHistorySchema.findOne({
        userId: burrow.userId,
        bookId: burrow.bookId,
        isReturned: false,
      });

      if (activeBurrow?._id) {
        return activeBurrow;
      }

      const returnedBurrow = await BurrowHistorySchema.findOneAndUpdate(
        {
          userId: burrow.userId,
          bookId: burrow.bookId,
          isReturned: true,
        },
        {
          ...burrow,
          isReturned: false,
          returnedDate: null,
        },
        { new: true, sort: { updatedAt: -1 } }
      );

      if (returnedBurrow?._id) {
        return returnedBurrow;
      }

      return BurrowHistorySchema.create(burrow);
    })
  );

  return burrows;
};

//for specific user
// if no books for the user it will return entire records
export const getBurrows = async (filter = {}) => {
  const burrows = await BurrowHistorySchema.find(filter).sort({
    updatedAt: -1,
  });
  const seenBooks = new Set();

  return burrows.filter(({ userId, bookId }) => {
    const key = `${userId}-${bookId}`;

    if (seenBooks.has(key)) {
      return false;
    }

    seenBooks.add(key);
    return true;
  });
};

//update burrow table
export const updateBurrows = (filter, obj) => {
  return BurrowHistorySchema.findOneAndUpdate(filter, obj, { new: true });
};
