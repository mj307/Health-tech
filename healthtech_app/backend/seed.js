// seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const User       = require('./models/User');
const Appointment = require('./models/Appointment');
const Billing     = require('./models/Billing');

async function seed() {
  try {
    // 1. connect
    const uri = "mongodb+srv://gauthammohanraj:Steelroof68%21@healthtechproj.op9m16o.mongodb.net/?appName=HealthTechProj";
    await mongoose.connect(uri, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // 2. clear out old data
    await Promise.all([
      Appointment.deleteMany({}),
      Billing.deleteMany({}),
    ]);
    console.log('🗑  Cleared Appointment & Billing collections');

    // 3. find or create some users
    let users = await User.find().limit(3);
    if (users.length === 0) {
      // if you don't have users yet, create a few
      users = await User.insertMany([
        { name: 'Alice', email: 'alice@example.com', password: '•••' },
        { name: 'Bob',   email: 'bob@example.com',   password: '•••' },
        { name: 'Carol', email: 'carol@example.com', password: '•••' },
      ]);
      console.log('👤 Seeded 3 new users');
    } else {
      console.log(`👤 Found ${users.length} existing users`);
    }

    // 4. build sample appointments
    const appointments = [];
    users.forEach((u, i) => {
      appointments.push({
        user:        u._id,
        title:       `Follow‑up #${i + 1}`,
        date:        new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
        description: `This is appointment number ${i + 1}`,
      });
    });
    await Appointment.insertMany(appointments);
    console.log(`📅 Inserted ${appointments.length} appointments`);

    // 5. build sample billings
    const billings = [];
    users.forEach((u, i) => {
      billings.push({
        user:    u._id,
        amount:  50 + i * 25,
        status:  ['pending','paid','failed'][i % 3],
        dueDate: new Date(Date.now() + (i + 3) * 24 * 60 * 60 * 1000),
      });
    });
    await Billing.insertMany(billings);
    console.log(`💸 Inserted ${billings.length} billings`);

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🚪 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
