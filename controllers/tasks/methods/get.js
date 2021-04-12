const { getObject } = require('./../../../services/s3');
const { JSONStructure } = require('./../../../models/taskRequest');

module.exports = {

    fetch: async(event) => {
        return new Promise(async(resolve, reject) => {

            let response = {
                statusCode: 200,
                body: null
            };

            try {
                console.log('Request GET');
                let bucket = process.env.S3_BUCKET;
                let key = process.env.S3_KEY;
                console.log('Params GET', JSON.stringify({ bucket, key }));

                let tasks = await getObject({ bucket, key });
                console.log('Result GET', JSON.stringify(tasks));

                if (!tasks) tasks = JSONStructure();

                if (tasks) response['body'] = tasks;

                console.log('Response GET', JSON.stringify(response));
                resolve(response);
            } catch (e) {
                console.log('Error in method GET');
                reject(e);
            }
        });
    }
}
