/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar">
            <a href="/" data-link>Home</a>
            <a href="/location?page=1" data-link>Locations</a>
            <a href="/characters?page=1" data-link>Characters</a>
            <a href="/episodes?page=1" data-link>Episodes</a>
            <a href="/contacts" data-link>Contactos</a>
            <a href="/about" data-link>Quiénes Somos</a>
        </nav>
    `;
}