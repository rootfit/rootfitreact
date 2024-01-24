import { Route, Routes } from 'react-router-dom'
import SignUp from './component/SignUp'
import SignIn from './component/SignIn'

const UserMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                </Routes>
        </div>
    )
}

export default UserMain