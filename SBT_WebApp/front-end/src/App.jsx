import { useState } from 'react'
import './App.css'
import MangeProject from './Pages/manage-project'
import Navbar from './components/navbar'
import AppRoute from './routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AppRoute />
    </div>
  )
}

export default App