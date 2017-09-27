# Node.js NHTSA API

[![Node.js](https://img.shields.io/badge/Powered_by-NodeJS-green.svg?style=flat)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Powered_by-expressjs-white.svg?style=flat)](https://expressjs.com/)

## Requirements

* [Node.js 6.1](https://nodejs.org/en/download/)


## Basic setup instructions

1. Clone this repo: `git clone git@github.com:dpotocic/nodejs-api-nhtsa.git`
2. Move into newly created directory: `cd nodejs-api-nhtsa/`
3. Install dependencies using [Npm](https://nodejs.org/en/download/): `npm install`
4. npm install -g nodemon (OPTIONAL)
5. Run server: `npm start`
6. API available on http://localhost:8888


## ENDPOINTS AVAILABLE:

```
- GET http://localhost:8888/vehicles/<MODEL YEAR>/<MANUFACTURER>/<MODEL>?withRating=true
```

```
- POST http://localhost:8888/vehicles
```

With application/JSON body:

```
{
    "modelYear": 2015,
    "manufacturer": "Audi",
    "model": "A3"
}
```

## Requirements

[Guidelines for this project](docs/node-api-assignment.md)