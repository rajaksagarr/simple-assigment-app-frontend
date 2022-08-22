import { Controller } from "react-hook-form";
import React from 'react'
import { Form } from "react-bootstrap";

export interface Props {
    control: any,
    formKey: string;
    placeholder: string;
    label: string;
    required: boolean;
}

const TextAreaComponent: React.FC<Props> = (props: Props) => {
    const { label, placeholder, required, formKey, control } = props;
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
            <Form.Control as={"textarea"} placeholder={placeholder} {...field} isInvalid={isTouched && !!error} />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
        )}
    />
}
export default TextAreaComponent;
