import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Schema } from '../Store/Schema';
import { useData } from '../Store/Zustand';

const AddDialogZustand = ({ open, onClose }) => {
    const addUserZ = useData((state) => state.addZ)
    const { register, handleSubmit, reset } = useForm({
            resolver: zodResolver(Schema),
            defaultValues: {
                avatar: '',
                name: '',
                email: '',
                job: '',
                status: true
            }
        })

    const Onsubmit = (newUser) => {
        addUserZ(newUser)
        reset()
        onClose()
    }

    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit(Onsubmit)}>
                <h1>ADD USER ZUSTAND</h1>
                <input {...register("avatar")} type="text" placeholder='Avatar' />
                <input {...register("name")} type="text" placeholder='Name' />
                <input {...register("email")} type="text" placeholder='Email' />
                <input {...register("job")} type="text" placeholder='Job' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button type='submit'>ADD</button>
                <button type='button' onClick={onClose}>CLOSE</button>
            </form>
        </dialog>
    );
}

export default AddDialogZustand;
