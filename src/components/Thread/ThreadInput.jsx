import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ThreadInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  border-radius: 5px;
  height: 3em;
  padding: 10px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  padding: 10px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: gray;
  width: 100%;
  font-size: 12px;
  padding: 4px;
  border-radius: 5px;
  border-color: transparent;
  cursor: pointer;
  color: white;
`;

function ThreadInput({ handleThreadSubmit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    handleThreadSubmit({ title, category, body });
  };

  return (
    <ThreadInputWrapper>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextArea
        placeholder="Body"
        rows={7}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <SubmitButton onClick={onSubmit} type="submit">
        Create
      </SubmitButton>
    </ThreadInputWrapper>
  );
}

ThreadInput.propTypes = {
  handleThreadSubmit: PropTypes.func.isRequired,
};

export default ThreadInput;
