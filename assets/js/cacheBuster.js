// Cache busting utility
class CacheBuster {
    static version = null;
    
    static async getVersion() {
        if (this.version === null) {
            try {
                const response = await fetch('version.txt');
                this.version = await response.text();
                this.version = this.version.trim();
            } catch (error) {
                console.warn('Could not load version for cache busting:', error);
                this.version = Date.now().toString(); // Fallback to timestamp
            }
        }
        return this.version;
    }
    
    static async loadCSS(href) {
        const version = await this.getVersion();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${href}?v=${version}`;
        document.head.appendChild(link);
    }
    
    static async loadScript(src, defer = false) {
        const version = await this.getVersion();
        const script = document.createElement('script');
        script.src = `${src}?v=${version}`;
        if (defer) script.defer = true;
        document.head.appendChild(script);
    }
    
    static bustUrl(url) {
        return this.getVersion().then(version => `${url}?v=${version}`);
    }
}

// Function to update all resource URLs with cache busting
async function applyCacheBusting() {
    const version = await CacheBuster.getVersion();
    
    // Update existing stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([href*="fonts.googleapis.com"])');
    stylesheets.forEach(link => {
        if (!link.href.includes('?v=')) {
            const baseHref = link.href.split('?')[0];
            link.href = `${baseHref}?v=${version}`;
        }
    });
    
    // Update existing scripts (except external ones)
    const scripts = document.querySelectorAll('script[src]:not([src*="//"])');
    scripts.forEach(script => {
        if (!script.src.includes('?v=')) {
            const baseSrc = script.src.split('?')[0];
            const newScript = document.createElement('script');
            newScript.src = `${baseSrc}?v=${version}`;
            if (script.defer) newScript.defer = true;
            if (script.async) newScript.async = true;
            script.parentNode.replaceChild(newScript, script);
        }
    });
}

// Apply cache busting when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCacheBusting);
} else {
    applyCacheBusting();
}
