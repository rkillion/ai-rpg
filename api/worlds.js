const router = require('express').Router();
const { World } = require('../models');
module.exports = router;

router.get('/', async (req, res, next) =>{
    try {
        const worlds = await World.findAll({
            where: {
                user: req.oidc.user.email
            }
        })
        res.send({worlds: worlds})
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.post('/', async (req, res, next) =>{
    try {
        let world = await World.create({
            user: req.oidc.user.email
        });
        res.send(world);
    } catch (err) {
        console.log(err);
        next(err);
    }
})