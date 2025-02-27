document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Mensagem enviada com sucesso!");
        form.reset();
    });

    // Criar fundo dinâmico interativo
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener("mousemove", function(event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(${event.clientX % 255}, ${event.clientY % 255}, 255, 0.2)`;
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, 0, Math.PI * 2);
            ctx.fill();
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggle-mode");
    const body = document.body;

    // Verifica se já existe um modo salvo no navegador
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        toggleButton.textContent = "🌑 Modo Escuro";
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("light-mode");

        // Atualiza o botão e salva a preferência
        if (body.classList.contains("light-mode")) {
            toggleButton.textContent = "🌑 Modo Escuro";
            localStorage.setItem("theme", "light");
        } else {
            toggleButton.textContent = "🌙 Modo Claro";
            localStorage.setItem("theme", "dark");
        }
    });
});
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText("0101", this.x, this.y); // Simulando códigos flutuando
    }
}

// Criar partículas aleatórias
function createParticles() {
    for (let i = 0; i < 50; i++) {
        let size = Math.random() * 20 + 10;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        let color = `rgba(219, 166, 255, ${Math.random()})`; // Cor lilás

        particles.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

// Animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Ajustar tamanho do canvas ao redimensionar
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0; // Limpa partículas
    createParticles(); // Cria novas partículas
});

// Iniciar animação
createParticles();
animate();


