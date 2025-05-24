import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdLogout, MdLogin } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { FaRegChartBar, FaTwitter } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

function Navigation({ authUser, signOut }) {
  const { name, avatar } = authUser;
  const navigate = useNavigate();

  return (
    <div className="navigation">
      <button className="nav-top" onClick={() => navigate('/')}>
        <FaTwitter size={35} />
      </button>

      <nav className="nav-main">
        <button className="nav-button" onClick={() => navigate('/')}>
          <AiFillHome size={30} />
        </button>
        <button
          className="nav-button-plus"
          onClick={() => navigate('/create-thread')}
        >
          <FaPlus size={30} />
        </button>
        <button className="nav-button" onClick={() => navigate('/leaderboard')}>
          <FaRegChartBar size={30} />
        </button>
      </nav>
      {authUser !== null ? (
        <>
          <div className="nav-bottom">
            <img src={avatar} alt="" title={name} />
          </div>
          <button className="nav-bottom" onClick={signOut}>
            <MdLogout size={35} />
          </button>
        </>
      ) : (
        <button className="nav-bottom" onClick={() => navigate('/login')}>
          <MdLogin size={35} />
        </button>
      )}
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
