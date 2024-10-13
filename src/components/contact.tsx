import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

// Define the form inputs interface
interface IFormInputs {
  fullName: string;
  email: string;
  subject: string;
  body: string;
}

// Define the validation schema using Yup
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
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
  // Set up the form using react-hook-form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema), // Connect Yup to react-hook-form
  });

  // Submit handler with typed 'data'
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <h1>Contact Form</h1>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")} // Register the input
          />
          <p>{errors.fullName?.message}</p> {/* Display validation message */}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")} // Register the input
          />
          <p>{errors.email?.message}</p> {/* Display validation message */}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            {...register("subject")} // Register the input
          />
          <p>{errors.subject?.message}</p> {/* Display validation message */}
        </div>

        {/* Body */}
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            {...register("body")} // Register the input
          ></textarea>
          <p>{errors.body?.message}</p> {/* Display validation message */}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
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

  button {
    padding: 10px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #357abd;
    }
  }

  p {
    color: red;
    font-size: 12px;
    margin-top: 0px;
  }
`;

export default ContactForm;
