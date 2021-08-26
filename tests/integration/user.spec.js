const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index");
// const { loginUser } = require("../../src/services/user.service");

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
                    userId = res.body.data.id;
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

        it('should fail login user without password - 400', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .set('Accept', 'application/json')
                .send({
                    email: "ekankam@gmail.com"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('password is required');
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
                    userToken = res.body.data.token;
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Authentication successful');
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.user).to.be.an('object');
                    done();
                })
        });

        it('should get all users - 200', (done) => {
            request(app)
                .get('/api/v1/users')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.boody.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Users fetched successfully');
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        });

        it('should get single user - 200', (done) => {
            request(app)
                .get(`/api/v1/users/${userId}`)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('User returned successfully');
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        });

        it('should fail create user_pin without pin - 400', (done) => {
            request(app)
                .post('/api/v1/user-pin')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('pin is required');
                    done();
                })
        });

        it('should create user_pin - 201', (done) => {
            request(app)
                .post('/api/v1/user-pin')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    pin: "1212"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Pin created successfully');
                    expect(res.body.code).to.be.equal(201);
                    expect(res.body.data).to.be.an('object');
                    done();
                })
        });

        it('should fail fund transfer without account_number - 400', (done) => {
            request(app)
                .post('/api/v1/transfer')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    currency: "naira",
                    amount: "50000",
                    pin: "1212"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('account_number is required');
                    done();
                })
        });

        it('should fail fund transfer without pin - 400', (done) => {
            request(app)
                .post('/api/v1/transfer')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    currency: "naira",
                    account_number: "0332776311",
                    amount: "50000"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('pin is required');
                    done();
                })
        });

        it('should fail fund transfer without amount - 400', (done) => {
            request(app)
                .post('/api/v1/transfer')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    currency: "naira",
                    account_number: "0332776311",
                    pin: "1212"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('amount is required');
                    done();
                })
        });

        it('should fail fund transfer without currency - 400', (done) => {
            request(app)
                .post('/api/v1/transfer')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    account_number: "0332776311",
                    pin: "1212",
                    amount: "10000",
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('currency is required');
                    done();
                })
        });

        it('should transfer fund - 201', (done) => {
            request(app)
                .post('/api/v1/transfer')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({ 
                    currency: "naira",
                    account_number: "0332776311",
                    pin: "1212",
                    amount: "50000",
                })
                .end((err, res) => {
                    transferId = res.body.data.id;
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('transfer made successfully');
                    expect(res.body.code).to.be.equal(201);
                    expect(res.body.data).to.be.an('object');
                    done();
                })
        });

        it('should fail get single transfer without id - 404', (done) => {
            request(app)
                .get('/api/v1/transfer')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404);
                    expect(res.body.code).to.be.equal(404);
                    expect(res.body.message).to.be.equal('Ooops, route not found');
                    done();
                })
        });

        it('should get single transfer - 200', (done) => {
            request(app)
                .get(`/api/v1/transfer/${transferId}`)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('transaction returned successfully');
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        });

        it('should fail fund deposit without currency - 400', (done) => {
            request(app)
                .post('/api/v1/deposit')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    amount: "50000"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('currency is required');
                    done();
                })
        });

        it('should fail fund deposit without amount - 400', (done) => {
            request(app)
                .post('/api/v1/deposit')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    currency: "dollar"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('amount is required');
                    done();
                })
        });

        it('should deposit fund - 201', (done) => {
            request(app)
                .post('/api/v1/deposit')
                .set('Authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    currency: "dollar",
                    amount: "2000000"
                })
                .end((err, res) => {
                    depositId = res.body.data.id;
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('deposit made successfully');
                    expect(res.body.code).to.be.equal(201);
                    expect(res.body.data).to.be.an('object');
                    done();
                })
        });

        it('should fail get single deposit without id - 404', (done) => {
            request(app)
                .get('/api/v1/deposit')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(404);
                    expect(res.body.code).to.be.equal(404);
                    expect(res.body.message).to.be.equal('Ooops, route not found');
                    done();
                })
        });

        it('should get single deposit - 200', (done) => {
            request(app)
                .get(`/api/v1/deposit/${depositId}`)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('transaction returned successfully');
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        });
    });

    
})