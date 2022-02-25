const {Menu, MenuItem} = require('electron');
const menu = new Menu();

function settupmenu() {
    menu.append(new MenuItem(
        // {
        //     label: 'Electron',
        //     submenu: [{
        //         role: 'help',
        //         accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        //         click: () => { console.log('Electron rocks!') }
        //     }]
        // },
        {
            label: 'Settings',
            submenu: [
                {
                    role: 'Add new tab'
                },
                {
                    role: 'History'
                },
                {
                    role: 'Downloads'
                },
                {
                    role: 'Settings'
                }
            ]
        }
    ));

    Menu.setApplicationMenu(menu);
}

module.exports.settupmenu =  settupmenu ;