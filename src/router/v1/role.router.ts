const router = require("express").Router()

import role from '../../controller/Role.controller'


router.post('/create', role.create)
router.get('/find-by-id/:id', role.findById)
router.get('/find-all', role.findAllRole)
router.put('/update/:id', role.update)
router.delete('/delete/:id', role.remove)


export default router