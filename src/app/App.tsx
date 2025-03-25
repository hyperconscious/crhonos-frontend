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

function App() {
    return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<Navigate to="/" />} />
                  <Route path="/grid" element={<Grid />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </Layout>
          <Toaster />
      </Router>
    );
}

export default App;
