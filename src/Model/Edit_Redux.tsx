import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schemas } from '../Schemas/Schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { editUserRedux } from '../Store/Redux';

const EditRedux = ({ user, close }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm({
                resolver: zodResolver(Schemas),
                defaultValues: {
                    name: user?.name,
                    email: user?.email,
                    age: user?.age,
                    job: user?.job,
                    status: user?.status,
                    avatar: user?.avatar
                }
            })

            const onsubmit = (data) => {
                dispatch(editUserRedux({ id: user.id, user: data }))
                reset()
                close()
            }

            useEffect(() => {
                if(user) {
                    reset(user)
                }
            },[user])

    return (
        <dialog open={user}>
            <form key={user?.id} onSubmit={handleSubmit(onsubmit)}>
                <input {...register("avatar")} type="text" placeholder='Avatar' />
                <input {...register("name")} type="text" placeholder='Name' />
                <input {...register("email")} type="text" placeholder='Email' />
                <input {...register("job")} type="text" placeholder='Job' />
                <input {...register("age")} type="number" placeholder='Age' />
                <select {...register("status")}>
                    <option value={"true"}>ACTIVE</option>
                    <option value={"false"}>INACTIVE</option>
                </select>
                <button type='submit'>SAVE</button>
                <button onClick={close} type='button'>CLOSE</button>
            </form>
        </dialog>
    );
}

export default EditRedux;
