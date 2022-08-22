import React from 'react'
import { Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

export default function TodosContainers() {
  const navigate = useNavigate();

  return (
    <div className='pt-4'>
      <Button
        onClick={() => navigate(`../posts`)}
        variant="outline-primary"
        className='ml-5'
      >Posts</Button>
      <Button variant="outline-primary" className='ml-5'>Todos</Button>
      <Button variant="outline-primary" className='ml-5' onClick={() => navigate(`create`)}>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Button>
      <Outlet />
    </div>
  );
}
