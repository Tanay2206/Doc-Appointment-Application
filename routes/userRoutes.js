const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailablilityController, userAppointmentsController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post('/login', loginController);

//REGISTER || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// APPLY DOCTOR || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification Doctor || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// Notification Doctor || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// Get All Doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// BOOKING AVAILABILITY
router.post('/booking-availability', authMiddleware, bookingAvailablilityController);

// APPOINTMENTS LIST
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;