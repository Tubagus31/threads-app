import React from 'react';
import { useEffect } from 'react';
import { asyncGetLeaderboards } from '../states/leaderboards/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderBoardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((states) => states.leaderboards);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <div className="leaderboard-title">Leaderboard</div>
      <div className="leaderboard-subtitle">
        <div>Username</div>
        <div>Score</div>
      </div>
      {leaderboards.map((leaderboard, number) => (
        <LeaderboardItem
          key={number}
          no={number + 1}
          user={leaderboard.user}
          score={leaderboard.score}
        />
      ))}
    </section>
  );
}

export default LeaderBoardPage;
