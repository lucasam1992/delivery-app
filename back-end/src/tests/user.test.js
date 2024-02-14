const chai = require('chai');
const { expect } = require('chai');
const faker = require('faker');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzA3ODc0MzY3LCJleHAiOjE3MDg0NzkxNjd9.sfYSE0B6CSCv_hE8LHmP166uh6I0ZTqOESHsGPt8FnA';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
  
const mockNewUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
  
const mockNewUserToDelete = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
  
const randomBigNumber = getRandomInt(500, 5000);
  
const mockEditedUser = {
  name: `User test - Id: ${randomBigNumber}`,
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: "customer",
};
  
const mockEditedInvalidPassword = {
  name: `User test - Id: ${randomBigNumber}`,
  email: faker.internet.email(),
  password: "",
  role: "customer",
};
  
const mockInvalidUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: "",
};

const requestPostHelper = async (endpoint, body) => {
  return chai.request(app).post(endpoint).send(body);
};
  
const requestGetHelper = async (endpoint) => {
  return chai.request(app).get(endpoint).set("Authorization", token);
};
  
const requestPutHelper = async (endpoint, body) => {
  return chai.request(app).put(endpoint).send(body).set("Authorization", token);
};
  
const requestDeleteHelper = async (endpoint, body) => {
  return chai.request(app).delete(endpoint).send(body).set("Authorization", token);
};

describe('Route test "/users"', () => {
    describe('Test method POST "/users/register"', () => {
      it("Return http status 201 - CREATED", async () => {
        const { status, body } = await requestPostHelper(
          "/users/register",
          mockNewUser
        );
  
        const newUser = { ...mockNewUser };
        delete newUser.password;
  
        expect(status).to.be.equals(201);
        expect(body).include(newUser);
      });
  
      it('Return http status 406 - NOT ACCEPTABLE, message: "Password is required"', async () => {
        const { status, body } = await requestPostHelper(
          "/users/register",
          mockInvalidUser
        );
  
        const expectedMessage = '"password" is not allowed to be empty';
  
        expect(status).to.be.equals(400);
        expect(body.message).include(expectedMessage);
      });
    });

    describe('Test method GET "/users"', () => {
      it("Return http status 200 - OK", async () => {
        const { status, body } = await requestGetHelper("/users");
    
        expect(status).to.be.equals(200);
        expect(body).to.be.an("array");
        expect(body).to.not.be.empty;
      });
    });

    describe('Test method GET "/users/:id"', () => {
        it("Return http status 200 - OK", async () => {
          const id = getRandomInt(1, 5);
          const { status, body } = await requestGetHelper(`/users/${id}`);
    
          expect(status).to.be.equals(200);
          expect(id).to.be.equals(body.id);
          expect(body).to.be.an("object");
        });
    
        it('Return http status 404 - NOT FOUND, message: ""user" not found"', async () => {
          const id = getRandomInt(500, 1000);
    
          const { status, body } = await requestGetHelper(`/users/${id}`);
    
          const expectedMessage = '"user" not found';
    
          expect(status).to.be.equals(404);
          expect(body.message).to.be.equals(expectedMessage);
        });
      });

    describe('Test method PUT "/users/:id"', () => {
      it("Return http status 200 - OK", async () => {
        const id = getRandomInt(1, 5);
    
        const { status } = await requestPutHelper(`/users/${id}`, mockEditedUser);
    
        expect(status).to.be.equals(200);
      });
      it('Return http status 406 - NOT ACCEPTABLE, message: ""password" is not allowed to be empty"', async () => {
        const id = getRandomInt(1, 5);
    
        const { status, body } = await requestPutHelper(
          `/users/${id}`,
          mockEditedInvalidPassword
        );
    
        const expectedMessage = '"password" is not allowed to be empty';
    
        expect(status).to.be.equals(400);
        expect(body.message).to.be.equals(expectedMessage);
      });
    });
    
    describe('Test method DELETE "/users/:email"', () => {
      it('Return http status 200 - OK, message: "Usuário deletado com sucesso"', async () => {
        const { body } = await requestPostHelper(
          `/users/register`,
          mockNewUserToDelete
        );

        const emailTest = body.email;
        const { status } = await requestDeleteHelper(`/users/${emailTest}`);

        expect(status).to.be.equals(200);
      });
    
      it('Return http status 404 - NOT FOUND, message: ""user" not found"', async () => {
        const { status, body } = await requestDeleteHelper(
          `/users/${randomBigNumber}`
        );
    
        const expectedMessage = '"user" not found';
    
        expect(status).to.be.equals(404);
        expect(body.message).to.be.equals(expectedMessage);
      });
    });
});
