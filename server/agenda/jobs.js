module.exports = agenda => {
  agenda.define('send reminder', job => {
    console.log(job.attrs.data.text);
    agenda.cancel({ data: job.attrs.data });
  })
};