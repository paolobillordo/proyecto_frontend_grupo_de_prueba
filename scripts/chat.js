document.getElementById("logout").addEventListener("click", logout);

window.addEventListener("load", function () {
     get_servers();
});

function get_servers() {
     const url = "http://127.0.0.1:5000/servers/user";
     fetch(url, {
          method: "GET",
          credentials: "include",
     })
     .then(response => response.json())
     .then(data => {
          const contenedor = document.getElementById("servers");
          const claseServers = "server";
          data.forEach(server => {
               const divExterior = document.createElement("div");
               divExterior.classList.add(claseServers);
               const imgInterior = document.createElement("img");
               imgInterior.src = server.icono;
               imgInterior.srcset = "../assets/icon_server/5.ico"
               const h2Interior = document.createElement("h2");
               h2Interior.textContent = server.name_server;
               divExterior.appendChild(imgInterior);
               divExterior.appendChild(h2Interior);
               contenedor.appendChild(divExterior);
       });
     })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}

function logout() {
     const url = "http://127.0.0.1:5000/users/logout";

     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 200) {
                    return response.json().then((data) => {
                         window.location.href = "login.html";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}

const crearServer = document.getElementById("server");
const modal_server = document.getElementById("modal_server");
const modal_container = document.getElementById("modal_container");
const create_server = document.getElementById("create_server");

crearServer.addEventListener("click", () => {
     modal_server.style.display = "block";
})

window.addEventListener("click", (e) => {
     if (e.target === modal_server) {
          modal_server.style.display = "none";
     }
})


const iconList = document.getElementById("icon-list");
const iconDirectory = "../assets/icon_server/";
const iconFiles = ["1.ico","2.ico","3.ico","4.ico","5.ico","6.ico","7.ico","8.ico","9.ico","10.ico","11.ico"];
iconFiles.forEach(iconFile => {
    const img = document.createElement("img");
    img.src = iconDirectory + iconFile;
    img.alt = iconFile;
    img.addEventListener("click", () => {
        const selectedIcon = document.getElementById("selected-icon");
        selectedIcon.innerHTML = "";
        const imgClone = img.cloneNode(true);
        imgClone.id = "sel_icon";
        selectedIcon.appendChild(imgClone);
    });
    iconList.appendChild(img);
});

create_server.addEventListener("click", () => {
     create_ser()
})

function create_ser() {
     const miImagen = document.getElementById("sel_icon");
     const data = {
          name_server: document.getElementById("name_server").value,
          description: document.getElementById("desc_server").value,
          icono: miImagen.src.replace("http://127.0.0.1:5500", "..")          
     };
     fetch("http://127.0.0.1:5000/servers/", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 201) {
                    return response.json().then((data) => {
                         fetch("http://127.0.0.1:5000/servers/use_ser", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 201) {
                    return response.json().then((data) => {
                         window.location.href = "chat.html";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                              window.location.href = "chat.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
                    window.location.href = "chat.html";
          });
                         
                         
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                              window.location.href = "chat.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
                    window.location.href = "chat.html";
          });
}
