const router = require('express').Router()

import Role from '../router/v1/role.router'
import User from '../router/v1/user.router'
import Category from '../router/v1/category.router'
import game from '../router/v1/game.router'

router.use('/api/v1/user', User)
router.use('/api/v1/role', Role)
router.use('/api/v1/category', Category)
router.use('/api/v1/game', game)


export default router