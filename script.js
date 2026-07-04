// ODLICZANIE CZASU
const returnDate = new Date("Jul 15, 2026 12:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = returnDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "Weronika jest już w domu! 🎉";
    } else {
        document.getElementById("countdown").innerHTML = "Do powrotu: " + days + " dni " + hours + " godz " + minutes + " min " + seconds + " sek";
    }
}, 1000);

// OBSŁUGA FORMULARZA W TLE (aby uniknąć strony Formspree)
const form = document.getElementById("randka-form");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Zatrzymuje domyślne przejście do strony Formspree
        
        const data = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Wysyłanie... ⏳"; // Zmienia tekst na przycisku
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Jeśli wysłano poprawnie, przekieruj na naszą własną stronę "Dziękuję"
                window.location.href = "dziekuje.html";
            } else {
                alert("Ups, coś poszło nie tak. Spróbuj ponownie!");
                submitButton.innerHTML = "Wyślij plan prosto do mnie! ❤️";
                submitButton.disabled = false;
            }
        } catch (error) {
            alert("Błąd połączenia z serwerem.");
            submitButton.innerHTML = "Wyślij plan prosto do mnie! ❤️";
            submitButton.disabled = false;
        }
    });
}