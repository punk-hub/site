class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="icon" href="favicon.ico">
        <header>
            <div class="burger-container">
                <div class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
        <nav id="main-nav">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="songs.html">Songs</a>
            <a href="gigHistory.html">Gig History</a>
            <a href="comingUp.html">Upcoming Gigs</a>
            <a href="availableDates.html">Available Dates</a>
            <a href="contact.html">Contact Us</a>
        </nav>
        `;
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
            .fa-facebook, .fa-youtube, .fa-soundcloud, .fa-twitter, .fa-envelope {
                font-size: 200%;
                margin: 0 10px;
            }
            .burger-menu {
                z-index: 1000; /* Ensures it's above other elements */
                position: relative; /* Adjusts stacking context */
            }
            .burger-menu span {
                background-color: #00ff00; /* Bright green color */
                display: block;
                height: 4px;
                margin: 6px 0;
                width: 30px;
            }
        </style>
        <h3>Punkhub! Proudly performing the best punk in Portsmouth, for the best pubs in Portsmouth!</h3>
        <p>Follow us on Facebook to keep up-to-date on future gigs</p>
        <p><p>Watch and listen on youtube and soundcloud</p>
        <nav id="social-nav">
            <a href="https://www.facebook.com/people/Punkhub/100093279042809/?_rdr" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.youtube.com/playlist?list=PL5YYo0Ot8TXMCwemoJ1bxqQpMlxPWKFyG" target="_blank"><i class="fab fa-youtube"></i></a>
            <a href="https://soundcloud.com/punkhub/sets/punkhub-demo-recordings-2024" target="_blank"><i class="fab fa-soundcloud"></i></a>
        </nav>
        
        `;
    }
}

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);

// Burger menu functionality
document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('#main-nav');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent body scroll when menu is open
        });
    }
});
