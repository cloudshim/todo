const methods = require('./methods');

module.exports = {

    get: (event) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await methods['fetch'](event);

                resolve(result);

            } catch (e) {

                console.log('Error in method GET into tasks controller');

                reject(e);

            }

        });

    },

    post: (event) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await methods['create'](event);

                resolve(result);

            } catch (e) {

                console.log('Error in method POST into tasks controller');

                reject(e);

            }

        });

    },

    put: (event) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await methods['update'](event);

                resolve(result);

            } catch (e) {

                console.log('Error in method PUT into tasks controller');

                reject(e);

            }

        });

    },

    delete: (event) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await methods['destroy'](event);

                resolve(result);

            } catch (e) {

                console.log('Error in method DELETE into tasks controller');

                reject(e);

            }

        });

    },

    option: (event) => {

        return new Promise((resolve) => resolve());

    }

}
