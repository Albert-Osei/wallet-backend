const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index");
const { loginUser } = require("../../src/services/user.service");

describe('User APIs', async () => {
    describe('Signup user - 400 codes', () => {
        it('should fail signing up a new user without first_name - 400', (done) => {
            request(app)
            .post('/api/v1/users/signup')
            .set('Accept', 'application/json')
            .send({
                lastname: "Kankam",
                email: "punicek@gmail.com",
                phonenumber: "023284671",
                password: "Punicek123"
            })
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal('first_name is required');
                done();
            });
        });

        it('should sign up user - 201', (done) => {
            request(app)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    first_name: "Emily",
                    last_name: "Kankam",
                    email: "ekankam@gmail.com",
                    phonenumber: "0231190456",
                    password: "Ekankam123"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.code).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Hello! ekankam@gmail.com you have been signed up');
                    expect(res.body.data).to.be.an('object');
                    done();
                });
        });

        it('should fail login user without email - 400', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .set('Accept', 'application/json')
                .send({
                    password: "Ekankam123"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('email is required');
                    done();
                })
        });

        it('should login user - 200', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .set('Accept', 'application/json')
                .send({
                    email: "ekankam@gmail.com",
                    password: "Ekankam123"
                })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Authentication successful');
                    expect(res.body.code).to.be.equal(200);
                    expect()
                    done();
                })
        });
    });

    
})