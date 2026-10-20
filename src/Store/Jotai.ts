import { atomWithRefresh } from "jotai/utils";
import { API } from "../API/API";
import axios from "axios";
import { atom } from "jotai/vanilla";


export const searchAtom = atom("")


export const selectAtom = atom("")


export const pageAtom = atom(1)


export const getAtom = atomWithRefresh( async(get) => {
    const search = get(searchAtom)
    const select = get(selectAtom)
    const page = get(pageAtom)
    try {
        const {data} = await axios.get(API, {
            params: {
                search: search,
                status: select,
                page: page,
                limit: 3
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
});


export const deleteUserAtom = atom(null, async(get, set, id) => {
    try {
        await axios.delete(`${API}/${id}`)
        set(getAtom)
    } catch (error) {
        console.log(error)
    }
})



export const addUserAtom = atom(null, async(get, set, newUser) => {
    try {
        await axios.post(API, newUser)
        set(getAtom)
    } catch (error) {
        console.log(error)
    }
})



export const editUserAtom = atom(null, async(get, set, {id, user}) => {
    try {
        await axios.put(`${API}/${id}`, user)
        set(getAtom)
    } catch (error) {
        console.log(error)
    }
})