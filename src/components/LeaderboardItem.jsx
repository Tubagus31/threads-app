import React from 'react';
import PropTypes from 'prop-types';
import { userItemShape } from './Thread/ThreadItem';

function LeaderboardItem({ user, score, no }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item-user">
        <div className="leaderboard-item-user-number">{no}. </div>
        <img src={user.avatar} alt="user" width={50} />
        <div className="leaderboard-item-user-name">{user.name}</div>
      </div>
      <div className="leaderboard-item-score">{score}</div>
    </div>
  );
}

export default LeaderboardItem;

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userItemShape).isRequired,
  score: PropTypes.number.isRequired,
  no: PropTypes.number.isRequired,
};
