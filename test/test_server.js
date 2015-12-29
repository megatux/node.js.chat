'use strict'

const request = require('superagent');
const chai = require('chai');
const expect = chai.expect;
const loremIpsum = require('lorem-ipsum');
const jq = require("chai-jq");
chai.use(jq);

const server = require('../server.js');
const baseUrl = 'http://localhost:8080';

describe('HTTP Server', function(){
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });

  describe('any route', function(){

    it('should say hello on /', function(done){
      request.get(baseUrl + '/').end(
        function(err, res){
          checkPageResult(err, res, "Hola Node");
          done();
        })
      })

    it('should say hello on a random route', function(done){
      const word = loremIpsum({count: 1, units: 'words'})
      request.get(baseUrl + '/' + word).end(
        function(err, res){
          checkPageResult(err, res, "Hola Node");
          done();
        })
      })
    })
})

function checkPageResult(err, res, content) {
  expect(err).to.be.null;
  expect(res.status).to.equal(200);
  expect(res.text).to.contain(content);
}
