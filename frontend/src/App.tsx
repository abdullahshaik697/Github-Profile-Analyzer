import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"



function App() {

  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} ></Route>
        <Route path="/dashboard" element={<Dashboard />} ></Route>
      </Routes>

    </>
  )
}

export default App
