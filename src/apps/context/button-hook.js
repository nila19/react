import React, { useContext } from 'react';

import { Toolbar } from 'primereact/toolbar';

import { ThemeContext } from './themeContext';
import { UserContext } from './userContext';

export const ThemeButtonHook = (props) => {
  const theme = useContext(ThemeContext);
  return <button {...props} style={{ backgroundColor: theme.background, color: theme.foreground }} />;
};

const UserButton = (props) => {
  const user = useContext(UserContext);
  return (
    <div>
      {user.firstName + ' ' + user.lastName} <button {...props} />
    </div>
  );
};

export const ThemeBarHook = (props) => {
  return (
    <Toolbar>
      <ThemeButtonHook onClick={props.changeTheme}>Change Theme</ThemeButtonHook>
      <UserButton onClick={props.changeUser}>Change User</UserButton>
    </Toolbar>
  );
};
