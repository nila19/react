import React, { Component } from 'react';

import { ThemeContext, themes } from './themeContext';
import { UserContext, users } from './userContext';

import { ThemeButton, ThemeBar } from './button';
import { ThemeButtonHook, ThemeBarHook } from './button-hook';

export default class ContextApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.dark,
      user: users.bob,
    };
  }

  handleChangeTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.light ? themes.dark : themes.light,
    }));
  };

  handleChangeUser = () => {
    this.setState((state) => ({
      user: state.user === users.mary ? users.john : users.mary,
    }));
  };

  render = () => {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <UserContext.Provider value={this.state.user}>
            <ThemeBar changeTheme={this.handleChangeTheme} changeUser={this.handleChangeUser} />
            <ThemeBarHook changeTheme={this.handleChangeTheme} changeUser={this.handleChangeUser} />
          </UserContext.Provider>
        </ThemeContext.Provider>
        <ThemeButton>OK</ThemeButton>
        <ThemeButtonHook>OK</ThemeButtonHook>
      </div>
    );
  };
}
