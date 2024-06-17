// Script file to handle menu

const loginMenu = document.getElementById("login-menu");
const settingsMenu = document.getElementById("settings-menu");
const menuContainer = document.getElementById("menu-container");

class Menu {
    static currentMenu = null;

    static showMenu(menu) {
        Menu.currentMenu = menu;
        menu.style.display = "block";
        menuContainer.style.display = "flex";
    }

    static hideMenu() {
        Menu.currentMenu.style.display = "none";
        Menu.currentMenu = null;
        menuContainer.style.display = "none";
    }
}
