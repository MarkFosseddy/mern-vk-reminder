const Agenda = require('agenda');

const mongoDB  = require('../config/keys').MongoDB;
const connectionOpts = {
  db: {
    address: mongoDB, 
    collection: 'agendaJobs',
    options: { useNewUrlParser: true }
  }
};

const agenda = new Agenda(connectionOpts);

(async function(){
  await agenda.start();
}())

module.exports = agenda;