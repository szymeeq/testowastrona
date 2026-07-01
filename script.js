// Obsługa menu mobilnego (RWD Hamburger)
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Zamykanie menu po kliknięciu w link (płynny skok)
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Filtrowanie asortymentu w galerii bez przeładowania strony
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Resetowanie klas aktywności przycisków
        filterButtons.forEach(b => {
            b.classList.remove('bg-accent');
            b.classList.add('bg-graphite', 'hover:bg-neutral-700');
        });
        
        // Aktywacja aktualnego przycisku
        btn.classList.add('bg-accent');
        btn.classList.remove('bg-graphite', 'hover:bg-neutral-700');

        const targetFilter = btn.getAttribute('data-filter');

        // Pokazywanie / Ukrywanie elementów z płynnym dopasowaniem
        galleryItems.forEach(item => {
            if (targetFilter === 'all' || item.getAttribute('data-category') === targetFilter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Autorski mechanizm Lightbox (Powiększenie zdjęć bez bibliotek)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    if (lightbox && lightboxImg) {
        const imgSrc = element.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Blokada przewijania tła
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// Mechanizm akordeonu dla sekcji FAQ
function toggleFaq(button) {
    const icon = button.querySelector('i');
    const panel = button.nextElementSibling;
    
    if (icon && panel) {
        icon.classList.toggle('rotate-180');
        
        if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
            panel.style.maxHeight = '0px';
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
}

// Inicjalizacja animacji pojawiania się elementów przy przewijaniu (Intersection Observer API)
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-animated').forEach(el => {
    animationObserver.observe(el);
});

// Inteligentny i wydajny licznik statystyk (odpala się tylko raz przy przewinięciu)
const counterSection = document.getElementById('stats-counter');
const counters = document.querySelectorAll('[data-target]');
let countTriggered = false;

if (counterSection) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countTriggered) {
                countTriggered = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const speed = target / 50; // Prędkość inkrementacji dopasowana proporcjonalnie
                    
                    const updateCount = () => {
                        const current = +counter.innerText;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + speed);
                            setTimeout(updateCount, 25);
                        } else {
                            // Formatowanie sufiksów po ukończeniu odliczania
                            counter.innerText = target + (target === 25 || target === 1000 || target === 10000 ? '+' : '%');
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });

    countObserver.observe(counterSection);
}