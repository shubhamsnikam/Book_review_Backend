
const express = require ('express');
const userController = require('../controller/usercontroller')
const authorise = require('../middleware/authorise')

const router = express.Router();

router.post('/register',userController.adduser);

router.post('/login',userController.loginUser);

router.put('/updateuser/:id',userController.updateuser);

router.delete('/deleteuser/:id',userController.deleteusers);

router.get('/getallusers',userController.getusers);

module.exports = router;