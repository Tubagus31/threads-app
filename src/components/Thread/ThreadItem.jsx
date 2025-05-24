import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { postedAt } from '../../utils';

function ThreadItem({ threadItem, upVote, downVote, neutralizeVote }) {
  const isAlreadyUpVote = threadItem.authUser
    ? threadItem.thread.upVotesBy.includes(threadItem.authUser.id)
    : false;

  const isAlreadyDownVote = threadItem.authUser
    ? threadItem.thread.downVotesBy.includes(threadItem.authUser.id)
    : false;

  return (
    <div className="thread-item">
      <div className="thread-item-user">
        <div>
          <img src={threadItem.user.avatar} alt="avatar" />
          <div className="thread-item-user-name">{threadItem.user.name}</div>
          <div className="thread-item-user-createdAt">
            {postedAt(threadItem.thread.createdAt)}
          </div>
        </div>
        <div>
          <PiDotsThreeOutlineFill size={25} />
        </div>
      </div>
      <div className="thread-item-title">
        <Link to={`/threads/${threadItem.thread.id}`}>
          {threadItem.thread.title}
        </Link>
      </div>
      <div
        className="thread-item-body"
        dangerouslySetInnerHTML={{ __html: threadItem.thread.body }}
      />
      <div className="thread-item-footer">
        <div className="thread-item-footer-action">
          {isAlreadyUpVote ? (
            <button onClick={() => neutralizeVote(threadItem.thread.id)}>
              <FaThumbsUp size={18} />
            </button>
          ) : (
            <button onClick={() => upVote(threadItem.thread.id)}>
              <FaRegThumbsUp size={18} />
            </button>
          )}

          <span>{threadItem.thread.upVotesBy.length}</span>
        </div>
        <div className="thread-item-footer-action">
          {isAlreadyDownVote ? (
            <button onClick={() => neutralizeVote(threadItem.thread.id)}>
              <FaThumbsDown size={18} />
            </button>
          ) : (
            <button onClick={() => downVote(threadItem.thread.id)}>
              <FaRegThumbsDown size={18} />
            </button>
          )}
          <span>{threadItem.thread.downVotesBy.length}</span>
        </div>
        <div className="thread-item-footer-action">
          <button>
            <RiChat1Line size={22} />
          </button>
          <span>{threadItem.thread.totalComments}</span>
        </div>
      </div>
    </div>
  );
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

const userItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadsListShape = {
  thread: PropTypes.shape(threadItemShape).isRequired,
  user: PropTypes.shape(userItemShape).isRequired,
  authUser: PropTypes.oneOfType([
    PropTypes.shape(userItemShape),
    PropTypes.oneOf([null]),
  ]),
};

ThreadItem.propTypes = {
  threadItem: PropTypes.shape(threadsListShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { threadsListShape, userItemShape };
export default ThreadItem;
