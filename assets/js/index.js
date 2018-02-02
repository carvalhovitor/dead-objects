var site = {
    init : function() {

        // Flickity initialization

        var main = document.getElementById('carousel');
        var flkty = new Flickity(main, {
            pageDots: false,
            draggable: false,
            selectedAttraction: 1,
            friction: 1,
            wrapAround: true
        });

        main.style.opacity = 1;

        // Selects slide if the document has been loaded with a hash

        if (window.location.hash) {
            flkty.selectCell(window.location.hash);
        }

        // Adds class to body to hide the header on the first slide

        function updateBodyClass() {
            document.body.className = ['', '#title-card'].includes(window.location.hash) ? 'title-card' : '';
        }

        // Updates header information (current slide index and object information)
        // This function gets all the data from a JSON generated on home.php
        // All the JSON information was stored on the variable "objects"

        var counter = document.getElementById('slide-index');
        var title = document.getElementById('object-title');
        var year = document.getElementById('object-year');
        var dimensions = document.getElementById('object-dimensions');

        function updateHeader() {
            var index = flkty.selectedIndex - 1;
            var object = objects[index];

            counter.innerHTML = index != -1 ? flkty.selectedIndex : '';

            // Update the information only if the current slide
            // is not the first slide (Dead Objects title card).
            // Not all of the objects have year or dimensions, 
            // but they all have a title.
            if (index != -1) {
                title.innerHTML = object.title;
                year.innerHTML = object.year ? object.year : '';
                dimensions.innerHTML = object.dimensions ? object.dimensions : '';
            }
        }

        // Changes the window hash based on the id of the selected slide

        flkty.on('settle', function() {
            var id = document.querySelector('.is-selected').id;

            if (id.length) window.location.hash = '#' + id;
            if (!main.activeElement) main.focus();
            
            updateBodyClass();
            updateHeader();
        })

        // Menu functionality

        var aside = document.getElementsByTagName('aside')[0];
        var header = document.getElementsByTagName('header')[0];
        var buttons = header.getElementsByTagName('button');
        var target = {};
        var isOpen = false;
        
        for (var i = 0; i < buttons.length; i++) {
            (function (i) {
                buttons[i].addEventListener('click', function() {
                    target = document.getElementById((buttons[i].id).replace('-toggle', ''));
                    
                    isOpen = !isOpen;
                    aside.classList.add('open');
                    target.classList.add('open');
                });
            }(i))
        }

        // The following function closes any opening screen
        // such as the Index or the Project Information

        function closeScreen() {
            if (isOpen) {
                aside.classList.remove('open');
                target.classList.remove('open');
                isOpen = !isOpen;
            }
        }
        
        // Clicking the close button closes the previously
        // opened screen (again Index or Project Information)

        var closeButton = document.getElementById('close');

        closeButton.addEventListener('click', function() {
            closeScreen();
        });

        // Adds the Index page functionality


        var list = document.getElementById('index');
        var items = [].slice.call(list.getElementsByTagName('a'));
        var number = document.getElementById('number');
        var timer;

        document.addEventListener('mouseover', function(e) {
            for (var i = 0; i < items.length; i++) {
                (function() {
                    var data = items[i].dataset.number;
    
                    items[i].addEventListener('mouseover', function() {
                        clearTimeout(timer);

                        timer = setTimeout(function() {
                            number.style.opacity = 1;
                            number.innerHTML = data;
                        }, 100)
                    })
                }())
            }

            if (!items.includes(e.target)) {
                number.style.opacity = 0;
                clearTimeout(timer);
            }
        })

        // Adds event listeners to the anchor tags so that the Index 
        // page closes and the carousel goes to the right slide
      
        for (var i = 0; i < items.length; i++) {
            (function() {
                var id = items[i].getAttribute('href');
                
                items[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    flkty.selectCell(id);
                    closeScreen();
                })
            }())
        }
        
        // The following is necessary for the back/forward
        // button to work properly
        
        window.onhashchange = function() {
            flkty.selectCell(window.location.hash);
        }

        // Hides header if entering website from initial slide

        updateBodyClass();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    site.init();
});