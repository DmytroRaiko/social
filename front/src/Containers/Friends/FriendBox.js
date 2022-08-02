import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getRequestsByType, getRecommendation } from '../../Services/ CRUD/Friends';
import ErrorBoundary from '../../Services/Errors/ErrorBoundary';
import FriendProfileComponent from '../../Components/Friends/FriendProfileComponent';

const FriendBox = memo(({ type, direction, recommendation }) => {
  let list;

  if (!recommendation) {
    const { data } = useQuery(
      `request-query-${type}-}`,
      () => getRequestsByType(type),
    );
    list = data?.data?.data;
  } else {
    const { data } = useQuery(
      'request-recommendations',
      () => getRecommendation(),
    );
    list = data?.data?.data;
  }

  return (list && (
    <ErrorBoundary>
      <div className="block-shadow">
        <div className="box-header">
          {`${
            recommendation
              ? 'Recommendation'
              : type}s`}
          <hr />
        </div>

        <div className={`friend-box ${direction}`}>
          {list
          && <FriendProfileComponent profiles={list} />}
        </div>
      </div>
    </ErrorBoundary>
  )) || null;
});

FriendBox.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  type: PropTypes.oneOf(['request', 'respond']),
  recommendation: PropTypes.bool,
};

FriendBox.defaultProps = {
  direction: 'horizontal',
  type: 'respond',
  recommendation: false,
};

export default FriendBox;
