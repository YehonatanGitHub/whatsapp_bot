const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const Group = require('../models/groupModel');
const MessageInGroup = require('../models/messageModel');
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
  dateTime = israelTime();
  console.log('============dateTime=================');
  console.log(dateTime);
  // console.log(group[0].serialized);
  for (const group of groups) {
    if (message.from == group.serialized) {
      // console.log(group.serialized);
      console.log(group.serialized + ' need to save this to group data');
      const saveMessage = await MessageInGroup.create({
        message: message,
        dateCreated: dateTime,
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
    const chat = await notification.getChat();

    const welcome = 'Welcome to the group';

    await chat.sendMessage(welcome);
  } catch (error) {
    console.log('Something went wrong', error);
  }
});
client.on('group_leave', async (notification) => {
  console.log('SOMEONEs left', notification);
  // try {
  //   const chat = await notification.getChat()

  //   const welcome = "Welcome to the group"

  //   await chat.sendMessage(welcome)
  // } catch (error) {
  //   console.log("Something went wrong", error);
  // }
});

client.initialize();

module.exports = client;
