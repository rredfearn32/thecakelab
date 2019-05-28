var app = app || {
    header: null,
    parallaxSections: null,

    go: function() {
        app.setHeaderBackground();
        app.positionSprites();

        document.addEventListener('scroll', ev => {
            app.setHeaderBackground();
            app.positionSprites();
        });
    },

    setHeaderBackground: function() {
        if(!app.header) {
            app.header = document.querySelector('#header');
        }

        if(window.scrollY > 0) {
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

        app.parallaxSections.forEach(bgSection => {
            if(!bgSection.classList.contains('no-parallax')) {
                bgSection.style.backgroundPositionY = -(bgSection.getBoundingClientRect().top / 2) + 'px';
            }

            // Add watchers for sprites
            bgSection.querySelectorAll('.sprite').forEach(sprite => {
                if (sprite.dataset.direction === 'down') {
                    sprite.style.backgroundPositionY = -((bgSection.getBoundingClientRect().top / sprite.dataset.speed) - sprite.dataset.offsety) + 'px';
                } else if(sprite.dataset.direction === 'up') {
                    sprite.style.backgroundPositionY = (parseInt(sprite.dataset.offsety) + (parseInt(bgSection.getBoundingClientRect().top) * (sprite.dataset.speed / 2))) + (sprite.dataset.offsety.indexOf('px') > -1 || sprite.dataset.offsety.indexOf('%') > -1 ? '' : 'px');
                }

                if(sprite.dataset.scale) {
                    sprite.style.backgroundSize = parseInt(sprite.dataset.scale) - parseInt(bgSection.getBoundingClientRect().top) + (sprite.dataset.offsety.indexOf('px') > -1 || sprite.dataset.offsety.indexOf('%') > -1 ? '' : 'px');
                }

                if(sprite.dataset.offsetx) {
                    sprite.style.backgroundPositionX = sprite.dataset.offsetx;
                }

                if(sprite.dataset.rotate) {
                    sprite.style.transform = 'rotate(' + bgSection.getBoundingClientRect().top + 'deg)';
                }
            });
        });
    }
};