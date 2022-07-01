const express=require('express')
const getTheLaunches=require('./launches.controller')
 const launchesRouter=express.Router()

 launchesRouter.get('/launches',getTheLaunches.httpGetAllLaunches)

 launchesRouter.post('/launches',getTheLaunches.httpAddNewLaunch)

 launchesRouter.delete('/launches/:id',getTheLaunches.httpAbortLaunch)

 module.exports={
     launchesRouter
 }