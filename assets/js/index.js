"use strict";

const site = {
    init : () => {

        // Alias declaration

        const $ = id => document.getElementById(id);

        // Flickity initialization

        const main = $('carousel');
        const flkty = new Flickity(main, {
            pageDots: false,
            draggable: false,
            selectedAttraction: 1,
            friction: 1,
            wrapAround: true,
            lazyLoad: 2
        });

        main.style.opacity = 1;

        // Selects slide if the document has been loaded with a hash

        if (window.location.hash) {
            flkty.selectCell(window.location.hash);
        }

        // Adds class to body to hide the header on the first slide

        function updateBodyClass() {
            document.getElementsByTagName('header')[0].classList.toggle('closed', flkty.selectedIndex === 0);
        }

        flkty.on('select', () => {
            updateBodyClass();
        })

        // Updates header information (current slide index and object information)
        // This function gets all the data from a JSON generated on home.php
        // All the JSON information was stored on the variable "objects"

        let title = $('object-title'),
            year = $('object-year'),
            dimensions = $('object-dimensions');

        function updateHeader() {
            let index = flkty.selectedIndex - 1,
                object = objects[index];

            $('slide-index').innerHTML = index != -1 ? flkty.selectedIndex : '';

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

        flkty.on('settle', () => {
            let id = document.querySelector('.is-selected').id;

            if (id.length) window.location.hash = '#' + id;
            if (!main.activeElement) main.focus();
            
            updateHeader();
        })

        // Menu functionality

        let aside = document.getElementsByTagName('aside')[0],
            header = document.getElementsByTagName('header')[0],
            buttons = header.getElementsByTagName('button'),
            target = {},
            isOpen = false;
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => {
                target = $((buttons[i].id).replace('-toggle', ''));
                
                isOpen = !isOpen;
                aside.classList.add('open');
                target.classList.add('open');
            });
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

        $('close-button').addEventListener('click', () => closeScreen());

        // Adds the Index page functionality

        let index = $('index'),
            items = [].slice.call(index.getElementsByTagName('a')),
            numbers = [].slice.call(index.querySelectorAll('.object-number')),
            display = $('number'),
            timer;

        document.addEventListener('mouseover', (e) => {
            for (let i = 0; i < items.length; i++) {

                let data = numbers[i].innerHTML;

                items[i].addEventListener('mouseover', () => {
                    clearTimeout(timer);

                    timer = setTimeout(() => {
                        display.style.opacity = 1;
                        display.innerHTML = data;
                    }, 100)
                })
            }

            if (!items.includes(e.target)) {
                display.style.opacity = 0;
                clearTimeout(timer);
            }
        })
        
        // Alphabetical and numerical list sorting

        function sortAlphabetically(list) {
            list.sort((a, b) => {
                let x = a.childNodes[3].innerText.toLowerCase(),
                    y = b.childNodes[3].innerText.toLowerCase();
                
                if (x < y) return ascending ? 1 : -1;
                if (x > y) return ascending ? -1 : 1;
                return 0;
            })
        }
        
        function sortNumerically(list) {
            list.sort((a, b) => {
                let x = a.childNodes[1].innerText,
                    y = b.childNodes[1].innerText;
                
                return parseInt(ascending ? x : y, 10) - parseInt(ascending ? y : x, 10);
            });
        }

        let ascending = true;

        function sortList(callback) {
            let list = document.getElementById('index-list'),
                listClone = list.cloneNode(false),
                listElements = [];

            // Add all list elements to the array

            listElements = Array.from(list.childNodes).filter(node => node.nodeName === "LI")

            // Execute sorting callback

            if (typeof callback === 'function') {
                callback(listElements);
            }

            // Add the items into the list in order
            
            for (let i = 0; i < listElements.length; i++) {
                listClone.appendChild(listElements[i]);
            }

            // Replace DOM list with sorted list

            list.parentNode.replaceChild(listClone, list);

            // Inverts ascending/descending status

            ascending = !ascending;
        }

        let alphabeticalButton = $('alphabetically'),
            numericalButton = $('numerically');

        alphabeticalButton.addEventListener('click', function() {
            this.innerHTML = ascending ? "Z" : "A";
            numericalButton.classList.remove('selected');
            this.classList.add('selected');
            sortList(sortAlphabetically);
        })
            
        numericalButton.addEventListener('click', function() {
            this.innerHTML = ascending ? "1" : "100";
            alphabeticalButton.classList.remove('selected');
            this.classList.add('selected');
            sortList(sortNumerically);
        }) 

        // Adds event listeners to the anchor tags so that the Index 
        // page closes and the carousel goes to the right slide
      
        for (let i = 0; i < items.length; i++) {
            let id = items[i].getAttribute('href');
            
            items[i].addEventListener('click', (e) => {
                e.preventDefault();
                flkty.selectCell(id);
                closeScreen();
            })
        }
        
        // The following is necessary for the back/forward
        // button to work properly
        
        window.onhashchange = () => flkty.selectCell(window.location.hash)

        // Hides header if entering website from initial slide

        updateBodyClass();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    site.init();
});