const { getObject, putObject } = require('./../../../services/s3');
const { JSONStructure, postMethodValidator } = require('./../../../models/taskRequest');

module.exports = {

    create: (event) => {

        return new Promise(async(resolve, reject) => {

            let response = {
                statusCode: 200,
                body: null
            }

            try {
                console.log('Request POST');
                console.log('Event', JSON.stringify(event));
                let { body: request } = event;

                let [ valid, errors ] = postMethodValidator(request);
                console.log('Validation request', valid);

                if (valid) {
                    let bucket = process.env.S3_BUCKET;
                    let key = process.env.S3_KEY;
                    let tasks = await getObject({ bucket, key });
                    console.log('Tasks from S3', JSON.stringify(tasks));

                    let currentDate = new Date();
                    let projectId = currentDate.getTime();

                    if (!tasks) tasks = JSONStructure();

                    tasks[projectId] = request;

                    console.log('Tasks to S3', JSON.stringify(tasks));
                    await putObject({ bucket, key, body: tasks, contentType: 'application/json' });
                    response['body'] = tasks;
                } else {
                    ([ errors ] = errors);
                    response['statusCode'] = 400;
                    response['body'] = errors;
                }

                console.log('Response POST', JSON.stringify(response));
                resolve(response);
            } catch (e) {
                console.log('Error in method POST');
                reject(e);
            }
        });
    }
}
