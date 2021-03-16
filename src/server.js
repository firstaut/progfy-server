const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const app = express();
var fs = require('fs');
var https = require('https');

connectDB();
app.use(cors());

app.use(express.json({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));

app.use(express.static('progfy-client/build'));


app.use(bodyParser.json());



const PORT = process.env.PORT || 4000;

https.createServer({
    cert: fs.readFileSync('api.progfy.com.crt'),
    key: fs.readFileSync('api.progfy.com.key')
  },app).listen(PORT, function(){
     console.log(`Servidor https corriendo en el puerto ${PORT}`);
 });

// app.listen(PORT, () => {
//     console.log(`Escuchando el puerto: ${PORT}`);
// });

