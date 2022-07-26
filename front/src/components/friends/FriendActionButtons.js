import React from 'react';
import { Button } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import useAuth from '../../providers/authProvider';
import {
  acceptRequest,
  checkFriendly,
  deleteRequest,
  revokeRequest,
  sendRequest,
} from '../../containers/friends/api/crud';

const FriendActionButtons = ({ profile, profileId }) => {
  const { user } = useAuth();
  // 1 - just add friend, 2 - i requested, 3 - i should answer
  const [action, setAction] = React.useState(1);
  const [friendly, setFriendly] = React.useState();

  if (user?.user?.profileId === profile?.profileId
    || user?.user?.profileId === profileId) return null;

  const { mutate } = useMutation(`friendly-${profileId}`, () => checkFriendly(profileId), {
    onSuccess: (data) => setFriendly(data?.data?.data),
  });

  React.useEffect(() => {
    setFriendly(profile);
    if (profile) {
      setFriendly(profile);
    } else {
      mutate();
    }
  }, [profile]);

  React.useEffect(() => {
    if (user.user.profileId === friendly?.requestUserId) {
      setAction(2);
      // I requested
    } else if (user.user.profileId === friendly?.respondUserId) {
      setAction(3);
      // I should answer
    }
  }, [friendly, user?.user]);

  const addRequest = useMutation('request-send', (data) => sendRequest(data), {
    onSuccess: (data) => {
      setFriendly({ friendId: data?.data?.data });
      setAction(2);
    },
  });
  const { mutate: acceptQuery } = useMutation('request-accept', (id) => acceptRequest(id), {
    onSuccess: () => { setFriendly({ role: 'Friends' }); },
  });
  const { mutate: revokeQuery } = useMutation('request-revoke', (id) => revokeRequest(id), {
    onSuccess: () => { setFriendly({ role: 'Subscriber' }); },
  });
  const { mutate: deleteQuery } = useMutation('request-delete', (id) => deleteRequest(id), {
    onSuccess: () => setAction(1),
  });

  const handleAddRequest = (userId) => {
    addRequest.mutate({ profileId: userId });
  };

  const handleAcceptQuery = (friendId) => {
    acceptQuery(friendId);
  };

  const handleRevokeQuery = (friendId) => {
    revokeQuery(friendId);
  };

  const handleDeleteQuery = (friendId) => {
    deleteQuery(friendId);
  };

  if (friendly?.role === 'Friends') {
    return (
      <Button
        disabled
        variant="contained"
        size="small"
      >
        friend
      </Button>
    );
  } if (friendly?.role === 'Blocked') {
    return (
      <Button
        disabled
        variant="contained"
        size="small"
        onClick={() => console.log('unban')}
      >
        banned
      </Button>
    );
  } if (friendly?.role === 'Subscriber') {
    return (
      <Button
        disabled
        variant="contained"
        size="small"
        onClick={() => console.log('sub')}
      >
        Subscriber
      </Button>
    );
  }

  return (
    <div className="action-btns">
      {action === 1
        && (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleAddRequest(profile?.profileId || profileId)}
            endIcon={<AddRoundedIcon />}
          >
            Add
          </Button>
        )}

      {action === 2
        && (
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => handleDeleteQuery(friendly.friendId)}
          >
            <CloseRoundedIcon />
          </Button>
        )}

      {action === 3
        && (
          <>
            <Button
              color="success"
              variant="outlined"
              size="small"
              onClick={() => handleAcceptQuery(friendly.friendId)}
            >
              <CheckRoundedIcon />
            </Button>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => handleRevokeQuery(friendly.friendId)}
            >
              <CloseRoundedIcon />
            </Button>
          </>
        )}
    </div>
  );
};

FriendActionButtons.propTypes = {
  profile: PropTypes.shape({}),
  profileId: PropTypes.number,
};

FriendActionButtons.defaultProps = {
  profile: null,
  profileId: null,
};

export default FriendActionButtons;
