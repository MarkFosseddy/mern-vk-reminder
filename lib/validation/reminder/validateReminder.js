module.exports = validateReminder = (reminder, errors) => {
  let id = 0;

  if (reminder.text.trim() === '') {
    errors.push({ 
      id: id++, 
      type: 'text', 
      msg:'Text must not be empty' 
    });
  }
  if (reminder.whenToRemind === '') {
    errors.push({ 
      id: id++, 
      type: 'whenToRemind', 
      msg:'Date must not be empty' 
    });
  }
};