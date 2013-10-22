var diff = require('../');
var oDiff = diff.objectDiff;
var aDiff = diff.arrayDiff;

var expect = require('expect.js');

describe('difference', function () {

  describe('arrayDiff', function () {

    it('should return an array as result', function () {
      var res = aDiff([],[], 'a');
      expect(res).to.be.an(Array);
      expect(res).to.be.eql([]);
    });

    it('should return an array of changes if differente', function () {
      var res = aDiff([],[1], 'a');
      expect(res).to.be.an(Array);
      expect(res).to.be.eql([1]);
    });

    it('should support nested objects', function () {
      var res = aDiff([[]],[[]], 'a');
      expect(res).to.be.an(Array);
      expect(res).to.be.eql([]);
    });

    it('should support nested arrays with changes', function () {
      var res = aDiff([{ a:1 }],['a'], 'a');
      expect(res).to.be.an(Array);
      expect(res).to.be.eql(['a']);
    });

    it('should use `id` as key by default', function () {
      var res = aDiff([{ id:1 }],[{ id:1 }]);
      expect(res).to.be.an(Array);
      expect(res).to.be.eql([]);
    });

    it('should use `id` as key by default', function () {
      var res = aDiff([{ b:3 }],[{ a: 3 }, { c: 5 }]);
      expect(res).to.be.an(Array);
      expect(res).to.be.eql([]);
    });

    it('should throwException error if missing required arguments', function () {
      expect(aDiff).to.throwException(function (e) {
        expect(e.message).to.contain('Missing');
        expect(e.message).to.contain('argument');
      });

      expect(aDiff.bind(null, {})).to.throwException(function (e) {
        expect(e.message).to.contain('Missing');
        expect(e.message).to.contain('argument');
      });
    });

    it('should throwException error if arguments are not 2 arrays', function () {
      expect(aDiff.bind(null, {}, [])).to.throwException(function (e) {
        expect(e.message).to.contain('arguments');
        expect(e.message).to.contain('should be arrays');
      });

      expect(aDiff.bind(null, 1, 'a')).to.throwException(function (e) {
        expect(e.message).to.contain('arguments');
        expect(e.message).to.contain('should be arrays');
      });
    });
  });

  describe('objectDiff', function () {

    it('should return object if same object', function () {
      var res = oDiff({ a: 1 }, { a: 2 });
      expect(res).to.an('object');
    });

    it('should return true if same object', function () {
      var res = oDiff({ a: 1 }, { a: 1 });
      expect(res).to.be(true);
    });

    it('should only return changes on second object', function () {
      var res = oDiff({ a: 1 }, { a: 1, b: 2 });
      expect(res).to.eql({ b: 2 });
    });

    it('should only return value changes on second object', function () {
      var res = oDiff({ a: 1 }, { a: 2 });
      expect(res).to.eql({ a: 2 });
    });

    it('should support nested objects', function () {
      var res = oDiff({ a: { b: 1, c: 1 }}, { a: { b: 2, c: 1 }});
      expect(res).to.be.eql({ a: { b: 2 }});
    });

    it('should throwException error if missing argument', function () {
      expect(oDiff).to.throwException(function (e) {
        expect(e.message).to.contain('Missing');
        expect(e.message).to.contain('argument');
      });

      expect(oDiff.bind(null, {})).to.throwException(function (e) {
        expect(e.message).to.contain('Missing');
        expect(e.message).to.contain('argument');
      });
    });

    it('should throwException error if arguments are not objects', function () {
      expect(oDiff.bind(null, {}, 1)).to.throwException(function (e) {
        expect(e.message).to.contain('arguments');
        expect(e.message).to.contain('should be objects');
      });
    });

  });
});