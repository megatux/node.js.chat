'use strict'

const request = require('superagent');
const chai = require('chai');
const expect = chai.expect;
const jq = require("chai-jq");
chai.use(jq);

const server = require('../server.js');

describe('HTTP Server', function(){
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });

  it('should say hello', function(done){
    request.get('http://localhost:8080/').end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain("Hola Node");
      done();
    });
  })
})
