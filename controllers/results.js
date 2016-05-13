'use strict';

var api = require('../api');
var helpers = require('../lib/helpers');

module.exports = {

  query: function query(req, res, next) {
    if (req.query && (req.query.surname || req.query['system-number'])) {
      const username = req.headers['X-Auth-Username'] || req.headers['x-auth-username'];
      api.read(req.query, username)
        .then(function resolved(records) {
          if (records.length === 1) {
            res.redirect('/details/' + records[0]['system-number']);
          } else {
            res.render('pages/results', {
              count: records && records.length,
              records: records,
              query: req.query,
              querystring: helpers.serialize(req.query)
            });
          }
        }, function rejected(err) {
          if (err.name === 'NotFoundError') {
            res.render('pages/results', {
              count: 0,
              records: null,
              query: req.query,
              querystring: helpers.serialize(req.query)
            });
          }

          next((err instanceof(Error)) ? err : new Error(err), req, res, next);
        });
    } else {
      res.redirect('/');
    }
  }

};
