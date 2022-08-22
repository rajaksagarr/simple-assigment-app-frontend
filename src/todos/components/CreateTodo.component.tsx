import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createTodo } from '../../common/apiCalls/todos';
import ButtonLoader from '../../common/buttonLoader.component';
import InputComponent from '../../common/form-fields/Input.component';
import { Helper } from '../../common/helper';
import { TodoInterface } from '../interfaces/todo.interface';

const CreateTodoSchema = Yup.object().shape({
    name: Yup.string().required('Name field is required!'),
});

const CreateTodoComponent: React.FC = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, mutate } = useMutation<unknown, { message: string }, Omit<TodoInterface, 'id' | 'done'>>(createTodo, {
      onSuccess: () => {
        toast.success("Todo added successfully");
        handleClose();
      },
      onError: (error) => {
        toast.error(Helper.getErrorMessage(error.message, "Unbale to add todo !"));
      }
    });
  
    const { handleSubmit, control } = useForm<Omit<TodoInterface, 'id' | 'done'>>({
      resolver: yupResolver(CreateTodoSchema)
    });
  
    const onSubmit = (fields: Omit<TodoInterface, 'id' | 'done'>) => {
      if (id) {
        mutate({...fields, ...{ userId: +id }});
      }
    };
  
    const handleClose = () => {
      navigate(-1);
      setShow(false);
    }
  
    return <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputComponent
            control={control}
            formKey='name'
            type='text'
            placeholder='Enter name'
            label='Name'
            required={true}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onSubmit)} variant="primary" disabled={isLoading}>
          Submit
          {
            isLoading && <ButtonLoader />
          }
        </Button>
      </Modal.Footer>
    </Modal>
}

export default CreateTodoComponent;