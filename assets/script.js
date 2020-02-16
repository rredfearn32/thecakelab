const app = {
    parallaxSections: null,

    go: function() {
        app.positionParallaxSections();
        app.startEventListeners();
    },

    startEventListeners: function() {
        document.querySelector('#mobile-menu-button').addEventListener('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            document.querySelector('header nav').classList.add('open');
        
            document.addEventListener('click', app.handleBodyClickToCloseMenu);
        });

        document.addEventListener('scroll', function(ev) {
           app.positionParallaxSections(); 
        });
    },

    positionParallaxSections: function() {
        if(!app.parallaxSections) {
            app.parallaxSections = document.querySelectorAll('.parallax');
        }
        
        for(let i = 0; i < app.parallaxSections.length; i++) {
            let ps = app.parallaxSections[i];
            ps.style.backgroundPositionY = -(ps.getBoundingClientRect().top / 2) + 'px';
        }
    },
    
    handleBodyClickToCloseMenu: function() {
        document.querySelector('header nav').classList.remove('open');
        document.removeEventListener('click', app.handleBodyClickToCloseMenu);
    }
};

app.go();
