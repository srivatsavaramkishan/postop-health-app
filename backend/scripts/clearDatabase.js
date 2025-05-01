const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

dotenv.config();
connectDB();

mongoose.connection.once('open', async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
      console.log(`🗑️ Dropped: ${collection.name}`);
    }

    console.log('✅ All collections dropped successfully.');
    process.exit();
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
});
