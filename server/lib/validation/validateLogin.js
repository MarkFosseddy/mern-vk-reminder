exports.wrongUsername = errors =>
  errors.push({ 
    id: 0,
    type: 'username', 
    msg: 'User does not exist' 
  });

exports.wrongPassword = errors =>
  errors.push({ 
    id: 0,
    type: 'password', 
    msg: 'Wrong password' 
  });