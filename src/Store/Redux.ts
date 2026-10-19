import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../API/API'

const initialState = {
    users: [],
    loading: false
}


export const getRedux = createAsyncThunk("data/getData", async() => {
    try {
        const {data} = await axios.get(API)
        return data
    } catch (error) {
        console.log(error)
    }
})


export const deleteRedux = createAsyncThunk("data/deleteRedux", async(id, { dispatch }) => {
    try {
        await axios.delete(`${API}/${id}`)
        dispatch(getRedux())
    } catch (error) {
        console.log(error)
    }
})


export const addUserRedux = createAsyncThunk("data/addUserRedux", async(newUser, { dispatch }) => {
    try {
        await axios.post(API, newUser)
        dispatch(getRedux())
    } catch (error) {
        console.log(error)
    }
})


export const editUserRedux = createAsyncThunk("data/editUserRedux", async({ id, user }, { dispatch }) => {
    try {
        await axios.put(`${API}/${id}`, user)
        dispatch(getRedux())
    } catch (error) {
        console.log(error)
    }
})


export const Redux = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRedux.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getRedux.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(getRedux.rejected, (state) => {
            state.loading = false
        })
    }
})

export const {} = Redux.actions
export default Redux.reducer