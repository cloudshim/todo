module.exports = (event) => {

    if (event?.['body']) {

        if (event?.['headers']?.['content-type'] == 'application/json') event['body'] = JSON.parse(event['body']);

    }

    return event;

}
