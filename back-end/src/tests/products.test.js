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

const mockNewProduct = {
  name: faker.commerce.product(),
  price: faker.commerce.price(5, 99, 2 ),
  urlImage: faker.image.food(),
};

const mockProductExists = {
  name: "Skol Lata 250ml",
  price: faker.commerce.price(),
  urlImage: faker.image.food(),
};
  
const mockNoNameProduct = {
  name: "",
  price: faker.commerce.price(),
  urlImage: faker.image.food(),
};
  
const mockNoPriceProduct = {
  name: faker.commerce.product(),
  urlImage: faker.image.food(),
};
  
const randomBigNumber = getRandomInt(500, 5000);
  
const mockEditedProduct = {
  name: `Produto de teste - Id: ${randomBigNumber}`,
  price: 10.0,
  urlImage: faker.image.food(),
};
  
const mockProductToDelete = {
  name: faker.commerce.product(),
  price: faker.commerce.price(5, 99, 2),
  urlImage: faker.image.food(),
}; 

const requestPostHelper = async (endpoint, body) => {
  return chai.request(app).post(endpoint).send(body).set("Authorization", token);
};
  
const requestGetHelper = async (endpoint) => {
  return chai.request(app).get(endpoint).set("Authorization", token);
};
  
const requestPutHelper = async (endpoint, body) => {
  return chai.request(app).put(endpoint).send(body).set("Authorization", token);
};
  
const requestDeleteHelper = async (endpoint) => {
  return chai.request(app).delete(endpoint).set("Authorization", token);
};

describe('Route test "/products"', () => {
  describe('Test method POST "/products"', () => {
    it("Return http status 201 - CREATED", async () => {
      const { status, body } = await requestPostHelper(
        "/products",
        mockNewProduct
      );

      expect(status).to.be.equals(201);
      expect(body).to.be.an("object");
      expect(body).include(mockNewProduct);
    });
  
    
    it('Return http status 409 - CONFLICT, message: "product" is already in the database', async () => {
      const { status, body } = await requestPostHelper(
        "/products",
        mockProductExists
      );
  
      const expectedMessage = '"product" is already in the database';
  
      expect(status).to.be.equals(409);
      expect(body.message).include(expectedMessage);
    });
  
    it('Return http status 400 - BAD REQUEST, message: ""name" is not allowed to be empty"', async () => {
      const { status, body } = await requestPostHelper(
        "/products",
        mockNoNameProduct
      );
  
      const expectedMessage = '"name" is not allowed to be empty';
  
      expect(status).to.be.equals(400);
      expect(body.message).include(expectedMessage);
    });
  
    it('Return http status 400 - BAD REQUEST, message: ""price" is required"', async () => {
      const { status, body } = await requestPostHelper(
        "/products",
        mockNoPriceProduct
      );
  
      const expectedMessage = '"price" is required';
  
      expect(status).to.be.equals(400);
      expect(body.message).include(expectedMessage);
    });
    
  });
  
  describe('Test method GET "/products"', () => {
    it("Return http status 200 - OK", async () => {
      const { status, body } = await requestGetHelper("/products");
  
      expect(status).to.be.equals(200);
      expect(body).to.be.an("array");
      expect(body).to.not.be.empty;
    });
  });
  
  describe('Test method GET "/products/:id"', () => {
    it("Return http status 200 - OK", async () => {
      const id = getRandomInt(3, 5);
      const { status, body } = await requestGetHelper(`/products/${id}`);
  
      expect(status).to.be.equals(200);
      expect(id).to.be.equals(body.id);
      expect(body).to.be.an("object");
    });
  
    it('Return http status 404 - NOT FOUND, message: ""product" not found"', async () => {
      const { status, body } = await requestGetHelper(
        `/products/${randomBigNumber}`
      );
  
      const expectedMessage = '"product" not found';
  
      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals(expectedMessage);
    });
  });
  
  describe('Teste method PUT "/products/:id"', () => {
    it("Return http status 200 - OK", async () => {
      const id = getRandomInt(1, 5);
  
      const { status } = await requestPutHelper(
        `/products/${id}`,
        mockEditedProduct
      );
  
      expect(status).to.be.equals(200);
    });
    it('Return http status 400 - BAD REQUEST, message: ""name" is not allowed to be empty"', async () => {
      const id = getRandomInt(1, 5);
  
      const { status, body } = await requestPutHelper(
        `/products/${id}`,
        mockNoNameProduct
      );
  
      const expectedMessage = '"name" is not allowed to be empty';
  
      expect(status).to.be.equals(400);
      expect(body.message).include(expectedMessage);
    });
    it('Return http status 400 - BAD REQUEST, message: ""price" is required"', async () => {
      const id = getRandomInt(1, 5);
  
      const { status, body } = await requestPutHelper(
        `/products/${id}`,
        mockNoPriceProduct
      );
  
      const expectedMessage = '"price" is required';
  
      expect(status).to.be.equals(400);
      expect(body.message).include(expectedMessage);
    });
  });
  
  describe('Test method DELETE "/products/:id"', () => {
    it("Return http status 204 - NO CONTENT ", async () => {
      const { body } = await requestPostHelper(
        "/products",
        mockProductToDelete
      );
  
      const id = body.id;
      const { status } = await requestDeleteHelper(`/products/${id}`);
  
      expect(status).to.be.equals(204);
    });
  
    it('Return http status 404 - NOT FOUND, message: ""product" not found"', async () => {
      const { status, body } = await requestDeleteHelper(
        `/products/${randomBigNumber}`
      );
  
      const expectedMessage = '"product" not found';
  
      expect(status).to.be.equals(404);
      expect(body.message).to.be.equals(expectedMessage);
    });
  });
  
});