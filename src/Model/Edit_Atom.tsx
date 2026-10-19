import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useSetAtom } from 'jotai/react';
import { editUserAtom, getDataAtom } from '../Store/Jotai';

const EditAtom = ({ user, close }) => {
    const editUser = useSetAtom(editUserAtom)
    const { register, handleSubmit, reset } = useForm({
            resolver: zodResolver(Schemas),
            defaultValues: {
                name: "",
                email: "",
                age: "",
                job: "",
                status: false,
                avatar: ""
            }
        })

        const Onsubmit = (data) => {
            editUser({id: user.id, updatedUser: data})
            close()
            reset()
        }

        useEffect(() => {
            if(user) reset(user)
        }, [user])

    return (
        <dialog open={user}>
            <form onSubmit={handleSubmit(Onsubmit)}>
                <input type="text" placeholder='IMAGE URL' {...register("avatar")} />
                <input type="text" placeholder="Name" {...register("name")} />
                <input type="text" placeholder="Email" {...register("email")} />
                <input type="text" placeholder="Age" {...register("age")} />
                <input type="text" placeholder="Job" {...register("job")} />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button type="submit">EDIT USER</button>
                <button type="button" onClick={close}>CANCEL</button>
            </form>
        </dialog>
    );
}

export default EditAtom;
