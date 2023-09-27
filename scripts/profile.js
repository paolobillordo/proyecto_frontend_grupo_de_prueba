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
            const image = document.getElementById("image_perfil")
            image.src = data.image
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
const edit_modal_img = document.getElementById("edit_modal_img")
const selected_img_conteiner = document.getElementById("selected_img_conteiner")


modifica_imagen.addEventListener("click", () => {
    const divImgSelec = document.createElement("div")
    divImgSelec.id = "avatares_list"
    edit_modal_img.style.display = "block"
    const iconList = document.getElementById("edit_img_container");
    iconList.innerHTML= ""
    const titulo = document.createElement("h2")
    titulo.textContent = "Selecciona un Avatar"
    iconList.appendChild(titulo)
    
    const btn_volv = document.createElement("button")
    btn_volv.textContent = "Volver"
    btn_volv.id = "btn_volver_edit_img"
    btn_volv.addEventListener( "click", () => {
        edit_modal_img.style.display = "none"
    })
    iconList.appendChild(divImgSelec)
    iconList.appendChild(btn_volv)
    
    const iconDirectory = "../assets/avatares/";
    const iconFiles = ["1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg", "8.svg", "9.svg", "10.svg", "11.svg", "12.svg", "13.svg", "14.svg", "15.svg", "16.svg", "17.svg", "18.svg", "19.svg", "20.svg", "21.svg", "22.svg", "23.svg", "24.svg", "25.svg", "26.svg", "27.svg", "28.svg", "29.svg", "30.svg", "31.svg", "32.svg", "33.svg", "34.svg", "35.svg", "36.svg", "37.svg", "38.svg", "39.svg", "40.svg", "41.svg", "42.svg", "43.svg", "44.svg", "45.svg", "46.svg", "47.svg", "48.svg", "49.svg", "50.svg", "51.svg", "52.svg", "53.svg", "54.svg", "55.svg", "56.svg", "57.svg", "58.svg", "59.svg", "60.svg", "61.svg", "62.svg", "63.svg", "64.svg", "65.svg", "66.svg", "67.svg", "68.svg", "69.svg", "70.svg", "71.svg", "72.svg", "73.svg", "74.svg", "75.svg", "76.svg", "77.svg", "78.svg", "79.svg", "80.svg", "81.svg", "82.svg", "83.svg", "84.svg", "85.svg", "86.svg", "87.svg", "88.svg", "89.svg", "90.svg", "91.svg", "92.svg"
    ];
    iconFiles.forEach((iconFile) => {
        const img = document.createElement("img");
        img.src = iconDirectory + iconFile;
        img.alt = iconFile;
        img.style.height = "80px"
        img.addEventListener("click", () => {
            const selectedIcon = document.getElementById("selected_img");
            selected_img_conteiner.style.display = "block"
            selectedIcon.innerHTML = "";

            const titulo = document.createElement("h2")
            titulo.textContent = "¿Desea usar este Avatar?"
            selectedIcon.appendChild(titulo)
            
            const imgClone = img.cloneNode(true);
            imgClone.id = "sel_icon";
            selectedIcon.appendChild(imgClone);
            const divBtnSelecImg = document.createElement("div")
            divBtnSelecImg.id = "div_btns_img_selec"

            const btn_ok = document.createElement("button")
            btn_ok.textContent = "Ok"
            btn_ok.classList.add("btn_ok_edit")
            const btn_cancel = document.createElement("button")
            btn_cancel.textContent = "Cancelar"
            btn_cancel.classList.add("btn_cancel_edit")
            divBtnSelecImg.appendChild(btn_ok)
            divBtnSelecImg.appendChild(btn_cancel)
            selectedIcon.appendChild(divBtnSelecImg)

            btn_cancel.addEventListener("click", () => {
                selected_img_conteiner.style.display = "none";
                selectedIcon.innerHTML = ""
            })
            btn_ok.addEventListener("click", (e) => {
                e.preventDefault()
                ruta = imgClone.src
                update_user("image", ruta)
                selected_img_conteiner.style.display = "none"
                edit_modal_img.style.display = "none"                
            })
        });
        divImgSelec.appendChild(img);
    });
    
})

modifica_nick.addEventListener("click", () => {
    const contenedor = document.getElementById("edit_container")
    edit_modal.style.display = "block";
    const titulo = document.createElement("h2")
    titulo.textContent = "Modificar NickName:"
    const input_nick = document.createElement("input")
    input_nick.classList.add("input_edit_perfil")
    input_nick.value = usuario_data.nick_name
    const divBtns = document.createElement("div")
    divBtns.classList.add("btns_container_edit")
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    btn_ok.classList.add("btn_ok_edit")
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    btn_cancel.classList.add("btn_cancel_edit")
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_nick)
    divBtns.appendChild(btn_ok)
    divBtns.appendChild(btn_cancel)
    contenedor.appendChild(divBtns)
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
    input_name.value = usuario_data.first_name
    input_name.classList.add("input_edit_perfil")
    const btn_ok = document.createElement("button")
    const divBtns = document.createElement("div")
    divBtns.classList.add("btns_container_edit")
    btn_ok.textContent = "Ok"
    btn_ok.classList.add("btn_ok_edit")
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    btn_cancel.classList.add("btn_cancel_edit")
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_name)
    divBtns.appendChild(btn_ok)
    divBtns.appendChild(btn_cancel)
    contenedor.appendChild(divBtns)
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
    input_Apellido.value = usuario_data.last_name
    input_Apellido.classList.add("input_edit_perfil")
    const divBtns = document.createElement("div")
    divBtns.classList.add("btns_container_edit")
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    btn_ok.classList.add("btn_ok_edit")
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    btn_cancel.classList.add("btn_cancel_edit")
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_Apellido)
    divBtns.appendChild(btn_ok)
    divBtns.appendChild(btn_cancel)
    contenedor.appendChild(divBtns)
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
    input_email.value = usuario_data.email
    input_email.classList.add("input_edit_perfil")
    const divBtns = document.createElement("div")
    divBtns.classList.add("btns_container_edit")
    const btn_ok = document.createElement("button")
    btn_ok.textContent = "Ok"
    btn_ok.classList.add("btn_ok_edit")
    const btn_cancel = document.createElement("button")
    btn_cancel.textContent = "Cancelar"
    btn_cancel.classList.add("btn_cancel_edit")
    contenedor.appendChild(titulo)
    contenedor.appendChild(input_email)
    divBtns.appendChild(btn_ok)
    divBtns.appendChild(btn_cancel)
    contenedor.appendChild(divBtns)
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
                edit_modal.style.display = "block"
                const contenedor = document.getElementById("edit_container")
                contenedor.textContent = ""
                const cartel = document.createElement("h2")
                cartel.textContent = "Modificado exitosamente."
                const btn_ok = document.createElement("button")
                btn_ok.classList.add("btn_ok_edit")
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
