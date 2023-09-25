var idUser;
var imgSession;
var nickSession;

document.getElementById("logout").addEventListener("click", logout);

window.addEventListener("load", function () {
     if (document.title === "Home") {
          get_servers();
          setTimeout(function () {
               get_session();
          }, 1000);
     }
});

const nick_perfil = document.getElementById("perfil");
const img_perfil = document.getElementById("img_perfil");

function get_session() {
     const url = "http://127.0.0.1:5000/users/get_session";

     fetch(url, {
          method: "GET",
          credentials: "include",
     }).then((response) => {
          if (response.status === 200) {
               response.json().then((data) => {
                    idUser = data.id_user;
                    imgSession = data.image;
                    nickSession = data.nick_name;
                    nick_perfil.textContent = nickSession;
                    img_perfil.src = imgSession;
                    return;
               });
          } else if (response.status === 204) {
               return (window.location.href = "login.html");
          }
     });
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
                    imgInterior.classList.add("img_server");
                    const buttonImg = document.createElement("div");
                    buttonImg.classList.add("button_img");
                    buttonImg.type = "button";
                    buttonImg.id = server.name_server;
                    // const h2Interior = document.createElement("span");
                    // h2Interior.classList.add("name_list_server")
                    // h2Interior.textContent = server.name_server;
                    buttonImg.appendChild(imgInterior);
                    // buttonImg.appendChild(h2Interior);
                    divExterior.appendChild(buttonImg);
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
                         server_id = server.id_server;
                         server_name = server.name_server;
                         divExterior.style.backgroundColor = "black";
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
const cancel_crear_server = document.getElementById("cancel_crear_server");

crearServer.addEventListener("click", () => {
     modal_server.style.display = "block";
});

cancel_crear_server.addEventListener("click", () => {
     modal_server.style.display = "none";
     name_server = document.getElementById("name_server");
     desc_server = document.getElementById("desc_server");
     sel_icon = document.getElementById("selected-icon");
     name_server.value = "";
     desc_server.value = "Descripción";
     sel_icon.textContent = "";
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
     img.style.height = "80px"
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
});

const mensajito = document.getElementById("mensajito");
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
                         modal_server.style.display = "none";
                         modal.style.display = "block";
                         const mensaje = inputValue.value;
                         mensajito.textContent = "Ha creado el servidor:";
                         modalMessage.textContent = mensaje;
                    });
               } else {
                    return response.json().then((data) => {
                         modal_server.style.display = "none";
                         modal.style.display = "block";
                         mensajito.textContent = "El servidor ya existe:";
                         const mensaje = "Quieres unirte a el?";
                         modalMessage.textContent = mensaje;
                    });
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               window.location.href = "home.html";
          });
}

var server_select;
function create_use_ser(name_serv) {
     const data = {
          name_server: name_serv,
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
const btnNo = document.getElementById("btn_no_ok");
const modalMessage = document.getElementById("modal_message");
const inputValue = document.getElementById("name_server");

btnOK.addEventListener("click", () => {
     create_use_ser(modalMessage.textContent);
     modal.style.display = "none";
});

btnNo.addEventListener("click", () => {
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
               const nameServer = document.getElementById(
                    "name_server_channel"
               );
               nameServer.textContent = name_server;
               const claseChannels = "channels";
               contenedor.innerHTML = "";
               data.forEach((channel) => {
                    const divExterior = document.createElement("div");
                    divExterior.classList.add(claseChannels);
                    const h2Interior = document.createElement("h2");
                    h2Interior.id = channel.name_channel;
                    h2Interior.textContent = "# " + channel.name_channel;
                    divExterior.appendChild(h2Interior);
                    contenedor.appendChild(divExterior);
                    channel_msj = document.getElementById(channel.name_channel);
                    channel_msj.addEventListener("click", () => {
                         get_msjs_10s(channel.id_channel);
                         channel_id = channel.id_channel;
                         h2Interior.style.color = "blue";
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
                    const divUserMsj = document.createElement("div");
                    divUserMsj.classList.add("div_user_msj");
                    const divUser = document.createElement("div");
                    divUser.classList.add("div_user");
                    const divMsj = document.createElement("div");
                    divMsj.classList.add("div_msj");
                    const imgUser = document.createElement("img");
                    imgUser.src = message.image;
                    imgUser.classList.add("img_in_message");
                    const nickUser = document.createElement("h2");
                    nickUser.textContent = message.nick_name;
                    const dateMsj = document.createElement("span");
                    dateMsj.textContent = message.create_date;
                    dateMsj.id = "date_message";
                    const pInterior = document.createElement("p");
                    pInterior.id = `message${message.id_message}`;
                    pInterior.textContent = message.message;
                    divExterior.appendChild(dateMsj);
                    divUser.appendChild(imgUser);
                    divUser.appendChild(nickUser);
                    divMsj.appendChild(pInterior);
                    divUserMsj.appendChild(divUser);
                    divUserMsj.appendChild(divMsj);
                    divExterior.appendChild(divUserMsj);
                    if (idUser === message.id_user) {
                         const imgDelete = document.createElement("img");
                         imgDelete.src = "../assets/iconos/basurero.png";
                         imgDelete.classList.add("garbage");
                         imgDelete.onclick = function () {
                              model_eliminar_msj(message.id_message);
                         };
                         const imgUpdate = document.createElement("img");
                         imgUpdate.src = "../assets/lapiz.png";
                         imgUpdate.classList.add("update_msj");
                         imgUpdate.onclick = function () {
                              model_modificar_msj(
                                   message.id_message,
                                   message.message
                              );
                         };
                         const divIcons = document.createElement("div");
                         divIcons.classList.add("div_icons");
                         divIcons.appendChild(imgUpdate);
                         divIcons.appendChild(imgDelete)
                         divExterior.appendChild(divIcons);                         
                    }
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
     inputMsj.value = ''
});

function create_msj(mensaje) {
     const url = `http://127.0.0.1:5000/messages/`;
     const data = {
          message: mensaje,
          id_channel: channel_id,
     };
     fetch(url, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => response.json())
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

inputMsj.addEventListener("keydown", (event) => {
     if (event.key === "Enter") {
          event.preventDefault();
          create_msj(inputMsj.value);
          inputMsj.value = ''
     }
});

//hasta aca

const btncrearCanal = document.getElementById("crear_canal");
const modalChannel = document.getElementById("modal_channel");
const cancelCanal = document.getElementById("cancel_channel");
const crearCanal = document.getElementById("create_channel");

btncrearCanal.addEventListener("click", () => {
     modalChannel.style.display = "block";
});
cancelCanal.addEventListener("click", () => {
     modalChannel.style.display = "none";
});

crearCanal.addEventListener("click", () => {
     create_channel();
     modalChannel.style.display = "none";
});

var server_id;
var server_name;
function create_channel() {
     const data = {
          name_channel: document.getElementById("name_channel").value,
          description: document.getElementById("desc_channel").value,
          id_server: server_id,
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
                         console.log("Se cargaran los canales.")
                         get_channels(server_name);
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

const buscarServer = document.getElementById("buscar_server");
const bsrSerModal = document.getElementById("modal_buscar_server");
const cancelBuscar = document.getElementById("cancel_server");
const selectedServer = document.getElementById("selected-server");

buscarServer.addEventListener("click", () => {
     bsrSerModal.style.display = "block";
     get_all_servers();
});
cancelBuscar.addEventListener("click", () => {
     selectedServer.innerHTML = "";
     bsrSerModal.style.display = "none";
});

function get_all_servers() {
     const url = "http://127.0.0.1:5000/servers/";
     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => response.json())
          .then((data) => {
               const contenedor = document.getElementById("server-list");
               const claseServers = "server_select";
               contenedor.innerHTML = "";
               data.forEach((server) => {
                    const divExterior = document.createElement("div");
                    divExterior.classList.add(claseServers);
                    const imgInterior = document.createElement("img");
                    imgInterior.src = server.icono;
                    const h2Interior = document.createElement("h2");
                    h2Interior.textContent = server.name_server;
                    const h3Interior = document.createElement("h3");
                    h3Interior.textContent = server.description;

                    divExterior.appendChild(h2Interior);
                    divExterior.appendChild(imgInterior);
                    divExterior.appendChild(h3Interior);
                    contenedor.appendChild(divExterior);
                    divExterior.addEventListener("click", () => {
                         selectedServer.innerHTML = "";
                         const serverClone = divExterior.cloneNode(true);
                         serverClone.id = "sel_server";
                         selectedServer.appendChild(serverClone);
                         server_select = server.name_server;
                    });
               });
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}

const unirseServer = document.getElementById("unirse_server");

unirseServer.addEventListener("click", () => {
     create_use_ser(server_select);
});

const filtroInput = document.getElementById("filter");

filtroInput.addEventListener("input", function () {
     filtrarElementos();
});

function filtrarElementos() {
     const serversDivs = document.querySelectorAll(".server_select");
     const filtroTexto = filtroInput.value.toLowerCase();
     serversDivs.forEach((elemento) => {
          const h2 = elemento.querySelector("h2");
          const nombre = h2.textContent.toLowerCase();
          if (filtroTexto === "" || nombre.includes(filtroTexto)) {
               elemento.style.display = "block";
          } else {
               elemento.style.display = "none";
          }
     });
}

// delete mensajes
function model_eliminar_msj(id_message) {
     //crea el model para preguntar si se elimina el msj
     const msj_modal = document.getElementById("msj_modal");
     const delet_container = document.getElementById("delet_container");
     msj_modal.style.display = "block";
     const titulo = document.createElement("h2");
     titulo.textContent = "ELIMINAR MSJ?";
     const btn_ok = document.createElement("button");
     btn_ok.textContent = "SI";
     const btn_cancel = document.createElement("button");
     btn_cancel.textContent = "NO";

     delet_container.appendChild(titulo);
     delet_container.appendChild(btn_ok);
     delet_container.appendChild(btn_cancel);

     btn_cancel.addEventListener("click", () => {
          msj_modal.style.display = "none";
          delet_container.innerHTML = "";
     });
     btn_ok.addEventListener("click", (e) => {
          e.preventDefault();
          delete_msj(id_message);
          msj_modal.style.display = "none";
          delet_container.innerHTML = "";
     });
}

function delete_msj(id_message) {
     const url = `http://127.0.0.1:5000/messages/${id_message}`;

     fetch(url, {
          method: "DELETE",
          credentials: "include",
     })
          .then((response) => {
               if (response.ok) {
                    //Utiliza msj_modal para mostrar la eliminacion exitosa.
                    const msj_modal = document.getElementById("msj_modal");
                    const delet_container =
                         document.getElementById("delet_container");
                    msj_modal.style.display = "block";
                    const titulo = document.createElement("h2");
                    titulo.textContent = "MENSAJE ELIMINADO EXITOSAMENTE";
                    delet_container.appendChild(titulo);
                    const btn_ok = document.createElement("button");
                    btn_ok.textContent = "OK";
                    btn_ok.addEventListener("click", (e) => {
                         e.preventDefault();
                         msj_modal.style.display = "none";
                         delet_container.innerHTML = "";
                    });
                    delet_container.appendChild(btn_ok);
               } else {
                    console.log(
                         "Error al eliminar el mensaje. Código de estado:",
                         response.status
                    );
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error, profile";
          });
}
//Fin delete msjs.

//Modificar msjs
function model_modificar_msj(id_message, message) {
     const msj_modal = document.getElementById("msj_modal");
     const delet_container = document.getElementById("delet_container");
     msj_modal.style.display = "block";
     const titulo = document.createElement("h2");
     titulo.textContent = "Modificar mensaje";
     const input_upmsj = document.createElement("input");
     input_upmsj.value = message;
     const btn_ok = document.createElement("button");
     btn_ok.textContent = "OK";
     const btn_cancel = document.createElement("button");
     btn_cancel.textContent = "CANCELAR";

     delet_container.appendChild(titulo);
     delet_container.appendChild(input_upmsj);
     delet_container.appendChild(btn_ok);
     delet_container.appendChild(btn_cancel);

     btn_ok.addEventListener("click", (e) => {
          e.preventDefault();
          modificar_msj(id_message, input_upmsj.value);
          msj_modal.style.display = "none";
          delet_container.innerHTML = "";
     });

     btn_cancel.addEventListener("click", () => {
          msj_modal.style.display = "none";
          delet_container.innerHTML = "";
     });
}

function modificar_msj(id_message, message) {
     const data = {
          ["id_message"]: id_message,
          ["message"]: message,
     };
     const url = `http://127.0.0.1:5000/messages/`;
     fetch(url, {
          method: "PUT",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 200) {
                    const msj_modal = document.getElementById("msj_modal");
                    const delet_container =
                         document.getElementById("delet_container");
                    msj_modal.style.display = "block";
                    const titulo = document.createElement("h2");
                    titulo.textContent = "MENSAJE MODIFICADO EXITOSAMENTE";
                    delet_container.appendChild(titulo);
                    const btn_ok = document.createElement("button");
                    btn_ok.textContent = "OK";
                    btn_ok.addEventListener("click", (e) => {
                         e.preventDefault();
                         msj_modal.style.display = "none";
                         delet_container.innerHTML = "";
                    });
                    delet_container.appendChild(btn_ok);
               } else {
                    console.log(
                         "Error al eliminar el mensaje. Código de estado:",
                         response.status
                    );
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
          });
}
//Fin modificar msjs
