import { useAuthStore } from '@/stores/auth-store';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function RedirectLogin() {
  const { token } = useParams();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      login({
        token: token,
      });

      toast.success('Successfully logged in');

      navigate('/');
    }
  }, []);

  return null;
}
