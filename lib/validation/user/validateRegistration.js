module.exports = validateRegistration = (user = {}, credentials, errors) => {
  let id = 0;
  if (user && user.username === credentials.username) {
    errors.push({ 
      id: id++, 
      type: 'username', 
      msg:'Имя пользователя уже существует' 
    });
  }
  if (credentials.username.length < 4) {
    errors.push({ 
      id: id++, 
      type: 'username', 
      msg:'Имя пользователя должно состоять минимум из 4-х символов' 
    });
  }
  if (credentials.username.trim() === '') {
    errors.push({ 
      id: id++, 
      type: 'username', 
      msg:'Введите имя пользователя' 
    });
  }
  if (credentials.password.trim() === '') {
    errors.push({ 
      id: id++, 
      type: 'password', 
      msg:'Введите пароль' 
    });
  }
  if (credentials.password.length < 4) {
    errors.push({ 
      id: id++, 
      type: 'password', 
      msg:'Пароль должен состоять минимум из 4-х символов' 
    });
  }
  if (
    !credentials.vk.startsWith('https://vk.com/')
  ) {
    errors.push({ 
      id: id++, 
      type: 'vk', 
      msg:'Ссылка должна быть в виде https://vk.com/' 
    });
  }
  if (credentials.vk.trim() === '') {
    errors.push({ 
      id: id++, 
      type: 'vk', 
      msg:'Введите ссылку' 
    });
  }
};