import React, { Component } from 'react';

import _ from 'lodash';

import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const data = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$499.99', stocked: true, name: 'OnePlus 7T' },
  { category: 'Electronics', price: '$99.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError = (error) => {
    return { error: true };
  };

  componentDidCatch = (error, errorInfo) => {
    console.error(error, errorInfo);
  };

  render = () => {
    if (this.state.error) {
      return <h2>Some error occurred.</h2>;
    }
    return this.props.children;
  };
}

const ProductRow = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.price}</td>
    </tr>
  );
};

const ProductCategory = (props) => {
  const rows = props.data
    .filter((e) => e.category === props.category)
    .map((e) => <ProductRow key={e.name} name={e.name} price={e.price} />);

  return (
    <>
      <tr>
        <td colSpan={2}>
          <b>{props.category}</b>
        </td>
      </tr>
      {rows}
    </>
  );
};

class ProductTable extends Component {
  doMatch = (name, searchTxt) => {
    name = _.lowerCase(_.trim(name));
    searchTxt = _.lowerCase(_.trim(searchTxt));
    return _.includes(name, searchTxt);
  };

  doFilter = (data, searchTxt, inStock) => {
    if (inStock) {
      // throw error to test the error handling using ErrorBoundaries.
      throw Error('Something');
    }
    return data
      .filter((e) => (inStock === true ? e.stocked : true))
      .filter((e) => (searchTxt ? this.doMatch(e.name, searchTxt) : true));
  };

  render = () => {
    const filteredData = this.doFilter(this.props.data, this.props.searchTxt, this.props.inStock);
    const categoryNames = _.uniq(filteredData.map((e) => e.category));
    const categories = categoryNames.map((e) => <ProductCategory key={e} category={e} data={filteredData} />);

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{categories}</tbody>
      </table>
    );
  };
}

const SearchPanel = (props) => {
  return (
    <Fieldset legend='Search'>
      <InputText
        id='searchTxt'
        name='searchTxt'
        placeholder='Search'
        value={props.searchTxt}
        onChange={props.handleSearchTxtChange}
      />
      <div className='p-col-12'>
        <Checkbox
          inputId='inStock'
          value='inStock'
          checked={props.inStock}
          onChange={props.handleInStockChange}
        ></Checkbox>
        <label htmlFor='inStock' className='p-checkbox-label'>
          Only show products in stock
        </label>
      </div>
    </Fieldset>
  );
};

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: '',
      inStock: false,
    };
  }

  handleSearchTxtChange = (event) => {
    this.setState({
      searchTxt: event.target.value,
    });
  };

  handleInStockChange = (event) => {
    this.setState({
      inStock: event.checked,
    });
  };

  render = () => {
    return (
      <div>
        <ErrorBoundary>
          <SearchPanel
            searchTxt={this.state.searchTxt}
            inStock={this.state.inStock}
            handleSearchTxtChange={this.handleSearchTxtChange}
            handleInStockChange={this.handleInStockChange}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProductTable data={data} searchTxt={this.state.searchTxt} inStock={this.state.inStock} />
        </ErrorBoundary>
      </div>
    );
  };
}
