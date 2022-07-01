const express=require('express')
const PlanetController=require('./planets.controller')

const planetRouter=express.Router()

planetRouter.get('/planets',PlanetController.getAllPlanets)


module.exports=planetRouter