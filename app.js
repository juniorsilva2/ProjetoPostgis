const express = require('express');
const cors = require('cors')
const app = express();
const port = 8001;
const bodyparser = require('body-parser');
const path = require('path');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/view'));


//rotas
app.get('/', (req,res)=>{
    db.sincronizar;
    res.render('main.html');
})


const db = require('./data/postgis')

app.post('/addPetshop', db.addPonto)
app.get('/selectPetshop/:nome', db.selecionar)

app.listen(port,()=>{
    console.log("Aplicativo rodando na porta: " + port)
    console.log("http:localhost:" + port)
})
