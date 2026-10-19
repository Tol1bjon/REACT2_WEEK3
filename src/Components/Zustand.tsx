import React, { useEffect, useState } from 'react';
import { useData } from '../Store/Zustand';
import AddZustand from '../Model/Add_Zustand';
import EditZustand from '../Model/Edit_Zustand';
import InfoZustand from '../Model/Info_Zustand';

const Zustand = () => {
    const { data, get, loading, deleteZustand }: any = useData((state) => state)
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(null)
    const [info, setInfo] = useState(null)
    
    useEffect(() => {
        get()
    }, [])

    if(loading) return <h1>LOADING...</h1>


    return (
        <div>
            <button className='bg-blue-500 p-2 rounded' onClick={() => setAddOpen(true)}>ADD USER</button>
            <AddZustand open={addOpen} close={() => setAddOpen(false)} />
            <EditZustand user={editOpen} close={() => setEditOpen(null)}/>
            <InfoZustand user={info} close={() => setInfo(null)}/>

            {data.map((user) => (
                <div key={user.id}>
                    <img src={user.avatar} alt={user.name} />
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Job: {user.job}</p>
                    <p>Age: {user.age}</p>
                    <p>Status: {user.status ? "ACTIVE" : "INACTIVE"}</p>
                    <button onClick={() => deleteZustand(user.id)} className='bg-red-500 p-2 rounded'>DELETE</button>
                    <button className='bg-yellow-500 p-2 rounded' onClick={() => setEditOpen(user)}>EDIT</button>
                    <button className='bg-green-500 p-2 rounded' onClick={() => setInfo(user)}>VIEW</button>
                </div>
            ))}
        </div>
    );
}

export default Zustand;
