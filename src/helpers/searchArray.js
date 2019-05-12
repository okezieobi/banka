export default class SearchArray {
  static findById(array, param, arrayAny, paramAny) {
    const foundById = array.find(found => found[arrayAny] === parseInt(param[paramAny], 10));
    return foundById;
  }


  static findByValue(array, param, arrayAny, paramAny) {
    const foundByValue = array.find(found => found[arrayAny] === param[paramAny]);
    return foundByValue;
  }
}
