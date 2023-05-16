// HUEVO PASCUA

// Esta primera parte lo que hace es que la imagen del huevo se mueve de forma aleatoria por la página web.
let huevo = document.getElementById('huevo');
let randomX, randomY;
let maxX = window.innerWidth - huevo.offsetWidth;
let maxY = window.innerHeight - huevo.offsetHeight;

function moveHuevo() {
    randomX = Math.floor(Math.random() * maxX);
    randomY = Math.floor(Math.random() * maxY);
    anime({
        targets: huevo,
        top: randomY,
        left: randomX,
        duration: 3000,
        easing: 'easeInOutQuad',
        complete: function () {
            moveHuevo();
        }
    });
}
moveHuevo();

// La segunda parte se implementan los petardos al clickar encima del huevo que este desaparece 
// y salen bolitas aletorias de color en toda la página web.
let fireworksButton = document.getElementById("huevo");
fireworksButton.addEventListener("click", function () {
    huevo.style.display = "none";
    let fireworks = [];

    for (var i = 0; i < 80; i++) {
        for (var j = 0; j < 4; j++) {
            var firework = document.createElement("div");
            firework.classList.add("firework");
            firework.style.top = Math.floor(Math.random() * maxY) + "%";
            firework.style.left = Math.floor(Math.random() * 100) + "%";
            firework.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 256) + "," +
                Math.floor(Math.random() * 256) + ")";
            fireworks.push(firework);
            document.body.appendChild(firework);

            anime({
                targets: firework,
                opacity: [0, 1],
                scale: [0, 1],
                duration: 5000,
                easing: 'easeInOutQuad',
                loop: 6,
                direction: 'alternate',
                delay: i * 50,
                complete: function () {
                    document.body.removeChild(firework);
                }
            });
        }
    }

    setTimeout(function () {
        for (var i = 0; i < fireworks.length; i++) {
            document.body.removeChild(fireworks[i]);
        }
    }, 9000);
});


// Funcion DÍA/NOCHE

const boton = document.getElementById('cambiar-modo');
const contenedores = document.querySelectorAll('.noche');

boton.addEventListener('click', function () {
    contenedores.forEach(contenedor => {
        if (contenedor.classList.contains('modo-noche')) {
            contenedor.style.filter = 'none';
            boton.textContent = 'Modo Día';
        } else {
            contenedor.style.filter = 'invert(1)';
            boton.textContent = 'Modo Noche';
        }

        contenedor.classList.toggle('modo-noche');
    });
});

//Función que oculta o muestra el menu
let menuVisible = false;
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

// Función que actualiza la fecha y hora cada segundo
function actualizarFechaHora() {
    let fechaHora = new Date();
    document.getElementById("datetime").innerHTML = fechaHora.toLocaleString();
}

// Ejecutamos la función cada segundo (1000 milisegundos)
setInterval(actualizarFechaHora, 1000);

//oculta el menu una vez que selecciono una opcion
function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("basedatos");
        habilidades[3].classList.add("python");
        habilidades[4].classList.add("ia");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("proactivo");
        habilidades[9].classList.add("empatia");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function () {
    efectoHabilidades();
}

// FORMULARIO VALIDADO

$(document).ready(function () {
    $("#enviar").click(function () {
        let nombre = $("#nombre").val();
        let telefono = $("#telefono").val();
        let correo = $("#correo").val();
        let tema = $("#tema").val();
        let mensaje = $("#mensaje").val();

        let regexNombre = /^[a-zA-Z\s]{1,50}$/; // Solo letras hasta 50 caracteres.
        let regexTelefono = /^\d{9}$/; //Debete contener 9 dígitos.
        let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Debe contener @.
        let regexTema = /^[a-zA-Z0-9\s]{1,30}$/; //Permite numeros y letras hasta un máximo de 30 carácteres.
        let regexMensaje = /^[a-zA-Z0-9\s]{1,300}$/; //Permite numeros y letras hasta un máximo de 300 carácteres.

        let validacion = "";

        if (!regexNombre.test(nombre)) {
            validacion += "<p>Por favor, ingresa un nombre válido (hasta 50 letras).</p>\n";
        }

        if (!regexTelefono.test(telefono)) {
            validacion += "<p>Por favor, ingresa un número telefónico válido (9 números).</p>\n";
        }

        if (!regexCorreo.test(correo)) {
            validacion += "<p>Por favor, ingresa un correo electrónico válido.</p>\n";
        }

        if (!regexTema.test(tema)) {
            validacion += "<p>Por favor, ingresa un tema válido (hasta 30 letras o números).</p>\n";
        }

        if (!regexMensaje.test(mensaje)) {
            validacion += "<p>Por favor, ingresa un mensaje válido (hasta 300 letras o números).</p>\n";
        }

        if (validacion !== "") {
            $("#mensaje-validacion").html(validacion);
        } else {
            $("#mensaje-validacion").html("<p>Mensaje enviado correctamente.</p>");
        }
    });
});