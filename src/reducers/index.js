import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailReducer";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    games: gamesReducer,
    detail: detailReducer,
    firebase: firebaseReducer,
    auth: authReducer
})

export default rootReducer