import validator from 'validator';
validator.toString = function (input: any) {
  return String(input);
};
export default class extends think.Logic {
  __before() {
  }
}
