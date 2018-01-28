var site = {
    main  : {},
    flkty : {},
    init  : function() {
        site.updateBodyClass();

        // Flickity init

        main = document.getElementById('carousel');
        flkty = new Flickity(main, {
            pageDots: false,
            draggable: false,
            selectedAttraction: 1,
            friction: 1
        });
        main.focus();
        main.style.opacity = 1;

        // Menu functionality

        var informationToggle = document.getElementById('information-toggle'),
            information = document.getElementById('information');
    
        informationToggle.onclick = function() {
            if (!isOpen()) {
                updateMenu(false);
            }
        };

        // Flickity slide change

        flkty.on('settle', function() {
            var id = document.querySelector('.is-selected').id;
    
            if (id) {
                window.location.hash = '#' + id;
            }
            site.updateBodyClass();
            main.focus();
        })

        // Go to slide based on hash

        if (window.location.hash) {
            flkty.selectCell(window.location.hash);
        }

        window.onhashchange = function() {
            if (isOpen()) {
                updateMenu(true);
            }
            flkty.selectCell(window.location.hash);
        }

        var updateMenu = function(close) {
            close ? information.classList.remove('open') : information.classList.add('open');
        }

        var isOpen = function() {
            return information.classList.contains('open');
        }
    },
    updateBodyClass : function() {
        document.body.className = ['', '#title-card'].includes(window.location.hash) ? 'title-card' : '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    site.init();
});