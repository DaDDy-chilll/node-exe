const express = require('express');
const request = require('supertest');
const app = require('../../app');
describe('Test GET /launches',()=>{
    test('It Should respond 200',()=>{
        const response = request(app)
        .get('/launches')
        .expect('Content-Type',/json/)
        .expect(200);
    })
});

describe('Test POST /launches',()=>{
      const completeData = {
        "mission":"Hello world",
        "rocket":"Exoplanets IS1",
        "launchDate":"January 5,2030",
        "target":"kepler-66 f",
        };
        
        const wrongDateData = {
        "mission":"Hello world",
        "rocket":"Exoplanets IS1",
        "launchDate":"z00",
        "target":"kepler-66 f",
        };
        
        const withoutPropertyData = {
        "mission":"Hello world",
        "rocket":"Exoplanets IS1",
        "launchDate":"z00",
        }
    test('It should respond 201 created',()=>{
       const response = request(app)
        .post("/launches")
        .send(completeData)
        .expect("Content-Type", /json/)
        .expect(201);
      const requestDate = new Date(completeData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(withoutPropertyData);
    });
    test('It should respond 400 missing launch property',()=>{
        const respond = request(app)
        .post('/launches')
        .send(withoutPropertyData)
        .expect('Content-Type',/json/)
        .expect(400);
        expect(respond.body).toStrictEqual({ 
            error:'Missing Launch property...'
            });
    });
    test('It should respond 400 invalid launch date',()=>{
        const respond = request(app)
        .post('/launches')
        .send(wrongDateData)
        .expect('Content-Type',/json/)
        .expect(400)
        expect(respond.body).toEqual({
            error:'Invalid launch Date...'
        })
    })
})