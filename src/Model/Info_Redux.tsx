import React from 'react';

const InfoRedux = ({ user, close }) => {
    return (
        <dialog open={user} key={user?.id}>
            <img src={user?.avatar} alt="" />
            <h1>name:{user?.name}</h1>
            <h1>email:{user?.email}</h1>
            <h1>job:{user?.job}</h1>
            <h1>age:{user?.age}</h1>
            <button onClick={close} type='button'>CLOSE</button>
        </dialog>
    );
}

export default InfoRedux;
