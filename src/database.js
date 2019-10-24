const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost/qmsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true

})
  .then(db => console.log('Database is connected'))
