import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

const AppointmentsList = () => {
  
  const {RendezVousId} = useSelector((state) => state.laboratoires.RendezVous
);
  console.log("RendezVousId",RendezVousId)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Patient Full Name',
      dataIndex: 'patientFullName',
      key: 'patientFullName',
    },
    {
      title: 'Test Name',
      dataIndex: 'testName',
      key: 'testName',
    },
  ];

  const data = [
    {
      key: '1',
      id: '001',
      dateCreated: '2024-05-10',
      code: 'ABCD123',
      patientFullName: 'John Doe',
      testName: 'Blood Test',
    },
    // Add more data as needed
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default AppointmentsList;
