import NotFound from '@/pages/not-found';

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useEffect } from 'react';
import Login from '@/pages/auth/login';
import { useAuthStore } from '@/stores/auth-store';
import { adminRoutes } from '@/const';
import Register from '@/pages/auth/register';
import RedirectLogin from '@/pages/auth/redirect-login';
import UserLayout from '@/layouts/user-layout';
import { postData } from '@/utils/axios';

interface LayoutProps {
  children: React.ReactNode;
  role?: string; // Adding role as an optional prop to LayoutProps
}

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await postData('/auth/logout');
      logout();
      navigate('/auth/login', { replace: true });
    };
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
};

const RouteLayouts: React.FC<LayoutProps> = ({ children, role }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  if (role === 'UNAUTH') {
    useEffect(() => {
      if (token) {
        navigate('/', { replace: true });
      }
    }, [location.pathname]);

    return <div>{children}</div>;
  } else {
    useEffect(() => {
      if (!token) {
        localStorage.clear();
        navigate('/auth/login', { replace: true });
      }
    }, [location.pathname]);

    return <UserLayout>{children}</UserLayout>;
  }
};

export default function RoutesList() {
  const { getMyProfile } = useAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    getMyProfile();
  }, [pathname]);
  return (
    <Routes>
      <Route
        element={
          <RouteLayouts role="ADMIN">
            <Outlet />
          </RouteLayouts>
        }
      >
        {adminRoutes}
      </Route>
      <Route
        element={
          <RouteLayouts role="UNAUTH">
            <Outlet />
          </RouteLayouts>
        }
      >
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/redirect/:token" element={<RedirectLogin />} />
      </Route>
      <Route path="/auth/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
