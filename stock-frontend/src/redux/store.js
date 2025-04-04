import {configureStore} from "@reduxjs/toolkit";
import user from "./reducers/user";
import { userReducer } from "../redux/reducers/user";
import rootReducer from "./reducers/index"
const store=configureStore({
    reducer:rootReducer
});
export default store;