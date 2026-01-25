import POSApp from './components/POSApp'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <POSApp />


      <Routes>
        {/* <Route path="/product" element={<Product />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/pos" element={<Pos />} /> */}
      </Routes>

    </div>
  )
}

export default App