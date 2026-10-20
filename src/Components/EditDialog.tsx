import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from '../Store/Schema';
import { useSetAtom } from 'jotai';
import { editUserAtom } from '../Store/Jotai';


const EditDialog = ({ user, onClose }) => {
    const editUser = useSetAtom(editUserAtom)

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


    const Onsubmit = (updatedUser) => {
        editUser({ id: user.id, user: updatedUser })
        onClose()
    }

    useEffect(() => {
        if(user) {
            reset(user)
        }
    }, [user])

    return (
        <dialog open={user} onClose={onClose}>
            <form key={user?.id} onSubmit={handleSubmit(Onsubmit)}>
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

export default EditDialog;
