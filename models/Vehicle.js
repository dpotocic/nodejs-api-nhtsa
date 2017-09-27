var request = require('request-promise');
var apiEndpoint = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/<MODELYEAR>/make/<MANUFACTURER>/model/<MODEL>?format=json';
var apiCarDetailsEndpoint = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/<ID>?format=json';

var Vehicle = {
    /**
     *
     * @param data
     * @returns {{}}
     */
    processData: function(data) {
        var returnData = {};
        returnData.Count = data.Count ? data.Count : 0;
        returnData.Results = [];

        if (data.Results && data.Results.length > 0){
            for (var i in data.Results) {
                var val = data.Results[i];
                var carDetails = {
                    Description : val.VehicleDescription,
                    VehicleId: val.VehicleId
                }
                if (val.CrashRating){
                    carDetails.CrashRating = val.CrashRating;
                }
                returnData.Results.push(carDetails)
            }
        }
        return returnData;
    },
    /**
     *
     * @param data
     * @returns {Array}
     */
    getRaitingData: function(data){
        var promises = [];

        if (data.Results && data.Results.length > 0){
            for (var i in data.Results) {
                var val = data.Results[i];
                promises.push(
                    Vehicle.callCarDetailsApi(val.VehicleId).then(function(apiData){

                        var carDetails = {
                            VehicleDescription : val.VehicleDescription,
                            VehicleId: val.VehicleId,
                            CrashRating: apiData && apiData.Results && apiData.Results[0] && apiData.Results[0].OverallRating && apiData.Results[0].OverallRating ?  apiData.Results[0].OverallRating : null
                        }

                        return carDetails;
                    })
                );
            }
        }

        return promises;

    },
    /**
     *
     * @param carYear
     * @param carMan
     * @param carModel
     * @param callback
     * @returns {*}
     */
    callApi: function(carYear, carMan, carModel, callback) {
        var uri = apiEndpoint.replace('<MODELYEAR>',carYear);
        uri = uri.replace('<MANUFACTURER>',carMan);
        uri = uri.replace('<MODEL>',carModel);

        return request({
            "method": "GET",
            "uri": uri,
            "json": true,
            "resolveWithFullResponse": true
        }).then(function(response) {
                return response.body;
        });
    },
    /**
     *
     * @param carId
     * @param callback
     * @returns {*}
     */
    callCarDetailsApi: function(carId, callback) {
        var uri = apiCarDetailsEndpoint.replace('<ID>',carId);

        return request({
            "method": "GET",
            "uri": uri,
            "json": true,
            "resolveWithFullResponse": true
        }).then(function(response) {
                return response.body;
        });
    }
};
module.exports = Vehicle;