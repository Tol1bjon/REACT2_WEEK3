import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { addUserRedux } from '../Store/Redux';

const AddRedux = ({ open, close }) => {
    const dispatch = useDispatch()
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
            dispatch(addUserRedux(data))
            close()
            reset()
        }

    return (
        <dialog open={open} className='p-3 rounded-lg'>
            <form onSubmit={handleSubmit(Onsubmit)}>
                <input type="text" {...register("avatar")} placeholder='Avatar' />
                <input type="text" {...register("name")} placeholder='Name' />
                <input type="text" {...register("email")} placeholder='Email' />
                <input type="text" {...register("job")} placeholder='Job' />
                <input type="number" {...register("age")} placeholder='Age' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button type='submit'>ADD</button>
                <button type='button' onClick={close}>CANCEL</button>
            </form>
        </dialog>
    );
}

export default AddRedux;