/**
 * Created by Vitaliy on 28.09.2016.
 */

import React, {PropTypes} from 'react';

function ColorListItem(props) {
  var color = props.colorName;
  return (
    <div>
      <input type="color" value={color}/>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
};

ColorListItem.propTypes = {
  colorName: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ColorListItem;
