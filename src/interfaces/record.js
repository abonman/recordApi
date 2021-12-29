/* this part will work more efficient after transforming to "TypeScript"*/
class RecordRequest {
    constructor(body) {
        this.startDate = (new Date(body["startDate"]) !== "Invalid Date") && !isNaN(new Date(body["startDate"])) ? body["startDate"] : null
        this.endDate = (new Date(body["endDate"]) !== "Invalid Date") && !isNaN(new Date(body["endDate"])) ? body["endDate"] : null
        this.minCount = typeof body["minCount"] == 'number' ? body["minCount"] : null
        this.maxCount = typeof body["maxCount"] == 'number' ? body["maxCount"] : null
    }
    "startDate" = new Date();
    "endDate" = new Date();
    "minCount" = Number;
    "maxCount" = Number;

    check = () => {
        return !this.startDate || !this.endDate || !this.minCount || !this.maxCount ? false : true
    }
}

class RecordResponse {
    constructor(code, msg) {
        this.code = code
        this.msg = msg
        this.records = []
    }
    "code" = Number;
    "msg" = String;
    "records" = []
}

module.exports = { RecordRequest, RecordResponse }

