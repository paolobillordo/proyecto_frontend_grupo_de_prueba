const perfil = document.getElementById("perfil")
if (perfil){ 
    perfil.addEventListener("click", () => {
        window.location.href = "profile.html"
    })
}

window.addEventListener("load", function () {
    if (document.title === "Profile") {
        get_profile();
    }
});

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

        })
        .catch((error) => {
            document.getElementById("message").innerHTML =
                "Ocurrió un error, profile";
        });
}

const btnVolver = document.getElementById("btnVolver")
if (btnVolver){ 
    btnVolver.addEventListener("click", () => {
        window.location.href = "home.html"
    })
}

const btn_nick = document.getElementById("btn_nick")
btn_nick.addEventListener("click", () => {
    window.location.href = ""
})