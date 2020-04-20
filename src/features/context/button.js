import React, { Component } from 'react';

import { Toolbar } from 'primereact/toolbar';

import { ThemeContext } from './themeContext';
import { UserContext } from './userContext';

export class ThemeButton extends Component {
  static contextType = ThemeContext;

  render = () => {
    let theme = this.context;
    return <button {...this.props} style={{ backgroundColor: theme.background, color: theme.foreground }} />;
  };
}

export const UserButton = (props) => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <div>
          {user.firstName + ' ' + user.lastName} <button {...props} />
        </div>
      )}
    </UserContext.Consumer>
  );
};

export const ThemeBar = (props) => {
  return (
    <Toolbar>
      <ThemeButton onClick={props.changeTheme}>Change Theme</ThemeButton>
      <UserButton onClick={props.changeUser}>Change User</UserButton>
    </Toolbar>
  );
};
