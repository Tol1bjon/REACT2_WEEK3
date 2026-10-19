import { API } from "../API/API"
import { create } from "zustand"
import axios from "axios"

export const useData = create((set, get) => ({
    loading: false,
    data: [],
    error: [],

    get: async() => {
        set({ loading: true })
        try {
            const { data } = await axios.get(API)
            set({ data: data, loading: false })
        } catch (error) {
            set({ error: error })
        }
    },

    deleteZustand: async(id) => {
        set({ loading: true })
        try {
            await axios.delete(API + `/${id}`)
            get().get()
        } catch (error) {
            set({ error: error })
        }
    },

    addUserZustand: async(newUser) => {
        set({ loading: true })
        try {
            await axios.post(API, newUser)
            get().get()
        } catch (error) {
            set({ error: error })
        }
    },


    editUserZustand: async(id, updateUser) => {
        set({ loading: true })
        try {
            await axios.put(`${API}/${id}`, updateUser)
            get().get()
        } catch (error) {
            set({ error: error })
        }
    }
}))