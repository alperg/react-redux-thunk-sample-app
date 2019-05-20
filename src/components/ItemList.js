import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { itemsFetchData, itemsRemoveItem } from '../actions/items';

const Wrapper = styled.div`
  padding: 20px;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 40px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ItemName = styled.span`
  display: inline-block;
  width: 200px;
  line-height: 40px;
`;

const Button = styled.button`
  margin-left: 40px;
`;

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData('http://api.alperg.com/grocery');
  }

  render() {
    if (this.props.hasErrored) {
      return <p> Sorry! There was an error loading the items.</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>;
    }

    if (!this.props.items.length) {
      return <p>No items to display</p>;
    }

    return (
      <Wrapper>
        <ul>
          {
            this.props.items.map((item, index) => (
              <li key={item.id}>
                <ItemName>{item.name}</ItemName>
                <Button className="remove" onClick={() => this.props.removeItem(index)}>Remove</Button>
              </li>
            ))
          }
        </ul>
      </Wrapper>
    )
  }
}

ItemList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    removeItem: (index) => dispatch(itemsRemoveItem(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
