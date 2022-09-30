const God = require('../models/gods');

function createGod(req,res){
    const body = req.body;
    God.create(body).then(god=>{
     return   res.status(201).json(god);
    });
}

async function getGod(req, res){
    const id = req.params.id;
    const god = await God.findByPk(id);
    return res.status(201).json(god);
}

async function getGods(req, res){
    const gods = await God.findAll();
    return res.status(201).json(gods);
}

async function updateGod(req, res){
    const id = req.params.id;
    const god = req.body;
    const update = await God.update(god, {where: {id}});
    const god_updated = await God.findByPk(update[0]);
    return res.status(201).json({updated:"true"});
}

async function deleteGod(req, res){
    const id = req.params.id;
    const deleted = God.destroy(
        {where: {id: id}}
    ); //{id: id} or {id}
    res.status(200).json({deleted : "god deleted"});
}

module.exports = {
    getGod,
    getGods,
    createGod,
    updateGod,
    deleteGod
}