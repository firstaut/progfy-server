const Coupon = require('../models/Coupon');
const Customer = require('../models/Customer');
const CouponCustomer = require('../models/CouponCustomer');


const addCouponByUserAdmin = async (req, res) => {
    try {

        const { kind } = req.user;

         if(kind && kind.trim() === 'admin') {
            return res.status(401).json({
                ok: false,
                msg: 'Acceso prohibido para la operación'
            });
         }

        const coupon = new Coupon(req.body);

        await coupon.save();

        res.json({
            ok: true,
            msg: 'Cupón creado correctamente',
            coupon
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al intentar agregar cupón'
        });
    }
}

const updCouponByUserAdmin = async (req, res) => {
    try {
        
        const body = req.body;
        const { kind } = req.user;

        if(kind && kind.trim() === 'admin') {
            return res.status(401).json({
                ok: false,
                msg: 'Acceso prohibido para la operación'
            });
        }

        const coupon = await Coupon.findById(body._id);

        if(!coupon) {
            return res.status(404).json({
                ok: false,
                msg: 'El cupón no ha sido actualizado'
            });
        }

        coupon.name = body.name;
        coupon.serie = body.serie;
        coupon.countInit = body.countInit;
        coupon.kind = body.kind;
        coupon.credits = body.credits;

        await coupon.save();

        res.json({
            ok: true,
            msg :'El cupón se actualizó correctamente'
        });

    } catch (error) {
        console.log(error);
    }
}

const dltCouponByUserAdmin = async (req, res) => {
    try {

        console.log(req.body);

        const { _id } = req.body;
        const { kind } = req.user;

        if(kind && kind.trim() === 'admin') {
            return res.status(401).json({
                ok: false,
                msg: 'Acceso prohibido para la operación'
            });
        }
        
        const coupon = await Coupon.findById(_id);

        if(!coupon) {
            return res.status(404).json({
                ok: false,
                msg: 'El cupón no ha sido actualizado'
            });
        }

        await coupon.updateOne({ status: false });

        res.json({
            ok: false,
            msg: 'Eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
    }
}

const getCouponsByAdmin = async (req, res) => {
    try {
        
        const coupons = await Coupon.find({ status: true });

        res.json({
            ok: true,
            coupons
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        });
    }
}

const addCreditsForCustomer = async (req, res) => {
    try {
        
        const user = req.user;
        const { numcoupon } = req.body;

        const customer = await Customer.findById(user._id);

        const coupon = await Coupon.findOne({ serie: numcoupon, status: true });

        if(!coupon || coupon === undefined || coupon === null) {
            return res.json({
                ok: false,
                msg: 'El cupón ha sido activado o no es correcto'
            });
        }

        const couponCustomer = new CouponCustomer({
            couponId: coupon._id,
            customerId: customer._id,
            received: coupon.credits,
            customerNames: customer.names + ' ' + customer.lastnames,
            description: `${customer.names + ' ' + customer.lastnames} recibió ${coupon.credits} créditos`
        });

        const couponCust = await CouponCustomer.find({ customerId: customer._id, couponId: coupon._id });

        if(coupon.kind !== 'premium' && couponCust) {
            return res.json({
                ok: false,
                msg: 'Ya usó este cupón anteriormente'
            });
        }

        if(coupon.count <= 0) {
            return res.json({
                ok: false,
                msg: 'Este cupón está descontinuado'
            });
        }

        await couponCustomer.save();

        coupon.count--;
        customer.credits += coupon.credits;

        await coupon.save();
        await Customer.findByIdAndUpdate(customer._id, customer);

        res.json({
            ok: true,
            msg: 'Aumentó correctamente'
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
    addCouponByUserAdmin,
    updCouponByUserAdmin,
    dltCouponByUserAdmin,
    addCreditsForCustomer,
    getCouponsByAdmin
}