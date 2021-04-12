module.exports = (response) => {

    let formatedResponse = {
        isBase64Encoded: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (response?.['body']) response['body'] = JSON.stringify(response['body']);
    else response['body'] = 'null';

    return { ... response, ...formatedResponse };

}
