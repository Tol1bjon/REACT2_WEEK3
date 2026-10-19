
const InfoZustand = ({ user, close }) => {
    return (
        <dialog open={user}>
            <div key={user?.id}>
                <img src={user?.avatar} alt={user?.name} />
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Job: {user?.job}</p>
                <p>Age: {user?.age}</p>
                <p>Status: {user?.status ? "ACTIVE" : "INACTIVE"}</p>
                <button className='bg-red-500 p-2 rounded' onClick={() => close()}>CLOSE</button>
            </div>
        </dialog>
    );
}

export default InfoZustand;
