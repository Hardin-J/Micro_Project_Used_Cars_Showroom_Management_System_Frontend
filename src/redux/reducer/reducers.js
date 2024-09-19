import { LIKE_CAR, UNLIKE_CAR, SET_USER_ID } from '../action/action';

const initialState = {
    likedCarsByUser: {}, // { userId: [{carId, ...}, ...] }
    userId: null
};

const carReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_CAR:
            const { userId, car } = action.payload;
            return {
                ...state,
                likedCarsByUser: {
                    ...state.likedCarsByUser,
                    [userId]: [...(state.likedCarsByUser[userId] || []), car]
                }
            };
        case UNLIKE_CAR:
            const { userId: uid, carId } = action.payload;
            return {
                ...state,
                likedCarsByUser: {
                    ...state.likedCarsByUser,
                    [uid]: (state.likedCarsByUser[uid] || []).filter(car => car.id !== carId)
                }
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            };
        default:
            return state;
    }
};

export default carReducer;
