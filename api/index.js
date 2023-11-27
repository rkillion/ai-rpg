const { requiresAuth } = require("express-openid-connect");

const router = require("express").Router();
module.exports = router;

// req.isAuthenticated is provided from the auth router
router.get('/me', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(JSON.stringify(req.oidc.user, null, 2));
    } else {
        res.status(403).send()
    }
});

router.use('/worlds', requiresAuth(), require('./worlds'))

router.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });