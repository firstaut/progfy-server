const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schedule = require('../models/Schedule');

const getCustomerByUsernamePassword = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const customer = await Customer.findOne({ email });

        if(!customer) {
           return res.json({
                ok: false,
                message: 'Usuario o Password incorrecto'
            });
        }

        const isSuccessfull = bcrypt.compareSync(password, customer.password);

        if(!isSuccessfull) {
            return res.json({
                 ok: false,
                 message: 'Usuario o Password incorrecto',
                 data: null
             });
         }

        const token = jwt.sign(
            { user: customer },
            process.env.SECRET,
            { expiresIn: process.env.TOKEN_EXPIRED }
        );

        res.json({
            ok: true,
            message: 'Ha ingresado correctamente',
            token,
            customer
        });
        
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al ingresar'
        });
    }

}

const getAllCustomers = async (req, res) => {
    try {

        const customers = await Customer.find();

        res.json({
            ok: true,
            customers
        });

    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al obtener usuarios'
        });
    }
}

const addCustomer = async (req, res) => {

    try {
        
        const body = req.body;
        const customer = new Customer(body);
        customer.password = bcrypt.hashSync(customer.password, 10);

        const customerDB = await customer.save();

        res.json({
            ok: true,
            message: 'Agregado correctamente',
            data: {
                customerDB
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            message: 'Error al agregar'
        });
    }
}

const getCustomerById = async (req, res) => {
    try {

        const customerId = req.params.customerId;

        const customer = await Customer.findById(customerId);

        if(customer === null) {
           return res.json({
                ok: false,
                message: 'Usuario no encontrado',
                data: {
                    customer
                }
            });
        }

        res.json({
            ok: true,
            message: 'Usuario ubicado',
            data: {
                customer
            }
        });
        
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al ubicar usuario'
        });
    }
}

const getCustomerAuth = async (req, res) => {
    
    try {

        const user = req.user;
        const customerId = req.user._id;

        const customer = await Customer.findById(user._id).select('-password');

        if(!customer) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        const schedulesInac = await Schedule.find({ customerId, status: 'inactivo' });
        customer.consumed = schedulesInac.length;
        await customer.save(); 

        res.json({
            ok: true,
            msg: 'Usuario autenticado',
            customer
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuario autenticado'
        });
    }
}

const addCreditsForCustomer = async (req, res) => {
    try {
        
        const user = req.user;
        const { numcoupon } = req.body;

        const customer = await Customer.findById(user._id);

        if(numcoupon.trim() === 'PROGFY-30MIN-FREE') {
            customer.credits = customer.credits + 1;

            await Customer.findByIdAndUpdate(customer._id, customer);

            return res.json({
                ok: true,
                msg: 'Aumentó correctamente'
            });
        }

        res.json({
            ok: false,
            msg: 'El cupón no es correcto'
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error al aumentar límite'
        });
    }
}


module.exports = {
    getCustomerByUsernamePassword,
    getAllCustomers,
    addCustomer,
    getCustomerById,
    getCustomerAuth,
    addCreditsForCustomer
}