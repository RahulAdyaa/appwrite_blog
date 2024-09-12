import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { authLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/SignUp'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <authLayout authentication={false}>
                    <Login />
                </authLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <authLayout authentication={false}>
                    <Signup />
                </authLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <authLayout authentication>
                    {" "}
                    <AllPosts />
                </authLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <authLayout authentication>
                    {" "}
                    <AddPost />
                </authLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <authLayout authentication>
                    {" "}
                    <EditPost />
                </authLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)