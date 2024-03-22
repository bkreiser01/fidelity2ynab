require('dotenv').config()

const { startImap } = require("./imap.js")

function existingVars(vars) {
    let var_arr = []
    for (let name of vars) {
        if (process.env[name] !== undefined) {
            var_arr.push(name)
        }
    }
    return var_arr;
}

let requiredVars = [
    'YNAB_PRIVATE_TOKEN',
    'YNAB_BUDGET_ID',
    'YNAB_ACCOUNT_ID',
    'FIDELITY_EMAIL_NAME',
    'IMAP_USER',
    'IMAP_PASSWORD',
    'IMAP_HOST',
    'IMAP_PORT'
];

if (requiredVars.length != existingVars(requiredVars).length) {
    console.error('Missing required enviroment variables')
} else {
    startImap()
}