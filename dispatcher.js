const context = require('./middleware/context');
const format = require('./middleware/format');
const taskController = require('./controllers/tasks');

module.exports = async(controller, method, event) => {

    const controllers = {
        tasks: taskController
    }

    event = context(event);
    let response = await controllers[controller][method](event);
    response = format(response);

    return response;

}
