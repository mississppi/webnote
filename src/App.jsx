import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider  } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router >
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
