import React, { Component } from 'react';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render = () => {
    return (
      <div style={{ height: '15vh' }} onMouseMove={this.handleMouseMove}>
        <p>
          Mouse position => X: {this.state.x} Y: {this.state.y}
        </p>
        {this.props.render(this.state)}
      </div>
    );
  };
}

const Cat = (props) => {
  return (
    <img
      src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/SOS_Animal_logo.jpg/598px-SOS_Animal_logo.jpg'
      width='20px'
      height='20px'
      alt='Cat'
      style={{ position: 'absolute', left: props.mouse.x - 30, top: props.mouse.y }}
    />
  );
};

const Dog = (props) => {
  return (
    <img
      src='https://upload.wikimedia.org/wikipedia/commons/c/cf/Saami_animal.svg'
      width='20px'
      height='20px'
      alt='Cat'
      style={{ position: 'absolute', left: props.mouse.x - 30, top: props.mouse.y }}
    />
  );
};

// no HOC
export class MouseTracker extends Component {
  render = () => {
    return (
      <>
        <p>Move the mouse!!!!</p>
        <Mouse render={(position) => <Cat mouse={position} />} />
        <Mouse render={(position) => <Dog mouse={position} />} />
      </>
    );
  };
}

const withMouse = (WrappedComponent) => {
  return () => {
    return <Mouse render={(position) => <WrappedComponent mouse={position} />} />;
  };
};

const CatWithMouse = withMouse(Cat);
const DogWithMouse = withMouse(Dog);

// with HOC
export class MouseTrackerHOC extends Component {
  render = () => {
    return (
      <>
        <p>Move the mouse!!!!</p>
        <CatWithMouse />
        <DogWithMouse />
      </>
    );
  };
}
