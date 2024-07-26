import React, { useState } from 'react';
import { Table, Button, Modal, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const TestList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.token);

  const columns = [

    {
      title: 'Test',
      dataIndex: 'testName',
      key: 'testName',
      render: () => (
        <Button type="link" onClick={() => setIsModalVisible(true)}>Ajouter un test</Button>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: () => (
        <Button type="link" onClick={() => setIsPatientModalVisible(true)}>Ajouter un(e) patient(e)</Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <>
          <Button type="link">Edit</Button>
          <Button type="primary" onClick={handleUpload} style={{ marginLeft: '8px' }}>Envoyer</Button>
        </>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      dateCreated: '2024-05-10',
      testName: 'Blood Test',
      price: '$50',
    },
    // Add more data as needed
  ];

  const handleSendButtonClick = () => {
    console.log("Données envoyées !");
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${apiUrl}/upload-analysis`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('File uploaded successfully:', responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsModalVisible(false);
  };

  const handlePatientAddition = () => {
    // Logic to handle patient addition
    console.log('Patient added:', patientName);
    setIsPatientModalVisible(false);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: '10px' }}>Add New Test</Button>

      <Table columns={columns} dataSource={data} />

      <Modal
        title="Ajouter un test"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>

      <Modal
        title="Ajouter un(e) patient(e)"
        visible={isPatientModalVisible}
        onOk={handlePatientAddition}
        onCancel={() => setIsPatientModalVisible(false)}
      >
        <Input
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default TestList;
