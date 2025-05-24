import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { postedAt } from '../../utils';
import { useSelector } from 'react-redux';
import { ownerThreadTypes } from '../Comment/CommentItem';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  handleOnUpVote,
  handleOnDownVote,
  handleOnNeutralizeVote,
  user,
}) {
  const authUser = useSelector((state) => state.authUser);
  const isAlreadyUpVote = upVotesBy.includes(authUser.id);
  const isAlreadyDownVote = downVotesBy.includes(authUser.id);

  return (
    <>
      <div className="thread-detail-title">{title}</div>
      <div
        className="thread-detail-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="thread-detail-category">#{category}</div>
      <div className="thread-item-footer">
        <div className="thread-item-footer-action">
          {isAlreadyUpVote ? (
            <button onClick={() => handleOnNeutralizeVote(id)}>
              <FaThumbsUp size={20} />
            </button>
          ) : (
            <button onClick={() => handleOnUpVote(id)}>
              <FaRegThumbsUp size={20} />
            </button>
          )}
          <span>{upVotesBy.length}</span>
        </div>
        <div className="thread-item-footer-action">
          {isAlreadyDownVote ? (
            <button onClick={() => handleOnNeutralizeVote(id)}>
              <FaThumbsDown size={20} />
            </button>
          ) : (
            <button onClick={() => handleOnDownVote(id)}>
              <FaRegThumbsDown size={20} />
            </button>
          )}
          <span>{downVotesBy.length}</span>
        </div>
        <div className="thread-item-footer-action">
          <span className="thread-item-footer-author">
            <b>{postedAt(createdAt)}</b> - Created By{' '}
            <img src={user.avatar} alt="user" /> {user.name}
          </span>
        </div>
      </div>
    </>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnUpVote: PropTypes.func.isRequired,
  handleOnDownVote: PropTypes.func.isRequired,
  handleOnNeutralizeVote: PropTypes.func.isRequired,
  user: PropTypes.shape(ownerThreadTypes).isRequired,
};

export default ThreadDetail;
