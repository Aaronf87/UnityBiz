const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(userData);
  console.log("\n----- TEST USERS SEEDED -----\n");

  await Post.bulkCreate(postData);
  console.log("\n----- TEST POSTS SEEDED -----\n");

  await Comment.bulkCreate(commentData);
  console.log("\n----- TEST COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedDatabase();