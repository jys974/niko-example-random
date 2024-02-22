#!/usr/bin/env node

const moment = require('moment');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ tasks: [] }).write();

function startTask(name) {
    const task = {
        name,
        startTime: new Date(),
        endTime: null,
        duration: null
    };
    db.get('tasks').push(task).write();
    console.log(`Task "${name}" started at ${moment(task.startTime).format('YYYY-MM-DD HH:mm:ss')}`);
}

function endTask(name) {
    const task = db.get('tasks').find({ name, endTime: null }).value();
    if (task) {
        task.endTime = new Date();
        task.duration = moment(task.endTime).diff(moment(task.startTime), 'seconds');
        db.get('tasks').find({ name }).assign(task).write();
        console.log(`Task "${name}" ended at ${moment(task.endTime).format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(`Total duration: ${task.duration} seconds`);
    } else {
        console.log(`No active task named "${name}" found.`);
    }
}

// Sample usage
startTask('Sample Task');
setTimeout(() => endTask('Sample Task'), 5000); // Ends the task after 5 seconds
