import React from 'react';
import { Row, Col, Card, Statistic, Divider, Button } from 'antd';

const Admin = () => {
  const handleApprove = () => {
    // Logic to handle approval
  };

  const handleDelete = () => {
    // Logic to handle deletion
  };

  return (
    <Card style={{ borderRadius: '10px', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} hoverable>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>Admin</h1>
        <Row gutter={[16, 16]} justify="space-around" align="middle">
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Nombre des patients" value={50} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Nombre des médecins" value={25} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Nombre des médecin approuvés" value={100} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: '10px' }} hoverable>
              <Statistic title="Nombre des médecins non approuvés" value={1} />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]} justify="space-around" align="middle">
          <Col span={12}>
            <Card style={{ borderRadius: '10px' }} title="Nouvel inscription" hoverable>
              <p><strong>Nom:</strong> John</p>
              <p><strong>Prénom:</strong> Doe</p>
              <p><strong>Numéro de série du médecin:</strong> MD12345</p>
              <Button type="primary" onClick={handleApprove}>Approuver</Button>
              <Button danger onClick={handleDelete}>Supprimer</Button>
            </Card>
          </Col>
          
        </Row>
      </div>
    </Card>
  );
};

export default Admin;
