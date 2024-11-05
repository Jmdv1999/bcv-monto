async function bcv() {
    // Enlace del banco central
    const url = "https://www.bcv.org.ve/terminos-condiciones";
    
    // Opciones para la solicitud fetch
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html'
        }
    };

    try {
        // Obtenemos el contenido de la página
        const response = await fetch(url, options);
        const content = await response.text();

        // Buscamos varios números con una expresión regular
        const regex = /([0-9]+,[0-9]+)/g;
        const matches = [...content.matchAll(regex)].map(match => match[0]);

        // Almacenamos los números en un objeto
        const monedas = {
            euros: matches[0],
            yuanes: matches[1],
            liras_turkas: matches[2],
            rublos: matches[3],
            dolares: matches[4]
        };

        return monedas;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Ejemplo de uso
bcv().then(monedas => console.log(monedas));