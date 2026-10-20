import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schema } from '../Store/Schema';
import { useData } from '../Store/Zustand';

const EditDialogZustand = ({ user, onClose }) => {
    const editUserZ = useData((state) => state.editZ)
    const { register, handleSubmit, reset } = useForm({
                resolver: zodResolver(Schema),
                defaultValues: {
                    avatar: user?.avatar,
                    name: user?.name,
                    email: user?.email,
                    job: user?.job,
                    status: user?.status
                }
            })
    
        const Onsubmit = (newUser) => {
            editUserZ(user?.id, newUser)
            reset()
            onClose()
        }

        useEffect(() => {
            if(user){
                reset(user)
            }
        }, [user])
    return (
        <dialog open={user}>
            <form onSubmit={handleSubmit(Onsubmit)} key={user?.id}>
                <h1>EDIT USER ZUSTAND</h1>
                <input {...register("avatar")} type="text" placeholder='Avatar' />
                <input {...register("name")} type="text" placeholder='Name' />
                <input {...register("email")} type="text" placeholder='Email' />
                <input {...register("job")} type="text" placeholder='Job' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button type='submit'>EDIT</button>
                <button type='button' onClick={onClose}>CLOSE</button>
            </form>
        </dialog>
    );
}

export default EditDialogZustand;
