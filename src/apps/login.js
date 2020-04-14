import React, { Component } from 'react';

import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

const UserGreeting = (props) => {
  return <p>Welcome {props.userName}!!</p>;
};

const GuestGreeting = () => {
  return <p>Please signup!!</p>;
};

const OfferMsg = () => {
  return <p>Signup offers available!!</p>;
};

const WarningBanner = (props) => {
  if (!props.warnings) {
    return null;
  }
  return <p>There are {props.warnings} warnings available!!</p>;
};

const Greeting = (props) => {
  const { loggedIn, ...fallThroughProps } = props;
  return loggedIn ? <UserGreeting {...fallThroughProps} /> : <GuestGreeting {...fallThroughProps} />;
};

const LoginButton = (props) => {
  return <Button label='Login' icon='pi pi-sign-in' onClick={props.onClick} />;
};

const LogoutButton = (props) => {
  return <Button label='Logout' icon='pi pi-sign-out' onClick={props.onClick} />;
};

export default class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userName: null,
      warnings: 0,
    };
  }

  handleLoginClick = () => {
    const num = Math.ceil(Math.random() * 100);
    this.setState({
      loggedIn: true,
      userName: 'Anonymous' + num,
    });
  };

  handleLogoutClick = () => {
    this.setState({
      loggedIn: false,
      userName: null,
    });
  };

  handleAddWarningClick = () => {
    this.setState((state, props) => ({
      warnings: state.warnings + 1,
    }));
  };

  handleRemoveWarningClick = () => {
    this.setState((state, props) => ({
      warnings: Math.max(state.warnings - 1, 0),
    }));
  };

  render() {
    const btn = this.state.loggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    );
    return (
      <div>
        <Greeting loggedIn={this.state.loggedIn} userName={this.state.userName} />
        {!this.state.loggedIn && <OfferMsg />}
        <Toolbar>
          <div className='p-toolbar-group-left'>
            {btn}
            <i className='pi pi-bars p-toolbar-separator' style={{ marginRight: '.25em' }} />
            <Button className='p-button-secondary' icon='pi pi-plus' onClick={this.handleAddWarningClick} />
            <Button className='p-button-secondary' icon='pi pi-minus' onClick={this.handleRemoveWarningClick} />
          </div>
        </Toolbar>
        <WarningBanner warnings={this.state.warnings} />
      </div>
    );
  }
}
