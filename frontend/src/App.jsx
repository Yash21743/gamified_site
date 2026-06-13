import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './components/common/PublicLayout';
import DashboardLayout from './components/common/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StudentDashboard from './pages/StudentDashboard';
import SubjectsPage from './pages/SubjectsPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizPlay from './pages/QuizPlay';
import QuizResult from './pages/QuizResult';
import GamesPage from './pages/GamesPage';
import MathChallengePage from './pages/MathChallengePage';
import MemoryMatchPage from './pages/MemoryMatchPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quiz/:subject" element={<QuizzesPage />} />
      </Route>

      {/* Auth Pages — no navbar/footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Student/Teacher Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/quizzes/:id/play" element={<QuizPlay />} />
        <Route path="/quizzes/:id/result" element={<QuizResult />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/math-challenge/play" element={<MathChallengePage />} />
        <Route path="/games/memory-match/play" element={<MemoryMatchPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/teacher" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
