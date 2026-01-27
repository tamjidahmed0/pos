import ProtectedRoute from './auth/protectedRoute'
import POSApp from './components/POSApp'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { PublicRoute } from './auth/publicRoute'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>


        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<POSApp />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App