import React from 'react';
import PropTypes from 'prop-types';
import profileProps from '../../services/PropTypes/ProfileProps';

const universitysBlock = (universities) => universities?.map((university) => (
  <div className={`value ${university.universityid}`} key={`university-${university.universityid}`}>
    {university.name}
  </div>
));

const ProfilePageMainInfo = ({
  name, email, phone, universities, profileid,
  emailsetting, phonesetting, universitysetting,
  avatarlink, countposts, countfriends,
}) => (
  <div className={`profile-page-right-colmn ${profileid} ${avatarlink}`}>
    <div className="profile-page-info block-shadow">
      <div className="profile-name">
        {name}
      </div>

      <div className="profile-information">
        {email && (
          <div className={`item info-item ${emailsetting}`}>
            <div className="title"> Email: </div>
            <div className="value">
              {email}
            </div>
          </div>
        ) }

        {phone && (
          <div className={`item info-item ${phonesetting}`}>
            <div className="title"> Phone:</div>
            <div className="value">
              {phone}
            </div>
          </div>
        ) }

        {universities && (
          <div className={`item info-item ${universitysetting}`}>
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
            {countfriends || 0}
          </div>
          <span className="span-hr" />
          <div>
            Posts:
            {' '}
            {countposts || 0}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfilePageMainInfo.propTypes = Object.assign(
  profileProps,
  {
    countposts: PropTypes.string,
    countfriends: PropTypes.string,
  },
);

ProfilePageMainInfo.defaultProps = {
  avatarlink: null,
  email: null,
  phone: null,
  universities: null,
  countposts: null,
  countfriends: null,
};

export default ProfilePageMainInfo;
