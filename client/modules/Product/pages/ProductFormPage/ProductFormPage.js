/**
 * Created by administrator on 26.09.16.
 */

import React, {Component} from 'react'

import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import {addProductRequest, updateProductRequest}from '../../ProductActions';
import {getCategories} from '../../../Category/CategoryReducer';
import {getProduct} from '../../ProductReducer';

import  styles from './ProductFormPage.css'

import {ColorList} from '../../components/ColorList/ColorList';

import {Sizes} from '../../../../../Common/Consts'; //const sizes = ['XS', 'S', 'M', 'L', 'XL'];
import {Groups} from '../../../../../Common/Consts';

class ProductFormPage extends Component {

  constructor(props) {
    super(props);
    this.state = props.product || {}
  }


  onSizesChange = (e) => {
    let options = e.target.options
    let values = [];
    /*options.filter(option => option.selected).map(option => {
     values.push(option.value);
     })*/
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.setState({sizes: values});
  };

  onGroupChange = (e) => {
    let options = e.target.options
    let value = '';
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
      }
    }
    this.setState({group: value});
  };

  onCategoryChange = (e) => {
    let options = e.target.options
    let value = '';
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
      }
    }
    this.setState({category: value});
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  addProduct = () => {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[group]', this.state.group);
    form.append('product[category]', this.state.category);

    for (let i = 0, size; size = this.state.sizes[i]; i++) {
      form.append('product[sizes]', size);
    }

    Object.keys(this.state.colors).forEach((key) => {
      //Object.keys(this.state.colors[key]).forEach((colorKey) => {
      form.append('product[colors][' + key + '][color]', this.state.colors[key].color);
      for (let i = 0, file; file = this.state.colors[key].photos[i]; i++) {
        form.append('product[colors][' + key + '][photos]', file, file.name);
      }
      //})
    });

    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form))
  };

  changeColors = (newColors) => {
    this.setState({
      colors: newColors
    });
  }

  isEdit = () => {
    return !!this.props.product
  };

  inactiveChange = (e) => {
    this.setState({inactive: e.target.value});
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName}
                 value={this.state.name}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="name"/>
          <input placeholder={this.props.intl.messages.productCode}
                 value={this.state.code}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="code"
                 disabled={this.isEdit()}/>
          <input placeholder={this.props.intl.messages.productPrice}
                 value={this.state.price}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="price"
                 type="number"/>
          <textarea placeholder={this.props.intl.messages.productDescription}
                    value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <label>Inactive</label>
          <input type="checkbox"
                 checked={this.state.inactive}
                 onChange={this.inactiveChange}/>
          <select multiple="multiple"
                  size="5"
                  name="sizes"
                  className={styles['form-field']}
                  onChange={this.onSizesChange}>
            {Sizes.map((size) =>
              <option key={size} value={size}>{size}</option>
            )}
          </select>
          <select name="group"
                  className={styles['form-field']}
                  onChange={this.onGroupChange}>
            {Groups.map(group =>
              <option key={group.url} value={group.name}>{group.name}</option>
            )}
          </select>
          <select name="category"
                  className={styles['form-field']}
                  value={this.state.category}
                  onChange={this.onCategoryChange}>
            {this.props.categories.map(category =>
              <option key={category.cuid} value={category.cuid}>{category.name}</option>
            )}
          </select>
          <ColorList colors={this.state.colors}
                     className={styles['form-field']}
                     onChange={this.changeColors}/>
          <div className={styles['post-submit-button']} onClick={this.addProduct}>
            <FormattedMessage id={this.isEdit() ? 'edit' : 'submit'}/>
          </div>
        </div>
      </div>
    )
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {
    categories: getCategories(state),
    product: getProduct(state, props.params.cuid)
  };
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
