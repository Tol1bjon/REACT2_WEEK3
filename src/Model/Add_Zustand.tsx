import React from 'react';
import { useForm } from 'react-hook-form'
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod'
import { useData } from '../Store/Zustand';

const AddZustand = ({ open, close }) => {
    const {addUserZustand} = useData((state) => state)
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(Schemas),
        defaultValues: {
            name: "",
            email: "",
            job: "",
            age: "",
            status: false,
            avatar: ""
        }
    })

    const Onsubmit = (data) => {
        addUserZustand(data)
        close()
        reset()
    }

    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit(Onsubmit)}>
                <input {...register("avatar")} type="text" placeholder='Avatar' />
                <input {...register("name")} type="text" placeholder='Name' />
                <input {...register("email")} type="text" placeholder='Email' />
                <input {...register("job")} type="text" placeholder='Job' />
                <input {...register("age")} type="number" placeholder='Age' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button onClick={close}>Close</button>
                <button type='submit'>Add</button>
            </form>
        </dialog>
    );
}

export default AddZustand;
