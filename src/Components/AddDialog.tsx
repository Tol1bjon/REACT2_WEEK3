import { useForm } from 'react-hook-form';
import React from 'react';
import { addUserAtom } from '../Store/Jotai';
import { useAtom, useSetAtom } from 'jotai';
import { Schema } from '../Store/Schema';
import { zodResolver } from "@hookform/resolvers/zod";


const AddDialog = ({ open, onClose }) => {
    const addUser = useSetAtom(addUserAtom)
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
        addUser(newUser)
        reset()
        onClose()
    }
    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit(Onsubmit)}>
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

export default AddDialog;
