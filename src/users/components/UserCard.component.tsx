import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { UserInterface } from '../interfaces/user.interface';
export interface Props {
  user: UserInterface
}

const UserCardComponent: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const { name, email, username, id } = props.user;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/avater.png" onClick={() => navigate(`${id}/posts`)} style={{ cursor: 'pointer' }} />
      <Card.Body>
        <div className='w-100 d-flex flex-row-reverse'>
          <Button variant='primary' onClick={() => navigate(`update`, { state: props.user })} >
            <i className="fas fa-edit"></i>
          </Button>
        </div>
        <Card.Title>{username}</Card.Title>
        <Card.Subtitle>{name}</Card.Subtitle>
        <Card.Text>
          {email}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserCardComponent;