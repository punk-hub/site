class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="icon" href="favicon.ico">
        <nav id="main-nav">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="songs.html">Songs</a>
            <a href="gigHistory.html">Gig History</a>
            <a href="comingUp.html">Coming Up</a>
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
            .fa-facebook, .fa-youtube, .fa-soundcloud {
                font-size: 200%;
            }
        </style>
        <p>Punkhub! Proudly serving the best punk in Portsmouth to the best pubs in Portsmouth!</p>
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
