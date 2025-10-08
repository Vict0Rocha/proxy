// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Toggle icon visibility
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');

    if (newTheme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Navigation functionality
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Removed animation functions for cleaner experience

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function () {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Set initial icon state
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');

    if (savedTheme === 'dark') {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }

    // Removed animation initializations

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation functionality
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Close mobile menu
                toggleMobileMenu();

                // Scroll to section after a small delay to allow menu to close
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Code execution simulation
let isRunning = false;

function simulateExecution() {
    if (isRunning) return;

    isRunning = true;
    const terminal = document.getElementById('terminal');
    const runButton = document.querySelector('.run-button');

    // Update button state
    runButton.disabled = true;
    runButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" stroke="currentColor" stroke-width="2"/>
            <rect x="14" y="4" width="4" height="16" stroke="currentColor" stroke-width="2"/>
        </svg>
        Executando...
    `;

    // Clear terminal
    terminal.innerHTML = '';

    const steps = [
        // { time: 0, message: "Criando Proxy('Victor', 'Hugo')...", type: 'info' },
        { time: 0, message: "✓ Proxy criado instantaneamente!", type: 'success' },
        // { time: 1000, message: "Acessando primeiro_nome: Victor", type: 'output' },
        // { time: 1500, message: "Acessando segundo_nome: Hugo", type: 'output' },
        { time: 0, message: "Primeira chamada pega_dados_usuarios()...", type: 'info' },
        { time: 4000, message: "⏳ Criando UsuarioReal (4s)...", type: 'loading' },
        { time: 6000, message: "⏳ Buscando dados do usuário (4s)...", type: 'loading' },
        { time: 6100, message: "✓ Dados: {'cpf': '111.111.111-11', 'rg': 'AB123456'}", type: 'success' },
        { time: 62000, message: "Primeira chamada pega_endereco()...", type: 'info' },
        { time: 8500, message: "⏳ Buscando endereços (2s)...", type: 'loading' },
        { time: 8600, message: "✓ Endereços: [{'avenida': 'brasil', 'numero': '01010'}]", type: 'success' },
        { time: 8900, message: "--- CACHE ATIVO ---", type: 'cache' },
        { time: 9000, message: "Segunda chamada pega_endereco()...", type: 'info' },
        { time: 9050, message: "⚡ Resposta instantânea do cache!", type: 'cache' },
        { time: 9100, message: "Terceira chamada pega_dados_usuarios()...", type: 'info' },
        { time: 9150, message: "⚡ Resposta instantânea do cache!", type: 'cache' },
        { time: 9200, message: "✅ Execução completa!", type: 'complete' }
    ];

    steps.forEach(step => {
        setTimeout(() => {
            addTerminalLine(step.message, step.type);

            if (step === steps[steps.length - 1]) {
                // Reset button state
                setTimeout(() => {
                    isRunning = false;
                    runButton.disabled = false;
                    runButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5v14l11-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Executar Código
                    `;
                }, 1000);
            }
        }, step.time);
    });
}

function addTerminalLine(message, type = 'default') {
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    line.className = 'terminal-line';

    // Add color coding based on type
    let color = '#e5e7eb'; // default
    let icon = '';
    switch (type) {
        case 'success':
            color = '#10b981';
            icon = '✓ ';
            break;
        case 'loading':
            color = '#f59e0b';
            icon = '⏳ ';
            break;
        case 'cache':
            color = '#8b5cf6';
            icon = '⚡ ';
            break;
        case 'complete':
            color = '#10b981';
            icon = '🎉 ';
            break;
        case 'info':
            color = '#3b82f6';
            icon = 'ℹ️ ';
            break;
        case 'output':
            color = '#e5e7eb';
            break;
    }

    line.style.color = color;
    line.textContent = icon + message;

    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Removed scroll-based animations for cleaner experience
