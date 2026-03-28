import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { ProtectedRoute } from "./ProtectedRoute"



function App() {

  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} ></Route>


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>

        } ></Route>

      </Routes>

    </>
  )
}

export default App
