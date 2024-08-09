import TableWrapper from '@/components/table';
import useGetList from '@/hooks/use-get-list';
import { getData } from '@/utils/axios';
import {
  IconActivity,
  IconChartArrowsVertical,
  IconUserPlus,
} from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Space, Statistic } from 'tdesign-react';

export default function UserIndex() {
  const dataUser = useGetList({
    url: 'user/get',
    initialParams: {
      skip: 0,
      take: 10,
    },
  });

  const [data, setData] = useState({
    newUserRegistered: 0,
    activeUser: 0,
    averageActiveUser7Days: 0,
  });

  const getDataDashboard = async () => {
    const result = await getData('user/dashboard');
    setData(result);
  };

  useEffect(() => {
    getDataDashboard();
  }, []);

  const columns = [
    {
      colKey: 'applicant',
      title: '#',
      align: 'center',

      width: 60,
      cell: (row: any) => {
        return <span>{row.rowIndex + 1 * dataUser.params.skip + 1}</span>;
      },
    },
    {
      title: 'Name',
      colKey: 'name',
    },
    {
      title: 'Email',
      colKey: 'email',
    },
    {
      title: 'Count Login',
      colKey: 'countLogin',
      sorter: true,
      align: 'center',
      cell: ({ row }: any) => {
        return (
          <>
            <span>{row.countLogin}</span> <br />
            {row.lastActiveAt && (
              <small>
                last: {moment(row.lastActiveAt).format('DD/MM/YYYY')}
              </small>
            )}
          </>
        );
      },
    },
    {
      title: 'Last Logout',
      colKey: 'lastLogoutAt',
      align: 'center',
      width: 200,
      sorter: true,
      cell: ({ row }: any) => {
        return (
          <span>
            {row.lastLogoutAt
              ? moment(row.lastLogoutAt).format('DD/MM/YYYY hh:mm')
              : '-'}
          </span>
        );
      },
    },
    {
      title: 'Signup At',
      colKey: 'createdAt',
      align: 'center',
      width: 200,
      sorter: true,
      cell: ({ row }: any) => {
        return (
          <span>
            {row.createdAt
              ? moment(row.createdAt).format('DD/MM/YYYY hh:mm')
              : '-'}
          </span>
        );
      },
    },
  ];

  return (
    <section className="mt-4">
      <div className="bg-white p-8 rounded-2xl min-w-[400px]">
        <div className="flex flex-col gap-y-5 md:flex-row md:items-center justify-start md:justify-between header-section w-full">
          <div className="title  border-[#ddd] w-full flex justify-between">
            <h1 className="text-2xl text-indigo-950 font-bold mb-5 ">
              Manage User
            </h1>
          </div>
        </div>
        <Space size={10} breakLine className="mt-4 mb-10">
          <div className="border border-green-500 w-80 p-5 rounded-xl flex items-center gap-4">
            <IconUserPlus className="text-green-500" />
            <Statistic
              title="New User Register"
              value={data?.newUserRegistered}
            />{' '}
          </div>
          <div className="border border-indigo-500 w-80 p-5 rounded-xl flex items-center gap-4">
            <IconActivity className="text-indigo-500" />
            <Statistic title="Active User Today" value={data?.activeUser} />
          </div>
          <div className="border border-primary w-80 p-5 rounded-xl flex items-center gap-4">
            <Statistic
              title="Average Active user"
              value={data?.averageActiveUser7Days}
            />
            <IconChartArrowsVertical className="text-primary" />
          </div>
        </Space>
        <TableWrapper data={dataUser} columns={columns} />
      </div>
    </section>
  );
}
