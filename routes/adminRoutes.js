const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const resourceController = require('../controllers/resourceController');
const { ensureAuthenticated } = require('../middleware/auth');
const { ensureAdmin } = require('../middleware/admin');

// Admin dashboard
router.get('/', ensureAuthenticated, ensureAdmin, adminController.getDashboard);

// Doctors CRUD
router.get("/doctors", adminController.getDoctors);
router.post("/doctors", adminController.createDoctor);
router.put("/doctors/:id", adminController.updateDoctor);
router.delete("/doctors/:id", adminController.deleteDoctor);

// Hospitals CRUD
router.get("/hospitals", adminController.getHospitals);
router.post("/hospitals", adminController.createHospital);
router.put("/hospitals/:id", adminController.updateHospital);
router.delete("/hospitals/:id", adminController.deleteHospital);

// Hospital management
// router.get('/hospitals', ensureAuthenticated, ensureAdmin, adminController.getHospitals);
// router.get('/hospitals/edit/:id', ensureAuthenticated, ensureAdmin, adminController.getEditHospital);
// router.put('/hospitals/:id', ensureAuthenticated, ensureAdmin, adminController.updateHospital);

// // Doctor management
// router.get('/doctors', ensureAuthenticated, ensureAdmin, adminController.getDoctors);
// router.post('/doctors', ensureAuthenticated, ensureAdmin, adminController.addDoctor);
// router.delete('/doctors/:hospitalId/:doctorId', ensureAuthenticated, ensureAdmin, adminController.removeDoctor);

// Appointment management
//router.get('/appointments', ensureAuthenticated, ensureAdmin, adminController.getAppointments);
//router.put('/appointments/:id/:status', ensureAuthenticated, ensureAdmin, adminController.updateAppointment);

// Resource management
// router.get('/resources/add', ensureAuthenticated, ensureAdmin, resourceController.getAddResource);
// router.post('/resources', ensureAuthenticated, ensureAdmin, resourceController.createResource);
// router.delete('/resources/:id', ensureAuthenticated, ensureAdmin, resourceController.deleteResource);

module.exports = router;