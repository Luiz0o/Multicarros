const form = document.getElementById("loginForm");
const btn = form.querySelector(".btn");

// ANIMAÇÃO de entrada do card
window.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".auth-card");
  card.style.opacity = "0";
  card.style.transform = "translateY(-30px)";
  setTimeout(() => {
    card.style.transition = "all 0.8s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 150);
});

// LOGIN COM API
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  console.log("🔍 Dados a enviar:", {email: user, senha: pass});

  // Adiciona spinner e desativa botão
  btn.classList.add("loading");
  btn.innerHTML = "Verificando...";
  btn.disabled = true;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        senha: pass,
      }),
    });

    console.log("📡 Status da resposta:", response.status);
    const data = await response.json();
    console.log("📦 Dados recebidos:", data);

    if (response.ok && data.success) {
      // Salvar token e dados do usuário
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      btn.innerHTML = "✅ Acesso Liberado!";
      btn.style.background = "#24aa4c";
      btn.classList.remove("loading");

      // Redirecionar baseado no tipo de usuário
      setTimeout(() => {
        const tipo = parseInt(data.usuario.tipo); // Converter para número
        if (tipo === 1 || tipo === 2) {
          // Admin ou Vendedor
          window.location.href = "/HTML/dashboard.html";
        } else {
          // Cliente
          window.location.href = "/HTML/dashboardCliente.html";
        }
      }, 1200);
    } else {
      // LOGIN INVÁLIDO
      btn.innerHTML = "❌ " + (data.message || "Dados Inválidos");
      btn.style.background = "#a72626";
      btn.classList.remove("loading");
      setTimeout(() => {
        btn.innerHTML = "Entrar";
        btn.disabled = false;
        btn.style.background = "";
      }, 2000);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    btn.innerHTML = "❌ Erro de Conexão";
    btn.style.background = "#a72626";
    btn.classList.remove("loading");
    setTimeout(() => {
      btn.innerHTML = "Entrar";
      btn.disabled = false;
      btn.style.background = "";
    }, 2000);
  }
});

const toggleSenha = document.querySelector(".toggle-senha");
const inputSenha = document.getElementById("pass");

toggleSenha.addEventListener("click", () => {
  const tipo =
    inputSenha.getAttribute("type") === "password" ? "text" : "password";
  inputSenha.setAttribute("type", tipo);

  toggleSenha.classList.toggle("fa-eye");
  toggleSenha.classList.toggle("fa-eye-slash");
});

// EFEITO DE FOCO NOS INPUTS
const inputs = document.querySelectorAll(".input-group input");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });
  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.parentElement.classList.remove("focused");
    }
  });
});
