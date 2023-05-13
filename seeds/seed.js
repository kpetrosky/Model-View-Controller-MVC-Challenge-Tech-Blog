const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const blog of blogData) {
      await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.log('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
