const router = require('express').Router()

import Role from '../router/v1/role.router'
import User from '../router/v1/user.router'
import Category from '../router/v1/category.router'

router.use('/api/v1/user', User)
router.use('/api/v1/role', Role)
router.use('/api/v1/category', Category)


export default router