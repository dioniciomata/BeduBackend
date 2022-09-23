const God = require('../models/gods');

function createGod(req,res){
    const body = req.body;
    God.create(body).then(god=>{
        res.status(201).json(god);
    });
}

async function getGod(req, res){
    const id = req.params.id;
    const god = await God.findByPk(id);
    res.stauts(200).json(god);
}

async function getGods(req, res){
    const gods = await God.findAll();
    res.status(200).json(gods);
}

async function updateGod(req, res){
    const id = req.params.id;
    const god = req.body;
    const update = await God.update(god, {where: id});
    const god_updated = await God.findByPk(update[0]);
    res.status(200).json(god_updated);
}

async function deleteGod(req, res){
    const id = req.params.id;
    const deleted = God.destroy(
        {where: {id: id}}
    ); //{id: id} or {id}
    res.status(200).json(deleted);
}

module.exports = {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
}