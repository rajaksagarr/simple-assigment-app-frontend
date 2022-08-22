import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createPost } from '../../common/apiCalls/posts';
import { PostInterface } from '../interfaces/posts.interface';
import * as Yup from 'yup';
import ButtonLoader from '../../common/buttonLoader.component';
import InputComponent from '../../common/form-fields/Input.component';
import TextAreaComponent from '../../common/form-fields/textfileld.component';
import { useNavigate, useParams } from 'react-router';
import { Helper } from '../../common/helper';

export interface Props { }

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Title field is required!'),
  body: Yup.string().required('Body field is required!'),
});

const CreatePostModel: React.FC<Props> = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, mutate } = useMutation<unknown, { message: string }, Omit<PostInterface, 'id'>>(createPost, {
    onSuccess: () => {
      toast.success("User added successfully");
      handleClose();
    },
    onError: (error) => {
      toast.error(Helper.getErrorMessage(error.message, "unbale to add user !"));
    }
  });

  const { handleSubmit, control } = useForm<Omit<PostInterface, 'id'>>({
    resolver: yupResolver(CreatePostSchema)
  });

  const onSubmit = (fields: Omit<PostInterface, 'id'>) => {
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
      <Modal.Title>Add post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <InputComponent
          control={control}
          formKey='title'
          type='text'
          placeholder='Enter title'
          label='Title'
          required={true}
        />
        <TextAreaComponent
          control={control}
          formKey='body'
          placeholder='Enter details'
          label='Enter details'
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
};

export default CreatePostModel;