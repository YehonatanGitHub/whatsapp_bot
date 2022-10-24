const asyncHandler = require('express-async-handler');
const client = require('../config/whatsapp');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');
const Group = require('../models/groupModel');
const MessageInGroup = require('../models/messageModel');
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
// const getGroupe = asyncHandler(async (req, res) => {
//   const goals = await Goal.find({ user: req.user.id });

//   res.status(200).json(goals);
// });

// @desc    set group to folow
// @route   POST /api/set-group
// @access  Private
const setGroup = asyncHandler(async (req, res) => {
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error('Please add a text field');
  // }
  const groupSerialized = req.body.groupId;
  // const groupName = req.query.group_name;
  console.log('====================================');
  console.log(groupSerialized);
  console.log('====================================');
  const myGroups = await client.getChats();
  console.log(myGroups[0]);
  console.log(myGroups[0].groupMetadata.id._serialized);
  const group = myGroups.find((chat) => chat.id._serialized == groupSerialized);
  console.log('====================================');
  console.log(group);
  console.log('====================================');
  if (group) {
    console.log('found one');
    const participants = await group.groupMetadata.participants;
    const newParticipants = await participants.map((participant) => ({
      number: participant.id.user,
    }));
    console.log(newParticipants);
    const saveGroup = await Group.create({
      name: group.name,
      serialized: group.groupMetadata.id._serialized,
      participants: newParticipants,
    });
    res.status(200).json(saveGroup);
  } else {
    console.log('no group found');
    res.status(200).json('no group found');
  }
});

// @desc    test
// @route   GET /api/test
// @access  Private
const test = asyncHandler(async (req, res) => {
  // const group = await Group.find({});

  // find message by message contetn
  // const messages = await MessageInGroup.find({ 'message.body': 'גלגל לגלגל לכללככ' });
  // console.log('====================================');
  // console.log(messages);
  // console.log('====================================');
  // let msg = messages[0];
  // console.log(msg.message.body);
  // res.status(200).json(messages);

  // const myMessages = await client.getChats();

  // client.on('message', (message) => {
  //   console.log(message.body);
  // });

  const chats = await client.getChats();

  const messages = await client.fetchMessages(); //assuming we only have 1 chat
  console.log('====================================');
  console.log(messages);
  console.log('====================================');
  res.status(200).json({
    status: true,
    response: messages,
  });
});
// @desc    allGroupsData
// @route   GET /api/allGroupsData
// @access  Private
const allGroupsData = asyncHandler(async (req, res) => {
  // const = allfetchMessages()
  // const group = await Group.find({});
  const myGroups = await client.getChats();
  console.log('====================================');
  console.log(myGroups);
  console.log('====================================');
  res.status(200).json(myGroups);
});

// @desc    allGroupsInfo
// @route   GET /api/allGroupsInfo
// @access  Private
const allGroupsInfo = asyncHandler(async (req, res) => {
  // const = allfetchMessages()
  // const group = await Group.find({});
  const myGroups = await client.getChats();
  console.log('==============this======');
  // console.log(myGroups[0].PrivateChat);
  // console.log(myGroups[0].PrivateChat.id);
  console.log(myGroups[0].isGroup);
  let groupArr = [];
  myGroups.forEach((element) => {
    if (element.isGroup === true) {
      console.log(element.isGroup);
      console.log(element.name);
      // new array of groups
      groupArr.push({
        name: element.name,
        serialized: element.id._serialized,
        participants: element.groupMetadata.participants.length,
      });
    }
  });
  console.log('====================================');
  console.log(groupArr);
  console.log('====================================');
  res.status(200).json(groupArr);
});

//   const goal = await Goal.create({
//     text: req.body.text,
//     user: req.user.id,
//   })

//   res.status(200).json(goal)
// })

// @desc    send message
// @route   POST /api/wa/send-message
// @access
const sendMessage = asyncHandler(async (req, res) => {
  if (!req.body.number) {
    res.status(400);
    throw new Error('Please enter a number to send to');
  }
  const number = req.body.number;
  const message = req.body.message;
  console.log('====================================');
  console.log(number);
  console.log('====================================');
  console.log(message);

  // const sendMessage = async () => {
  const sanitized_number = number.toString().replace(/[- )(]/g, '') + '@c.us'; // remove unnecessary chars from the number
  const final_number = sanitized_number; // `91${sanitized_number.substring(sanitized_number.length - 10)}`;  add 91 before the number here 91 is country code of India
  console.log(final_number);
  const number_details = await client.getNumberId(final_number); // get mobile number details
  console.log(number_details);

  if (number_details) {
    const sendMessageData = await client.sendMessage(final_number, message); // send message
    console.log(sendMessageData);
    res.status(200).json(sendMessageData);
  } else {
    res.status(400).json(final_number, 'Mobile number is not registered');
  }
  // };
  // sendMessage();
});
const sendMessageToGroup = asyncHandler(async (req, res) => {
  // const sendMessage = async () => {
  const final_number = '972542140173-1631821825@g.us';
  const sendMessageData = await client.sendMessage(final_number, 'Message Text'); // send message
  console.log(sendMessageData);
  if (sendMessageData) {
    res.status(200).json(sendMessageData);
  } else {
    res.status(400).json(final_number, 'Mobile number is not registered');
  }
  // };
  // sendMessage();
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
// const deleteGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

// Make sure the logged in user matches the goal user
//   if (goal.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await goal.remove()

//   res.status(200).json({ id: req.params.id })
// })

module.exports = {
  sendMessage,
  setGroup,
  sendMessageToGroup,
  test,
  allGroupsData,
  allGroupsInfo,
};
