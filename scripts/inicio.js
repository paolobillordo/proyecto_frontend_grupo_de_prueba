const imgInicio = document.getElementById("imagen_inicio")

imgInicio.addEventListener("click", () => {
    window.location.href = "./templates/login.html"
})

document.addEventListener("DOMContentLoaded", function() {    
    const imagenes = ["1.png","2.png","3.png",];    
    const indiceAleatorio = Math.floor(Math.random() * imagenes.length);    
    const imagenElemento = document.getElementById("imagen_inicio");    
    imagenElemento.src = "./assets/inicio/" + imagenes[indiceAleatorio];
});

