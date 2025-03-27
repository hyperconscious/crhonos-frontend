import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import NotFound from '../pages/NotFound';
import Grid from '../pages/Grid';
import Dashboard from '../components/dashboard/Dashboard';
import Authentcation from '../pages/Auth/index';
import { UserProvider } from '../context/UserContext';
import ProtectedRoute from '../utils/ProtectedRoute';


function App() {
    return (
        <Router>
            <Layout>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={
                            // <ProtectedRoute>
                            <Navigate to="/dashboard" />
                            // </ProtectedRoute>
                        } />
                        <Route path="/calendar" element={
                            // <ProtectedRoute>
                            <Grid />
                            // </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            // <ProtectedRoute>
                            <Dashboard />
                            // </ProtectedRoute> 
                        } />
                        <Route path="/settings" element={
                            // <ProtectedRoute>
                            <Dashboard />
                            // </ProtectedRoute>
                        } />
                        <Route path="/auth" element={<Authentcation />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </UserProvider>
            </Layout>
            <Toaster />
        </Router>
    );
}

export default App;
