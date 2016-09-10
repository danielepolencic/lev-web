'use strict';

// Add mixins to browser
// //////////////////////////////////////////////////////////////////////
const mixins = [
  require('../mixins/login'),
  require('../mixins/search'),
  require('../mixins/results'),
  require('../mixins/details'),
  require('../mixins/logout')
];

before(() => {
  mixins.forEach(mixin => mixin(browser));
});
