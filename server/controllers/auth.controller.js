/**
 * Created by Vitaliy on 17.10.2016.
 */

import User from '../models/user';
import serverConfig from '../config';
import jwt from 'jwt-simple';
import { sha512 } from '../util/security';

export function signIn(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(403).end();
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(401).end();
        } else {
          let password = sha512(req.body.password, user.password_salt);
          if (password === user.password) {
            let token = jwt.encode({ sub: user.cuid }, serverConfig.JWT_TOKEN);
            res.json({ token: token, admin: user.isAdmin });
          } else {
            res.status(401).end();
          }
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

export function tokenInfo(req, res) {
  if (!req.query.access_token) {
    console.log(req.query)
    res.status(404).end();
  } else {
    let userCuid = jwt.decode(req.query.access_token, serverConfig.JWT_TOKEN).sub;
    User.findOne({cuid: userCuid})
      .then((user) => {
        if (!user) {
          res.status(400).end();
        } else {
            res.json({email: user.email, isAdmin: user.isAdmin});
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}
