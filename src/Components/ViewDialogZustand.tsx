import React from 'react';

const ViewDialogZustand = ({ user, onClose }) => {
    return (
        <dialog open={user} key={user?.id}>
            <h1>VIEW ZUSTAND</h1>
            <img src={user?.avatar} alt="" />
            <h1>{user?.name}</h1>
            <p>{user?.job}</p>
            <p>{user?.email}</p>
            <p>{user?.status ? "ACTIVE" : "INACTIVE"}</p>
            <button onClick={onClose}>CLOSE</button>
        </dialog>
    );
}

export default ViewDialogZustand;
