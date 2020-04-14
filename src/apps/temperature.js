import React, { Component } from 'react';
import '../index.css';

import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';

const BoilingVerdict = (props) => {
  const boil = props.celsius > 100;
  const toggle = <InputSwitch checked={boil} disabled={true} />;
  return (
    <div>
      {toggle}
      <p>Water would {boil ? '' : 'not'} boil!!</p>
    </div>
  );
};

const scales = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

const TempInput = (props) => {
  return (
    <div style={{ margin: '.25em' }}>
      <label>{scales[props.scale]} : </label>
      <InputText name='temp' keyfilter='pint' value={props.temp} onChange={props.onChange} />
    </div>
  );
};

export default class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      scale: 'c',
    };
  }

  convertTemp = (scale, temp) => {
    return scale === 'f' ? (temp - 32) / 1.8 : temp * 1.8 + 32;
  };

  handleCelsiusChange = (event) => {
    this.setState({
      temp: event.target.value,
      scale: 'c',
    });
  };

  handleFahrenheitChange = (event) => {
    this.setState({
      temp: event.target.value,
      scale: 'f',
    });
  };

  render = () => {
    const celsius = this.state.scale === 'c' ? this.state.temp : this.convertTemp(this.state.scale, this.state.temp);
    const fahrenheit = this.state.scale === 'f' ? this.state.temp : this.convertTemp(this.state.scale, this.state.temp);
    return (
      <Fieldset legend='Enter Temperature'>
        <TempInput scale='f' temp={fahrenheit} onChange={this.handleFahrenheitChange} />
        <TempInput scale='c' temp={celsius} onChange={this.handleCelsiusChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </Fieldset>
    );
  };
}
