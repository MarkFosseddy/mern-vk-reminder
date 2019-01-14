module.exports = validateRegistration = (user = {}, credentials, errors) => {
  let id = 0;
  if (user && user.username === credentials.username) {
    errors.push({ 
      id: id++, 
      name: 'username', 
      msg:'Username is already taken' 
    });
  }
  if (credentials.username.length < 4) {
    errors.push({ 
      id: id++, 
      name: 'username', 
      msg:'Username must be at least 4 characters' 
    });
  }
  if (credentials.username.trim() === '') {
    errors.push({ 
      id: id++, 
      name: 'username', 
      msg:'Username must not be empty' 
    });
  }
  if (credentials.password.trim() === '') {
    errors.push({ 
      id: id++, 
      name: 'password', 
      msg:'Password must not be empty' 
    });
  }
  if (credentials.password.length < 4) {
    errors.push({ 
      id: id++, 
      name: 'username', 
      msg:'Password must be at least 4 characters' 
    });
  }
  if (
    !credentials.vk.startsWith('https://vk.com/') ||
    !credentials.vk.startsWith('https://vk.com/id')
  ) {
    errors.push({ 
      id: id++, 
      name: 'vk', 
      msg:'Link must be valid' 
    });
  }
  if (credentials.vk.trim() === '') {
    errors.push({ 
      id: id++, 
      name: 'vk', 
      msg:'Link must not be empty' 
    });
  }
};