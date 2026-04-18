import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/index.jsx";
import Roles from "./pages/Roles/index.jsx";
import Permissions from "./pages/Permissions/index.jsx";
import PermissionEditor from "./pages/PermissionEditor/index.jsx";
import Users from "./pages/Users/index.jsx";
import Projects from "./pages/Projects/index.jsx";
import Team from "./pages/Team/index.jsx";
import TeamMemberProfile from "./pages/TeamMemberProfile/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import Settings from "./pages/Settings/index.jsx";
import Login from "./pages/Login/index.jsx";
import SignUp from "./pages/SignUp/index.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-view">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
          <Route path="team/:memberSlug" element={<TeamMemberProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="roles" element={<Roles />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="permissions/new" element={<PermissionEditor />} />
          <Route path="permissions/manage" element={<PermissionEditor />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
