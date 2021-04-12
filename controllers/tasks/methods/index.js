const { fetch } = require('./get');
const { create } = require('./post');
const { update } = require('./put');
const { destroy } = require('./delete');

module.exports = {
    fetch,
    create,
    update,
    destroy
}
