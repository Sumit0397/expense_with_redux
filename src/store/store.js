import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expenseReducer from "./expense";

const store = configureStore({
    reducer:{auth : authReducer , expenseStore : expenseReducer}
})

export default store;