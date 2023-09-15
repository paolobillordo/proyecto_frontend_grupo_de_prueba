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
               imgInterior.src = "../assets/icon_server/" + server.icono;
               imgInterior.srcset = "../assets/icon_server/servers_119542.ico"
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
