import { ZUSTAND_API } from "../API/API"
import { create } from "zustand"
import axios from "axios"

export const ZustandData = create<any>((set, get) => ({
    data: [],
    loading: false,
    error: [],

    get: async() => {
        set({ loading: true })
        try {
            const {data} = await axios.get(ZUSTAND_API)
            set({ data: data, loading: false })
        } catch (error) {
            set({ error: error, loading: false })
        }
    },

    deleteZ: async(id: any) => {
        try {
            await axios.delete(`${ZUSTAND_API}/${id}`)
            get().get()
        } catch (error) {
            console.error(error)
        }
    } 
}))