const Hospital = require('../models/Hospital');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Doctor = require("../models/Doctor");

// Dashboard View
exports.getDashboard = (req, res) => {
    res.render("admin/dashboard", { title: "Admin Dashboard" });
};

// Doctors CRUD
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render("admin/doctors", { title: "Manage Doctors", doctors });
    } catch (error) {
        res.status(500).send("Error retrieving doctors");
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { name, specialty, schedule } = req.body;
        const doctor = new Doctor({ name, specialty, schedule });
        await doctor.save();
        res.redirect("/admin/doctors");
    } catch (error) {
        res.status(500).send("Error creating doctor");
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, specialty, schedule } = req.body;
        await Doctor.findByIdAndUpdate(id, { name, specialty, schedule });
        res.redirect("/admin/doctors");
    } catch (error) {
        res.status(500).send("Error updating doctor");
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        await Doctor.findByIdAndDelete(id);
        res.redirect("/admin/doctors");
    } catch (error) {
        res.status(500).send("Error deleting doctor");
    }
};

// Hospitals CRUD
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.render("admin/hospitals", { title: "Manage Hospitals", hospitals });
    } catch (error) {
        res.status(500).send("Error retrieving hospitals");
    }
};

exports.createHospital = async (req, res) => {
    try {
        const { name, location, icuBeds, bloodStock } = req.body;
        const hospital = new Hospital({ name, location, icuBeds, bloodStock });
        await hospital.save();
        res.redirect("/admin/hospitals");
    } catch (error) {
        res.status(500).send("Error creating hospital");
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, icuBeds, bloodStock } = req.body;
        await Hospital.findByIdAndUpdate(id, { name, location, icuBeds, bloodStock });
        res.redirect("/admin/hospitals");
    } catch (error) {
        res.status(500).send("Error updating hospital");
    }
};

exports.deleteHospital = async (req, res) => {
    try {
        const { id } = req.params;
        await Hospital.findByIdAndDelete(id);
        res.redirect("/admin/hospitals");
    } catch (error) {
        res.status(500).send("Error deleting hospital");
    }
};













// Display admin dashboard
// exports.getDashboard = async (req, res) => {
//   try {
//     // Get counts for dashboard
//     const hospitalCount = await Hospital.countDocuments();
//     const userCount = await User.countDocuments({ role: 'user' });
//     const appointmentCount = await Appointment.countDocuments();
//     const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    
//     res.render('admin/dashboard', {
//       title: 'Admin Dashboard',
//       hospitalCount,
//       userCount,
//       appointmentCount,
//       pendingAppointments
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading the admin dashboard'
//     });
//   }
// };

// // Display hospital management page
// exports.getHospitals = async (req, res) => {
//   try {
//     const hospitals = await Hospital.find().sort({ name: 1 });
    
//     res.render('admin/hospitals', {
//       title: 'Manage Hospitals',
//       hospitals
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading hospitals'
//     });
//   }
// };

// // Display hospital edit form
// exports.getEditHospital = async (req, res) => {
//   try {
//     const hospital = await Hospital.findById(req.params.id);
    
//     if (!hospital) {
//       req.flash('error_msg', 'Hospital not found');
//       return res.redirect('/admin/hospitals');
//     }
    
//     res.render('admin/edit-hospital', {
//       title: `Edit ${hospital.name}`,
//       hospital
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading the hospital'
//     });
//   }
// };

// // Handle hospital update
// exports.updateHospital = async (req, res) => {
//   try {
//     const { 
//       name, address, phone, email, website,
//       totalBeds, availableBeds, totalIcuBeds, availableIcuBeds,
//       latitude, longitude 
//     } = req.body;
    
//     // Create blood stock array from form data
//     const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
//     const bloodStock = bloodTypes.map(type => ({
//       bloodType: type,
//       units: parseInt(req.body[`blood_${type.replace('+', 'plus').replace('-', 'minus')}`] || 0)
//     }));
    
//     // Update hospital
//     await Hospital.findByIdAndUpdate(req.params.id, {
//       name,
//       address,
//       phone,
//       email,
//       website,
//       location: {
//         type: 'Point',
//         coordinates: [parseFloat(longitude), parseFloat(latitude)]
//       },
//       beds: {
//         total: parseInt(totalBeds),
//         available: parseInt(availableBeds),
//         icu: {
//           total: parseInt(totalIcuBeds),
//           available: parseInt(availableIcuBeds)
//         }
//       },
//       bloodStock
//     });
    
//     req.flash('success_msg', 'Hospital updated successfully');
//     res.redirect('/admin/hospitals');
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'An error occurred while updating the hospital');
//     res.redirect(`/admin/hospitals/edit/${req.params.id}`);
//   }
// };

// // Display doctor management page
// exports.getDoctors = async (req, res) => {
//   try {
//     const hospitalId = req.query.hospital;
    
//     if (!hospitalId) {
//       const hospitals = await Hospital.find({}, 'name');
//       return res.render('admin/select-hospital', {
//         title: 'Select Hospital',
//         hospitals,
//         target: 'doctors'
//       });
//     }
    
//     const hospital = await Hospital.findById(hospitalId);
    
//     if (!hospital) {
//       req.flash('error_msg', 'Hospital not found');
//       return res.redirect('/admin/hospitals');
//     }
    
//     res.render('admin/doctors', {
//       title: `Manage Doctors - ${hospital.name}`,
//       hospital,
//       doctors: hospital.doctors
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading doctors'
//     });
//   }
// };

// // Add doctor to hospital
// exports.addDoctor = async (req, res) => {
//   try {
//     const { hospitalId, name, specialization } = req.body;
    
//     // Validate required fields
//     if (!hospitalId || !name || !specialization) {
//       req.flash('error_msg', 'All fields are required');
//       return res.redirect(`/admin/doctors?hospital=${hospitalId}`);
//     }
    
//     // Add availability for each day
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     const availability = [];
    
//     for (const day of days) {
//       const startTime = req.body[`${day.toLowerCase()}_start`];
//       const endTime = req.body[`${day.toLowerCase()}_end`];
      
//       if (startTime && endTime) {
//         availability.push({
//           day,
//           startTime,
//           endTime
//         });
//       }
//     }
    
//     await Hospital.findByIdAndUpdate(hospitalId, {
//       $push: {
//         doctors: {
//           name,
//           specialization,
//           availability
//         }
//       }
//     });
    
//     req.flash('success_msg', 'Doctor added successfully');
//     res.redirect(`/admin/doctors?hospital=${hospitalId}`);
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'An error occurred while adding the doctor');
//     res.redirect(`/admin/doctors?hospital=${req.body.hospitalId}`);
//   }
// };

// // Remove doctor from hospital
// exports.removeDoctor = async (req, res) => {
//   try {
//     const { hospitalId, doctorId } = req.params;
    
//     await Hospital.findByIdAndUpdate(hospitalId, {
//       $pull: {
//         doctors: { _id: doctorId }
//       }
//     });
    
//     req.flash('success_msg', 'Doctor removed successfully');
//     res.redirect(`/admin/doctors?hospital=${hospitalId}`);
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'An error occurred while removing the doctor');
//     res.redirect(`/admin/doctors?hospital=${req.params.hospitalId}`);
//   }
// };

// // Display appointment management
// exports.getAppointments = async (req, res) => {
//   try {
//     const { status } = req.query;
//     let query = {};
    
//     if (status) {
//       query.status = status;
//     }
    
//     const appointments = await Appointment.find(query)
//       .populate('user', 'name email')
//       .populate('hospital', 'name')
//       .sort({ date: 1 });
    
//     res.render('admin/appointments', {
//       title: 'Manage Appointments',
//       appointments,
//       currentStatus: status
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('error', {
//       title: 'Server Error',
//       message: 'An error occurred while loading appointments'
//     });
//   }
// };

// Update appointment status
// exports.updateAppointment = async (req, res) => {
//   try {
//     const { id, status } = req.params;
    
//     await Appointment.findByIdAndUpdate(id, { status });
    
//     req.flash('success_msg', 'Appointment status updated successfully');
//     res.redirect('/admin/appointments');
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'An error occurred while updating the appointment');
//     res.redirect('/admin/appointments');
//   }
// };