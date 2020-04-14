import React, { Component } from 'react';

import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

import { PageSplit } from '../components/page-split';

const flavors = [
  {
    label: 'Grapefruit',
    value: 'grapefruit',
  },
  {
    label: 'Lime',
    value: 'lime',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Coconut',
    value: 'coconut',
  },
  {
    label: 'Mango',
    value: 'mango',
  },
];

class ControlledForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      name2: 'John Doe',
      age: '',
      flavor: 'coconut',
      flavor2: [],
    };
    this.fileInput = React.createRef();
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    console.log('Files = ' + this.fileInput.current.files.length);
    console.log('File = ' + this.fileInput.current.files[0].name);
    console.log('Submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
  };

  render = () => {
    return (
      <Fieldset legend='Controlled Form'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='p-grid'>
            <div className='p-col-3'>
              <span className='p-float-label'>
                <InputText id='name' name='name' value={this.state.name} onChange={this.handleFieldChange} />
                <label htmlFor='name'>Name</label>
              </span>
            </div>
            <div className='p-col-3'>
              <span className='p-float-label'>
                <InputText id='name2' name='name2' value={this.state.name2} readOnly={true} />
                <label htmlFor='name2'>Name 2</label>
              </span>
            </div>
            <div className='p-col-3'>
              <span className='p-float-label'>
                <InputText
                  id='age'
                  name='age'
                  keyfilter='pint'
                  value={this.state.age}
                  onChange={this.handleFieldChange}
                />
                <label htmlFor='age'>Age</label>
              </span>
            </div>
          </div>
          <div className='p-grid'>
            <div className='p-col-3'>
              <Dropdown
                id='flavor'
                name='flavor'
                options={flavors}
                value={this.state.flavor}
                onChange={this.handleFieldChange}
                placeholder='Select a Flavor'
              />
            </div>
            <div className='p-col-3'>
              <MultiSelect
                id='flavor2'
                name='flavor2'
                options={flavors}
                value={this.state.flavor2}
                onChange={this.handleFieldChange}
                placeholder='Select a Flavor 2'
              />
            </div>
            <div className='p-col-3'>
              <label>
                Upload file:
                <input type='file' ref={this.fileInput} />
              </label>
            </div>
          </div>
          <div>
            <Button label='Submit' />
          </div>
        </form>
      </Fieldset>
    );
  };
}

class UncontrolledForm extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.ageRef = React.createRef();
  }

  handleFormSubmit = (event) => {
    console.log('Submitted: ' + this.nameRef.current.value + ' : ' + this.ageRef.current.value);
    event.preventDefault();
  };

  render = () => {
    return (
      <Fieldset legend='Uncontrolled Form'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='p-grid'>
            <div className='p-col-3'>
              <span className='p-float-label'>
                <InputText id='uc-name' name='uc-name' defaultValue={''} ref={this.nameRef} />
                <label htmlFor='uc-name'>Name</label>
              </span>
            </div>
            <div className='p-col-3'>
              <span className='p-float-label'>
                <InputText id='uc-age' name='uc-age' keyfilter='pint' defaultValue={''} ref={this.ageRef} />
                <label htmlFor='uc-age'>Age</label>
              </span>
            </div>
          </div>
          <div>
            <Button label='Submit' />
          </div>
        </form>
      </Fieldset>
    );
  };
}

export default () => {
  return <PageSplit top={<ControlledForm />} bottom={<UncontrolledForm />} />;
};
