import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SigninPage from '../pages/SignInPage';
import SignupPage from '../pages/SignUpPage';
import UserManagementPage from '../pages/UserManagementPage';
import ProtectedRoute from '../routes/ProtectedRoute';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
