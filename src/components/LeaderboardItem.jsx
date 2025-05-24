import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { userItemShape } from "./Thread/ThreadItem";

const LeaderboardItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: white;
  margin: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: 15px 10px;
    font-size: 16px;
    gap: 10px;
    text-align: center;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const UserNumber = styled.div`
  width: 25px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
`;

const UserName = styled.div``;

const Score = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

function LeaderboardItem({ user, score, no }) {
  return (
    <LeaderboardItemWrapper>
      <UserSection>
        <UserNumber>{no}. </UserNumber>
        <Avatar src={user.avatar} alt="user" />
        <UserName>{user.name}</UserName>
      </UserSection>
      <Score>{score}</Score>
    </LeaderboardItemWrapper>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userItemShape).isRequired,
  score: PropTypes.number.isRequired,
  no: PropTypes.number.isRequired,
};

export default LeaderboardItem;
