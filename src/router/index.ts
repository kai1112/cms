const router = require('express').Router()

import Role from '../router/v1/role.router'
import User from '../router/v1/user.router'

router.use('/api/v1/user', User)
router.use('/api/v1/role', Role)


export default router