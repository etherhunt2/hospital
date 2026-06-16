const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: [
      'Cardiology',
      'Neurology', 
      'Pediatrics',
      'Orthopedics',
      'Emergency',
      'Oncology',
      'General Medicine',
      'Dermatology',
      'Psychiatry',
      'Gynecology'
    ]
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show'],
    default: 'Pending'
  },
  appointmentType: {
    type: String,
    enum: ['Consultation', 'Follow-up', 'Emergency', 'Routine Checkup', 'Procedure'],
    default: 'Consultation'
  },
  reasonForVisit: {
    type: String,
    required: [true, 'Reason for visit is required'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  symptoms: [String],
  duration: {
    type: Number, // in minutes
    default: 30
  },
  notes: {
    patient: { type: String, maxlength: [1000, 'Patient notes cannot exceed 1000 characters'] },
    doctor: { type: String, maxlength: [1000, 'Doctor notes cannot exceed 1000 characters'] },
    admin: { type: String, maxlength: [1000, 'Admin notes cannot exceed 1000 characters'] }
  },
  prescription: [{
    medication: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: String
  }],
  diagnosis: String,
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partially Paid', 'Refunded'],
    default: 'Pending'
  },
  consultationFee: {
    type: Number,
    required: true,
    min: [0, 'Consultation fee cannot be negative']
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: [1000, 'Feedback cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ department: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });

// Pre-save middleware to validate appointment date
appointmentSchema.pre('save', function(next) {
  const appointmentDateTime = new Date(this.appointmentDate);
  const now = new Date();

  // Check if appointment is in the past (except for emergency appointments)
  if (!this.isEmergency && appointmentDateTime < now) {
    return next(new Error('Appointment date cannot be in the past'));
  }

  next();
});

// Virtual for appointment datetime
appointmentSchema.virtual('appointmentDateTime').get(function() {
  if (!this.appointmentDate || !this.appointmentTime) return null;

  const date = new Date(this.appointmentDate);
  const [hours, minutes] = this.appointmentTime.split(':');
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  return date;
});

// Virtual for formatted appointment date
appointmentSchema.virtual('formattedDate').get(function() {
  if (!this.appointmentDate) return null;
  return this.appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function() {
  const appointmentDateTime = this.appointmentDateTime;
  const now = new Date();
  const hoursDifference = (appointmentDateTime - now) / (1000 * 60 * 60);

  // Can cancel if appointment is more than 2 hours away and not already completed
  return hoursDifference > 2 && !['Completed', 'Cancelled', 'No Show'].includes(this.status);
};

// Method to check if appointment is upcoming
appointmentSchema.methods.isUpcoming = function() {
  const appointmentDateTime = this.appointmentDateTime;
  const now = new Date();

  return appointmentDateTime > now && this.status !== 'Cancelled';
};

// Static method to find conflicting appointments
appointmentSchema.statics.findConflicting = function(doctorId, date, time, excludeId = null) {
  const query = {
    doctor: doctorId,
    appointmentDate: date,
    appointmentTime: time,
    status: { $nin: ['Cancelled', 'No Show'] }
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return this.findOne(query);
};

// Ensure virtual fields are serialized
appointmentSchema.set('toJSON', { virtuals: true });
appointmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Appointment', appointmentSchema);