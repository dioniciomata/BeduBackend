const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hola Dio!");
})

// GODS
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

app.post('/gods/:name', (req, res)=>{
    const name = req.params.name;
    const data = req.body;
    gods[name] = data;
    res.status(201).json(gods);
})

app.get('/gods/:name', (req, res)=>{
    const name = req.params.name;
    res.json(gods[name]);
})

app.put('/gods/:name', (req, res)=>{

    const name = req.params.name;
    if (!(name in gods)){
        res.status(404).json({error: "God not found"});
        return;
    }
    const data = req.body;
    gods[name] = data;
    res.send(gods);
})

app.delete('/gods/:name', (req, res)=>{
    const name = req.params.name;
    if (!(name in gods)){
        res.status(404).json({error: "God not found"});
        return;
    }
   delete gods[name];
    res.json(gods);
})

// CONSTELACIONES  
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
    const abreviatura = req.query.abreviatura;
    if (abreviatura){
        let filtered_stars = Object.entries(constelaciones).filter(constelacion => constelacion[1].abreviatura===abreviatura);
        if (filtered_stars.length===0){
            res.status(404).json({error: "No stars found"});
            return;
        }
        filtered_stars = Object.fromEntries(filtered_stars);
        res.json(filtered_stars);
    } else {
        res.json(constelaciones);
    }
})

app.get('/constelaciones/:name', (req, res) => {

    const name = req.params.name;
    if (!(name in constelaciones)){
        res.status(404).json({error: "constelation not found"});
        return;
    }
    res.json(constelaciones[name]); 
});

app.post('/constelaciones/:name', (req, res)=>{
    const name = req.params.name;
    const data = req.body;
    constelaciones[name] = data;
    res.status(201).json(constelaciones);
})

app.put('/constelaciones/:name', (req, res)=>{

    const name = req.params.name;
    if (!(name in constelaciones)){
        res.status(404).json({error: "Star not found"});
        return;
    }
    const data = req.body;
    constelaciones[name] = data;
    res.send(constelaciones);
})

app.delete('/constelaciones/:name', (req, res)=>{
    const name = req.params.name;
    if (!(name in constelaciones)){
        res.status(404).json({error: "Star not found"});
        return;
    }
   delete constelaciones[name];
    res.json(constelaciones);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});