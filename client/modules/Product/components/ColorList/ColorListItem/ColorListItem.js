/**
 * Created by Vitaliy on 28.09.2016.
 */

import React, {Component, PropTypes} from 'react';

export class ColorListItem extends Component {
  onFilesChange = () =>{
    this.props.onFileLoad(this.refs.photos.files);
  }

  render() {
    return (
      <div>
        <input type="color" value={this.props.colorName} readOnly="true"/>
        <button onClick={this.props.onDelete}>Delete</button>
        <input ref="photos"
               type="file"
               multiple="multiple"
               onChange={this.onFilesChange}/>
      </div>
    );
  }
}

ColorListItem.propTypes = {
  colorName: PropTypes.string.isRequired,
  onFileLoad: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ColorListItem;
