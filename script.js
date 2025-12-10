const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const currentYearEl = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

const getPreferredTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.querySelector('.icon').textContent = theme === 'dark' ? '🌙' : '☀️';
        themeToggle.querySelector('.label').textContent = theme === 'dark' ? 'Escuro' : 'Claro';
    }
};

const switchTheme = () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
};

document.addEventListener('DOMContentLoaded', () => {
    const preferred = getPreferredTheme();
    applyTheme(preferred);

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const subject = formData.get('subject');
            const message = formData.get('message');

            const email = 'arthurfreisp@gmail.com';
            const fullSubject = `[Portfólio] ${subject}`;
            const body = `Olá Arthur,\n\nMeu nome é ${name}.\n\n${message}\n\nEnviado pelo site.`;
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
            contactForm.reset();
        });
    }
});