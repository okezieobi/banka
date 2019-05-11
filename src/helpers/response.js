export default class Hypertext {
  static response(res, codeStatus, resKey, resValue) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
    };
    res.status(codeStatus).send(errRes);
  }

  static authResponse(res, codeStatus, resKey, resValue, token, ownerId, id) {
    const errRes = {
      status: codeStatus,
      [resKey]: resValue,
      headers: {
        [ownerId]: id,
        'access-token': token,
      },
    };
    res.status(codeStatus).set(errRes.headers).send(errRes);
  }
}
