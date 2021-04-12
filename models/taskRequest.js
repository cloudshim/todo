const Ajv = require('ajv').default;
const ajv = new Ajv();

const JSONStructure = () => {
    return {};
};

const postMethodModel = {
    type: 'object',
    properties: {
        task: {
            type: 'string'
        },
        assignedTo: {
            type: 'string'
        },
        priority: {
            type: 'string',
            enum: ['High', 'Medium', 'Low']
        },
        dueDate: {
            type: 'string',
            pattern: '^(0?[1-9]|[12][0-9]|3[01])+(\\s)+(January|February|March|April|May|June|August|September|October|November|December)+(\\s)+(\\d{4})$'
        }
    },
    required: ['task', 'assignedTo', 'priority', 'dueDate'],
    additionalProperties: false
};

const putMethodModel = {
    type: 'object',
    properties: {
        projectId: {
            type: 'number'
        },
        task: {
            type: 'string'
        },
        assignedTo: {
            type: 'string'
        },
        priority: {
            type: 'string',
            enum: ['High', 'Medium', 'Low']
        },
        dueDate: {
            type: 'string',
            pattern: '^(0?[1-9]|[12][0-9]|3[01])+(\\s)+(January|February|March|April|May|June|August|September|October|November|December)+(\\s)+(\\d{4})$'
        }
    },
    required: ['projectId', 'task', 'assignedTo', 'priority', 'dueDate'],
    additionalProperties: false
};

const deleteMethodModel = {
    type: 'object',
    properties: {
        projectId: {
            type: 'number'
        }
    },
    required: ['projectId'],
    additionalProperties: false
};


const postMethodValidator = (m) => {

    let validate = ajv.compile(postMethodModel);
    let valid = validate(m);
    return [ valid, validate.errors ];

}

const putMethodValidator = (m) => {

    let validate = ajv.compile(putMethodModel);
    let valid = validate(m);
    return [ valid, validate.errors ];

}

const deleteMethodValidator = (m) => {

    let validate = ajv.compile(deleteMethodModel);
    let valid = validate(m);
    return [ valid, validate.errors ];

}

module.exports = {
    JSONStructure,
    postMethodValidator,
    putMethodValidator,
    deleteMethodValidator
}
