import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Users from './pages/Users';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
