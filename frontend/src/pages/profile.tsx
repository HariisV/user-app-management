import Form from '@/components/form';
import Input from '@/components/input';
import { useAuthStore } from '@/stores/auth-store';
import { postData } from '@/utils/axios';
import FetchAPI from '@/utils/fetch-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs } from 'tdesign-react';

export default function ProfilePage() {
  const account = useAuthStore((state) => state.user);
  const { login } = useAuthStore();
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    FetchAPI(postData('/user/change-profile', data)).then(({ data }: any) => {
      login(data);
      navigate('/');
    });
  };

  const onSubmitPassword = async (data: any) => {
    FetchAPI(
      postData('/user/change-password', {
        password: data.password,
        oldPassword: data.oldPassword,
      })
    ).then(() => {
      navigate('/');
    });
  };

  const { TabPanel } = Tabs;

  return (
    <div className="bg-white p-10 rounded-xl shadow-2xl mt-4">
      <Tabs
        addable={false}
        defaultValue="1"
        dragSort={false}
        placement="top"
        size="medium"
        theme="normal"
      >
        <TabPanel destroyOnHide label="Profile" removable={false} value="1">
          <Form onSubmit={onSubmit} defaultValues={account}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Input
                      name="name"
                      title="Full Name"
                      type="text"
                      validation={{
                        required: 'Full Name harus diisi',
                      }}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      name="email"
                      readOnly
                      disabled
                      className="cursor-not-allowed bg-gray-200"
                      title="Email"
                      type="email"
                      validation={{
                        required: 'Email harus diisi',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                theme="primary"
                size="large"
                onClick={() => {}}
                type="submit"
              >
                Simpan
              </Button>
            </div>
          </Form>
        </TabPanel>
        <TabPanel destroyOnHide label="Security" removable={false} value="2">
          <Form onSubmit={onSubmitPassword}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-5 ">
                  <div className="flex gap-x-6 gap-y-8">
                    <Input
                      type="password"
                      name="password"
                      title="New Password"
                      containerClass="w-1/2"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <Input
                      type="password"
                      name="confirm_password"
                      title="Confirm Password"
                      containerClass="w-1/2"
                      validation={{
                        validate: (value: string) => {
                          return value != password
                            ? 'Please enter the same password'
                            : null;
                        },
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      type="password"
                      name="oldPassword"
                      title="Old Password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                theme="primary"
                size="large"
                onClick={() => {}}
                type="submit"
              >
                Simpan
              </Button>
            </div>
          </Form>
        </TabPanel>
      </Tabs>
    </div>
  );
}
