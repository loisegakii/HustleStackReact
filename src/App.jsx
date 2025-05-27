import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from './pages/LandingPage'; // the LandingPage
import Login from './pages/LoginPage';
import Signup from "./pages/SignupPage";
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Analytics from "./pages/Analytics"; // Analytics page

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
