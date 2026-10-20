import React from 'react';

const View = ({ user, onClose }) => {
    return (
        <dialog key={user?.id} open={user}>
            <img src={user?.avatar} alt="" />
            <h1>{user?.name}</h1>
            <p>{user?.job}</p>
            <p>{user?.email}</p>
            <p>{user?.status ? "ACTIVE" : "INACTIVE"}</p>
            <button onClick={onClose}>Close</button>
        </dialog>
    );
}

export default View;
