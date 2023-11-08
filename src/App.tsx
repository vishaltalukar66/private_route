import { HomePage } from './components/HomePage'
import { Login } from './components/LoginOrSignUp'
import { PrivateRoute } from './components/PrivateRoute'
import { Route, Routes } from 'react-router'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={PrivateRoute()} >
          <Route path='' element={HomePage()} />
        </Route>
        <Route path='/signup' element={Login(false)} />

      </Routes>

    </>
  )
}

export default App
