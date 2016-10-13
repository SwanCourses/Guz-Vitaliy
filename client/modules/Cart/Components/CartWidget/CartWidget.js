/**
 * Created by Vitaliy on 12.10.2016.
 */

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {getCart, getOrdersAmount} from '../../CartReducer';
import {getCategory} from '../../../Category/CategoryReducer';
import {removeFromCart, removeAllFromCart, addToCart} from '../../CartActions';
import {getProduct} from '../../../Product/ProductReducer'

class CartWidget extends Component {

  removeProductFromCart = (cuid, color, size)=> {
    this.props.dispatch(removeFromCart(cuid, color, size));
  }

  addProductToCart = (cuid, color, size) => {
    this.props.dispatch(addToCart(cuid, color, size))
  };

  removeAllProductsFromCart = (cuid, color, size) => {
    this.props.dispatch(removeAllFromCart(cuid, color, size))
  };

  render() {
    return (
      <div>
        {
          this.props.products.map(product => (
            <div>
              <div>{product.code}</div>
              <div>{
                Object.keys(this.props.cart[product.cuid]).map((color) => {
                  return (
                    Object.keys(this.props.cart[product.cuid][color]).map((size) => {
                      var count = this.props.cart[product.cuid][color][size].count;
                      return (
                        <div>
                          {`${color} ${size} ${count} x ${product.price} = ${count * product.price}`}
                          <span onClick={this.addProductToCart.bind(null, product.cuid, color, size)}>Добавить</span>
                          <span
                            onClick={this.removeProductFromCart.bind(null, product.cuid, color, size)}>Убавить</span>
                          <span
                            onClick={this.removeAllProductsFromCart.bind(null, product.cuid, color, size)}>Удалить</span>
                        </div>
                      )
                    })
                  )
                })
              }
              </div>
            </div>
          ))
        }
        <div>Сумма заказа: {this.props.ordersAmount}</div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let cart = getCart(state);
  let ordersAmount = getOrdersAmount(state);
  let products = Object.keys(cart).map(productCuid => {
    let product = getProduct(state, productCuid);
    /*Object.keys(cart.productCuid).map(productColor => {
     let color = productColor
     })*/
    return {...product, category: getCategory(state, product.category)};
  });
  return {
    cart,
    products,
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
