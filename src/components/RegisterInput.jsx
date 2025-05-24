import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px 8px;
  margin: 8px 0;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid var(--gray-dark-color);
`;

const Button = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 12px 8px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  border: 0;
  background-color: var(--blue-dark-color);
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`;

function RegisterInput({ register }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register({ name, email, password });
  };

  return (
    <Form>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="button" onClick={handleRegister}>
        Register
      </Button>
    </Form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
