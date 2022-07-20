import React, { memo } from 'react';
import PropTypes from 'prop-types';
import profileProps from '../../services/PropTypes/ProfileProps';

const universitysBlock = (universities) => universities?.map((university) => (
  <div className={`value ${university.universityId}`} key={`university-${university.universityId}`}>
    {university.name}
  </div>
));

const ProfilePageMainInfo = memo(({
  name, email, phone, universities,
  emailSetting, phoneSetting, universitySetting,
  countPosts, countFriends,
}) => (
  <div className="profile-page-right-colmn">
    <div className="profile-page-info block-shadow">
      <div className="profile-name">
        {name}
      </div>

      <div className="profile-information">
        {email && (
          <div className={`item info-item ${emailSetting}`}>
            <div className="title"> Email: </div>
            <div className="value">
              {email}
            </div>
          </div>
        ) }

        {phone && (
          <div className={`item info-item ${phoneSetting}`}>
            <div className="title"> Phone:</div>
            <div className="value">
              {phone}
            </div>
          </div>
        ) }

        {universities && (
          <div className={`item info-item ${universitySetting}`}>
            <div className="title"> Universities: </div>
            <div className="values">
              {universitysBlock(universities)}
            </div>
          </div>
        ) }

        <div className="profile-statistics info-item">
          <div>
            Friends:
            {' '}
            {countFriends || 0}
          </div>
          <span className="span-hr" />
          <div>
            Posts:
            {' '}
            {countPosts || 0}
          </div>
        </div>
      </div>
    </div>
  </div>
));

ProfilePageMainInfo.propTypes = Object.assign(
  profileProps,
  {
    countPosts: PropTypes.string,
    countFriends: PropTypes.string,
  },
);

ProfilePageMainInfo.defaultProps = {
  email: null,
  phone: null,
  universities: null,
  countPosts: null,
  countFriends: null,
};

export default ProfilePageMainInfo;
