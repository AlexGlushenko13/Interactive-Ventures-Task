const Helper = require('@codeceptjs/helper');

class printResponse extends Helper {

  async getResponseData() {
    return this.helpers.JSONResponse.response.data
  }


}

module.exports = printResponse;
