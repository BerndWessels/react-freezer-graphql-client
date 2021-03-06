/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import q from 'q';
import task from './lib/task';

import react from 'react/package.json';
import reactDom from 'react-dom/package.json';

// Save JSON of full schema introspection for Babel Relay Plugin to use
export default task('update externals', async () => {

    // make sure the externals folder exists
    if(!fs.existsSync(path.join(__dirname, '../public/externals'))){
        fs.mkdirSync(path.join(__dirname, '../public/externals'));
    }
    // react
    console.log('copying react v' + react.version);
    fs.writeFileSync(path.join(__dirname, '../public/externals/react-with-addons.' + react.version + '.js'), fs.readFileSync(path.join(__dirname, '../node_modules/react/dist/react-with-addons.js')));
    fs.writeFileSync(path.join(__dirname, '../public/externals/react-with-addons.' + react.version + '.min.js'), fs.readFileSync(path.join(__dirname, '../node_modules/react/dist/react-with-addons.min.js')));

    // react dom
    console.log('copying react-dom v' + reactDom.version);
    fs.writeFileSync(path.join(__dirname, '../public/externals/react-dom.' + reactDom.version + '.js'), fs.readFileSync(path.join(__dirname, '../node_modules/react-dom/dist/react-dom.js')));
    fs.writeFileSync(path.join(__dirname, '../public/externals/react-dom.' + reactDom.version + '.min.js'), fs.readFileSync(path.join(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')));

    // update the index.ejs
    console.log('updating index.ejs');
    var indexFile = path.join(__dirname, '../src/index.ejs');
    await q.nfcall(fs.readFile, indexFile)
        .then((data)=> {
            var newScriptTags = '\n' +
                '<script src="externals/react-with-addons.' + react.version + '.js"></script>\n' +
                '<script src="externals/react-dom.' + reactDom.version + '.js"></script>\n';
            data = data.toString();
            data = data.replace(/(<!--\s*import:start\s*-->)([\s\S]*)(<!--\s*import:end\s*-->)/gim, '$1' + newScriptTags + '$3');
            return q.nfcall(fs.writeFile, indexFile, data);
        })
        .fail((err)=> {
            console.error('Error received:', err);
        });
});
