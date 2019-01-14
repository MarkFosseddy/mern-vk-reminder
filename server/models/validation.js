exports.validateVKLink = link => {
  return (
    link.startsWith('https://vk.com/') ||
    link.startsWith('https://vk.com/id')
  );
    
};