const express = require('express');

const router = express.Router();

const user = [
    {
        'Email' : 'user@email.com',
        'Password' : 'myPassword'
    }
]
router.get('/user', (req,res)=> {
    res.send(user);
});


module.exports = router;