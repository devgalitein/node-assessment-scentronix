const async = require('async')
const axios = require('axios')
const { server } = require('./constants')

const getHttpRequest = (server) => {
    return function (callback) {
        axios(
            {
                method: 'get',
                url: server.url,
                // timeout: 5000
            }
        )
            .then(res => {
                server.status = res.status;
                if (res.status >= 200 && res.status <= 299) {
                    server.response = 1;
                    callback(null, server)
                }
                else {
                    server.response = 0;
                    callback(null, server);
                }
            })
            .catch(err => {
                
                server.response = 0;
                callback(null, server);
            })
    }
}

exports.findServer = async () => {
    return new Promise(async function (resolve, reject) {
        let parallels = [];

        for (let i in server) {
            parallels = [...parallels, getHttpRequest(server[i])];
        }
        async.parallel(parallels, function (err, results) {
            const result = results.filter((res) => {
                return res.response == 1;
            });
            result.sort(function (a, b) {
                return b.priority - a.priority;
            });
            if (result && result.length > 0) {
                resolve(result[0])
            }
            else {
                reject("server offline")
            }
        });
    });
}