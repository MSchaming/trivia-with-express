const express = require('express');
const router = express.Router();
const  { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashID = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashID}?side=question`)
});



router.get('/:id', (req, res) => {
    const name = req.cookies.username;
    const  { side }  = req.query;
    const { id } = req.params;

    if ( side != 'question' && side != 'answer') {
        res.redirect(`/cards/${id}?side=question`);
    }


    const text = cards[id][side]; //grabbing value inside of either question or answer from json file
    const { hint } = cards[id];

    const templateData = {text, name};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.link = 'answer';
        templateData.linkDisplay = 'Show Answer'
    } else if (side === 'answer') {
        templateData.link = 'question';
        templateData.linkDisplay = 'Show Question';
    }
    
    res.render('card', templateData)

    });

    module.exports = router;