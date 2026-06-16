/**
 * ============================================================
 *  ZeeCare Hospital — MongoDB Seed Script (Mongoose)
 * ============================================================
 *
 *  Run:  node src/seed.js
 *
 *  This script will:
 *   1. Connect to MongoDB using the URI from .env
 *   2. Drop existing data from the collections it manages
 *   3. Create 3 users  (Admin, Patient, Doctor)
 *   4. Create 5 appointments
 *   5. Create 8 blog / news articles
 *   6. Create 8 prescriptions
 *   7. Create 7 dummy Razorpay payments
 *   8. Print a summary and disconnect
 *
 *  ⚠ WARNING: This wipes the seeded collections on every run.
 * ============================================================
 */

require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Override Node DNS servers to Google DNS to resolve MongoDB Atlas SRV records correctly on Windows/ISPs
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('⚠️ Failed to set DNS servers, using system defaults:', e);
}

// ─── Models ────────────────────────────────────────────────
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Blog = require('./models/Blog');
const Prescription = require('./models/Prescription');
const Payment = require('./models/Payment');

// ─── Helper ────────────────────────────────────────────────
const futureDate = (daysFromNow) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d;
};

const pastDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const randomId = () =>
  'pay_' + Math.random().toString(36).substring(2, 16);

const randomOrderId = () =>
  'order_' + Math.random().toString(36).substring(2, 16);

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─── Seed Data ─────────────────────────────────────────────

const usersData = [
  // 1. Admin
  {
    firstName: 'Yogesh',
    lastName: 'Admin',
    email: 'admin@zeecare.com',
    phone: '9876543210',
    password: 'Admin@123',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'Male',
    address: {
      street: '42 MG Road',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    role: 'Admin',
    isVerified: true,
    isActive: true
  },
  // 2. Demo Patient
  {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'patient@zeecare.com',
    phone: '9123456789',
    password: 'Patient@123',
    dateOfBirth: new Date('1995-07-22'),
    gender: 'Male',
    address: {
      street: '15 Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    role: 'Patient',
    isVerified: true,
    isActive: true,
    emergencyContact: {
      name: 'Priya Sharma',
      phone: '9876501234',
      relationship: 'Spouse'
    },
    medicalHistory: [
      { condition: 'Seasonal Allergies', diagnosedDate: new Date('2020-04-10'), status: 'Chronic' },
      { condition: 'Mild Hypertension', diagnosedDate: new Date('2023-01-05'), status: 'Active' }
    ],
    allergies: ['Penicillin', 'Dust'],
    medications: [
      {
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily',
        startDate: new Date('2023-01-10')
      }
    ]
  },
  // 3. Demo Doctor
  {
    firstName: 'Dr. Sneha',
    lastName: 'Patel',
    email: 'doctor@zeecare.com',
    phone: '9988776655',
    password: 'Doctor@123',
    dateOfBirth: new Date('1980-11-10'),
    gender: 'Female',
    address: {
      street: '78 Hospital Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    role: 'Doctor',
    isVerified: true,
    isActive: true
  }
];

// ────────────────────────────────────────────────────────────
//  Main seeder
// ────────────────────────────────────────────────────────────
async function seed() {
  try {
    // 1. Connect
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in .env');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB …');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // 2. Clear existing seeded collections
    console.log('🧹 Clearing existing data …');
    await Promise.all([
      User.deleteMany({}),
      Appointment.deleteMany({}),
      Blog.deleteMany({}),
      Prescription.deleteMany({}),
      Payment.deleteMany({})
    ]);
    console.log('   ✓ Collections cleared\n');

    // ── 3. Users ──────────────────────────────────────────
    console.log('👤 Seeding Users …');
    const createdUsers = await User.create(usersData);
    const admin = createdUsers[0];
    const patient = createdUsers[1];
    const doctor = createdUsers[2];

    console.log(`   ✓ Admin   → ${admin.email}`);
    console.log(`   ✓ Patient → ${patient.email}`);
    console.log(`   ✓ Doctor  → ${doctor.email}\n`);

    // ── 4. Appointments (5) ───────────────────────────────
    console.log('📅 Seeding 5 Appointments …');
    const appointmentsData = [
      {
        patient: patient._id,
        doctor: doctor._id,
        department: 'Cardiology',
        appointmentDate: futureDate(3),
        appointmentTime: '10:00',
        status: 'Confirmed',
        appointmentType: 'Consultation',
        reasonForVisit: 'Routine cardiac checkup and blood pressure monitoring',
        symptoms: ['Occasional chest tightness', 'Elevated BP readings'],
        duration: 30,
        consultationFee: 800,
        isEmergency: false,
        notes: { patient: 'Feeling occasional shortness of breath during exercise' }
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        department: 'General Medicine',
        appointmentDate: futureDate(7),
        appointmentTime: '14:30',
        status: 'Pending',
        appointmentType: 'Follow-up',
        reasonForVisit: 'Follow-up on hypertension medication',
        symptoms: ['Mild headache', 'Fatigue'],
        duration: 20,
        consultationFee: 500,
        isEmergency: false
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        department: 'Dermatology',
        appointmentDate: futureDate(10),
        appointmentTime: '11:00',
        status: 'Confirmed',
        appointmentType: 'Consultation',
        reasonForVisit: 'Persistent skin rash on forearms',
        symptoms: ['Itchy red patches', 'Dry skin'],
        duration: 30,
        consultationFee: 600,
        isEmergency: false
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        department: 'Orthopedics',
        appointmentDate: futureDate(14),
        appointmentTime: '09:00',
        status: 'Pending',
        appointmentType: 'Routine Checkup',
        reasonForVisit: 'Knee pain after jogging, possible ligament strain',
        symptoms: ['Knee swelling', 'Pain while walking'],
        duration: 45,
        consultationFee: 1000,
        isEmergency: false
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        department: 'Neurology',
        appointmentDate: futureDate(5),
        appointmentTime: '16:00',
        status: 'Confirmed',
        appointmentType: 'Consultation',
        reasonForVisit: 'Recurring migraine episodes, need evaluation',
        symptoms: ['Severe headaches', 'Light sensitivity', 'Nausea'],
        duration: 40,
        consultationFee: 1200,
        isEmergency: false,
        notes: { patient: 'Migraines last 4-6 hours, occur 2-3 times a week' }
      }
    ];

    const appointments = await Appointment.insertMany(appointmentsData);
    console.log(`   ✓ ${appointments.length} appointments created\n`);

    // ── 5. Blogs & News (8) ──────────────────────────────
    console.log('📰 Seeding 8 Blog / News articles …');

    // Drop stale slug index from previous runs (if any) to avoid dup-key on null
    try { await mongoose.connection.db.collection('blogs').dropIndex('slug_1'); } catch (_) { /* ignore */ }

    const blogsData = [
      {
        title: 'ZeeCare Launches New Cardiac Wing',
        slug: slugify('ZeeCare Launches New Cardiac Wing'),
        content: 'We are thrilled to announce the opening of our state-of-the-art Cardiac Wing equipped with the latest catheterization labs, 3D echocardiography suites, and a dedicated cardiac ICU. The wing will serve as a center of excellence for complex heart procedures, including minimally invasive bypass surgery and transcatheter valve replacements.',
        excerpt: 'A new state-of-the-art cardiac wing opens with world-class facilities and expert cardiologists.',
        category: 'Hospital Updates',
        author: admin._id,
        coverImage: 'https://images.unsplash.com/photo-1551190822-a9ce113d0d26?w=800',
        tags: ['cardiology', 'new-wing', 'hospital'],
        featured: true,
        views: 1250
      },
      {
        title: '10 Tips for a Healthy Heart',
        slug: slugify('10 Tips for a Healthy Heart'),
        content: 'Heart disease remains the leading cause of death worldwide. However, a few simple lifestyle changes can dramatically reduce your risk. Here are 10 evidence-based tips: 1) Exercise 30 minutes daily 2) Eat more fruits and vegetables 3) Reduce sodium intake 4) Manage stress through meditation 5) Get 7-8 hours of sleep 6) Limit alcohol consumption 7) Quit smoking 8) Maintain a healthy weight 9) Monitor blood pressure regularly 10) Schedule annual checkups.',
        excerpt: 'Simple lifestyle changes that can significantly reduce your risk of heart disease.',
        category: 'Health Tips',
        author: doctor._id,
        coverImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
        tags: ['heart', 'health-tips', 'wellness'],
        featured: false,
        views: 890
      },
      {
        title: 'Free Health Camp: World Diabetes Day',
        slug: slugify('Free Health Camp World Diabetes Day'),
        content: 'ZeeCare Medical Institute is organizing a free health camp on World Diabetes Day. The camp will offer free blood sugar testing, HbA1c screening, dietary counseling, and consultations with our endocrinology team. Walk-ins welcome from 8 AM to 5 PM at the Main Campus Auditorium.',
        excerpt: 'Join our free health camp with complimentary blood sugar testing and specialist consultations.',
        category: 'Events',
        author: admin._id,
        coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        tags: ['diabetes', 'health-camp', 'free-checkup'],
        featured: true,
        views: 2100
      },
      {
        title: 'Understanding Seasonal Allergies and How to Manage Them',
        slug: slugify('Understanding Seasonal Allergies and How to Manage Them'),
        content: 'Seasonal allergies affect millions every year. Common triggers include pollen, mold spores, and dust mites. Symptoms range from sneezing and runny nose to itchy eyes and skin rashes. Over-the-counter antihistamines can provide relief, but persistent symptoms should be evaluated by an allergist. Our dermatology and ENT teams offer comprehensive allergy testing panels.',
        excerpt: 'Everything you need to know about managing seasonal allergies effectively.',
        category: 'Wellness',
        author: doctor._id,
        coverImage: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
        tags: ['allergies', 'wellness', 'seasonal'],
        featured: false,
        views: 650
      },
      {
        title: 'ZeeCare Achieves JCI Accreditation',
        slug: slugify('ZeeCare Achieves JCI Accreditation'),
        content: 'We are proud to announce that ZeeCare Medical Institute has been awarded the prestigious Joint Commission International (JCI) accreditation, recognizing our commitment to the highest standards of patient safety and quality of care. This makes us one of only a handful of hospitals in the region to hold this distinction.',
        excerpt: 'ZeeCare earns the gold standard of global healthcare quality accreditation.',
        category: 'Announcements',
        author: admin._id,
        coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        tags: ['accreditation', 'jci', 'quality'],
        featured: true,
        views: 3200
      },
      {
        title: 'Breakthrough in Minimally Invasive Spine Surgery',
        slug: slugify('Breakthrough in Minimally Invasive Spine Surgery'),
        content: 'Our orthopedics department has successfully performed a series of minimally invasive spine surgeries using the latest robotic-assisted navigation system. These procedures result in smaller incisions, less blood loss, shorter hospital stays, and faster recovery times compared to traditional open surgery.',
        excerpt: 'Robotic-assisted spine surgery now available at ZeeCare with faster recovery times.',
        category: 'Medical Research',
        author: doctor._id,
        coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
        tags: ['spine', 'surgery', 'innovation'],
        featured: false,
        views: 1800
      },
      {
        title: 'Patient Story: Rahul\'s Journey to Recovery',
        slug: slugify('Patient Story Rahuls Journey to Recovery'),
        content: 'Rahul Sharma came to ZeeCare with chronic back pain that had been plaguing him for three years. After a thorough evaluation by our multidisciplinary team, he underwent a targeted physiotherapy program combined with pain management. Today, six months later, Rahul is pain-free and back to his active lifestyle.',
        excerpt: 'How ZeeCare\'s multidisciplinary approach helped Rahul overcome chronic back pain.',
        category: 'Patient Stories',
        author: admin._id,
        coverImage: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800',
        tags: ['patient-story', 'recovery', 'physiotherapy'],
        featured: false,
        views: 450
      },
      {
        title: 'New Telemedicine Portal Now Live',
        slug: slugify('New Telemedicine Portal Now Live'),
        content: 'ZeeCare\'s telemedicine portal is now officially live! Patients can book virtual consultations with any of our specialists from the comfort of their home. The platform supports HD video calls, e-prescriptions, online payment via Razorpay, and secure medical record sharing. Download the ZeeCare app or visit our website to get started.',
        excerpt: 'Consult our specialists from home with our new telemedicine platform.',
        category: 'News',
        author: admin._id,
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        tags: ['telemedicine', 'technology', 'virtual-consultation'],
        featured: true,
        views: 2750
      }
    ];

    const blogs = await Blog.insertMany(blogsData);
    console.log(`   ✓ ${blogs.length} blog articles created\n`);

    // ── 6. Prescriptions (8) ─────────────────────────────
    console.log('💊 Seeding 8 Prescriptions …');
    const prescriptionsData = [
      {
        patient: patient._id,
        doctor: doctor._id,
        appointment: appointments[0]._id,
        diagnosis: 'Mild Hypertension (Stage 1)',
        medications: [
          { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily (morning)', duration: '90 days', instructions: 'Take with water, avoid grapefruit' },
          { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily (after lunch)', duration: '90 days', instructions: 'Take after food' }
        ],
        notes: 'Monitor BP daily. Reduce salt intake. Walk 30 min/day.',
        followUpDate: futureDate(30),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: 'Seasonal Allergic Rhinitis',
        medications: [
          { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily (night)', duration: '14 days', instructions: 'May cause drowsiness' },
          { name: 'Fluticasone Nasal Spray', dosage: '2 sprays', frequency: 'Twice daily', duration: '30 days', instructions: 'Shake well, spray in each nostril' }
        ],
        notes: 'Avoid known allergens. Use air purifier at home.',
        followUpDate: futureDate(14),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: 'Acute Gastritis',
        medications: [
          { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily (before breakfast)', duration: '14 days', instructions: 'Take on empty stomach' },
          { name: 'Domperidone', dosage: '10mg', frequency: 'Thrice daily (before meals)', duration: '7 days', instructions: 'Take 30 min before food' },
          { name: 'Sucralfate', dosage: '1g', frequency: 'Twice daily', duration: '14 days', instructions: 'Take 1 hour before meals' }
        ],
        notes: 'Avoid spicy food, alcohol, and NSAIDs. Eat small frequent meals.',
        followUpDate: futureDate(14),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: 'Vitamin D Deficiency',
        medications: [
          { name: 'Cholecalciferol (Vitamin D3)', dosage: '60000 IU', frequency: 'Once weekly', duration: '8 weeks', instructions: 'Take with a fatty meal for better absorption' },
          { name: 'Calcium + Vitamin D3', dosage: '500mg + 250IU', frequency: 'Twice daily', duration: '90 days', instructions: 'Take after meals' }
        ],
        notes: 'Get 15-20 min of morning sunlight daily. Recheck levels after 8 weeks.',
        followUpDate: futureDate(60),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        appointment: appointments[4]._id,
        diagnosis: 'Migraine with Aura',
        medications: [
          { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed (max 2/day)', duration: '30 days', instructions: 'Take at onset of migraine. Do not exceed 200mg/day.' },
          { name: 'Propranolol', dosage: '20mg', frequency: 'Twice daily', duration: '60 days', instructions: 'Preventive therapy. Do not stop abruptly.' },
          { name: 'Amitriptyline', dosage: '10mg', frequency: 'Once daily (at bedtime)', duration: '60 days', instructions: 'May cause drowsiness' }
        ],
        notes: 'Maintain migraine diary. Avoid triggers: bright lights, loud noise, irregular sleep. Consider MRI if frequency increases.',
        followUpDate: futureDate(30),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: 'Lower Back Pain (Lumbar Strain)',
        medications: [
          { name: 'Diclofenac', dosage: '50mg', frequency: 'Twice daily (after meals)', duration: '7 days', instructions: 'Take with food. Avoid on empty stomach.' },
          { name: 'Thiocolchicoside', dosage: '4mg', frequency: 'Twice daily', duration: '7 days', instructions: 'Muscle relaxant, may cause drowsiness' }
        ],
        notes: 'Apply hot compress locally. Avoid heavy lifting. Refer to physiotherapy for core strengthening exercises.',
        followUpDate: futureDate(10),
        isActive: true
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: 'Upper Respiratory Tract Infection (Common Cold)',
        medications: [
          { name: 'Paracetamol', dosage: '650mg', frequency: 'Thrice daily (SOS for fever)', duration: '5 days', instructions: 'Only when temperature exceeds 100°F' },
          { name: 'Amoxicillin', dosage: '500mg', frequency: 'Thrice daily', duration: '5 days', instructions: 'Complete the full course even if symptoms improve' },
          { name: 'Dextromethorphan Syrup', dosage: '10ml', frequency: 'Thrice daily', duration: '5 days', instructions: 'For cough relief' }
        ],
        notes: 'Steam inhalation twice daily. Plenty of warm fluids. Rest for 2-3 days.',
        followUpDate: futureDate(7),
        isActive: false
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        appointment: appointments[2]._id,
        diagnosis: 'Contact Dermatitis',
        medications: [
          { name: 'Hydrocortisone Cream 1%', dosage: 'Thin layer', frequency: 'Twice daily', duration: '14 days', instructions: 'Apply to affected areas only. Do not use on face.' },
          { name: 'Hydroxyzine', dosage: '25mg', frequency: 'Once daily (at bedtime)', duration: '10 days', instructions: 'For itching relief. Causes drowsiness.' },
          { name: 'Moisturizing Lotion (Ceramide-based)', dosage: 'Liberal application', frequency: 'After every bath', duration: 'Ongoing', instructions: 'Use fragrance-free formula' }
        ],
        notes: 'Patch testing recommended to identify allergen. Avoid suspected irritants. Use cotton clothing.',
        followUpDate: futureDate(21),
        isActive: true
      }
    ];

    const prescriptions = await Prescription.insertMany(prescriptionsData);
    console.log(`   ✓ ${prescriptions.length} prescriptions created\n`);

    // ── 7. Payments (7) ──────────────────────────────────
    console.log('💳 Seeding 7 Razorpay Payments …');
    const paymentsData = [
      {
        patient: patient._id,
        appointment: appointments[0]._id,
        amount: 800,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'captured',
        method: 'upi',
        description: 'Cardiology Consultation Fee',
        receiptNumber: 'ZC-REC-2026-001'
      },
      {
        patient: patient._id,
        appointment: appointments[1]._id,
        amount: 500,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'captured',
        method: 'card',
        description: 'General Medicine Follow-up Fee',
        receiptNumber: 'ZC-REC-2026-002'
      },
      {
        patient: patient._id,
        appointment: appointments[2]._id,
        amount: 600,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'captured',
        method: 'netbanking',
        description: 'Dermatology Consultation Fee',
        receiptNumber: 'ZC-REC-2026-003'
      },
      {
        patient: patient._id,
        appointment: appointments[3]._id,
        amount: 1000,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'captured',
        method: 'upi',
        description: 'Orthopedics Routine Checkup Fee',
        receiptNumber: 'ZC-REC-2026-004'
      },
      {
        patient: patient._id,
        appointment: appointments[4]._id,
        amount: 1200,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'captured',
        method: 'wallet',
        description: 'Neurology Consultation Fee',
        receiptNumber: 'ZC-REC-2026-005'
      },
      {
        patient: patient._id,
        amount: 2500,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'refunded',
        method: 'card',
        description: 'MRI Scan — Refunded (Insurance covered)',
        receiptNumber: 'ZC-REC-2026-006',
        refundAmount: 2500,
        refundReason: 'Patient insurance claim approved — full refund'
      },
      {
        patient: patient._id,
        amount: 350,
        currency: 'INR',
        razorpayOrderId: randomOrderId(),
        razorpayPaymentId: randomId(),
        razorpaySignature: 'sig_' + Math.random().toString(36).substring(2, 30),
        status: 'failed',
        method: 'emi',
        description: 'Pharmacy Purchase — Payment Failed',
        receiptNumber: 'ZC-REC-2026-007'
      }
    ];

    const payments = await Payment.insertMany(paymentsData);
    console.log(`   ✓ ${payments.length} payments created\n`);

    // ── Summary ──────────────────────────────────────────
    console.log('═══════════════════════════════════════════');
    console.log('  🎉  SEEDING COMPLETE!');
    console.log('═══════════════════════════════════════════');
    console.log(`  👤  Users           : ${createdUsers.length}`);
    console.log(`  📅  Appointments    : ${appointments.length}`);
    console.log(`  📰  Blogs/News      : ${blogs.length}`);
    console.log(`  💊  Prescriptions   : ${prescriptions.length}`);
    console.log(`  💳  Payments        : ${payments.length}`);
    console.log('───────────────────────────────────────────');
    console.log('  Login Credentials:');
    console.log('  ┌──────────┬──────────────────────┬──────────────┐');
    console.log('  │  Role    │  Email               │  Password    │');
    console.log('  ├──────────┼──────────────────────┼──────────────┤');
    console.log('  │  Admin   │  admin@zeecare.com   │  Admin@123   │');
    console.log('  │  Patient │  patient@zeecare.com │  Patient@123 │');
    console.log('  │  Doctor  │  doctor@zeecare.com  │  Doctor@123  │');
    console.log('  └──────────┴──────────────────────┴──────────────┘');
    console.log('═══════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`   → ${key}: ${error.errors[key].message}`);
      });
    }
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected.');
    process.exit(0);
  }
}

// ─── Run ───────────────────────────────────────────────────
seed();
