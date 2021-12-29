const mongoose = require('mongoose')
const { RecordRequest, RecordResponse } = require('../interfaces/record')

const FindRecords = async (req, res) => {

    /*
    Fill the RecordRequest with request body then check if request body is missing or wrong
    */
    const request = new RecordRequest(req.body)

    if (!request.check()) {
        res.status(400).json('Bad Request')
        return
    }

    //create response body and fill with initial values
    const recordResponse = new RecordResponse(0, "Success");

    /*
    Aggregation:
    *first match the dates between start and end date,
    *then project the requested columns include sum of "counts"(totalCount),
    *then take the totalcounts between min and max from project.
    */
    try {
        const records = mongoose.connection.db.collection('records')
        const resp = await records.aggregate(
            [
                {
                    $match: {
                        "createdAt": {
                            $gte: new Date(request.startDate),
                            $lt: new Date(request.endDate)
                        }
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "key": 1,
                        "createdAt": 1,
                        "totalCount": { $sum: "$counts" }
                    }
                },
                {
                    $match: {
                        "totalCount": {
                            $gte: request.minCount,
                            $lt: request.maxCount
                        }
                    }
                }
            ]
        ).toArray()

        if (resp.length === 0) {
            recordResponse.code = 1
            recordResponse.msg = 'records are not found'
            res.status(200).json(recordResponse)
        } else {
            recordResponse.records = resp
            res.status(200).json(recordResponse)
        }
    } catch (er) {
        console.error(er)
        res.status(500).json('server error')
    }
}

module.exports = { FindRecords }