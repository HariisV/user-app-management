import Button from '@/components/button';
import Form from '@/components/form';
import Input from '@/components/input';
import { useAuthStore } from '@/stores/auth-store';
import { postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LOGO from '@/assets/logo.png';
import { SERVER_URL } from '@/const';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

export default function Example() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [defaultForm, setDefaultForm] = useState({ email: '', password: '' });
  const [resendVerification, setResendVerification] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    FetchAPI(postData('/auth/login', data))
      .then((res: any) => {
        login(res.data);
        return navigate('/');
      })
      .catch((res) => {
        if (res?.data?.errors === 'Please verify your email first') {
          setResendVerification(true);
        }
        setIsLoading(false);
      });
  };

  const onResendVerification = async () => {
    setResendVerification(false);
    FetchAPI(
      postData('/auth/resend-verification', { email: defaultForm.email })
    );
  };

  return (
    <>
      <div className="min-h-[100vh] bg-gray-50 pt-20">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src={LOGO}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <Form
                onSubmit={onSubmit}
                className="space-y-6"
                defaultForm={setDefaultForm}
              >
                <Input
                  title="Email address"
                  name="email"
                  type="email"
                  validation={{
                    required: 'Email cannot be empty',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address',
                    },
                  }}
                />
                <Input type="password" name="password" title="Password" />
                <div className="flex">
                  {resendVerification && (
                    <p
                      onClick={onResendVerification}
                      className=" text-sm text-left !w-full !p-0 block cursor-pointer text-red-600 hover:text-red-500"
                    >
                      Resend verification email
                    </p>
                  )}

                  <Link
                    to="/auth/register"
                    className="text-sm text-right w-full block text-indigo-600 hover:text-indigo-500"
                  >
                    Register
                  </Link>
                </div>
                <Button type="submit" isLoading={isLoading}>
                  Login
                </Button>
              </Form>
              <p className="mt-4 text-center text-sm text-gray-500">
                Or continue with
              </p>
              <div className="mt-4 flex gap-4">
                {' '}
                <Button
                  containerClassName="!w-1/2"
                  className="!bg-[#1877F2]"
                  onClick={() => {
                    window.location.href = `${SERVER_URL}/api/auth/facebook`;
                  }}
                >
                  <IconBrandFacebook />
                </Button>
                <Button
                  containerClassName="!w-1/2"
                  className="!bg-[#EA4335]"
                  onClick={() => {
                    window.location.href = `${SERVER_URL}/api/auth/google`;
                  }}
                >
                  <IconBrandGoogle />
                </Button>
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
