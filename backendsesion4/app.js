const express = require('express');
const app = express();
app.use(express.json());

const gods = {
    zeus: {  home: 'olimpo', name: 'zeus'}, 
    hades: { home:'infierno', name: 'hades'}, 
    hermes: { home: 'infierno', name: 'hermes'}
}
   
app.get('/gods', (req, res) => {
    const home = req.query.home;
    if (home){
        let filtered_gods = Object.entries(gods).filter(god => god[1].home===home);
        if (filtered_gods.length===0){
            res.status(404).json({error: "No gods found"});
            return;
        }
        filtered_gods = Object.fromEntries(filtered_gods);
        res.json(filtered_gods);
    } else {
        res.json(gods);
    }
})

// app.get('/gods/:name', (req, res, next) => {
//     const god = gods[req.params.name];
//     if (god) {
//       res.send(god);
//     } else {
//       res.status(404).send('God Not Found');
//     }
//   });

const constelaciones = {
    andromeda : {
	abreviatura : 'And',
	superficie :  722.3,
	num_estrellas : 152,
	estr_mas_brillante : 'Alpheratz' 
    },
    hidra: {
    abreviatura : 'Hya',
	superficie :  1302.8,
	num_estrellas : 238,
	estr_mas_brillante : 'Alfard' 
    }
}

app.get('/constelaciones', (req, res) => {
    res.json(constelaciones);
})

app.get('/', (req, res) => {
    res.send("Hola Dio!");
})

app.post('/gods/:name', (req, res)=>{
    const name = req.params.name;
    const data = req.body;
    gods[name] = data;
    res.status(201).json(gods[name]);
})

app.put('/gods/:name', (req, res)=>{

    const name = req.params.name;
    if (!(name in gods)){
        res.status(404).json({error: "God not found"});
        return;
    }
    const data = req.body;
    gods[name] = data;
    res.send(gods[name]);
})

app.delete('/gods/:name', (req, res)=>{
    const name = req.params.name;
    if (!(name in gods)){
        res.status(404).json({error: "God not found"});
        return;
    }
   delete gods[name];
    res.json({deleted: true});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});