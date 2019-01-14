const axios = require('axios');
const { accessTokenVK } = require('../config/keys');
const apiVersion = 5.92;

const getRandomInt32 = () => Math.floor(Math.random() * (2147483647 - 1) + 1);
const randomInt32 = getRandomInt32();

const getUsername = VKLink => VKLink.replace('https://vk.com/', '');
const getUserId = VKLink => VKLink.replace('https://vk.com/id', '');

// returns NaN if string or int(id)
const parseVKLink = VKLink =>
  parseInt(
    getUsername(VKLink) && getUserId(VKLink)
  );

const getUserIdFromVKLink = VKLink => 
  parseVKLink(VKLink)
    ? getUserId(VKLink)
    : getUserIdFromUsername(getUsername(VKLink));

const getUserIdFromUsername = async nameCase => {
  try {
    const res = await axios.get(`https://api.vk.com/method/users.get?name_case=${nameCase}&access_token=${accessTokenVK}&v=${apiVersion}`);
    
    return res.data.response[0].id;

  } catch(err) {
    console.error(err);
  }  
}

const sendMessage = async (message, userId) => { 
  try {
    // encodeURI потому что node не дружит с кириллицей
    await axios.get(encodeURI(`https://api.vk.com/method/messages.send?user_id=${userId}&random_id=${randomInt32}&message=${message}&access_token=${accessTokenVK}&v=${apiVersion}`));

  } catch(err) {
    console.error(err);
  }
};

exports.sendReminder = async (message, VKLink) => {
  try {
    const id = await getUserIdFromVKLink(VKLink);
    sendMessage(message, id);

  } catch (err) {
    console.error(err);
  }
};