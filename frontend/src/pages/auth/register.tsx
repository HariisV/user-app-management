import Button from '@/components/button';
import Form from '@/components/form';
import Input from '@/components/input';
import { postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LOGO from '@/assets/logo.png';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { SERVER_URL } from '@/const';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    FetchAPI(postData('/auth/register', data))
      .then(() => {
        navigate('/auth/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [defaultForm, setDefaultForm] = useState<any>({});

  return (
    <>
      <div className="min-h-[100vh] bg-gray-50 pt-20">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src={LOGO} alt="Logo " />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
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
                  title="Full Name"
                  name="name"
                  type="text"
                  validation={{
                    required: 'Full Name cannot be empty',
                  }}
                />
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

                <Input
                  type="password"
                  name="confirmPassword"
                  title="Confirm Password"
                  validation={{
                    validate: (value: any) => {
                      return (
                        value === defaultForm.password ||
                        'The passwords do not match'
                      );
                    },
                  }}
                />

                <Button type="submit" isLoading={isLoading}>
                  Register
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

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
