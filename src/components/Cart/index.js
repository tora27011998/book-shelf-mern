/* eslint no-underscore-dangle: "off" */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createAction } from 'dorothy/utils';
import Button from 'utils/Button';
import CartItem from './CartItem';
import OrderItem from './OrderItem';
import { BUY_REQUEST, MESSAGE } from './ducks';

const Div = styled.div`
  padding: 3% 3%;
  display: flex;

  > div:first-child {
    flex: 1;
  }

  > div:last-child {
    flex: 1;
  }
`;

const P = styled.p`
  ${props => (props.success ? 'color: green' : 'color: red')}
`;

const Cart = ({ currentUser, message, dispatch }) => {
  useEffect(() => {
    dispatch(createAction(MESSAGE, null));
  }, []);

  const onClickHandler = () => {
    dispatch({ type: BUY_REQUEST, payload: { order: currentUser.order } });
  };

  return (
    <Div>
      <div>
        <p>C a r t s</p>
        {currentUser &&
          currentUser.carts.map((cart, index) => (
            <CartItem key={index.toString()} cart={cart} isAuthenticate />
          ))}

        {window.localStorage.getItem('carts') &&
          JSON.parse(window.localStorage.getItem('carts')).map((cart, index) => (
            <CartItem key={index.toString()} cart={cart} isAuthenticate={false} />
          ))}
      </div>
      <div>
        <p>O r d e r</p>

        {currentUser &&
          currentUser.order.map((item, index) => <OrderItem key={index.toString()} item={item} />)}
        {currentUser && currentUser.order.length > 0 && (
          <Button type="button" onClick={() => onClickHandler()} value="Buy" />
        )}
        {message && <P success={message.success}>{message.content}</P>}
      </div>
    </Div>
  );
};

export default connect(state => ({
  currentUser: state.login.currentUser,
  message: state.message,
}))(Cart);
