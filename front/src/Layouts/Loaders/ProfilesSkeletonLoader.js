import React from 'react';
import { Skeleton } from '@mui/material';

export const ProfilesSkeletonLoader = ({ show = true, count = 1 }) => {
  // eslint-disable-next-line prefer-spread
  const arrayList = (Array
    .apply(null, { length: count })
    .map(Number.call, Number))
    .map((value) => (
      <div className="profile-card" key={`profile-skeleton-${value}`}>
        <div className="profile-card-info skeleton">
          <div className="post-img">
            <Skeleton variant="circular" animation="wave" width={75} height={75} />
          </div>

          <div className="profile-list-name" style={{ width: '100%' }}>
            <Skeleton height={50} width="80%" animation="wave" />
          </div>
        </div>

        <Skeleton height={48} width={64} animation="wave" />
      </div>
    ));

  return show && arrayList;
};
