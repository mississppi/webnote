import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";

function App() {
  const isLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('isAuth');
    return isLoggedIn === 'true';
  }

  return (
    <Router >
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
