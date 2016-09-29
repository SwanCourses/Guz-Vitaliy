/**
 * Created by Vitaliy on 28.09.2016.
 */

import React, {Component, PropTypes} from 'react';

import ColorListItem from './ColorListItem/ColorListItem'

export class ColorList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddColor = () => {
    const colorNameRef = this.refs.color;
    if (colorNameRef.value) {
      //add color to state.colors if it is not contains one.
      //this.props.onChange(Array.from(new Set([...this.props.colors, colorNameRef.value])))
      //var keys = [];

      var nextIndex = Math.max(...Object.keys(this.props.colors || {})
          .map(key => {
            return key.replace("color_", "")
          })) + 1;
      this.props.onChange(Object.assign(this.props.colors, {["color_" + nextIndex]: colorNameRef.value}));
      colorNameRef.value = '';
    }
  }

  onDeleteColor = (e) => {
    var obj = this.props.colors;
    delete obj[e.target.dataset.color];
    this.props.onChange(obj);
    //this.props.onChange(this.props.colors.filter(color => color !== e.target.dataset.color))
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.colors || {}).map((key) => {
          return (
            <ColorListItem
              key={key}
              colorKey={key}
              colorName={this.props.colors[key]}
              onDelete={this.onDeleteColor}
            />)
        })}
        <input ref="color" type="color"/>
        <button onClick={this.onAddColor}>Add color</button>
      </div>
    )
  }
}

ColorList.propTypes = {
  colors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorList;
