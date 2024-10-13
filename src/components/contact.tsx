import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

interface IFormInputs {
  fullName: string;
  email: string;
  subject: string;
  body: string;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters"),
  body: yup
    .string()
    .required("Body is required")
    .min(3, "Body must be at least 3 characters")
    .max(1000, "Body cannot exceed 1000 characters"),
});

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SuccessMessage>
        <h2>Thank you for contacting us!</h2>
        <p>
          Your message has been successfully sent. We will get back to you soon.
        </p>
      </SuccessMessage>
    );
  }

  return (
    <div className="App">
      <FormStyle onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Contact Form</h1>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" {...register("fullName")} />
          <p>{errors.fullName?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" {...register("subject")} />
          <p>{errors.subject?.message}</p>
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" {...register("body")}></textarea>
          <p>{errors.body?.message}</p>
        </div>
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormStyle>
    </div>
  );
}

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  margin: 0 auto;

  label {
    font-weight: bold;
    margin-bottom: 4px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: #4a90e2;
    }
  }

  p {
    color: red;
    font-size: 12px;
    margin-top: 3px;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;

  h2 {
    color: #28a745;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #333;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: "not-allowed";
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

export default ContactForm;
