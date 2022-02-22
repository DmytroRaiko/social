import { createContext } from 'react';

const context = createContext(
  {
    authAccess: false,
    userData: {},
  },
);

export default context;
