/**
 * Created by Vitaliy on 03.10.2016.
 */

import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import color from 'color';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import styles from './ProductDetailPage.css';
import {addToCart} from '../../../Cart/CartActions'
import {isAdmin} from '../../../../util/apiCaller';

// Import Selectors
import {getProduct} from '../../ProductReducer';

export class ProductDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {photos: []}
  }

  salesPrice = () => {
    return this.props.product.price * 0.95
  }

  onChangeColor = (key) => {
    this.setState({photos: this.props.product.colors[key].photos})
    this.setState({color: this.props.product.colors[key].color})
  }

  addProductToCart = () => {
    this.props.dispatch(addToCart(this.props.product.cuid, this.state.color, this.state.size))
  };

  onSizesChange = (e) => {
    let options = e.target.options
    let value = '';
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
      }
    }
    this.setState({size: value});
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <div className={styles.photos}>
            <div>
              {
                this.props.product && this.state.photos && this.state.photos.map((photo) => {
                  return (<div key={photo.fileName} className={styles.picture}><img
                    src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/></div>);
                })
              }
            </div>
            <div>
              {Object.keys(this.props.product.colors).map((key) => {
                var divColor = this.props.product.colors[key].color;
                var border = this.state.color === this.props.product.colors[key].color ? '2px solid red' : '';
                var divStyle = {
                  backgroundColor: divColor,
                  border: border
                };
                return (
                  <div key={key}
                       value={key}
                       className={styles['color-item']}
                       onClick={this.onChangeColor.bind(this, key)}
                       style={divStyle}>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            <select name="sizes"
                    className={styles['form-field']}
                    onChange={this.onSizesChange}>
              {this.props.product.sizes.map((size) =>
                <option key={size} value={size}>{size}</option>
              )}
            </select>
            {isAdmin() && <Link to={`/products/${this.props.product.cuid}/edit`}><FormattedMessage id="edit"/></Link>}
            <div onClick={this.addProductToCart}>
              <FormattedMessage id="order"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
