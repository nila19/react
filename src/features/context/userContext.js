import React from 'react';

export const users = {
  bob: {
    firstName: 'Bob',
    lastName: 'Marley',
  },
  john: {
    firstName: 'John',
    lastName: 'Doe',
  },
  mary: {
    firstName: 'Mary',
    lastName: 'Collins',
  },
};

export const UserContext = React.createContext(users.bob);
