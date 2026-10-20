import { JOTAI_API } from "../API/API"
import { atomWithRefresh } from "jotai/utils"
import axios from "axios"
import { atom } from "jotai/vanilla"

export const atomData = atomWithRefresh(async() => {
    try {
        const {data} = await axios.get(JOTAI_API)
        return data
    } catch (error) {
        console.log(error)
    }
})


export const deleteAtom = atom(null, async (_, set, id: any) => {
    try {
        await axios.delete(`${JOTAI_API}/${id}`)
        set(atomData)
    } catch (error) {
        console.log(error)
    }
})