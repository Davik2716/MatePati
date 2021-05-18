function iniciar() {
    var boton = document.getElementById("boton");
    var nota = document.getElementById("tiempo");

    // cargar los valores de <p> <input>
    var array_p = document.getElementsByTagName("p")
    var array_respuestas = document.getElementsByClassName("respuestas")

    // leer la configuracion
    var operacion = document.getElementById("operacion");
    var numeros = document.getElementById("numeros");

    if (boton.value == "Iniciar") {
        boton.value = "Terminar";

        // reiniciar la nota
        nota.textContent = "--"

        // reiniciar
        limpiarCampos()

        // aciertos y errores
        document.getElementById("aciertos").textContent = "--"
        document.getElementById("errores").textContent = "--"

        // repintar de blanco los campos
        for (let index = 0; index < 20; index++) {
            array_respuestas[index].style.background = "white";
        }

        // quitar los botones de llevar de la suma
        var list = document.getElementsByClassName("crear");
        for (let x = 0; x < 20; x++) {
            while (list[x].hasChildNodes()) {
                list[x].removeChild(list[x].childNodes[0]);
            }
        }

        // generar los números random
        var gen = Math.pow(10, numeros.value);

        // generar el guion
        var guion = guiones(numeros.value)

        // llenar los valores de <p>
        for (let index = 0; index < array_p.length; index++) { // array_p.length = 20
            var ran = aleatorio(gen)

            // aumentar el valor si se genero muy bajo
            if (ran < Math.pow(10, numeros.value - 1)) {
                ran = ran + Math.pow(10, numeros.value - 1)
            }
            array_p[index].textContent = ran

            // la tercera <p> siempre son guiones
            if ((index + 1) % 3 == 0) {
                array_p[index].textContent = guion
            }
        }

        // según la operación
        switch (operacion.value) {
            case "+":
                // agregar el botón para llevar uno al sumar
                for (let index = 0; index < 20; index++) {

                    for (let i = 0; i < numeros.value; i++) {
                        var carry = document.createElement("input")
                        carry.type = "button"
                        carry.className = "llevar"
                        carry.id = index + "-" + i
                        carry.value = " "
                        carry.setAttribute("onclick", "llevar1('" + index + "-" + i + "');")

                        // crear el botón que lleva la suma
                        document.getElementsByClassName("crear")[index].appendChild(carry)
                    }
                }
                break;

            default:
                break;
        }

        // inicia el contador
        // QUEDA PENDIENTE
    } else {
        boton.value = "Iniciar";
        // detiene el contador
        // QUEDA PENDIENTE

        // no se aceptan vacíos
        llenarCon0()

        // revisar las respuestas
        var mi_nota = 0
        switch (operacion.value) {
            case "+":
                for (let index = 0; index < 20; index++) {
                    var suma = Math.floor(array_p[(index * 3)].textContent)
                    suma = suma + Math.floor(array_p[(index * 3 + 1)].textContent)

                    // pintar las cajas según sea correcto o incorrecto
                    if (array_respuestas[index].value == suma) {
                        array_respuestas[index].style.background = "green";
                        mi_nota++
                    } else {
                        array_respuestas[index].style.background = "red";
                    }

                }
                break;

            default:
                break;
        }
        // calcular la nota
        nota.textContent = mi_nota

        // aciertos y errores
        document.getElementById("aciertos").textContent = mi_nota
        document.getElementById("errores").textContent = 20 - mi_nota
    }
}

function aleatorio(generador) {
    var random = Math.floor(Math.random() * generador);
    return random
}

function guiones(cantidad) {
    var guion = ""
    for (let index = 0; index < cantidad * 2; index++) {
        guion = guion + "-"
    }
    return guion
}

function llenarCon0() {
    var array_respuestas = document.getElementsByClassName("respuestas")
    for (let index = 0; index < 20; index++) {
        if (array_respuestas[index].value == "") {
            array_respuestas[index].value = 0
        }
    }
}

function limpiarCampos() {
    var array_respuestas = document.getElementsByClassName("respuestas")
    for (let index = 0; index < 20; index++) {
        array_respuestas[index].value = ""
    }
}

function llevar1(id) {
    var actual = document.getElementById(id).value
    if (actual == " ") {
        document.getElementById(id).value = "1"
    } else {
        document.getElementById(id).value = " "
    }
}
// function contador(inicio) {
//     setInterval(function () {
//         var time = document.getElementById("tiempo");
//         time.innerHTML = inicio;
//         if (document.getElementById("boton").value == "Terminar") {
//             inicio++;
//         }
//     }, 1000);
// }