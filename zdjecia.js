document.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.getElementById('main-image');
    
    if (imgElement) {
        // Tablica obiektów, aby każdemu zdjęciu przypisać własny opis
        const slides = [
            { src: "zdjecia/ładowarka-kołowa.jpeg", alt: "Ładowarka kołowa Grzybowski" },
            { src: "zdjecia/hds.jpeg", alt: "Hydrauliczny dźwig samochodowy Grzybowski" },
            { src: "zdjecia/ciezarowki-grzybowski.jpeg", alt: "Ciężarówki Grzybowski" },
            { src: "zdjecia/photo-2026-06-17-18-49-10.jpg", alt: "Gruszki Grzybowski" }
        ];
        
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            
            // Podmiana źródła obrazka
            imgElement.src = slides[currentIndex].src;
            
            // Podmiana tekstu alternatywnego (alt)
            imgElement.alt = slides[currentIndex].alt;
            
        }, 3000);
    }
});