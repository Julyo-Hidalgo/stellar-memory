/*botao menu */
document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const sideMenu = document.getElementById('side_menu');

    // VERIFICA SE OS ELEMENTOS EXISTEM ANTES DE ADICIONAR EVENT LISTENERS
    if (menuToggleButton && sideMenu) {
        menuToggleButton.addEventListener('click', function() {
            sideMenu.classList.toggle('show');
        });
    }
});
