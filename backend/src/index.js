const express = require('express'); // para observar rotas

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({msg: "Hello World"});
})

app.listen(3333, () => {
    console.log('🎉 Back-end started!');
});