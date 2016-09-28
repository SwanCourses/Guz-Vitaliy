/**
 * Created by administrator on 26.09.16.
 */

import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */

export function getProducts(req, res) {
  Product.sort('name').exec().then((products) => {
    res.json({products})
  }).catch((err) => {
    res.status(500).send(err);
  });
}

export function addProduct(req, res) {
  if(!req.body.product.name || !req.body.product.code || !req.body.product.price || !req.body.product.description){
    res.status(403).end();
  } else {
    const newProduct = new Product(req.body.product);

    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);

    newProduct.cuid = cuid();

    for(let i = 0, file; file = req.files[i]; i++) {
      newProduct.photos.push({ fileName: file.filename})
    }

    newProduct.save().then((saved) => {
      res.json({ product: saved })
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}
