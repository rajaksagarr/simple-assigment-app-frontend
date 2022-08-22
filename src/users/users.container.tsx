import React from 'react'
import { Outlet } from 'react-router'

const UsersContainers: React.FC = () => {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
};
export default UsersContainers;
