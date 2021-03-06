/**
 * Created by administrator on 26.09.16.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  group: { type: 'String', required: true },
  category: { type: 'String', required: true },
  inactive: {type: 'Boolean', default: false},
  colors: {},
  sizes: [],
  photos: [],

});

export default mongoose.model('Product', productSchema);
