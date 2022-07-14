import React from 'react';
import { Skeleton } from '@mui/material';

export const PostSkeletonLoader = ({ show = true, count = 1 }) => {
  // eslint-disable-next-line prefer-spread
  const arrayList = (Array
    .apply(null, { length: count })
    .map(Number.call, Number))
    .map((value) => (
      <div className="post-body" key={`task-skeleton-${value}`}>
        <div className="post-header">
          <div className="skeleton">
            <Skeleton variant="circular" animation="wave" width={32} height={32} />

            <div className="post-header-information">
              <Skeleton height={15} animation="wave" />
              <Skeleton height={10} animation="wave" sx={{ marginTop: '5px' }} />
            </div>
          </div>
        </div>

        <div className="post-content">
          <p className="post-text">
            <Skeleton variant="h1" animation="wave" height={130} />
          </p>
        </div>
      </div>
    ));
  return show && arrayList;
};
