import React from 'react';

const InfoAtom = ({ user, close }) => {
    return (
        <dialog open={user} key={user?.id}>
            <img src={user?.avatar} alt={user?.name} />
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <p>{user?.age}</p>
            <p>{user?.job}</p>
            <p>{user?.status ? "ACTIVE" : "INACTIVE"}</p>
            <button onClick={close}>CLOSE</button>
        </dialog>
    );
}

export default InfoAtom;
