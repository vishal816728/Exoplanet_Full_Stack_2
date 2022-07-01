// we are testing against the api so we need the addiontional library to make request  "SuperTest"  

const request=require('supertest')
const app=require('../../app')

describe("Test GET/launches",()=>{
    test("It Should return the correct response",async()=>{
        const response=await request(app).get('/launches')
        expect(response.statusCode).toBe(200)
    })

})

describe("Test post/ Launchesdata",()=>{
    let launchdata={
        launchDate:"feb 19,2029",
        mission:"KEPl 159",
        rocket:"Arwes-k2251",
        target:"kepler-62 b"
      }
      let launchDataWithoutDate={
        mission:"KEPl 159",
        rocket:"Arwes-k2251",
        target:"kepler-62 b"
      }
    test("It should return the 201 created",async()=>{
          const response=await request(app).post('/launches')
          .send(launchdata)
          .expect(201)

          const reqDate=new Date(launchdata.launchDate).valueOf()
          const responseDate=new Date(response.body.launchDate).valueOf()
          expect(reqDate).toBe(responseDate)
          expect(launchdata).toMatchObject(launchDataWithoutDate)
    })

    test("If the Data is missing",async ()=>{
        const response=await request(app).post('/launches')
        .send(launchDataWithoutDate)
        .expect(400)
        .expect(response.body).toStrictlyMatch(
            {
                "error":"Wrong Date"
            }
        )
    })
})