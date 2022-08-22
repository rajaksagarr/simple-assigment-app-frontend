import React from 'react'
import { Card, Form } from 'react-bootstrap';
import { TodoInterface } from '../interfaces/todo.interface';
export interface Props {
    todo: TodoInterface;
}
export default function TodoCardComponent(props: Props) {
    const { name, done , id} = props.todo;
    return (
        <Card className='p-2'>
            <Card.Title>{name}</Card.Title>
            <Card.Body>{name}
                <Form>
                    <Form.Check
                        type={'checkbox'}
                        id={`default-${id}`}
                        label={`Completed`}
                    />
                </Form>
            </Card.Body>
        </Card>
    )
}
