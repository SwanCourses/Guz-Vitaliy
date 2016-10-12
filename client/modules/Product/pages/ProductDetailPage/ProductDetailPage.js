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
  }

  addProductToCart = () => {
    this.props.dispatch(addToCart(this.props.product.cuid))
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <div className={styles.photos}>
            {
              this.props.product && this.state.photos && this.state.photos.map((photo) => {
                return (<div key={photo.fileName} className={styles.picture}><img
                  src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/></div>);
              })
            }
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            {Object.keys(this.props.product.colors).map((key) => {
              var divColor = color(this.props.product.colors[key].color);
              var divStyle = {
                backgroundColor: color(divColor).hexString(),
                width: '20px',
                height: '20px'
              };
              return (
                <div key={key}
                     value={key}
                     onClick={this.onChangeColor.bind(this, key)}
                     style={divStyle}>
                </div>
              );
            })}
            <Link to={`/products/${this.props.product.cuid}/edit`}><FormattedMessage id="edit"/></Link>
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
