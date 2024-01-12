#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

console.log(process.argv);

// fs.readdir('.', (err, filenames) => {
//     // EITHER
//     // err === an error object, which means something went wrong
//     // OR
//     // err === null, which means everything is Ok

//     if(err) {
//         // error handling code here
//         console.log(err);
//         // throw new Error(err);
//     }

//     console.log(filenames);
// });

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    })

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
        // console.log(filenames[index], stats.isFile());
    }

    // for(let filename of filenames) {
    //     try {
    //         const stats = await lstat(filename);
    //         console.log(filename, stats.isFile());
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // Method #1
    // console.log(filenames);

    // const allStats = Array(filenames.length).fill(null);

    // for(let filename of filenames) {
    //     const index = filenames.indexOf(filename);
    //     fs.lstat(filename, (err, stats) => {
    //         if (err) {
    //             console.log(err);
    //         }

    //         // console.log(filename, stats.isFile());

    //         allStats[index] = stats;

    //         const ready = allStats.every((stats) => {
    //             return stats;
    //         });

    //         if (ready) {
    //             allStats.forEach((stats, index) => {
    //                 console.log(filenames[index], stats.isFile());
    //             })      
    //         }
    //     })
    // }
})

// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }

//             resolve(stats);
//         })
//     })
// }

// The process module does not require a 'require' statement.
// The process module is automatically added into the global scope of every project.
// It does not have to be required ahead of time.

// chmod +x index.js, command used to give permission to run that file as an executable

// npm link, command used to make the current project globally available