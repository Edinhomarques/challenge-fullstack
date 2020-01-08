const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
const app = express()
app.use(express.json())
mongoose.connect(`mongodb+srv://routeasy:123654789@routeasy-tuduk.mongodb.net/test?retryWrites=true&w=majority`, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true     
})
app.use(cors())
app.use(routes);

app.listen(4003);