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
