import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { createEmployee } from '../../common/apiCalls/employee'
import ButtonLoader from '../../common/buttonLoader.component'
import InputComponent from '../../common/form-fields/Input.component'
import TextAreaComponent from '../../common/form-fields/textfileld.component'
import { Helper } from '../../common/helper'
import { UserInterface } from '../interfaces/user.interface'

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username field is required!'),
  email: Yup.string().required('Email field is required!').email(),
  name: Yup.string().required('Name field is required!'),
  phone: Yup.string().required('Phone number field is required!')
});

const CreateUser: React.FC = () => {

const { isLoading, mutate } = useMutation<unknown, { message: string }, Omit<UserInterface, 'id'>>(createEmployee, {
    onSuccess: () => {
      toast.success("User added successfully");
    },
    onError: (error) => {
      toast.error(Helper.getErrorMessage( error.message , "unbale to add user !"));
    }
  });

  const { handleSubmit, control } = useForm<Omit<UserInterface, 'id'>>({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmit = (fields: Omit<UserInterface, 'id'>) => {
    mutate(fields);
  };

  return (
    <Card>
      <Card.Header>Add user</Card.Header>
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputComponent
            control={control}
            formKey='username'
            type='text'
            placeholder='Enter Username'
            label='Username'
            required={true}
          />
          <InputComponent
            control={control}
            formKey='email'
            type='email'
            placeholder='Enter email'
            label='Email'
            required={true}
          />
          <InputComponent
            control={control}
            formKey='name'
            type='text'
            placeholder='Name'
            label='Enter name'
            required={true}
          />
          <InputComponent
            control={control}
            formKey='phone'
            type='text'
            placeholder='Phone number'
            label='Enter phone number'
            required={true}
          />
          <InputComponent
            control={control}
            formKey='website'
            type='text'
            placeholder='Website url'
            label='Enter website url'
            required={false}
          />
          <TextAreaComponent
            control={control}
            formKey='street'
            placeholder='Street address'
            label='Enter street address'
            required={false}
          />
          <TextAreaComponent
            control={control}
            formKey='suite'
            placeholder='Suite'
            label='Enter suite'
            required={false}
          />
          <InputComponent
            control={control}
            formKey='city'
            type='text'
            placeholder='city'
            label='Enter city'
            required={false}
          />
          <InputComponent
            control={control}
            formKey='zipcode'
            type='text'
            placeholder='zipcode'
            label='Enter zipcode'
            required={false}
          />
          <Button type="submit" variant="primary">
            Submit
            {
              isLoading && <ButtonLoader />
            }
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
};
export default CreateUser;
