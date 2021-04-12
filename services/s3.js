const AWS = require('aws-sdk');
const S3 = new AWS.S3();

module.exports = {

    getObject: ({ bucket: Bucket, key: Key }) => {

        return new Promise(async(resolve, reject) => {

            let data;

            try {

                let { Body: body } = await S3.getObject({ Bucket, Key }).promise();
                if (body) data = JSON.parse(body);

                resolve(data);

            } catch (e) {

                if (e['statusCode'] == 404) resolve(data);
                else {

                    console.log('Error in getObject into S3 service');
                    reject(e);

                }

            }

        });

    },

    putObject: ({ bucket: Bucket, key: Key, body: Body, contentType: ContentType }) => {

        return new Promise(async(resolve, reject) => {

            try {

                if (ContentType === 'application/json') Body = JSON.stringify(Body);
                let result = await S3.putObject({ Bucket, Key, Body, ContentType }).promise();

                resolve(result);

            } catch (e) {

                console.log('Error in putObject into S3 service');
                reject(e);

            }

        });

    }

}
