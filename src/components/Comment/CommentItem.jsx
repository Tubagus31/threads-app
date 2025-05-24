import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../../utils';
import { useSelector } from 'react-redux';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';

function CommentItem({
  threadId,
  comment,
  handleDownComment,
  handleUpComment,
  handleNeutralizeComment,
}) {
  const authUser = useSelector((states) => states.authUser);
  const isCommentUpVoted = comment.upVotesBy.includes(authUser.id);
  const isCommentDownVoted = comment.downVotesBy.includes(authUser.id);

  return (
    <div className="comment-list">
      <div className="comment-list-user">
        <div className="comment-list-user-profile">
          <img src={comment.owner.avatar} alt="user" />
          <div>{comment.owner.name}</div>
        </div>
        <div>{postedAt(comment.createdAt)}</div>
      </div>
      <div
        className="comment-list-content"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className="thread-item-footer">
        <div className="thread-item-footer-action">
          {isCommentUpVoted ? (
            <button
              onClick={() =>
                handleNeutralizeComment({ threadId, commentId: comment.id })
              }
            >
              <FaThumbsUp size={15} />
            </button>
          ) : (
            <button
              onClick={() =>
                handleUpComment({ threadId, commentId: comment.id })
              }
            >
              <FaRegThumbsUp size={15} />
            </button>
          )}
          <span>{comment.upVotesBy.length}</span>
        </div>
        <div className="thread-item-footer-action">
          {isCommentDownVoted ? (
            <button
              onClick={() =>
                handleNeutralizeComment({ threadId, commentId: comment.id })
              }
            >
              <FaThumbsDown size={15} />
            </button>
          ) : (
            <button
              onClick={() =>
                handleDownComment({ threadId, commentId: comment.id })
              }
            >
              <FaRegThumbsDown size={15} />
            </button>
          )}
          <span>{comment.downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

const ownerThreadTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerThreadTypes).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.shape(commentTypes).isRequired,
  handleUpComment: PropTypes.func.isRequired,
  handleDownComment: PropTypes.func.isRequired,
  handleNeutralizeComment: PropTypes.func.isRequired,
};

export { ownerThreadTypes };
export default CommentItem;
