import React from 'react'
import { Form } from 'react-bootstrap';
import { Controller } from "react-hook-form";
export interface Props {
    control: any;
    formKey: string;
    type: string;
    placeholder: string;
    label: string;
    required: boolean;
}

const InputComponent: React.FC<Props> = (props: Props) => {
    const { type, label, placeholder, formKey, control } = props;
    return <Controller
    control={control}
    name={formKey}
    render={({
      field,
      fieldState: { invalid, isTouched, isDirty, error },
      formState,
    }) => (
        <Form.Group className="mb-3" controlId={`id$${formKey}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} {...field} isInvalid={isTouched && !!error} />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    )}
  />
};

export default InputComponent;
