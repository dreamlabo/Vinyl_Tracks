const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cors = require('cors');
require('./models/User');




mongoose.connect(keys.mongoURI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true});


const app = express();

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



require('./routes/userRoutes')(app);
require('./routes/albumRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });

}

const PORT = process.env.PORT || 5000
app.listen(PORT)