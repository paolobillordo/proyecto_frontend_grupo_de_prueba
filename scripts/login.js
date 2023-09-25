document
     .getElementById("loginForm")
     .addEventListener("submit", function (event) {
          event.preventDefault();
          login();
     });

function login() {
     const data = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
     };
     fetch("http://127.0.0.1:5000/users/login", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 200) {
                    return response.json().then((data) => {
                         window.location.href = "home.html";
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

const registerForm = document.getElementById("register");
const modal_register = document.getElementById("modal_register");
const modal_container = document.getElementById("modal_container");
const create_user = document.getElementById("create_user");

registerForm.addEventListener("click", () => {
     modal_register.style.display = "block";
});

window.addEventListener("click", (e) => {
     if (e.target === modal_register) {
          modal_register.style.display = "none";
     }
});

// registra nuevo usuario
create_user.addEventListener("click", (e) => {
     e.preventDefault();
     create();
});
function create() {
     const data = {
          email: document.getElementById("email_r").value,
          nick_name: document.getElementById("usuario").value,
          first_name: document.getElementById("nombre").value,
          last_name: document.getElementById("apellido").value,
          password: document.getElementById("password_r").value,
          birth_date: document.getElementById("date").value,
          image : "../assets/avatares/1.svg", 
     };
     fetch("http://127.0.0.1:5000/users/", {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 201) {
                    modal_register.style.display = "none";
                    console.log("USUARIO CREADO EXITOSAMENTE");
                    const reg_ok_modal = document.getElementById("reg_ok_modal");
                    const reg_ok_container = document.getElementById("reg_ok_container");
                    reg_ok_modal.style.display = "block";
                    const titulo = document.createElement("h2");
                    titulo.textContent = "USUARIO CREADO EXITOSAMENTE";
                    reg_ok_container.appendChild(titulo);
                    const btn_ok = document.createElement("button");
                    btn_ok.textContent = "OK";
                    btn_ok.addEventListener("click", (e) => {
                         e.preventDefault();
                         reg_ok_modal.style.display = "none";
                         reg_ok_container.innerHTML = "";
                         window.location.href = "login.html";
                    });
                    reg_ok_container.appendChild(btn_ok);
               } else {
                    // return response.json().then((data) => {
                    //      document.getElementById("message").innerHTML =
                    //           data.message;
                    //      window.location.href = "login.html";
                    //});
               }
          })
          .catch((error) => {
               document.getElementById("message").innerHTML =
                    "Ocurrió un error.";
               window.location.href = "login.html";
          });
}

window.addEventListener("load", function () {
     if (document.title === "Login") {
          get_session();
     }
});

function get_session() {
     const url = "http://127.0.0.1:5000/users/get_session";

     fetch(url, {
          method: "GET",
          credentials: "include",
     })
          .then((response) => {
               if (response.status === 200) {
                    return response.json().then((data) => {
                         window.location.href = "home.html";
                    });
               }
          })          
}
