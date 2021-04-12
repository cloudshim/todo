const { getObject, putObject } = require('./../../../services/s3');
const { JSONStructure, putMethodValidator } = require('./../../../models/taskRequest');

module.exports = {

    update: (event) => {
        return new Promise(async(resolve, reject) => {

            let response = {
                statusCode: 200,
                body: null
            }

            try {
                console.log('Request PUT');
                let { body: request } = event;

                let [ valid, errors ] = putMethodValidator(request);
                console.log('Validation request', valid);

                if (valid) {
                    let bucket = process.env.S3_BUCKET;
                    let key = process.env.S3_KEY;
                    let tasks = await getObject({ bucket, key });
                    console.log('Tasks from S3', JSON.stringify(tasks));

                    let projectId = request['projectId'];
                    delete request['projectId'];

                    if (!tasks) tasks = JSONStructure();

                    if (!tasks?.[projectId]) {
                        response['statusCode'] = 400;
                        response['body'] = { message: 'Task not exists' };
                    } else {
                        tasks[projectId] = request;
                        console.log('Tasks to S3', JSON.stringify(tasks));
                        await putObject({ bucket, key, body: tasks, contentType: 'application/json' });
                        response['body'] = tasks;
                    }
                } else {
                    ([ errors ] = errors);
                    response['statusCode'] = 400;
                    response['body'] = errors;
                }

                console.log('Response PUT', JSON.stringify(response));
                resolve(response);
            } catch (e) {
                console.log('Error in method PUT');
                reject(e);
            }
        });
    }
}
