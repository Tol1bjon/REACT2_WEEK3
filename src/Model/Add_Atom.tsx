import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { useSetAtom } from 'jotai/react';
import { addUserAtom } from '../Store/Jotai';

const AddAtom = ({ open, close }) => {
    const addUser = useSetAtom(addUserAtom)
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

    const onSubmit = (data) => {
        addUser(data)
        close()
        reset()
    }

    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            </form>
        </dialog>
    );
}

export default AddAtom;
