import { API } from "../API/API"
import axios from "axios"
import { create } from "zustand"

export const useData = create((set, get) => ({
    loading: false,
    Data: [],
    error: [],

    get: async() => {
        try {
            set({ loading: true })
            const {data} = await axios.get(API)
            set({ Data: data, loading: false })
        } catch (error) {
            set({ error: error, loading: false })
        }
    },

    deleteZ: async(id) => {
        try {
            set({ loading: true })
            await axios.delete(`${API}/${id}`)
            get().get()
        } catch (error) {
            set({ error: error, loading: false })
        }
    },

    addZ: async(newUser) => {
        try {
            set({ loading: true })
            await axios.post(API, newUser)
            get().get()
        } catch (error) {
            set({ error: error, loading: false })
        }
    },

    editZ: async(id, newUser) => {
        try {
            set({ loading: true })
            await axios.put(`${API}/${id}`, newUser)
            get().get()
        } catch (error) {
            set({ error: error, loading: false })
        }
    }
}))