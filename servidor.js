const express    = require('express')
const app        = express()
var cors         = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const port       = 8800

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

let lista_lances = []

function lance_min(lista) {
    lista.sort(function(a, b) {
        return a - b;
    })

    let lm = []

    for(var i = 0; i < lista.length; i++) {
        let cnt = lista.filter(x => x == lista[i]).length

        if(cnt == 1) {
            lm.push(lista[i])
        }
    }

    return lm.length ? lm[0] : -1;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/dar_lance', (req, res) => {
    lista_lances.push(req.body.lance)
    res.status(200)
})

app.get('/lance_m', (req, res) => {
    let lm = lance_min(lista_lances);

    lm != -1 ? res.send(lm.toString()) : res.send("Nao ha lance minimo");
})

app.listen(port, () => {
    console.log('Servidor iniciado na porta: ' + port)
})