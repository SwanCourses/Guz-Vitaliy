/**
 * Created by Vitaliy on 28.09.2016.
 */

import React, {Component, PropTypes} from 'react';

import ColorListItem from './ColorListItem/ColorListItem'

export class ColorList extends Component {

  constructor(props) {
    super(props);
    this.state = props.colors || {}
  }

  onAddColor = () => {
    const colorNameRef = this.refs.color;
    if (colorNameRef.value) {
      //add color to state.colors if it is not contains one.
      //this.props.onChange(Array.from(new Set([...this.props.colors, colorNameRef.value])))

      var nextIndex = Math.max(0, ...Object.keys(this.props.colors)
          .map(key => {
            return key.replace("color_", "")
          })) + 1;
      this.props.onChange(Object.assign(this.props.colors, {["color_" + nextIndex]: {color: colorNameRef.value}}));
    }
  }

  onDeleteColor = (key) => {
    var newColors = this.props.colors;
    delete newColors[key];
    this.props.onChange(newColors);
    //this.props.onChange(this.props.colors.filter(color => color !== e.target.dataset.color))
  }

  onFileLoad = (key, photos) => {
    var newColors = this.props.colors;
    newColors[key].photos = photos;
    this.props.onChange(newColors);
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.colors).map((key) => {
          return (
            <ColorListItem
              key={key}
              colorName={this.props.colors[key]['color']}
              onDelete={this.onDeleteColor.bind(this, key)}
              onFileLoad={this.onFileLoad.bind(this, key)}
            />)
        })}
        <input ref="color" type="color"/>
        <button onClick={this.onAddColor}>Add color</button>
      </div>
    )
  }
}

ColorList.propTypes = {
  colors: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

ColorList.defaultProps = {
  colors: {}
};

export default ColorList;
