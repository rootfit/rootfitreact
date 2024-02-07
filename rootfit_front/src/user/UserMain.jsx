import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import KakaoLogin from './components/KakaoLogin'



const UserMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signin' element={<KakaoLogin />} />
            </Routes>
        </div>
    )
}

export default UserMain