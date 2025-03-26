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

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/calendar" element={<Grid />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="settings" />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
            <Toaster />
        </Router>
    );
}

export default App;
