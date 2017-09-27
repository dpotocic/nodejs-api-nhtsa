var express = require('express');
var router = express.Router();
var Vehicle = require('../models/Vehicle');


router.get('/:year/:manufacturer/:model', function(req, res, next) {

    if (
            (!req.params.year || typeof (req.params.year) == 'undefined' || req.params.year == 'undefined' || isNaN(req.params.year) || parseInt(req.params.year) > (new Date()).getFullYear())
            ||
            (!req.params.manufacturer || typeof (req.params.manufacturer) == 'undefined' || req.params.manufacturer == 'undefined')
            ||
            (!req.params.model || typeof (req.params.model) == 'undefined' || req.params.model == 'undefined')
        )
    {

       res.json(Vehicle.processData({}));

    }else if (req.params.year && req.params.manufacturer && req.params.model) {
        var withRating = req.query && req.query.withRating && req.query.withRating === 'true' ? true : false;

        if (!withRating){
            Vehicle.callApi(req.params.year, req.params.manufacturer, req.params.model).then(function(data){
                res.json(Vehicle.processData(data));
            });
        }else{
            Vehicle.callApi(req.params.year, req.params.manufacturer, req.params.model).then(function(data){

                Promise.all(Vehicle.getRaitingData(data))
                 .then(function(resultObject) {

                     data.Results = resultObject;
                     res.json(Vehicle.processData(data));

                 }, function(reason) {
                     res.sendStatus(500);
                     console.error(reason);
                 });

             });
        }


    } else {
        res.json(Vehicle.processData({}));
    }
});

router.post('/', function(req, res, next) {
    var params = req.body;
    if (params.modelYear && params.manufacturer && params.model){
        Vehicle.callApi(params.modelYear, params.manufacturer, params.model).then(function(data){
            res.json(Vehicle.processData(data));
        });
    }else{
        res.json(Vehicle.processData({}));
    }
});


module.exports = router;