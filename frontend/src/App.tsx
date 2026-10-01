import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react';
import SingUp from './components/pages/SingUp';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import { SESSION_KEY, USER_KEY } from './utils/utils';
import type { UserData } from './types/types';
import './App.css'
import SnailPay from './components/pages/SnailPay';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY) || 'null') || null);
  const [session, setSessionState] = useState(JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') || null);

  function getUser() {
    return user;
  }

  function setSession(session: UserData) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setSessionState(session);
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    setSessionState(null);
  }
  function setUserData(user: UserData) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setUser(user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/singup"
          element={
            <SingUp
              setSession={setSession}
              setUserData={setUserData}
            />
          }
        />
        <Route path="/" element={
          <Login
            getUser={getUser}
            setSession={setSession}
          />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard
              session={session}
              user={user}
              clearSession={clearSession}
            />
          </ProtectedRoute>} />
        <Route path="/pay" element={<SnailPay />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
