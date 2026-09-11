class SiteHeader extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
            <header>
                <h1>NovaSpace</h1>
            </header>
        `
    }   
}

class SiteFooter extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <footer>
        </footer>
        `
    }   
}