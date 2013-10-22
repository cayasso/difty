/**
 * Export `diff` method.
 */

module.exports = diff;

/**
 * Get diff objects of two arrays or objects.
 * 
 * @param {Array|Object} data1 The original array
 * @param {Array|Object} data2 The array to compare with
 * @param {String} [key] The objects key, its used only for arrays
 * @return {Array|Object} a new array or object with diffs.
 */

function diff(data1, data2, key) {

  var type1 = typeof data1
    , type2 = typeof data2
    , isArr1 = isArray(data1)
    , isArr2 = isArray(data2);

  if (isArr1) {
    return arrayDiff(data1, data2, key);
  }

  if ('object' === type1) {
    return objectDiff(data1, data2);
  }

  throw new Error('Arguments provided should be objects or arrays');
}

/**
 * Get diff of two objects.
 * 
 * @param {Object} obj1 The original object
 * @param {Object} obj2 The object to compare
 * @return {Object} a new object with diff fields.
 */

function objectDiff(obj1, obj2) {

  if (arguments.length < 2) {
    throw new Error('Missing required arguments');
  }

  if ('object' !== typeof obj1 || 'object' !== typeof obj2) {
    throw new Error('1st and 2nd arguments provided should be objects');
  }

  var res = {}, o1, o2, key, same = true;

  for (key in obj2) {

    o1 = obj1[key];
    o2 = obj2[key];

    if (o1 === o2) continue;

    if ('undefined' === typeof o1) {
      res[key] = o2;
      same = false;
    } else {
      if ('object' === typeof o2) {
        var o = objectDiff(o1, o2);
        if ('object' === typeof o) {
          res[key] = o;
          same = false;
        }
      } else {
        res[key] = o2;
        same = false;
      }
    }
  }

  return same || res;
}

/**
 * Get diff objects of two arrays.
 * 
 * @param {Array} arr1 The original array
 * @param {Array} arr2 The array to compare with
 * @param {String} key The objects key
 * @return {Array} a new array with diff objects.
 */

function arrayDiff(arr1, arr2, key) {

  if (arguments.length < 2) {
    throw new Error('Missing required arguments');
  }

  if (!(isArray(arr1) && isArray(arr2))) {
    throw new Error('1st and 2nd arguments provided should be arrays');
  }

  //if (!key) key = 'id';

  var res = [], id;

  arr1 = fetch(arr1, key);
  arr2 = fetch(arr2, key);

  for (id in arr2) {

    a1 = arr1[id];
    a2 = arr2[id];

    if (a1) {
      var o = objectDiff(a1, a2);
      if ('object' === typeof o) {
        o.id = id;
        res.push(o);
      }
    } else {
      res.push(a2);
    }
  }
  return res;
}

/**
 * Fetch an object with the same key value.
 * 
 * @param {Array} arr The array
 * @param {String} key The key
 * @return {Object} a new object with diff fields.
 */

function fetch(arr, key) {
  var obj = {}, item, i = 0, l = arr.length;
  for (; i < l; i++) {
    if ('undefined' === typeof key) continue;
    item = arr[i];
    obj[item[key]] = item;
  }
  return obj;
}

/**
 * Check if object is an array.
 *
 * @params {Object} obj
 * @return {Boolean}
 */

function isArray (obj) {
  return '[object Array]' === Object.prototype.toString.call(obj);
}

/**
 * Expose methods
 */

diff.objectDiff = objectDiff;
diff.arrayDiff = arrayDiff;
