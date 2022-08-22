import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { PostInterface } from '../interfaces/posts.interface'
import CommentsComponent from './Comments.component';
export interface Props {
    post: PostInterface;
}

export default function PostCardComponent(props: Props) {
    const { title, body, userId, id} = props.post;
    const [showchat, setShowChat] = useState(false);
    return (
        <>
            <Card className='p-2'>
                <Card.Title>{title}</Card.Title>
                <Card.Body>{body}
                <div className='w-100 d-flex flex-row-reverse'>
                    <Button variant="primary" onClick={() => setShowChat(!showchat)}>
                        { !showchat ? <i className='fa fa-comment' ></i> : <i className="fa fa-comment-slash"></i> }
                    </Button>
                </div>
                <CommentsComponent open={showchat} userId={userId} postId={id}/>
                </Card.Body>
            </Card>
        </>
    )
}
