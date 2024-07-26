import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const PrescriptionForm = () => {
  const [form] = Form.useForm();
  const [prescriptionList, setPrescriptionList] = useState([{ key: 0 }]);

  const onFinish = (values) => {
    console.log('Prescription:', values);
  };

  const handleAddMedication = () => {
    const newPrescriptionList = [...prescriptionList, { key: prescriptionList.length }];
    setPrescriptionList(newPrescriptionList);
  };

  const handleRemoveMedication = (key) => {
    const newPrescriptionList = prescriptionList.filter(item => item.key !== key);
    setPrescriptionList(newPrescriptionList);
  };

  return (
    <Form form={form} name="prescription_form" onFinish={onFinish}>
      {prescriptionList.map(({ key }) => (
        <div key={key}>
          <Form.Item
            label={`Medication ${key + 1}`}
            name={`medication_${key}`}
            rules={[{ required: true, message: 'Please input medication name!' }]}
          >
            <Input placeholder="Medication Name" />
          </Form.Item>
          <Form.Item
            label={`Usage ${key + 1}`}
            name={`usage_${key}`}
            rules={[{ required: true, message: 'Please input medication usage!' }]}
          >
            <Input.TextArea rows={2} placeholder="Medication Usage" />
          </Form.Item>
          {prescriptionList.length > 1 && (
            <Button type="link" onClick={() => handleRemoveMedication(key)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={handleAddMedication} style={{ width: '100%' }}>
          Add Medication
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrescriptionForm;
