document.getElementById("logout").addEventListener("click", logout);

window.addEventListener("load", function () {
     if (document.title === "Home") {
          get_session();
          get_servers();
     }
});

function get_session() {
     const url = "http://127.0.0.1:5000/users/get_session";

     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 204) {
                    return response.json().then((data) => {
                         window.location.href = "login.html";
                    });
               }
          })          
}

function get_servers() {
     const url = "http://127.0.0.1:5000/servers/user";
     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => response.json())
          .then((data) => {
               const contenedor = document.getElementById("servers");
               const claseServers = "server";               
               data.forEach((server) => {
                    const divExterior = document.createElement("div");
                    divExterior.classList.add(claseServers);
                    const imgInterior = document.createElement("img");
                    imgInterior.src = server.icono;
                    const buttonImg = document.createElement("button");
                    buttonImg.classList.add("button_img");
                    buttonImg.type = "button";
                    buttonImg.id = server.name_server;
                    const h2Interior = document.createElement("h2");
                    h2Interior.textContent = server.name_server;
                    buttonImg.appendChild(imgInterior);
                    divExterior.appendChild(buttonImg);
                    buttonImg.appendChild(h2Interior);
                    contenedor.appendChild(divExterior);
                    button_channel = document.getElementById(
                         server.name_server
                    );
                    button_channel.addEventListener("click", () => {
                         const contenedor_msjs =
                              document.getElementById("msj_canal");
                         contenedor_msjs.innerHTML = "";
                         get_channels(server.name_server);
                         clearInterval(intervalID);
                         server_id = server.id_server
                         server_name = server.name_server
                    });
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
});

// window.addEventListener("click", (e) => {
//      if (e.target === modal_server) {
//           modal_server.style.display = "none";
//      }
// })

const iconList = document.getElementById("icon-list");
const iconDirectory = "../assets/icon_server/";
const iconFiles = [
     "1.ico",
     "2.ico",
     "3.ico",
     "4.ico",
     "5.ico",
     "6.ico",
     "7.ico",
     "8.ico",
     "9.ico",
     "10.ico",
     "11.ico",
];
iconFiles.forEach((iconFile) => {
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

create_server.addEventListener("click", (e) => {
     e.preventDefault();
     create_ser();
     modal_server.style.display = "none";
     modal.style.display = "block";
     const mensaje = inputValue.value;
     modalMessage.textContent = mensaje;
});

function create_ser() {
     const miImagen = document.getElementById("sel_icon");
     const data = {
          name_server: document.getElementById("name_server").value,
          description: document.getElementById("desc_server").value,
          icono: miImagen.src.replace("http://127.0.0.1:5500", ".."),
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
                         //window.location.href = "home.html";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                         window.location.href = "home.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               window.location.href = "home.html";
          });
}

function create_use_ser() {
     const data = {
          name_server: modalMessage.textContent,
     };
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
                         window.location.href = "home.html";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                         window.location.href = "home.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               window.location.href = "home.html";
          });
}

const modal = document.getElementById("modal_ok");
const btnOpenModal = document.getElementById("create_server");
const btnOK = document.getElementById("btn_ok");
const modalMessage = document.getElementById("modal_message");
const inputValue = document.getElementById("name_server");

btnOK.addEventListener("click", () => {
     create_use_ser();
     modal.style.display = "none";
});

function get_channels(name_server) {
     const url = `http://127.0.0.1:5000/channels/${name_server}`;

     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => response.json())
          .then((data) => {
               const contenedor = document.getElementById("channels");
               const claseChannels = "channels";
               contenedor.innerHTML = "";
               data.forEach((channel) => {
                    const divExterior = document.createElement("div");
                    divExterior.classList.add(claseChannels);
                    const h2Interior = document.createElement("h2");
                    h2Interior.id = channel.name_channel;
                    h2Interior.textContent = channel.name_channel;
                    divExterior.appendChild(h2Interior);
                    contenedor.appendChild(divExterior);
                    channel_msj = document.getElementById(channel.name_channel);
                    channel_msj.addEventListener("click", () => {
                         get_msjs_10s(channel.id_channel);
                         channel_id = channel.id_channel;
                    });
               });
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}

let intervalID;
function get_msjs_10s(id_channel) {
     clearInterval(intervalID);
     get_msjs(id_channel);
     intervalID = setInterval(function () {
          get_msjs(id_channel);
     }, 10000);
}

var channel_id;

function get_msjs(id_channel) {
     const url = `http://127.0.0.1:5000/messages/${id_channel}`;

     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => response.json())
          .then((data) => {
               const contenedor = document.getElementById("msj_canal");
               const claseMSJ = "messages";
               contenedor.innerHTML = "";
               data.forEach((message) => {
                    const divExterior = document.createElement("div");
                    divExterior.classList.add(claseMSJ);
                    const pInterior = document.createElement("p");
                    pInterior.id = `message${message.id_message}`;
                    pInterior.textContent = message.message;
                    divExterior.appendChild(pInterior);
                    contenedor.appendChild(divExterior);
               });
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}

const inputMsj = document.getElementById("input_msj");
const enviarMsj = document.getElementById("enviar_msj");

enviarMsj.addEventListener("click", () => {     
     create_msj(inputMsj.value);     
});

function create_msj(mensaje) {
     const url = `http://127.0.0.1:5000/messages/`;     
     const data = {
          message: mensaje,
          id_channel: channel_id
     };     
     fetch(url, {
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
                         inputMsj.value = "";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                         // window.location.href = "home.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               // window.location.href = "home.html";
          });
}


//desde aca

enviarMsj.addEventListener("click", () => {     
     create_msj(inputMsj.value);     
});

inputMsj.addEventListener("keydown", (event) => {
     if (event.key === "Enter") {
          event.preventDefault(); 
          create_msj(inputMsj.value);
     }
});


//hasta aca

const btncrearCanal = document.getElementById("crear_canal");
const modalChannel = document.getElementById("modal_channel")
const cancelCanal = document.getElementById("cancel_channel")
const crearCanal = document.getElementById("create_channel")

btncrearCanal.addEventListener("click", () => {
     modalChannel.style.display = "block"
})
cancelCanal.addEventListener("click", () => {
     modalChannel.style.display = "none"
})

crearCanal.addEventListener("click", () => {
     create_channel();
     modalChannel.style.display = "none"
})

var server_id
var server_name
function create_channel() {
     const data = {
          name_channel: document.getElementById("name_channel").value,
          description: document.getElementById("desc_channel").value,
          id_server: server_id          
     };
     fetch("http://127.0.0.1:5000/channels/", {
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
                         get_channels(server_name)
                         //window.location.href = "home.html";
                    });
               } else {
                    return response.json().then((data) => {
                         document.getElementById("message").innerHTML =
                              data.message;
                         window.location.href = "home.html";
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               window.location.href = "home.html";
          });
}

