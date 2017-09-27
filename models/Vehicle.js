var request = require('request-promise');
var apiEndpoint = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/<MODELYEAR>/make/<MANUFACTURER>/model/<MODEL>?format=json';

var Vehicle = {
    /**
     *
     FROM
     {
        "Count": 4,
        "Message": "Results returned successfully",
        "Results": [
            {
                "VehicleDescription": "2017 Audi A3 4 DR AWD",
                "VehicleId": 11043
            },
            {
                "VehicleDescription": "2017 Audi A3 4 DR FWD",
                "VehicleId": 11044
            },
            {
                "VehicleDescription": "2017 Audi A3 C AWD",
                "VehicleId": 11388
            },
            {
                "VehicleDescription": "2017 Audi A3 C FWD",
                "VehicleId": 11389
            }
        ]
    }
    TO
    {
       Count: <NUMBER OF RESULTS>,
       Results: [
           {
               Description: "<VEHICLE DESCRIPTION>",
               VehicleId: <VEHICLE ID>
           },
           {
               Description: "<VEHICLE DESCRIPTION>",
               VehicleId: <VEHICLE ID>
           },
           {
               Description: "<VEHICLE DESCRIPTION>",
               VehicleId: <VEHICLE ID>
           },
           {
               Description: "<VEHICLE DESCRIPTION>",
               VehicleId: <VEHICLE ID>
           }
       ]
    }
     *
     */
    processData: function(data, callback) {
        var returnData = {};
        returnData.Count = data.Count ? data.Count : 0;
        returnData.Results = [];

        if (data.Results.length > 0){
            for (var i in data.Results) {
                var val = data.Results[i];
                var carDetails = {
                    Description : val.VehicleDescription,
                    VehicleId: val.VehicleId
                }
                returnData.Results.push(carDetails)
            }
        }
        console.log(returnData);
        return returnData;
    },
    callApi: function(carYear, carMan, carModel, callback) {
        console.log(carYear);
        console.log(carMan);
        console.log(carModel);
        var uri = apiEndpoint.replace('<MODELYEAR>',carYear);
        uri = uri.replace('<MANUFACTURER>',carMan);
        uri = uri.replace('<MODEL>',carModel);
        console.log(uri);
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