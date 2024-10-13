// form.tsx
import styled from "styled-components";

// Styling the form
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
    margin-top: -8px;
  }
`;

export default FormStyle;
