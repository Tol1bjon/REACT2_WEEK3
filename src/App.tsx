import React from 'react';
import { axiosRequest, saveToken } from './Utils/Tokens';

const App = () => {
  async function login(info: { email: string; password: string }) {
    try {
      const { data } = await axiosRequest.post('/auth/login', info)
      console.log(data)
      saveToken(data.token, data.refresh)
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget
    const info = {
      email: target.email.value,
      password: target.password.value
    }
    login(info)
    target.reset()
  }

  return (
    <div>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input type="text" placeholder='Email' name='email' />
        <input type="password" placeholder='password' name='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default App