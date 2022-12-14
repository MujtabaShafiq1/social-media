const router = require("express").Router();
const passport = require("passport");
const { login, register } = require("../controllers/auth");

router.post("/register", register);

router.get("/login/success", login);

router.get("/login/failed", (req, res) => {
    res.status(401).json({ success: false, message: "Invalid Credentials" });
});


router.get("/logout", (req, res) => {
    req.session = null
    req.logout();
    res.redirect(`${process.env.CLIENT_URL}login`);
});


router.post('/login', passport.authenticate("local", {
    successRedirect: "login/success",
    failureRedirect: "login/failed",
}))


router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get("/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}));


router.get("/google", passport.authenticate("google", { scope: ['openid', 'email', 'profile'] }));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}));


router.get("/steam", passport.authenticate("steam", { scope: ["profile"] }));
router.get("/steam/callback", passport.authenticate("steam", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}));


module.exports = router