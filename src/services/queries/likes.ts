
// Note1
// Like system data stucture
// users:likes#userId = a set of item ids [x, y, z...]




export const userLikesItem = async (itemId: string, userId: string) => {};

export const likedItems = async (userId: string) => {};

export const likeItem = async (itemId: string, userId: string) => {};

export const unlikeItem = async (itemId: string, userId: string) => {};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {};
