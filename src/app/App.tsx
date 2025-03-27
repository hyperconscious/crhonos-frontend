import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import NotFound from '../pages/NotFound';
import Grid from '../pages/Grid';
import Dashboard from '../components/dashboard/Dashboard';
import Authentcation from '../pages/Auth/index';
import { UserProvider } from '../context/UserContext';
import ProtectedRoute from '../utils/ProtectedRoute';
import EmailVerificationPage from '../pages/Auth/EmailVerification';
import PasswordResetPage from '../pages/Auth/NewPassword';

function App() {
    return (
        <UserProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={
                            // <ProtectedRoute skipAuthRoutes={true}>
                            <Dashboard />
                            // </ProtectedRoute>
                        } />
                        <Route path="/calendar" element={
                            // <ProtectedRoute>
                            <Grid />
                            //   </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            //  <ProtectedRoute>
                            <Dashboard />
                            //   </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                            //  <ProtectedRoute>
                            <Dashboard />
                            // </ProtectedRoute>
                        } />
                        <Route path="/auth" element={<Authentcation />} />
                        <Route path="/auth/verify-email" element={<EmailVerificationPage />} />
                        <Route path="/auth/reset-password" element={<PasswordResetPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                </Layout>
            </Router>
        </UserProvider>
    );
}

export default App;
