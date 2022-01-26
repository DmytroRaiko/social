import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import avatarIcon from '../../icons/avatarIcon.svg';

function ProfilesComponent({ profiles }) {
  const profilesList = profiles?.map((profile) => (
    <Link className="profile-card" to={`/profile/${profile.profileid}`} key={`profile-${profile.profileid}`}>
      <div className="profile-card-info">
        <p className="post-img">
          <img
            src={
              (profile.avatarlink && `http://localhost:9000/files/avatar/${profile.profileid}`)
              || avatarIcon
            }
            alt="post"
          />
        </p>

        <div className="profile-list-name">
          {profile.name}
        </div>
      </div>

      <button type="button" className="add-friend-button">Add</button>
    </Link>
  ));

  return profilesList || <div> no any profile </div>;
}

ProfilesComponent.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      profileid: PropTypes.number.isRequired,
      avatarlink: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

ProfilesComponent.defaultProps = {
  profiles: [],
};

export default ProfilesComponent;
