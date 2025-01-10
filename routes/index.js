//import express
const express = require('express')

//init express router
const router = express.Router();

//import verifyToken
const verifyToken = require('../middlewares/auth');

//import register controller
const registerController = require('../controllers/RegisterController');

//import login controller
const loginController = require('../controllers/LoginController');

//import user controller
const userController = require('../controllers/UserController');

//import validate register and login
const { validateRegister, validateLogin } = require('../utils/validators/auth');

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

//define route for user
router.get('/admin/users', verifyToken, userController.findUsers);

//define route for Get All Checklist
router.get('/checklist', verifyToken, userController.checklist);

//define route for Create new checklist
router.post('/checklist', verifyToken, userController.CreateNewChecklist);

//define route for Delete checklist by ID
router.delete('/checklist/:id', verifyToken, userController.deleteChecklist);

//define route for Get allChecklist Itemby checklist id
router.get('/checklist/:id/item', verifyToken, userController.checklistItem);

//define route for Create new checklist itemin checklist
router.post('/checklist/:id/item', verifyToken, userController.CreateNewchecklistItem);

//define route for Get checklist item inchecklist by checklist id
router.get('/checklist/:id/item/:itemid', verifyToken, userController.getchecklistItembyid);

//define route for Update statuschecklist itemby checklistitem id
router.put('/checklist/:id/item/:itemid', verifyToken, userController.updatechecklistItembyid);

//define route for Delete item bychecklist itemid
router.delete('/checklist/:id/item/:itemid', verifyToken, userController.deletechecklistItembyid);

//define route for Rename item by checlist item id
router.put('/checklist/:id/item/rename/:itemid', verifyToken, userController.renamechecklistItembyid);

//export router
module.exports = router