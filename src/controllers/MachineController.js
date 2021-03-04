const Machine = require('../models/Machine');


const addMachine = async (req, res) => {
    try {

        const machine = new Machine(req.body);
        await machine.save();

        res.json({
            ok: true,
            data: {
                msg: 'Maquina creada correctamente'
            }
        });

    } catch (error) {
        console.log(error);
    }
}

const updMachine = async (req, res) => {
    try {
        
        const { name, server, username, password } = req.body;
        const machine = await Machine.findOne({ name });

        if(!machine) {
            return res.status(404).json({
                ok: false,
                msg: 'Servidor no encontrado'
            });
        }

        machine.server = server;
        machine.username = username;
        machine.password = password;

        await machine.save();

        res.json({
            ok: true,
            msg: 'Actualizado correctamente'
        });

    } catch (error) {
        console.log(error);
    }
}

const getMachineByName = async (req, res) => {
    try {

        const { name } = req.body;
        const machine = await Machine.findOne({ name }).select(['-_id']);

        res.json({
            ok: true,
            machine
        });

    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    addMachine,
    updMachine,
    getMachineByName
}