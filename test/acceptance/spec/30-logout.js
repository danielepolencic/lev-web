'use strict';

var testConfig = require('../config');

if (testConfig.env !== 'local') {
  describe('When I logout', function () {

    beforeEach(function () {
      browser.url(testConfig.url);
      browser.click('#logout');
      var body = browser.getText('body');
      body.should.have.string('Username or email');
      body.should.have.string('Password');
    });

    it('then I have to login again before using the application', function () {
      browser.url(testConfig.url);
      var body = browser.getText('body');
      body.should.have.string('Username or email');
      body.should.have.string('Password');
    });

  });
}
