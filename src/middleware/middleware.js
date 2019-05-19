export default class Middleware {
  static routeCallbacks(...methods) {
    const callbacks = methods.map(method => (...args) => { method(...args); });
    return callbacks;
  }
}
