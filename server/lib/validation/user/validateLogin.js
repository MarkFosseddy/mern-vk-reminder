exports.wrongUsername = errors =>
  errors.push({ 
    id: 0,
    type: 'username', 
    msg: 'Имя пользователя не существует' 
  });

exports.wrongPassword = errors =>
  errors.push({ 
    id: 0,
    type: 'password', 
    msg: 'Неверный пароль' 
  });