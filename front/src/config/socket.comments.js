import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { URI } from '../settings';

export const useSocketComments = (roomId, userId) => {
  const socketRef = useRef(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socketRef.current = io(URI, {
      query: {
        roomId,
        auth: {
        },
      },
    });

    socketRef.current.emit('comments:get');

    socketRef.current.on('comments', (respond) => {
      setComments(respond);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const addComments = (data) => {
    socketRef.current.emit('comment:post', { profileId: userId, ...data });
  };

  const changeComment = (data) => {
    socketRef.current.emit('comment:put', data);
  };

  const deleteComment = (data) => {
    socketRef.current.emit('comment:delete', data);
  };

  return {
    comments,
    addComments,
    changeComment,
    deleteComment,
  };
};
