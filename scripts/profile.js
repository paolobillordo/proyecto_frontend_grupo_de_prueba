const perfil = document.getElementById("user_session")
const profile_container = document.getElementById("profile_container");

if (perfil) {
    perfil.addEventListener("click", () => {
        profile_container.style.display = "block"
        get_profile();
    })
}

var usuario_data
function get_profile() {
    const url = "http://127.0.0.1:5000/users/profile";

    fetch(url, {
        method: "GET",
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            const nick_name = document.getElementById("nick")
            nick_name.textContent = data.nick_name
            const first_name = document.getElementById("name")
            first_name.textContent = data.first_name
            const last_name = document.getElementById("last")
            last_name.textContent = data.last_name
            const email = document.getElementById("email1")
            email.textContent = data.email
            usuario_data = data

        })
        .catch((error) => {
            document.getElementById("message").innerHTML =
                "Ocurrió un error, profile";
        });
}

const btnVolver = document.getElementById("btnVolver")
if (btnVolver) {
    btnVolver.addEventListener("click", () => {
        window.location.href = "home.html"
    })
}

const modifica_imagen = document.getElementById("lapiz_ico")
const modifica_nick = document.getElementById("lapiz_nick")
const modifica_name = document.getElementById("lapiz_name")
const modifica_last = document.getElementById("lapiz_last")
const modifica_email = document.getElementById("lapiz_email")
const edit_modal = document.getElementById("edit_modal")

modifica_imagen.addEventListener("click", () => {
    // ojo al piojo que nos falta traer la imagen de perfil.
})

modifica_nick.addEventListener("click", () => {
    const contenedor = document.getElementById("edit_container")
    edit_modal.style.display = "block";
    const titulo = document.createElement("h2")
    titulo.textContent = "Modificar NickName:"
    const input_nick = document.createElement("input")
    input_nick.placeholder = usuario_data.nick_name
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_nick)
    contenedor.appendChild(btn_ok)
    contenedor.appendChild(btn_cancel)
    btn_cancel.addEventListener("click", () => {
        edit_modal.style.display = "none";
        contenedor.textContent = ""
    })
    btn_ok.addEventListener("click", (e) => {
        e.preventDefault()
        update_user("nick_name", input_nick.value)
        
        
    })
    
})

modifica_name.addEventListener("click", () => {
    const contenedor = document.getElementById("edit_container")
    edit_modal.style.display = "block";
    const titulo = document.createElement("h2")
    titulo.textContent = "Modificar Nombre:"
    const input_name = document.createElement("input")
    input_name.placeholder = usuario_data.first_name
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_name)
    contenedor.appendChild(btn_ok)
    contenedor.appendChild(btn_cancel)
    btn_cancel.addEventListener("click", () => {
        edit_modal.style.display = "none";
        contenedor.textContent = ""
    })
    btn_ok.addEventListener("click", (e) => {
        e.preventDefault()
        update_user("first_name", input_name.value)
    })

})

modifica_last.addEventListener("click", () => {
    const contenedor = document.getElementById("edit_container")
    edit_modal.style.display = "block";
    const titulo = document.createElement("h2")
    titulo.textContent = "Modificar Apellido:"
    const input_Apellido = document.createElement("input")
    input_Apellido.placeholder = usuario_data.last_name
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_Apellido)
    contenedor.appendChild(btn_ok)
    contenedor.appendChild(btn_cancel)
    btn_cancel.addEventListener("click", () => {
        edit_modal.style.display = "none";
        contenedor.textContent = ""
    })
    btn_ok.addEventListener("click", (e) => {
        e.preventDefault()
        update_user("last_name", input_Apellido.value)
    })
})

modifica_email.addEventListener("click", () => {
    const contenedor = document.getElementById("edit_container")
    edit_modal.style.display = "block";
    const titulo = document.createElement("h2")
    titulo.textContent = "Modificar Email:"
    const input_email = document.createElement("input")
    input_email.placeholder = usuario_data.email
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_email)
    contenedor.appendChild(btn_ok)
    contenedor.appendChild(btn_cancel)
    btn_cancel.addEventListener("click", () => {
        edit_modal.style.display = "none";
        contenedor.textContent = ""
    })
    btn_ok.addEventListener("click", (e) => {
        e.preventDefault()
        update_user("email", input_email.value)
    })
})


function update_user(clave, valor) {
    const data = {
        [clave]: valor
    };
    fetch("http://127.0.0.1:5000/users/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
        .then((response) => {
            if (response.status === 200) {
                const contenedor = document.getElementById("edit_container")
                contenedor.textContent = ""
                const cartel = document.createElement("h2")
                cartel.textContent = "Modificado exitosamente."
                const btn_ok = document.createElement("button")
                btn_ok.textContent = "Ok"
                contenedor.appendChild(cartel)
                contenedor.appendChild(btn_ok)
                btn_ok.addEventListener("click", () => {
                    contenedor.textContent = ""
                    edit_modal.style.display = "none"
                    get_profile();

                })


            } else {
                const contenedor = document.getElementById("edit_container")
                contenedor.textContent = ""
                const cartel = document.createElement("h2")
                cartel.textContent = valor + " ya existe."
                const btn_ok = document.createElement("button")
                btn_ok.textContent = "Ok"
                contenedor.appendChild(cartel)
                contenedor.appendChild(btn_ok)
                btn_ok.addEventListener("click", () => {
                    contenedor.textContent = ""
                    edit_modal.style.display = "none"

                })
            }
        })
        .catch((error) => {
            document.getElementById("message").innerHTML =
                "Ocurrió un error.";
        });
}
