/*
app.js - Simulador de Crédito
Proyecto Coderhouse, Entrega 1
Ezequiel A. Verón
*/

//Definición de parámetros del Simulador
const interes = 0.6;
const edadMinima = 18;
const edadMaxima = 100;
const impMinimoPermitido = 10000;
const impMaximoPermitido = 1000000;
const cuotasMinimas = 12;
const cuotasMaximas = 70;

//Lógica del Simulador
const nombre = prompt("Bienvenido al Simulador de Créditos\nPor favor, ingresa tu nombre");
if (!validarNombre(nombre)) {
    alert("No has ingresado un nombre.\nPor favor, vuelve a intentarlo actualizando la página");
    $("#subtituloH2").html("No hemos podido calcular tu préstamo ya que no ingresaste tu Nombre");
} else {
    const edad = parseInt(prompt("Hola " + nombre + "\nIntroduce por favor tu edad\nMínimo: " + edadMinima + "\nMáximo: " + edadMaxima));
    if (!validarEdad(edad)) {
        alert("No cumples con los requisitos de edad previstos.\nPor razones legales, no podemos otorgarte un crédito");
        $("#subtituloH2").html("No hemos podido calcular tu préstamo ya que no cumples los requisitos legales");
    } else {
        const solicitado = parseFloat(prompt("Ingresa el dinero que necesitas\nPuedes pedir desde $" + impMinimoPermitido + " hasta $"+ impMaximoPermitido));
        if (!validarImporteSolicitado(solicitado)) {
            alert("El importe que has solicitado no se encuentra en el rango correcto.\nPor favor, vuelve a intentarlo");
            $("#subtituloH2").html("No hemos podido calcular tu préstamo ya que no podemos darte el dinero solicitado");
        } else {
            const meses = parseInt(prompt("Por último, elige la cantidad de cuotas\nEl mínimo de cuotas es de " + cuotasMinimas + " y el máximo de " + cuotasMaximas));
            if (!validarCuotas(meses)) {
                alert("Las cuotas que especificaste no son correctas.\nPor favor, vuelve a intentarlo.");
                $("#subtituloH2").html("No hemos podido calcular tu préstamo ya que la cantidad de cuotas elegidas no son válidas");
            } else {
                const totalPrestamo = solicitado + (solicitado * interes);
                const valorCuota = totalPrestamo / meses;
                const capitalCuota = solicitado / meses;
                const interesCuota = capitalCuota * interes;
                const totalInteres = solicitado * interes;
                $("#subtituloH2").html("Hola <strong>" + nombre + "</strong>. Esta es la simulación de tu Crédito por <strong>$" + solicitado.toFixed(2) + "</strong>");
                $("#divTablaCuotas").html(armarTablaHTMLCuotas(solicitado, capitalCuota, interesCuota, meses));
                $("#divTablaResumen").html(armarTablaResumen(nombre, edad, solicitado, totalPrestamo, totalInteres, meses, interes, capitalCuota, interesCuota, valorCuota));
            }
        }
    }
}

//Renderizado HTML
function armarTablaHTMLCuotas(solicitado, capitalCuota, interesCuota, meses) {
    let tablaCuotas = "<table class='table table-bordered table-striped'>";
    tablaCuotas += "<thead><tr><th>Cuota</th><th>Capital Adeudado</th><th>Interés Adeudado</th></tr></thead><tbody>";
    let capitalAdeudado = solicitado;
    let interesAdeudado = (capitalCuota * interes * meses);
    for (let cuota = 1; cuota <= meses; cuota++) {
        capitalAdeudado -= capitalCuota;
        interesAdeudado -= interesCuota;
        tablaCuotas += "<tr><td>" + cuota + "</td><td>$" + Math.abs(capitalAdeudado.toFixed(2)) + "</td><td>$" + Math.abs(interesAdeudado.toFixed(2)) + "</td></tr>";
    }
    tablaCuotas += "</tbody></table>";
    return tablaCuotas;
}
function armarTablaResumen(nombre, edad, solicitado, totalPrestamo, totalInteres, meses, interes, capitalCuota, interesCuota, valorCuota) {
    let tablaResumen = "<table class='table table-bordered table-striped'><thead><tr><th colspan='2'>Datos del Préstamo</th></tr></thead>";
    tablaResumen += "<tbody><tr><td>Nombre</td><td><strong>" + nombre + "</strong></td></tr>";
    tablaResumen += "<tr><td>Edad</td><td><strong>" + edad + "</strong></td></tr>";
    tablaResumen += "<tr><td>Importe Solicitado</td><td><strong>$" + solicitado.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Tasa de Interés</td><td><strong>" + (interes * 100) + "%</strong></td></tr>";
    tablaResumen += "<tr><td>Importe Interés</td><td><strong>$" + totalInteres.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Total Adeudado</td><td><strong>$" + totalPrestamo.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Cuotas Mensuales</td><td><strong>" + meses + "</strong></td></tr>";
    tablaResumen += "<tr><td>Capital por Cuota</td><td><strong>$" + capitalCuota.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Interés por Cuota</td><td><strong>$" + interesCuota.toFixed(2) + "</strong></td></tr>";
    tablaResumen += "<tr><td>Valor total de Cuota</td><td><strong>$" + valorCuota.toFixed(2) + "</strong></td></tr></tbody></table>";
    return tablaResumen;
}

//Validaciones
function validarNombre(nombre){
    if (nombre == null || nombre == "") {
        return false;
    } else {
        return true;
    }
}
function validarEdad(edad) {
    if (edad < edadMinima || isNaN(edad) || edad > edadMaxima) {
        return false;
    } else {
        return true;
    }
}
function validarImporteSolicitado(solicitado) {
    if (solicitado < impMinimoPermitido || solicitado > impMaximoPermitido || isNaN(solicitado)) {
        return false;
    } else {
        return true;
    }
}
function validarCuotas(meses) {
    if(meses < cuotasMinimas || meses > cuotasMaximas || isNaN(meses)) {
        return false;
    } else {
        return true;
    }
}