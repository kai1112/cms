const router = require('express').Router()

import Role from '../router/v1/role.router'
import User from '../router/v1/user.router'
import Category from '../router/v1/category.router'
import game from '../router/v1/game.router'
import voucher from '../router/v1/voucher.router'
import dashbroarh from '../router/v1/dashboarh.router'


router.use('/api/v1/user', User)
router.use('/api/v1/role', Role)
router.use('/api/v1/category', Category)
router.use('/api/v1/game', game)
router.use('/api/v1/voucher', voucher)
router.use('/api/v1/dashbroarh', dashbroarh)


export default router