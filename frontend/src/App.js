import Login from './components/Auth/Login'
import Register from './components/Auth/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';


function App() {
  return (
    <div>
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    </div>

    
  );
}

export default App;
