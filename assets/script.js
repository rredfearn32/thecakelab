const app = {
    go: function() {
        this.startEventListeners();
    },

    startEventListeners: function() {
        document.querySelector('#mobile-menu-button').addEventListener('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            document.querySelector('header nav').classList.add('open');
        
            document.addEventListener('click', app.handleBodyClickToCloseMenu);
        });
    },
    
    handleBodyClickToCloseMenu: function() {
        document.querySelector('header nav').classList.remove('open');
        document.removeEventListener('click', app.handleBodyClickToCloseMenu);
    }
};

app.go();
