const inquirer = require('inquirer')
inquirer.prompt([
    {
        type: 'input',
        message: 'Entrez votre nom d\'utilisateur',
        name: 'username'
    }, {
        type: 'password',
        message: 'Entrez votre mot de passe',
        name: 'password'
    }, {
        type: 'checkbox',
        message: 'Que voulez-vous sauvegarder ?',
        name: 'foldersToSave',
        choices: [
            'Mes documents',
            'Mon bureau',
            'Ma musique'
        ]
    }
]).then((answers) => {
    console.log(answers)
})