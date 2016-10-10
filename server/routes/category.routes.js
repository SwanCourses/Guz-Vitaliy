/**
 * Created by Vitaliy on 10.10.2016.
 */

import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';

const router = new Router();


router.route('/categories').get(CategoryController.getCategories);
router.post('/categories', CategoryController.addCategory);

export default router;
