import axios from "axios"
import { atomWithRefresh } from "jotai/utils"
import { API } from "../API/API"
import { atom } from "jotai/vanilla"

export const getDataAtom = atomWithRefresh(async() => {
    try {
        const {data} = await axios.get(API)
        return data
    } catch (error) {
        console.log(error)
    }
})


export const deleteAtom = atom(null, async(get, set, id) => {
    try {
        await axios.delete(`${API}/${id}`)
        set(getDataAtom)
    } catch (error) {
        console.log(error)
    }
})


export const addUserAtom = atom(null, async(get, set, newUser) => {
    try {
        await axios.post(API, newUser)
        set(getDataAtom)
    } catch (error) {
        console.log(error)
    }
})


export const editUserAtom = atom(null, async(get, set, {id, updatedUser}) => {
    try {
        await axios.put(`${API}/${id}`, updatedUser)
        set(getDataAtom)
    } catch (error) {
        console.log(error)      
    }
})