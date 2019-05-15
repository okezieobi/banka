export default class Protocol {
  static response(res, codeStatus, resKey, resValue) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
    };
    res.status(codeStatus).send(errRes);
  }

  static authResponse(res, codeStatus, resKey, resValue, token) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
      headers: {
        'access-token': token,
      },
    };
    res.status(codeStatus).set(errRes.headers).send(errRes);
  }

  static err400Res(res, err400Message) {
    const err400 = this.response(res, 400, 'error', err400Message);
    return err400;
  }

  static err404Res(res, err404Message) {
    const err404 = this.response(res, 404, 'error', err404Message);
    return err404;
  }

  static success200Res(res, success200Data) {
    const success200 = this.response(res, 200, 'data', success200Data);
    return success200;
  }

  static success200ResMessage(res, success200Message) {
    const success200 = this.response(res, 200, 'message', success200Message);
    return success200;
  }

  static success201Res(res, success201Data) {
    const success201 = this.response(res, 201, 'data', success201Data);
    return success201;
  }

  static auth201Res(res, auth201Data, token) {
    const auth201 = this.authResponse(res, 201, 'data', auth201Data, token);
    return auth201;
  }

  static auth200Res(res, auth201Data, token) {
    const auth200 = this.authResponse(res, 200, 'data', auth201Data, token);
    return auth200;
  }
}
