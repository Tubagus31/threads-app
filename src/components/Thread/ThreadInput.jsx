import React, { useState } from "react";
import PropTypes from "prop-types";

function ThreadInput({ handleThreadSubmit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="thread-input">
      <input
        className="thread-input-single"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="thread-input-single"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className="thread-input-area"
        type="text"
        placeholder="Body"
        rows={7}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        onClick={() => handleThreadSubmit({ title, category, body })}
        className="thread-input-submit"
        type="submit"
      >
        Create
      </button>
    </div>
  );
}

ThreadInput.propTypes = {
  handleThreadSubmit: PropTypes.func.isRequired,
};

export default ThreadInput;
