import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ADMIN_PATH } from './config/admin';

const About = lazy(() => import('./pages/About'));
const AdminUnavailable = lazy(() => import('./pages/AdminUnavailable'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const Journal = lazy(() => import('./pages/Journal'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function RouteLoader() {
  return (
    <div className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-sm uppercase tracking-[0.3em] text-brand-muted">
          Loading
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path={ADMIN_PATH} element={<AdminUnavailable />} />
            {ADMIN_PATH !== '/admin' ? (
              <Route path="/admin/*" element={<Navigate to="/" replace />} />
            ) : null}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
