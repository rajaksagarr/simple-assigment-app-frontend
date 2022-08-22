import React from 'react'
import { Card } from 'react-bootstrap';

const AddUserCardComponent: React.FC = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/add.png" />
    </Card>
  )
};

export default AddUserCardComponent;
