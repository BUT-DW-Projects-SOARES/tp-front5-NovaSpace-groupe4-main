class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header role="banner" class="header">
                <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-3 sm:px-10">
                    <a href="/" class="header__logo">
                        <img src="/images/earth.svg" alt="" width="32" height="32" class="h-8 w-8">
                        <span>Nova<span class="text-earth">Space</span><span class="sr-only"> - Accueil</span></span>
                    </a>

                    <div class="flex w-full flex-wrap items-center gap-x-4 gap-y-3 sm:w-auto">
                        <nav aria-label="Menu principal" class="header__nav">
                            <ul class="flex items-center gap-x-4">
                                <li class="header__item">
                                    <button type="button" class="header__toggle" aria-expanded="false" aria-controls="submenu-planetes">
                                        Les planètes
                                        <span class="header__chevron" aria-hidden="true">▾</span>
                                    </button>

                                    <ul id="submenu-planetes" class="header__submenu">
                                        <li><a href="/src/pages/terre.html">La Terre</a></li>
                                        <li><a href="#">Mars</a></li>
                                        <li><a href="/src/pages/jupiter.html">Jupiter</a></li>
                                        <li><a href="#">Uranus</a></li>
                                        <li><a href="#">Mercure</a></li>
                                        <li><a href="#">Vénus</a></li>
                                        <li><a href="#">Saturne</a></li>
                                        <li><a href="#">Neptune</a></li>
                                    </ul>
                                </li>
                                <li class="header__item">
                                    <a href="/src/pages/contact.html" class="header__lien">Contact</a>
                                </li>
                            </ul>
                        </nav>

                        <form action="/recherche" method="get" role="search" aria-label="Rechercher sur le site" class="header__search">
                            <label for="recherche" class="sr-only">Rechercher sur le site</label>
                            <input type="search" id="recherche" name="q" placeholder="Ex. : Saturne">
                            <button type="submit">Rechercher</button>
                        </form>
                    </div>
                </div>
            </header>
        `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer role="contentinfo" class="footer">
                <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
                    <div>
                        <a href="/" class="header__logo focus-visible:outline-2 focus-visible:outline-offset-2">
                            <img src="/images/earth.svg" alt="" width="32" height="32" class="h-8 w-8">
                            <span>Nova<span class="text-earth">Space</span><span class="sr-only"> - Accueil</span></span>
                        </a>
                        <p class="mt-4 text-sm text-muted">&copy; 2026 NovaSpace. Tous droits réservés.</p>
                        <p class="mt-1 text-sm text-muted">Site réalisé par le groupe 4 du BUT 3 SW.</p>
                    </div>

                    <nav role="navigation" aria-label="Pied de page">
                        <ul class="footer__liens">
                            <li><a href="/src/pages/plan.html" class="focus-visible:outline-2 focus-visible:outline-offset-2">Plan du site</a></li>
                            <li><a href="/src/pages/contact.html" class="focus-visible:outline-2 focus-visible:outline-offset-2">Contact</a></li>
                            <li><a href="/src/pages/accessibilite.html" class="focus-visible:outline-2 focus-visible:outline-offset-2">Accessibilité : non conforme</a></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        `;
    }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
