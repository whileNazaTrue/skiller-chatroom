const datos = await fetch("/mail")

datos.map(dato => {
    contenedor.innerHTML += `
        <h3>Remitente: ${dato.envelope.from}<h3>
    ` 
})