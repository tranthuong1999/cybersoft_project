import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
// import { Wrapper } from './styles';

const menuUser = [
  {
    title: 'books',
    path: '/dashboad/books',
  },
  {
    title: 'favorites',
    path: '/dashboad/favorites',
  },
];

const Dashboard = () => {
  const location = useLocation();
  const pathname = `/${location.pathname.split('/')[1]}`;

  return (
    <div>
      <Tabs value={pathname !== '/dashboad' ? pathname : false}>
        {menuUser.map((item) => (
          <Tab
            key={`${item.path}+_menu`}
            value={item.path}
            label={item.title}
            component={Link}
            to={item.path}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;
