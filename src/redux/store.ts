import {roundUpReducer} from "./reducer";
import {createStore} from "redux";
import {devToolsEnhancer} from "redux-devtools-extension";

export const store = createStore(roundUpReducer, devToolsEnhancer({}));