/**
 * Created by Vitaliy on 17.10.2016.
 */

import * as AuthController from '../controllers/auth.controller';

export default function (router, protectedMiddleware) {
  router.post('/auth', AuthController.signIn);
  return router;
};
