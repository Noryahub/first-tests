// server.js

import 'dotenv/config';
import app from './app.js';
import sequelize from './config/db.js';
import './models/associations.js';

const PORT = process.env.PORT || 5000;

// Synchronisation et lancement du serveur
(async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync({ alter: true }); // IMPORTANT
    console.log("Models synced!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
