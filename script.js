const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let centerX;
let centerY;

let particles = [];

let rotation = 0;
let rotationSpeed = 0.001;

let dragging = false;
let lastX = 0;

const particleCount = 1800;


/* =========================
   TAMANHO DA TELA
========================= */

function resize() {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    centerX = width / 2;
    centerY = height / 2;

}

resize();

window.addEventListener("resize", resize);


/* =========================
   CRIAR PARTÍCULAS
========================= */

function createParticles() {

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        /*
         * Distribuição das estrelas
         * formando uma espiral.
         */

        const distance =
            Math.pow(Math.random(), 0.65) *
            Math.min(width, height) *
            0.48;

        const arm =
            Math.floor(
                Math.random() * 5
            );

        const spiral =
            distance * 0.018;

        const finalAngle =
            angle +
            spiral +
            arm * (Math.PI * 2 / 5);

        particles.push({

            angle: finalAngle,

            distance: distance,

            size:
                Math.random() * 1.8 + 0.3,

            brightness:
                Math.random() * 0.8 + 0.2,

            speed:
                Math.random() * 0.002 + 0.0005

        });

    }

}

createParticles();


/* =========================
   DESENHAR GALÁXIA
========================= */

function drawGalaxy() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
     * Fundo escuro transparente.
     * Isso cria o efeito de rastro
     * das estrelas.
     */

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.18)";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    const scaleX = 1;
    const scaleY = 0.42;


    particles.forEach(
        particle => {

            particle.angle +=
                particle.speed;


            const angle =
                particle.angle +
                rotation;


            let x =
                Math.cos(angle) *
                particle.distance *
                scaleX;


            let y =
                Math.sin(angle) *
                particle.distance *
                scaleY;


            /*
             * Pequena deformação
             * para deixar os braços
             * mais naturais.
             */

            const wave =
                Math.sin(
                    particle.distance * 0.025
                ) * 5;

            x +=
                Math.cos(angle + Math.PI / 2) *
                wave;

            y +=
                Math.sin(angle + Math.PI / 2) *
                wave;


            x += centerX;
            y += centerY;


            /*
             * Não desenhar estrelas
             * fora da tela.
             */

            if (
                x < 0 ||
                x > width ||
                y < 0 ||
                y > height
            ) {
                return;
            }


            const alpha =
                particle.brightness;


            ctx.beginPath();


            ctx.fillStyle =
                `rgba(
                    255,
                    ${80 + Math.random() * 100},
                    ${160 + Math.random() * 80},
                    ${alpha}
                )`;


            ctx.arc(
                x,
                y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    /*
     * Núcleo luminoso
     */

    const gradient =
        ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            Math.min(width, height) * 0.28
        );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.95)"
    );

    gradient.addColorStop(
        0.08,
        "rgba(255,80,180,0.9)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(255,20,147,0.45)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,20,147,0)"
    );


    ctx.fillStyle = gradient;


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        Math.min(width, height) * 0.28,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
     * Buraco negro no centro
     */

    ctx.beginPath();

    ctx.fillStyle = "#000";

    ctx.shadowColor = "#ff1493";

    ctx.shadowBlur = 25;

    ctx.arc(
        centerX,
        centerY,
        Math.min(width, height) * 0.055,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.shadowBlur = 0;


    /*
     * Movimento automático
     */

    rotation += rotationSpeed;


    requestAnimationFrame(
        drawGalaxy
    );

}

drawGalaxy();


/* =========================
   TOQUE / ARRASTAR
========================= */

canvas.addEventListener(
    "pointerdown",
    function(event) {

        dragging = true;

        lastX = event.clientX;

        canvas.setPointerCapture(
            event.pointerId
        );

    }
);


canvas.addEventListener(
    "pointermove",
    function(event) {

        if (!dragging) {
            return;
        }


        const currentX =
            event.clientX;


        const difference =
            currentX - lastX;


        rotation +=
            difference * 0.008;


        lastX =
            currentX;

    }
);


canvas.addEventListener(
    "pointerup",
    function(event) {

        dragging = false;

        canvas.releasePointerCapture(
            event.pointerId
        );

    }
);


canvas.addEventListener(
    "pointercancel",
    function() {

        dragging = false;

    }
);


/* =========================
   ENTRAR NA GALÁXIA
========================= */

function entrar() {

    const inicio =
        document.getElementById(
            "inicio"
        );


    inicio.style.opacity = "0";


    setTimeout(
        function() {

            inicio.style.display =
                "none";

        },
        1000
    );

}


/* =========================
   CORAÇÕES
========================= */

function criarCoracao() {

    const heart =
        document.createElement(
            "div"
        );


    heart.innerHTML =
        Math.random() > 0.5
        ? "❤️"
        : "💗";


    heart.style.position =
        "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom =
        "-30px";

    heart.style.fontSize =
        15 + Math.random() * 30 + "px";

    heart.style.zIndex =
        "50";

    heart.style.pointerEvents =
        "none";

    heart.style.filter =
        "drop-shadow(0 0 8px #ff1493)";


    heart.style.transition =
        "transform 5s linear, opacity 5s linear";


    document.body.appendChild(
        heart
    );


    setTimeout(
        function() {

            heart.style.transform =
                `translateY(-110vh)
                 rotate(${Math.random() * 360}deg)`;

            heart.style.opacity =
                "0";

        },
        50
    );


    setTimeout(
        function() {

            heart.remove();

        },
        5500
    );

}


/* =========================
   EXPLOSÃO DE CORAÇÕES
========================= */

function explodirCoracoes() {

    for (
        let i = 0;
        i < 40;
        i++
    ) {

        setTimeout(
            criarCoracao,
            i * 50
        );

    }

}
