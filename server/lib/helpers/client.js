'use strict';

const path = process.cwd() + '/client/';

function htmlPath(fileName) {
    return path + fileName + '.html';
}

module.exports = {
    path,
    htmlPath
};