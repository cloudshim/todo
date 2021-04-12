const dispatcher = require('./dispatcher');

exports.handler = async(event, context, callback) => {

    console.log('Event', JSON.stringify(event));

    let result;
    let error = null;

    try {

        let path = event.rawPath.split('/');
        const method = event.requestContext.http.method.toLowerCase();
        const controller = path[path.length - 1];
        result = await dispatcher(controller, method, event);

    } catch (e) {

        console.log('Error in TODO');
        console.log(e);

    }

	callback(error, result);

};
