import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { REDUX_API } from "../API/API"
import axios from "axios"
import type { rData } from "./Types"

export const getRedux = createAsyncThunk("data/getRedux", async () => {
        try {
            const {data} = await axios.get(REDUX_API)
            return data
        } catch (error) {
            return error
        }
    }
)



// DELETE USERS
export const deleteRedux = createAsyncThunk("data/deleteRedux", async (id: any, {dispatch}) => {
    try {
        await axios.delete(`${REDUX_API}/${id}`)
        dispatch(getRedux())
    } catch (error) {
        return error
    }
})



const initialState: rData = {
    dataR: [],
    loading: false,
    error: [],
}



export const ReduxData = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRedux.fulfilled, (state, action) => {
            state.dataR = action.payload
            state.loading = false
        }).addCase(getRedux.pending, (state) => {
            state.loading = true
        }).addCase(getRedux.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default ReduxData.reducer