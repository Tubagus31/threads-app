import PropTypes from 'prop-types';
import React, { useState } from 'react';

function CommentInput({ threadId, handleSubmitComment }) {
  const [comment, setComment] = useState('');

  return (
    <div className="comment-input">
      <div className="comment-input-title">Write Comment</div>
      <textarea
        className="comment-input-area"
        type="text"
        placeholder="Comment"
        rows={7}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={() => {
          setComment('');
          handleSubmitComment({ threadId, content: comment });
        }}
        className="comment-input-submit"
        type="submit"
      >
        Send
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
  handleSubmitComment: PropTypes.func.isRequired,
};

export default CommentInput;
