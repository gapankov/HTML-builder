const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pathToFile = path.join('02-write-file', 'text.txt');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let fileText = fs.createWriteStream(pathToFile);

readline. emitKeypressEvents(process.stdin);

process.stdin.on('keypress', (_, key) => {
    if(key && key.ctrl && key.name == 'c') {
        console.log('\nВы пожелали выйти и остановить запись!');
    }
});

function write() {
    rl.question('Напишите что-нибудь - ', (text) => {
        console.log(text);
        if(text.toLocaleLowerCase() === 'exit') {
            console.log('\nВы пожелали выйти и остановить запись!');
            rl.close();
            return;
        }
        fileText.write(text + "\n", (err) => {
            if(err) {
                console.log(err.message);
            } else {
                write(); 
            }
        })
    })
}

write();