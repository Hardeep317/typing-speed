import { legacy_createStore as createStore } from "redux";
import { loginReducer } from "../Reducers/LoginReducer";

export const store = createStore(loginReducer);