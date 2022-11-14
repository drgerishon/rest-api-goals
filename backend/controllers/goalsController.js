const asyncHandler = require('express-async-handler');
const { findById } = require('../models/goalModel');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('please add a text field');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error('user no found');
  }
  //make sure only loggin user matches goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user no authorized');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error('user no found');
  }
  //make sure only loggin user matches goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user no authorized');
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
