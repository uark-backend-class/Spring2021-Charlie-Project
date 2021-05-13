const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://username:password@cluster0.wvktm.mongodb.net/SBG', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('open', () => { console.log('now connected') });
