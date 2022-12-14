
const app = require('../../app')
const request = require('supertest');
const {connectMongo,disconnectMongo} = require('../../services/mongo');

describe('Test Launch API',()=>{
  beforeAll(async ()=>{
    await connectMongo();
  });
  afterAll(async ()=>{
    await disconnectMongo();
  })
  
  
describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC D103-1",
    target: "Kepler-442 b",
    launchDate: "January 3,2030",
  };
  const launchDataWithoutData = {
    mission: "USS Enterprise",
    rocket: "NCC D103-1",
    target: "Kepler-442 b",
  };
  const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC D103-1",
    target: "Kepler-442 b",
    launchDate: "zooo",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDataWithoutData);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutData)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Missing Launch property...",
    });
  });
  test("It should catch ivalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch Date...",
    });
  });
});
})

