document.addEventListener("DOMContentLoaded", async () => {
    const URLPlugin = "http://localhost:8000"; // Si el plugin no está en local, coloca la IP. Por ejemplo 192.168.1.76:8000

    const $btnImprimir = document.querySelector("#btnImprimir"),
        $licencia = document.querySelector("#licencia"),
        $impresora = document.querySelector("#impresora");

    $btnImprimir.addEventListener("click", () => {
        const direccionMacDeLaImpresora = $impresora.value;
        const licencia = $licencia.value;
        if (!direccionMacDeLaImpresora) {
            return alert("Por favor escribe la MAC de la impresora")
        }
        demostrarCapacidades(direccionMacDeLaImpresora, licencia);
    });

    const demostrarCapacidades = async (macImpresora, licencia) => {
        const conector = new ConectorEscposAndroid(licencia, URLPlugin);
        conector
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .DescargarImagenDeInternetEImprimir("https://www.dinosauriorrhh.com.ar/clubdino/asset/img/pencil.png", 0, 216)
            .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
            .CargarImagenLocalEImprimir("./Logo-GD-V4-Negro.png", 0, 216)
            .Iniciar() // En mi impresora debo invocar a "Iniciar" después de imprimir una imagen
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .EscribirTexto("talanga blog\n")
            .EscribirTexto("Blog de un programador X\n")
            .EscribirTexto("Teléfono: 0303-456\n")
            .EscribirTexto("Fecha y hora: " + (new Intl.DateTimeFormat("es-MX").format(new Date())))
            .Feed(1)
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_IZQUIERDA)
            .EscribirTexto("____________________\n")
            .EscribirTexto("Criollitos\n")
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_DERECHA)
            .EscribirTexto("$1500.00\n")
            .EscribirTexto("____________________\n")
            .EscribirTexto("TOTAL: $1500.00\n")
            .EscribirTexto("____________________\n")
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .EstablecerEnfatizado(true)
            .EstablecerTamañoFuente(1, 1)
            .EscribirTexto("¡Gracias por su Adquisicion!\n")
            .Feed(1)
            .ImprimirCodigoDeBarras("qr", "https://www.dinosauriorrhh.com.ar/clubdino/", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 160, 160)
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .ImprimirCodigoDeBarras("code128", "7790463000114", ConectorEscposAndroid.TAMAÑO_IMAGEN_NORMAL, 320, 50)
            .Iniciar()
            .EstablecerAlineacion(ConectorEscposAndroid.ALINEACION_CENTRO)
            .Feed(1)
            .EstablecerTamañoFuente(1, 1)
            .EscribirTexto("Grupo Dinosaurio\n")
            .Feed(2)
            .Corte(1)
            .Pulso(48, 60, 120)

        try {
            const respuesta = await conector.imprimirEn(macImpresora);
            if (respuesta === true) {
                alert("Impreso correctamente");
            } else {
                alert("Error: " + respuesta);
            }
        } catch (e) {
            alert("Error imprimiendo: " + e.message);
        }
    }
});