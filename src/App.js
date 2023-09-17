
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Forgot from './components/Forgot';
import Students from './components/Students';
import Dashboard from './components/Dashboard';
import Tuteur from './components/Tuteur';
import Salle from './components/Salle';
import Teams from './components/Teams';
import Dash from './components/Dash';


function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/login"  element={<Login />}></Route>
        <Route path="/register"  element={<Register />}></Route>
        <Route path="/reset/:id"  element={<ResetPassword />}></Route>
        <Route path="/forgot"  element={<Forgot />}></Route>
        <Route path="/students"  element={<Students />}></Route>
        <Route path="/dashboard"  element={<Dashboard />}></Route>
        <Route path="/tuteur"  element={<Tuteur />}></Route>
        <Route path="/salle"  element={<Salle />}></Route>
        <Route path="/team"  element={<Teams />}></Route>
        <Route path="/dash"  element={<Dash />}></Route>

      </Routes>
    </div>
  );
}

export default App;
