import React from 'react';
import profileDataProps from '../../PropTypes/ProfileDataProps';
import avatarIcon from '../../icons/avatarIcon.svg';

const universitysBlock = (universities) => universities?.map((university) => (
  <div className={`value ${university.universityid}`} key={`university-${university.universityid}`}>
    {university.name}
  </div>
));

function ProfileComponent({ profileData }) {
  const profilePage = profileData?.map((profile) => (
    <div className="profile-page" key={`profile-${profile.profileid}`}>
      <div className="profile-avatar">
        <p className="post-img">
          <img src={profile.avatarlink || avatarIcon} alt="post" />
        </p>
        <button type="button" className="add-friend-button">Add</button>
      </div>

      <div className="profile-page-right-colmn">
        <div className="profile-page-info block-right-page">
          <div className="profile-name">
            {profile.name}
          </div>

          <div className="profile-information">
            {profile.email && (
            <div className="item info-item">
              <div className="title"> Email: </div>
              <div className="value">
                {profile.email}
              </div>
            </div>
            ) }

            {profile.phone && (
              <div className="item info-item">
                <div className="title"> Phone:</div>
                <div className="value">
                  {profile.phone}
                </div>
              </div>
            ) }

            {profile.universities && (
            <div className="item info-item">
              <div className="title"> Universities: </div>
              <div className="values">
                {universitysBlock(profile.universities)}
              </div>
            </div>
            ) }

            <div className="profile-statistics info-item">
              <div> Friends: 0 </div>
              <span className="span-hr" />
              <div> Posts: 0 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return profilePage || <div> Error to load profile </div>;
}

ProfileComponent.propTypes = profileDataProps;

ProfileComponent.defaultProps = {
  profileData: [],
};

export default ProfileComponent;
