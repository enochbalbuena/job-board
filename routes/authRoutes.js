const express = require('express');
const passport = require('passport');

const router = express.Router();

// GitHub login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log('GitHub login success, setting session user:', req.user);
    req.session.user = req.user;
    console.log('Session after login:', req.session);
    res.redirect('/api-docs');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.send('Logged out successfully');
    });
  });
});

// Debug route to see if a user is logged in
router.get('/whoami', (req, res) => {
  if (req.session.user) {
    res.json({ loggedInAs: req.session.user.username || req.session.user.displayName });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;
