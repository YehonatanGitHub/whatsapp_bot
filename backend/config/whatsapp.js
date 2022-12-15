const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const Group = require('../models/groupModel');
const MessageInGroup = require('../models/messageModel');
const groupsLog = require('../models/groupsLogModel');
require('../helpers/israelOffset');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  // client
  //   .isRegisteredUser(number)
  //   .then((c) => console.log(c))
  //   .catch((err) => console.log(err));
  // client
  //   .getNumberId(number)
  //   .then((c) => console.log(c))
  //   .catch((err) => console.log(err));
  // getProfilePicUrl
  // client
  //   .getNumberId(+972542140173)
  //   .then((c) => console.log(c))
  //   .catch((err) => console.log(err));

  console.log('whatsappWeb Client is ready!');

  //   setInterval(() => {
  //     let number = '972542140173@c.us';
  //     let message = 'hello did you get my last message? 😂😊😇🥳🤩😎😉😀';
  //     client.sendMessage(number, message);
  //   }, 1000 * 60 * 2);

  // let count = 0;
  // setInterval(() => {
  //   let number = '120363045318781479@g.us';
  //   let message = 'hello how are you? 😂😊😇🥳🤩😎😉😀';
  //   client.sendMessage(number, message);
  //   count++;
  //   console.log(count);
  // }, 1000 * 1);
});

// client.on('message', (message) => {
//   console.log(message.body);
// });

client.on('message', async (message) => {
  console.log(message);

  const groups = await Group.find({});
  console.log('==========test==========');
  // console.log(group);
  console.log('====================================');
  console.log(message.from);

  console.log('============israelTime=================');
  console.log(israelTime());
  // console.log(group[0].serialized);
  for (const group of groups) {
    if (message.from == group.serialized) {
      // console.log(group.serialized);
      console.log(group.serialized + ' need to save this to group data');
      const saveMessage = await MessageInGroup.create({
        message: message,
        dateCreated: israelTime(),
      });
      // console.log(message.from);
    } else {
      // console.log(message.from);
      // console.log(group.serialized);
      console.log(group.serialized + ' not from group. dont save');
    }
  }
});

client.on('group_join', async (notification) => {
  console.log('SOMEONEs JOINED', notification);
  try {
    const groups = await Group.find({});
    for (const group of groups) {
      if (notification.chatId == group.serialized) {
        console.log(group.serialized + ' need to save this to group data');
        const saveToLog = await groupsLog.create({
          groupId: notification.chatId,
          participantId: notification.id.participant,
          timestamp: notification.timestamp,
          type: notification.type,
          author: notification.author,
          dateCreated: israelTime(),
        });
        console.log('===========saveToLog============');
        console.log(saveToLog);
        console.log('====================================');
      } else {
        console.log(group.serialized + ' not from group. dont save');
      }
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
  // try {
  //   const chat = await notification.getChat();
  //   const welcome = 'Welcome to the group';
  //   await chat.sendMessage(welcome);
  // } catch (error) {
  //   console.log('Something went wrong', error);
  // }
});

client.on('group_leave', async (notification) => {
  console.log('SOMEONEs left', notification);
  try {
    const groups = await Group.find({});
    for (const group of groups) {
      if (notification.chatId == group.serialized) {
        console.log(group.serialized + ' need to save this to group data');
        const saveToLog = await groupsLog.create({
          groupId: notification.chatId,
          participantId: notification.id.participant,
          timestamp: notification.timestamp,
          type: notification.type,
          author: notification.author,
          dateCreated: israelTime(),
        });
        console.log('============saveToLog================');
        console.log(saveToLog);
        console.log('====================================');
      } else {
        console.log(group.serialized + ' not from group. dont save');
      }
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
});
client.on('change_state', async (change) => {
  console.log('================change_state====================');
  console.log(change);
  console.log(israelTime());
});
client.initialize();

module.exports = client;
