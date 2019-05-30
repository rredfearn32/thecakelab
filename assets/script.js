var app = app || {
    header: null,
    parallaxSections: null,
    gallery: null,

    go: function() {
        app.setHeaderBackground();
        app.positionSprites();
        app.galleryExpander();

        window.addEventListener('resize', function(ev){
            app.positionSprites();
        });

        document.addEventListener('scroll', function(ev) {
            app.setHeaderBackground();
            app.positionSprites();
        });

        document.querySelectorAll('.snaplink').forEach(function(link) {
            link.addEventListener('click', function(ev) {
                ev.preventDefault();
                let targetSection = document.querySelector(ev.target.getAttribute('href'));
                let scrollPos = targetSection.offsetTop - document.querySelector('#header').offsetHeight;

                window.scrollTo(0, scrollPos);
            });
        });

        document.querySelector('#mobile-menu-button').addEventListener('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            document.querySelector('header nav').classList.add('open');

            document.addEventListener('click', app.handleBodyClickToCloseMenu);
        });
    },

    handleBodyClickToCloseMenu: function(ev) {
        document.querySelector('header nav').classList.remove('open');
        document.removeEventListener('click', app.handleBodyClickToCloseMenu);
    },

    galleryExpander: function() {
        document.querySelector('#gallery-expander').addEventListener('click', function(ev) {
            ev.preventDefault();
            ev.target.remove();
            document.querySelector('#gallery').classList.add('expanded');
        });
    },

    setHeaderBackground: function() {
        if(!app.header) {
            app.header = document.querySelector('#header');
        }

        if(window.pageYOffset > 0) {
            if(app.header.classList.contains('white-bg')) {
                return;
            }
            app.header.classList.add('white-bg');
        } else {
            app.header.classList.remove('white-bg');
        }
    },

    positionSprites: function() {
        if(!app.parallaxSections) {
            app.parallaxSections = document.querySelectorAll('.parallax-bg');
        }

        if(document.body.clientWidth <= 768) {
            document.querySelectorAll('.sprite').forEach(function(sprite) {
                sprite.setAttribute('style', '');
            });
            return false;
        }

        app.parallaxSections.forEach(function(bgSection) {
            if(!bgSection.classList.contains('no-parallax')) {
                bgSection.style.backgroundPositionY = -(bgSection.getBoundingClientRect().top / 2) + 'px';
            }

            // Add watchers for sprites
            bgSection.querySelectorAll('.sprite').forEach(function(sprite) {
                if (sprite.dataset.direction === 'down') {
                    sprite.style.backgroundPositionY = -((bgSection.getBoundingClientRect().top / sprite.dataset.speed) - sprite.dataset.offsety) + 'px';
                } else if(sprite.dataset.direction === 'up') {
                    sprite.style.backgroundPositionY = (parseInt(sprite.dataset.offsety) + (parseInt(bgSection.getBoundingClientRect().top) * (sprite.dataset.speed / 2))) + (sprite.dataset.offsety.indexOf('px') > -1 || sprite.dataset.offsety.indexOf('%') > -1 ? '' : 'px');
                }
            });
        });
    }
};