module.exports = agenda => {
  agenda.define('say hello', (job) => {
    console.log('Hello, it is Agenda!');
  })
};