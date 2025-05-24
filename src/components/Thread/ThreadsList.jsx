import React from 'react';
import PropTypes from 'prop-types';
import { threadsListShape } from './ThreadItem';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, upVote, downVote, neutralizeVote }) {
  return (
    <>
      {threads.map((thread, index) => {
        return (
          <ThreadItem
            key={index}
            threadItem={thread}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
          />
        );
      })}
    </>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadsListShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadsList;
