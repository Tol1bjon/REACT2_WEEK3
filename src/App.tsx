import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout/Layout';
import Zustand from './Components/Zustand';
import Redux from './Components/Redux';
import Jotai from './Components/Jotai';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Zustand/>
        },
        {
          path: "/redux",
          element: <Redux/>
        },
        {
          path: "/jotai",
          element: <Jotai/>
        }
      ]  
    }
  ])

  return <RouterProvider router={router}/>
}

export default App;
