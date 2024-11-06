import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notificationReducer from "./modules/notification";

const store = configureStore({
  reducer: { notification: notificationReducer },
});

type GetStateFnType = typeof store.getState;
type StateType = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export default store;
