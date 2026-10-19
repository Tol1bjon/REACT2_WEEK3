import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRedux, getRedux } from '../Store/Redux';
import AddRedux from '../Model/Add_Redux';
import EditRedux from '../Model/Edit_Redux';
import InfoRedux from '../Model/Info_Redux';

const Redux = () => {
    const { users, loading } = useSelector((state) => state.redux)
    const dispatch = useDispatch()
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(null)
    const [infoOpen, setInfoOpen] = useState(null)

    useEffect(() => {
        dispatch(getRedux())
    },[dispatch])


    return (
        <div>
            <button onClick={() => setAddOpen(true)} className='bg-blue-600 px-2 py-1 rounded'>ADD USER</button>
            <AddRedux open={addOpen} close={() => setAddOpen(false)} />
            <EditRedux user={editOpen} close={() => setEditOpen(null)} />
            <InfoRedux user={infoOpen} close={() => setInfoOpen(null)}/>
                
            {loading ? <h1>loading</h1> : <>{users.map((user) => <div key={user.id}>
                <img src={user.avatar} alt="" />
                <h1>name:{user.name}</h1>
                <h1>email:{user.email}</h1>
                <h1>job:{user.job}</h1>
                <h1>age:{user.age}</h1>
                <button onClick={() => dispatch(deleteRedux(user.id))} className='bg-red-600 px-2 py-1 rounded'>DELETE</button>
                <button className='bg-blue-600 px-2 py-1 rounded' onClick={() => setEditOpen(user)}>EDIT</button>
                <button className='bg-green-600 px-2 py-1 rounded' onClick={() => setInfoOpen(user)}>VIEW</button>
            </div>)}</>}
        </div>
    );
}

export default Redux;
