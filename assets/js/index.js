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

            updateSlideNumber();
            updateObjectInformation();
        })

        // Update current slide number

        var slideNumber = document.getElementById('slide-number');

        var updateSlideNumber = function() {
            var number = flkty.selectedIndex;

            slideNumber.innerHTML = number;
        }

        // Populate object information with JSON

        var description = document.getElementById('description');

        var updateObjectInformation = function() {
            var number = flkty.selectedIndex - 1;
            
            description.innerHTML = number != -1 ? objects[number].information : '';
        }

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

        // Index

        var items = [].slice.call(document.getElementsByTagName('a')),
            number = document.getElementById('number'),
            list = document.getElementById('index'),
            duration = 100,
            timer;

        document.addEventListener('mouseover', function(e) {

            for (var i = 0; i < items.length; i++) {
                (function () {
                    var data = items[i].dataset.number;
    
                    items[i].addEventListener('mouseover', function() {

                        clearTimeout(timer);

                        timer = setTimeout(function() {

                            // number.style.transition = 'none';
                            number.style.opacity = 1;
                            number.innerHTML = data;
                        }, duration);
                    });
                }())
            }

            // console.log(e.target);

            // setTimeout(function() {
                if (!items.includes(e.target)) {
                    // number.style.transition = '1s';
                    number.style.opacity = 0;
                    clearTimeout(timer);
                }
            // }, duration);

        })


    },
    updateBodyClass : function() {
        document.body.className = ['', '#title-card'].includes(window.location.hash) ? 'title-card' : '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    site.init();
    // document.getElementById('title-card').innerHTML = objects[20].number
});