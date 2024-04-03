// Seleccionar la tabla por su ID
const matriz = [];
const tabla = document.getElementById('tabla');
let turno = 0;
const aTurno = [];
let J = 1;
const setJ0 = [];
const setJ1 = [];

nuevoJuego();

function nuevoJuego(){
    //for (let i = 0; i < 3; i++) {
    //    matriz.push([]);
    //}

    // Obtener todas las filas de la tabla
    const filas = tabla.rows;

    // Iterar sobre cada fila
    for (let i = 0; i < filas.length; i++) {
        // Obtener todas las celdas de la fila actual
        const celdas = filas[i].cells;
        const filaMatriz = [];
        
        // Iterar sobre cada celda de la fila actual
        for (let j = 0; j < celdas.length; j++) {
            // Vaciar el contenido de la celda
            celdas[j].textContent = '';
            celdas[j].style.backgroundColor = 'white';
            filaMatriz.push('');
            // Agregar un controlador de eventos 'click' a cada celda
            celdas[j].addEventListener('click', () => {
                // Esta función se ejecutará cuando se haga clic en la celda
                //alert(`ID de la celda clickeada: ${event.target.id}`);
                if (celdas[j].textContent.trim() !== '') return;
                if (J == 0) {
                    setJ0.push([i,j]);
                    matriz[i][j] = 0;
                    celdas[j].style.backgroundColor = 'red';
                    celdas[j].textContent = 'O';
                } else {
                    setJ1.push([i,j]);
                    matriz[i][j] = 1;
                    celdas[j].style.backgroundColor = 'green';
                    celdas[j].textContent = 'X';
                }
                jugar();
            });
        }
        matriz.push(filaMatriz);
    }
}

function ganador(jugador) {
    console.log("hubo ganador")
    if(jugador == 0) alert("Ha ganado el O");
    else alert("Ha ganado el X")
}

function jugar() {
    if(tresEnFila(J)) ganador(J);
    turno++;
    J = (J+1) % 2;
    if (turno == 9) alert("Hubo empate");
};

function tresEnFila(jugador) {
    if (jugador === 0) {
        for (const e of setJ0) {
            console.log(e[0], e[1])
            console.log(numeroEnFila(jugador, 1, e[0], e[1], 0), "a", jugador)
            if (numeroEnFila(jugador, 1, e[0], e[1], 0) == 3) return true;
        }
    } else {
        for (const e of setJ1) {
            console.log(e[0], e[1])
            console.log(numeroEnFila(jugador, 1, e[0], e[1]), "a", jugador)
            if (numeroEnFila(jugador, 1, e[0], e[1], 0) == 3) return true;
        }
    }
    return false;
};

function numeroEnFila(jugador, cantidad, f, c, ruta) {
    console.log("numeroEnFila", cantidad, ",", f, c, "b")
    if(f < 0 || f > 2) return 0;
    if(c < 0 || c > 2) return 0;
    if(matriz[f][c] !== jugador) return 0;
    if (cantidad == 3) return 3;
    var a;
    switch(ruta) {
        case 0: //cualquier lado
            a = Math.max(numeroEnFila(jugador, cantidad+1, f, c+1, 1),  
                        numeroEnFila(jugador, cantidad+1, f+1, c, 2),
                        numeroEnFila(jugador, cantidad+1, f+1, c+1, 3),
                        numeroEnFila(jugador, cantidad+1, f+1, c-1, 4))
            break;
        case 1: //misma fila
            console.log("misma fila")
            a = numeroEnFila(jugador, cantidad+1, f, c+1, 1);  
            break;
        case 2: //misma columna
            console.log("misma columna")
            a = numeroEnFila(jugador, cantidad+1, f+1, c, 2);
            break;
        case 3: //diagonal derecha
            console.log("diagonal derecha")
            a = numeroEnFila(jugador, cantidad+1, f+1, c+1, 3);
            break;
        case 4: //diagonal izquierda
            console.log("diagonal izquierda")
            a = numeroEnFila(jugador, cantidad+1, f+1, c-1, 4);
            break;
        default:
            a = 0;
    }
    console.log(a)
    return a;
};
