const express = require('express');
const routes = express.Router();
const registerControllers = require('../controllers/registerControllers');
const categoryControllers = require('../controllers/categoryCantrollery');
const subCategoryCantrollers = require('../controllers/subCatgoryControllers');
const passport = require('passport');
const ImagesUplodes = require('../config/multer')

routes.get('/', registerControllers.index)
routes.get('/dashbord', passport.checkAuthenticated, registerControllers.dashbord)
routes.get('/register', registerControllers.register)
routes.get('/otp', registerControllers.otp)
routes.get('/newpassword', registerControllers.newpassword)
routes.get('/profaile', passport.checkAuthenticated, registerControllers.profaile)
routes.get('/logout', registerControllers.logout)
routes.get('/forgetpassword', registerControllers.forgetpassword)
routes.post('/loginData', passport.authenticate('local', ({ failureRedirect: '/' })), registerControllers.loginData);
routes.post('/registerData', registerControllers.registerData)
routes.post('/sendEmail', registerControllers.sendEmail)
routes.post('/otpData', registerControllers.otpData)
routes.post('/newpassworData', registerControllers.newpassworData)
routes.post('/profailepotoData', ImagesUplodes, registerControllers.profailepotoData)
//Catgory Routes 
routes.get('/addCategory', passport.checkAuthenticated, categoryControllers.addCategory)
routes.get('/viewCategory', passport.checkAuthenticated, categoryControllers.viewCategory)
routes.get('/deletData/:id', categoryControllers.deletData)
routes.get('/editcategory/:id', categoryControllers.editcategory)
routes.get('/active/:id', categoryControllers.active)
routes.get('/deactive/:id', categoryControllers.deactive);
routes.post('/UpdatedCategoryData', passport.checkAuthenticated, categoryControllers.UpdatedCategoryData)
routes.post('/addCategoryData', categoryControllers.addCategoryData)

//Sub Catgory Routs
routes.get('/add_Sub_Category', passport.checkAuthenticated, subCategoryCantrollers.add_Sub_Category);
routes.post('/add_sub_CategoryData', subCategoryCantrollers.add_sub_CategoryData);
routes.get('/viewsubCatgory', passport.checkAuthenticated, subCategoryCantrollers.viewsubCatgory)
routes.get('/deleteSubcategory/:id', subCategoryCantrollers.deleteSubcategory)
routes.get('/EditSubcategory/:id', passport.checkAuthenticated, subCategoryCantrollers.EditSubcategory)
routes.post('/UpdatedSubCategoryData', passport.checkAuthenticated, subCategoryCantrollers.UpdatedSubCategoryData)
routes.get('/aactive/:id', subCategoryCantrollers.active)
routes.get('/ddeactive/:id', subCategoryCantrollers.deactive);

module.exports = routes;