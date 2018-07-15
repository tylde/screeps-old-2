module.exports = {
  getMemoryObjectPropCount: function (object) {
    if (object) return Object.getOwnPropertyNames(object).length;
    else return 0;

  }
}