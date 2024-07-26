import React from 'react';
import { Button, Table } from 'antd';

const RegisteredUsersList = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date Registered',
      dataIndex: 'dateRegistered',
      key: 'dateRegistered',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <>
          
          <Button type="primary" style={{ marginLeft: '8px' }}>Supprimer</Button>
          
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '001',
      dateRegistered: '2024-05-10',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '123-456-7890',
      
    },
    // Add more data as needed
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default RegisteredUsersList;
