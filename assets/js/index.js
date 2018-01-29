var site = {
    main  : {},
    flkty : {},
    id    : {},
    init  : function() {
        site.updateBodyClass();

        // Flickity init

        main = document.getElementById('carousel');
        flkty = new Flickity(main, {
            pageDots: false,
            draggable: false,
            selectedAttraction: 1,
            friction: 1,
            wrapAround: true
        });
        main.focus();
        main.style.opacity = 1;

        // Menu functionality

        var information = document.getElementById('information'),
            isOpen = false;

        document.getElementById('information-toggle').onclick = function() {
            isOpen = !isOpen;

            if (isOpen) {
                information.classList.add('open');
            }
        };

        // Flickity slide change

        flkty.on('settle', function() {
            id = document.querySelector('.is-selected').id;
    
            if (id.length) {
                window.location.hash = '#' + id;
            }

            site.updateBodyClass();

            if (!main.activeElement) {
                main.focus();
            }
        })

        // Go to slide based on hash

        if (window.location.hash) {
            flkty.selectCell(window.location.hash);
        }

        window.onhashchange = function() {
            if (isOpen) {
                information.classList.remove('open');
                isOpen = !isOpen;
            }
            flkty.selectCell(window.location.hash);
        }
    },
    updateBodyClass : function() {
        document.body.className = ['', '#title-card'].includes(window.location.hash) ? 'title-card' : '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    site.init();
});