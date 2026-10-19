import { useAtom, useSetAtom } from 'jotai/react';
import React, { useState } from 'react';
import { deleteAtom, getDataAtom } from '../Store/Jotai';
import AddAtom from '../Model/Add_Atom';
import EditAtom from '../Model/Edit_Atom';
import InfoAtom from '../Model/Info_Atom';

const Jotai = () => {
    const [data, setData] = useAtom(getDataAtom)
    const deleteUser = useSetAtom(deleteAtom)
    const [addOpen, setAddOpen] = useState(false)
    const [editOPen, setEditOpen] = useState(null)
    const [infoOpen, setInfoOpen] = useState(null)

    return (
        <div>
            <button onClick={() => setAddOpen(true)} className='bg-blue-500 text-white p-2 rounded'>ADD USER</button>
            <AddAtom open={addOpen} close={() => setAddOpen(false)} />
            <EditAtom user={editOPen} close={() => setEditOpen(null)} />
            <InfoAtom user={infoOpen} close={() => setInfoOpen(null)} />

            {data.map((user) => (
                <div key={user.id} className='border p-2 rounded'>
                    <img src={user.avatar} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.age}</p>
                    <p>{user.job}</p>
                    <p>{user.status ? "ACTIVE" : "INACTIVE"}</p>
                    <button onClick={() => deleteUser(user.id)} className='bg-red-500 text-white p-2 rounded'>DELETE</button>
                    <button className='bg-blue-500 text-white p-2 rounded' onClick={() => setEditOpen(user)}>EDIT</button>
                    <button className='bg-green-500 text-white p-2 rounded' onClick={() => setInfoOpen(user)}>VIEW</button>
                </div>
            ))}
        </div>
    );
}

export default Jotai;
