import { configureStore } from "@reduxjs/toolkit"
import ReduxData from "./Redux"

export const store = configureStore({
    reducer: {
        data: ReduxData,
    }
})