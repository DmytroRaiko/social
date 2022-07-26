import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getRequestsByType } from './api/crud';
import ErrorBoundary from '../../components/ErrorBoundary';
import FriendProfileComponent from '../../components/friends/FriendProfileComponent';

const FriendBox = memo(({ type, direction }) => {
  const { data } = useQuery(
    `request-query-${type}-}`,
    () => getRequestsByType(type),
  );

  const list = data?.data?.data;

  return (list && (
    <ErrorBoundary>
      <div className="block-shadow">
        <div className="box-header">{`${type}s`}</div>

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
};

FriendBox.defaultProps = {
  direction: 'horizontal',
  type: 'respond',
};

export default FriendBox;
