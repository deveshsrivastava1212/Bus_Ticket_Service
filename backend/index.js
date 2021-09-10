const express = require('express');

const port = process.env.PORT || 3005;
const app = express();

const admin = require('./router/admin');
const ticket = require('./router/ticket');
const passenger = require('./router/passenger');

require('./db/conn');

app.use(express.json());
app.use('/api/admin', admin);
app.use('/api/passenger', passenger);
app.use('/api/ticket', ticket);

// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.options('*', (req, res) => {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.send('ok');
//   });
  
  app.use((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
  });
  

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
    console.log(`URL is: http://localhost:${port}`);
})
 