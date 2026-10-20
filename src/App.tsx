import { useAtom } from 'jotai/react';
import React, { useEffect, useState } from 'react';
import { deleteUserAtom, getAtom, pageAtom, searchAtom, selectAtom } from './Store/Jotai';
import AddDialog from './Components/AddDialog';
import EditDialog from './Components/EditDialog';
import View from './Components/View';
import { useData } from './Store/Zustand';
import AddDialogZustand from './Components/AddDialogZustand';
import EditDialogZustand from './Components/EditDialogZustand';
import ViewDialogZustand from './Components/ViewDialogZustand';

const App = () => {
  const [data, setData] = useAtom(getAtom)
  const [, deleteUser] = useAtom(deleteUserAtom)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(null)
  const [viewOpen, setViewOpen] = useState(null)
  const [text, setText] = useState("")
  const [select, setSelect] = useState("")
  const [, setSelectAtom] = useAtom(selectAtom)
  const [, setSearch] = useAtom(searchAtom)
  const [, setPage] = useAtom(pageAtom)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(text)
      setSelectAtom(select)
    }, 500)
    return () => clearTimeout(timer)
  }, [text, select])




  
  // ZUSTAND
  const [addOpenZ, setAddOpenZ] = useState(false)
  const [editOpenZ, setEditOpenZ] = useState(null)
  const [viewOpenZ, setViewOpenZ] = useState(null)
  const [textZ, setTextZ] = useState("")
  const { get, Data, loading, error } = useData()
  const deleteUserZ = useData((state) => state.deleteZ)

  useEffect(() => {
    get();
  }, []);


  return (
    <>
    <div>
      <button onClick={() => setAddOpenZ(true)}>ADD USER</button>
      <input type="text" placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)} />
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        <option value="">ALL</option>
        <option value="true">ACTIVE</option>
        <option value="false">INACTIVE</option>
      </select>
      <AddDialog open={addOpen} onClose={() => setAddOpen(false)}/>
      <EditDialog user={editOpen} onClose={() => setEditOpen(null)}/>
      <View user={viewOpen} onClose={() => setViewOpen(null)}/>

      {data.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt="" />
          <h1>{user.name}</h1>
          <p>{user.job}</p>
          <p>{user.email}</p>
          <p>{user.status ? "ACTIVE" : "INACTIVE"}</p>
          <button onClick={() => deleteUser(user.id)}>DELETE</button>
          <button onClick={() => setEditOpen(user)}>EDIT</button>
          <button onClick={() => setViewOpen(user)}>VIEW</button>
        </div>
      ))}

      <div>
        <button onClick={() => setPage((prev)=> prev - 1)}>PREV</button>
        <button onClick={() => setPage((prev)=> prev + 1)}>NEXT</button>
      </div>
    </div>



    <br /><br /><br /><br /><br />


    <div>
      <AddDialogZustand open={addOpenZ} onClose={() => setAddOpenZ(false)} />
      <EditDialogZustand user={editOpenZ} onClose={() => setEditOpenZ(null)} />
      <ViewDialogZustand user={viewOpenZ} onClose={() => setViewOpenZ(null)}/>
      <button onClick={() => setAddOpenZ(true)}>ADD USER</button>
      <input type="text" placeholder='Search...' />
      {Data.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt="" />
          <h1>{user.name}</h1>
          <p>{user.job}</p>
          <p>{user.email}</p>
          <p>{user.status ? "ACTIVE" : "INACTIVE"}</p>
          <button onClick={() => deleteUserZ(user.id)}>DELETE</button>
          <button onClick={() => setEditOpenZ(user)}>EDIT</button>
          <button onClick={() => setViewOpenZ(user)}>VIEW</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
