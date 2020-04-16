import React, { Component, useState } from 'react';

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

const ProductTable = (props) => {
  const doMatch = (name, searchTxt) => {
    name = _.lowerCase(_.trim(name));
    searchTxt = _.lowerCase(_.trim(searchTxt));
    return _.includes(name, searchTxt);
  };

  const doFilter = (data, searchTxt, inStock) => {
    return data
      .filter((e) => (inStock === true ? e.stocked : true))
      .filter((e) => (searchTxt ? doMatch(e.name, searchTxt) : true));
  };

  const filteredData = doFilter(props.data, props.searchTxt, props.inStock);
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
        <Checkbox inputId='inStock' value='inStock' checked={props.inStock} onChange={props.handleInStockChange} />
        <label htmlFor='inStock' className='p-checkbox-label'>
          Only show products in stock
        </label>
      </div>
    </Fieldset>
  );
};

export default () => {
  const [searchTxt, setSearchTxt] = useState('');
  const [inStock, setInStock] = useState(false);

  const handleSearchTxtChange = (e) => {
    setSearchTxt(e.target.value);
  };

  const handleInStockChange = (e) => {
    setInStock(e.checked);
  };

  return (
    <div>
      <ErrorBoundary>
        <SearchPanel
          searchTxt={searchTxt}
          inStock={inStock}
          handleSearchTxtChange={handleSearchTxtChange}
          handleInStockChange={handleInStockChange}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProductTable data={data} searchTxt={searchTxt} inStock={inStock} />
      </ErrorBoundary>
    </div>
  );
};
