/* ========================================
   Name Generator Hub - Main JavaScript
   Client-side Name Generation Logic
   ======================================== */

// ========== Name Generation Data ==========
const nameData = {
    // Phonetic components for name generation
    prefixes: {
        baby: ['Al', 'Am', 'An', 'Ar', 'Be', 'Ca', 'Da', 'El', 'Em', 'Is', 'Ja', 'Ka', 'La', 'Li', 'Lu', 'Ma', 'Mi', 'Na', 'Ni', 'No', 'O', 'Ra', 'Sa', 'So', 'Ta', 'Vi', 'Za'],
        brand: ['Axi', 'Byt', 'Cal', 'Dex', 'Elx', 'Fyx', 'Gly', 'Hyx', 'Inx', 'Jax', 'Kyr', 'Lux', 'Myx', 'Nex', 'Oxy', 'Pyx', 'Qyx', 'Ryx', 'Syx', 'Tyx', 'Vex', 'Wyx', 'Xen', 'Zyx'],
        character: ['Ae', 'Al', 'Ar', 'Cael', 'Dar', 'El', 'Era', 'Fen', 'Gal', 'Hel', 'Ith', 'Jor', 'Kal', 'Lor', 'Mel', 'Nar', 'Ore', 'Pel', 'Quin', 'Ren', 'Sil', 'Tar', 'Val', 'Wyn', 'Zel'],
        fantasy: ['Aer', 'Ari', 'Cel', 'Dor', 'Ela', 'Fyr', 'Gael', 'Hal', 'Ila', 'Jyn', 'Kor', 'Lun', 'Mir', 'Nyx', 'Orin', 'Pyr', 'Ryn', 'Syl', 'Thal', 'Ula', 'Val', 'Wyn', 'Xyl', 'Zeph']
    },
    middles: {
        baby: ['be', 'da', 'di', 'el', 'en', 'ia', 'le', 'li', 'lo', 'ma', 'na', 'ni', 'ra', 'ri', 'sa', 'so', 'ta', 'vi', 'ya', 'zo'],
        brand: ['ar', 'ax', 'el', 'ex', 'ix', 'or', 'ox', 'ra', 'ri', 'ro', 'yx', 'za', 'ze', 'zo'],
        character: ['a', 'an', 'ar', 'del', 'dor', 'e', 'en', 'eth', 'i', 'ion', 'ir', 'o', 'or', 'wyn'],
        fantasy: ['a', 'ae', 'an', 'ar', 'dra', 'e', 'el', 'en', 'eth', 'i', 'ion', 'is', 'or', 'ra', 'wyn', 'y']
    },
    suffixes: {
        baby: ['a', 'ah', 'an', 'ay', 'den', 'e', 'el', 'en', 'er', 'i', 'ia', 'ie', 'in', 'is', 'la', 'le', 'ley', 'lia', 'lin', 'lo', 'ly', 'na', 'ne', 'ra', 'ria', 'ron', 'son', 'ta', 'ton', 'ya', 'zel'],
        brand: ['a', 'ar', 'e', 'ia', 'io', 'is', 'ix', 'o', 'on', 'or', 'os', 'ra', 'ro', 'us', 'x', 'yx'],
        character: ['a', 'ael', 'an', 'ar', 'ath', 'dor', 'dra', 'e', 'el', 'en', 'es', 'ia', 'iel', 'ion', 'ir', 'is', 'or', 'os', 'ra', 'wen', 'wyn'],
        fantasy: ['a', 'ae', 'ael', 'an', 'ara', 'as', 'dor', 'dra', 'e', 'el', 'en', 'eth', 'ia', 'iel', 'ion', 'ir', 'is', 'or', 'ra', 'wen', 'wyn', 'ys']
    }
};

// Pre-built name examples for variety
const presetNames = {
    baby: ['Avari', 'Kaelan', 'Mira', 'Daxon', 'Elowen', 'Ren', 'Soren', 'Liora', 'Cassian', 'Thea', 'Orion', 'Nova', 'Aria', 'Felix', 'Luna', 'Jasper', 'Isla', 'Leo', 'Mila', 'Kai'],
    brand: ['Verint', 'Zyntra', 'Elaro', 'Calyon', 'Oxira', 'Nexor', 'Vionix', 'Pyrex', 'Luxon', 'Elthor', 'Zyvra', 'Axiom', 'Rexus', 'Fyxel', 'Orvio', 'Kyron', 'Vexor', 'Nexia', 'Lyzar', 'Oryxis'],
    character: ['Kairos', 'Selane', 'Theron', 'Valeris', 'Aerwyn', 'Lorien', 'Galeth', 'Elendra', 'Darion', 'Pelios', 'Sylren', 'Corenth', 'Valenor', 'Thaldor', 'Aeris', 'Miren', 'Calwen', 'Dorian', 'Fenris', 'Ithrel'],
    fantasy: ['Lunara', 'Zephyr', 'Aelion', 'Syris', 'Valora', 'Thalion', 'Nymera', 'Pyrion', 'Elarion', 'Wyneth', 'Mirael', 'Corvyn', 'Xylara', 'Orineth', 'Fynrae', 'Aerawyn', 'Celadon', 'Ilyana', 'Dorath', 'Thyriel']
};

// ========== Name Generator Class ==========
class NameGenerator {
    constructor() {
        this.usedNames = new Set();
    }

    // Generate a single name based on category
    generateSingleName(category) {
        const type = category === 'random' ? this.getRandomCategory() : category;
        
        // 30% chance to use a preset name
        if (Math.random() < 0.3) {
            return this.getPresetName(type);
        }
        
        // 70% chance to generate a new name
        return this.constructName(type);
    }

    // Get a random category
    getRandomCategory() {
        const categories = ['baby', 'brand', 'character', 'fantasy'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    // Get a preset name
    getPresetName(type) {
        const names = presetNames[type] || presetNames.baby;
        return names[Math.floor(Math.random() * names.length)];
    }

    // Construct a new name from phonetic components
    constructName(type) {
        const prefix = this.getRandomElement(nameData.prefixes[type]);
        const middle = Math.random() > 0.3 ? this.getRandomElement(nameData.middles[type]) : '';
        const suffix = this.getRandomElement(nameData.suffixes[type]);
        
        let name = prefix + middle + suffix;
        
        // Capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        
        // Ensure the name is between 4-12 characters
        if (name.length < 4 || name.length > 12) {
            return this.constructName(type); // Regenerate if out of range
        }
        
        return name;
    }

    // Get a random element from an array
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generate multiple unique names
    generateNames(category, count = 10) {
        const names = [];
        this.usedNames.clear();
        let attempts = 0;
        const maxAttempts = count * 10;

        while (names.length < count && attempts < maxAttempts) {
            const name = this.generateSingleName(category);
            
            // Ensure uniqueness in current batch
            if (!this.usedNames.has(name)) {
                names.push(name);
                this.usedNames.add(name);
            }
            
            attempts++;
        }

        // If we couldn't generate enough unique names, fill with variations
        while (names.length < count) {
            names.push(this.generateSingleName(category));
        }

        return names;
    }
}

// ========== DOM Elements ==========
const elements = {
    generateBtn: null,
    categorySelect: null,
    resultsContainer: null,
    hamburger: null,
    nav: null,
    backToTop: null,
    header: null
};

// ========== Initialize Generator ==========
const generator = new NameGenerator();

// ========== Event Handlers ==========

// Generate names button click
function handleGenerate() {
    const category = elements.categorySelect.value;
    const names = generator.generateNames(category, 10);
    displayResults(names);
}

// Display generated names
function displayResults(names) {
    // Clear previous results
    elements.resultsContainer.innerHTML = '';
    
    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'results-grid';
    
    // Add each name as a card
    names.forEach(name => {
        const nameItem = document.createElement('div');
        nameItem.className = 'name-item';
        nameItem.textContent = name;
        nameItem.setAttribute('role', 'listitem');
        grid.appendChild(nameItem);
    });
    
    elements.resultsContainer.appendChild(grid);
    
    // Announce to screen readers
    const announcement = `Generated ${names.length} names`;
    announceToScreenReader(announcement);
}

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Toggle mobile navigation
function toggleNav() {
    const isActive = elements.nav.classList.toggle('active');
    elements.hamburger.classList.toggle('active');
    elements.hamburger.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
}

// Close mobile nav when clicking a link
function closeNavOnClick(e) {
    if (e.target.tagName === 'A') {
        elements.nav.classList.remove('active');
        elements.hamburger.classList.remove('active');
        elements.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Handle scroll events
function handleScroll() {
    // Show/hide back to top button
    if (window.pageYOffset > 300) {
        elements.backToTop.classList.add('visible');
    } else {
        elements.backToTop.classList.remove('visible');
    }
    
    // Add shadow to header on scroll
    if (window.pageYOffset > 10) {
        elements.header.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.15)';
    } else {
        elements.header.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.08)';
    }
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle keyboard navigation
function handleKeyboard(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && elements.nav.classList.contains('active')) {
        toggleNav();
    }
    
    // Generate on Enter when select is focused
    if (e.key === 'Enter' && e.target === elements.categorySelect) {
        handleGenerate();
    }
}

// ========== Initialization ==========
function init() {
    // Get DOM elements
    elements.generateBtn = document.getElementById('generateBtn');
    elements.categorySelect = document.getElementById('categorySelect');
    elements.resultsContainer = document.getElementById('resultsContainer');
    elements.hamburger = document.getElementById('hamburger');
    elements.nav = document.getElementById('nav');
    elements.backToTop = document.getElementById('backToTop');
    elements.header = document.getElementById('header');
    
    // Check if we're on a page with the generator
    if (elements.generateBtn && elements.categorySelect && elements.resultsContainer) {
        // Add event listeners for generator
        elements.generateBtn.addEventListener('click', handleGenerate);
        elements.categorySelect.addEventListener('change', () => {
            // Optional: auto-generate on category change
            // handleGenerate();
        });
    }
    
    // Navigation event listeners (present on all pages)
    if (elements.hamburger && elements.nav) {
        elements.hamburger.addEventListener('click', toggleNav);
        elements.nav.addEventListener('click', closeNavOnClick);
    }
    
    // Back to top button (present on all pages)
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }
    
    // Scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboard);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.nav && elements.hamburger) {
            if (elements.nav.classList.contains('active') && 
                !elements.nav.contains(e.target) && 
                !elements.hamburger.contains(e.target)) {
                toggleNav();
            }
        }
    });
    
    // Initial scroll check
    handleScroll();
}

// ========== Start Application ==========
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== Export for potential testing ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NameGenerator, nameData };
}