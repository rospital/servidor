const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

const app = express();

conectarDB()

// habilitar cors

app.use(cors())

app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})