const Agenda = require('agenda');
const { mongoDB } = require('../../config/keys');

const agenda = new Agenda({
  db: {
    address: mongoDB, 
    collection: 'agendaJobs',
    options: { useNewUrlParser: true }
  }
});

agenda.on('ready', () => agenda.start());

module.exports = agenda;