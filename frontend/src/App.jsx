import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader'



// This code will allow only selected routes or pages that are in current to be rendered (it wil basically prventing all pages to load on initial render)
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/User/Login"))
const Register = lazy(() => import("./pages/User/Register"))
const CreatePost = lazy(() => import("./pages/Post/CreatePost"))
const PostDetails = lazy(() => import("./pages/Post/PostDetails"))
const EditPost = lazy(() => import("./pages/Post/EditPost"))
const MyBlogs = lazy(() => import("./pages/User/MyBlogs"))
const Profile = lazy(() => import("./pages/User/Profile"))


const App = () => {
  return (
    <>
     <Suspense fallback={<Loader />}>
      <Routes>
          <Route path='/' index element={<Home />}/>
          <Route path='/login' index element={<Login />}/>
          <Route path='/register' index element={<Register />}/>
          <Route path='/create' index element={<CreatePost />}/>
          <Route path='/post/post/:id' index element={<PostDetails />}/>
          <Route path='/edit/:id' index element={<EditPost />}/>
          <Route path='/edit/:id' index element={<EditPost />}/>
          <Route path='/myblogs/:id' index element={<MyBlogs />}/>
          <Route path='/profile/:id' index element={<Profile />}/>
      </Routes>
    </Suspense>        
    </>
  )
}

export default App
