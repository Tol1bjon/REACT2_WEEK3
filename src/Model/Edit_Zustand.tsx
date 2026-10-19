import React, { useEffect } from 'react';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useData } from '../Store/Zustand';

const EditZustand = ({ user, close }) => {
    const {editUserZustand} = useData((state) => state)
    const { register, handleSubmit, reset } = useForm({
            resolver: zodResolver(Schemas),
            defaultValues: {
                name: user?.name,
                email: user?.email,
                job: user?.job,
                age: user?.age,
                status: user?.status,
                avatar: user?.avatar
            }
        })


    
    const Onsubmit = (data) => {
        editUserZustand(user.id, data)
        close()
        reset()
    }

    useEffect(() => {
        if(user) reset(user)
    }, [user])
    

    return (
        <dialog open={user}>
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

export default EditZustand;
