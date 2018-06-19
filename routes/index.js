const fs = require('fs');
const express = require('express');
const router = express.Router();

const availableComponents = fs.readdirSync(`${__dirname}/../views/components`).map(component => {
	const name = component.split('.hbs')[0];
	return {
		name,
		path : `/component/${name}`
	};
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title : 'Available Components',
		components : availableComponents
	});
});

router.get('/component/:name', (req, res, next) => {

	fs.stat(`${__dirname}/../views/components/${req.params.name}.hbs`, (err) => {
		console.log(err);
		if(err){
			res.status(404);
			next();
		} else {
			res.render(`components/${req.params.name}`);
		}

	});


});

module.exports = router;
