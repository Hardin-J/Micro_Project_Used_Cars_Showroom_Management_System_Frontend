// actions.js
export const LIKE_CAR = 'LIKE_CAR';
export const UNLIKE_CAR = 'UNLIKE_CAR';
export const SET_USER_ID = 'SET_USER_ID';

export const likeCar = (userId, car) => ({
    type: LIKE_CAR,
    payload: { userId, car }
});

export const unlikeCar = (userId, carId) => ({
    type: UNLIKE_CAR,
    payload: { userId, carId }
});

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId
});
