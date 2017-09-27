var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');


router.get('/:year/:manufacturer/:model', function(req, res, next) {
    console.log(req.params);
    if (req.params.year && req.params.manufacturer && req.params.model) {
        Vehicle.callApi(req.params.year, req.params.manufacturer, req.params.model).then(function(data){
            res.json(Vehicle.processData(data));
        });
    } else {
        res.json(Vehicle.processData({}));
    }
});

router.post('/', function(req, res, next) {
    var params = req.body;
    console.log(params);
    if (params.modelYear && params.manufacturer && params.model){
        Vehicle.callApi(params.modelYear, params.manufacturer, params.model).then(function(data){
            res.json(Vehicle.processData(data));
        });
    }else{
        res.json(Vehicle.processData({}));
    }
});


module.exports = router;