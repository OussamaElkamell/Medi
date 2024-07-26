import React, { useState } from 'react';
import { Menu } from 'antd';
import AppointmentsList from './AppointmentsList';
import RegisteredUsersList from './RegisteredUsersList';
import TestList from './TestList';
import UserList from './UserList';
import DashboardLab from './DashboardLab';
import Navbar from 'scenes/navbar';
import { useSelector } from 'react-redux';


const Laboratoire = () => {
  const user=useSelector((state)=>state.user)
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };

  return (
    <div>

    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '256px', marginTop: '20px' }}>
        
        <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[selectedMenuItem]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="Rendez-vous">Rendez-vous</Menu.Item>
          <Menu.Item key="Patients">Patients</Menu.Item>
          <Menu.Item key="Ajouter un test">Ajouter un test</Menu.Item>
          
        </Menu>
      </div>
      <div style={{ width: '80%' , marginTop: '20px'}}>
        {selectedMenuItem === 'dashboard' && <DashboardLab userId={user._id}/>}
        {selectedMenuItem === 'Rendez-vous' && <AppointmentsList userId={user._id}/>}
        {selectedMenuItem === 'Patients' && <RegisteredUsersList userId={user._id} />}
        {selectedMenuItem === 'Ajouter un test' && <TestList userId={user._id} />}
     
      </div>
    </div>
    </div>
  );
}

export default Laboratoire;
