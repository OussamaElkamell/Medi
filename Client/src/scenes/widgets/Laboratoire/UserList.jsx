import React from 'react';
import { Table } from 'antd';

const UserList = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
  ];

  const data = [
    {
      key: '1',
      id: '001',
      fullName: 'John Doe',
    },
    // Add more data as needed
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default UserList;
