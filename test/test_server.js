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

  describe('serve main page', function(){

    it('should say hello', function(done){
      request.get(baseUrl + '/').end(
        function(err, res){
          checkPageResult(err, res, "Hola Node");
          done();
        })
      })

    it('should say hello', function(done){
      request.get(baseUrl + '/index.html').end(
        function(err, res){
          checkPageResult(err, res, "Hola Node");
          done();
        })
      })

    it('should say hello', function(done){
      request.get(baseUrl + '/index').end(
        function(err, res){
          checkPageResult(err, res, "Hola Node");
          done();
        })
      })
    })

  describe('serve non existing page', function(){
    it('should return 404', function(done){
      const word = randomWord();
      request.get(baseUrl + '/' + word).end(
        function(err, res){
          expect(res.status).to.equal(404);
          done();
        })
      })
    })

})

function randomWord() {
  return loremIpsum({count: 1, units: 'words'})
}

function checkPageResult(err, res, content) {
  expect(err).to.be.null;
  expect(res.status).to.equal(200);
  expect(res.text).to.contain(content);
}
