import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { URI } from '../settings';

export const useSocketLikes = (roomId, userId) => {
  const socketRef = useRef(null);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    socketRef.current = io(URI, {
      query: {
        roomId,
      },
    });

    socketRef.current.emit('likes:get');

    socketRef.current.on('likes', (respond) => {
      setLikes(respond.likes);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const addLike = () => {
    socketRef.current.emit('likes:post', { userId });
  };

  const deleteLike = () => {
    socketRef.current.emit('likes:delete', { userId });
  };

  return {
    likes,
    addLike,
    deleteLike,
  };
};
