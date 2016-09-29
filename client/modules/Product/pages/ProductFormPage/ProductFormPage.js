/**
 * Created by administrator on 26.09.16.
 */

import React, {Component} from 'react'

import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import {addProductRequest}from '../../ProductActions';

import  styles from './ProductFormPage.css'

import {ColorList} from '../../components/ColorList/ColorList';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {'color_1': '#ffff00', 'color_2': '#00ffff'}
    };
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

  onChange = (e)=> {
    this.setState({[e.target.name]: e.target.value});
  };

  addProduct = ()=> {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);

    for (let i = 0, size; size = this.state.sizes[i]; i++) {
      form.append('product[sizes]', size);
    }

    Object.keys(this.state.colors).forEach((key) => {
      form.append('product[colors][' + key + ']', this.state.colors[key]);
    });

    for (let i = 0, file; file = this.refs.photos.files[i]; i++) {
      form.append('product[photo]', file, file.name);
    }

    this.props.dispatch(addProductRequest(form))
  };

  changeColors = (newColors) => {
    this.setState({
      colors: newColors
    });
  }

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
                 name="code"/>
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
          <select multiple="multiple"
                  size="5"
                  name="sizes"
                  onChange={this.onSizesChange}>
            {sizes.map((size) =>
              <option key={size} value={size}>{size}</option>
            )}
          </select>
          <ColorList colors={this.state.colors} onChange={this.changeColors}/>
          <div className={styles.photos}>
            <input ref="photos"
                   type="file"
                   multiple="multiple"
                   onChange={this.onFileLoad}/>
          </div>
          <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}>
            <FormattedMessage id="submit"/>
          </a>
        </div>
      </div>
    )
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
