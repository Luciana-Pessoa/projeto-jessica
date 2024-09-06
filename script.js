document.addEventListener("DOMContentLoaded", function () {
  // Etapa 1: Coleta de Moedas
  const coins = document.querySelectorAll(".coin");
  let coinsCollected = 0;

  coins.forEach((coin) => {
    coin.addEventListener("click", () => {
      coin.style.display = "none"; // Esconde a moeda
      coinsCollected++;
      if (coinsCollected === coins.length) {
        showMessage(
          "Parabéns! Meu amor, agora pode ir para proxima etapa.",
          () => {
            document.getElementById("stage1").classList.add("hidden");
            document.getElementById("stage2").classList.remove("hidden");
          }
        );
      }
    });
  });

  // Etapa 2: Salto sobre Obstáculos
  const jumpButton = document.getElementById("jump-button");
  const mario = document.getElementById("mario");
  const obstacle = document.getElementById("obstacle1");
  const successMessage = document.getElementById("success-message");
  let isJumping = false;
  let successfulJumps = 0; // Contador de saltos bem-sucedidos

  jumpButton.addEventListener("click", () => {
    if (!isJumping) {
      isJumping = true; // Impede cliques repetidos
      mario.classList.add("jump"); // Adiciona animação de salto ao Mario

      setTimeout(() => {
        mario.classList.remove("jump"); // Remove animação após o salto
        isJumping = false;
      }, 600); // Duração do salto
    }
  });

  // Verificação Contínua de Colisão
  const collisionCheckInterval = setInterval(() => {
    checkCollision();
  }, 600); // Verifica pulos bem-sucedidos a cada 500ms

  // Função para verificar colisão
  function checkCollision() {
    const marioRect = mario.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Verifica se Mario está colidindo com o obstáculo sem estar pulando
    if (
      marioRect.left < obstacleRect.right &&
      marioRect.right > obstacleRect.left &&
      marioRect.bottom > obstacleRect.top &&
      marioRect.top < obstacleRect.bottom &&
      !isJumping // Só verifica colisão quando não está pulando
    ) {
      showMessage("Você bateu no obstáculo! Tente novamente.", resetGame);
      successfulJumps = 0; // Reseta o contador de saltos bem-sucedidos
    } else if (
      isJumping &&
      marioRect.left < obstacleRect.right &&
      marioRect.right > obstacleRect.left &&
      marioRect.bottom <= obstacleRect.top // Mario passa acima do obstáculo sem colidir
    ) {
      // Pulo bem-sucedido quando Mario está acima do obstáculo
      successfulJumps++;
      console.log(`Pulos bem-sucedidos: ${successfulJumps}`); // Log para verificar contagem

      if (successfulJumps === 5) {
        // Requer 5 saltos bem-sucedidos para avançar
        clearInterval(collisionCheckInterval); // Para de verificar colisões após sucesso
        showMessage("Parabéns! Próxima etapa quiz", () => {
          document.getElementById("stage2").classList.add("hidden");
          document.getElementById("stage3").classList.remove("hidden");
        });
      }
    }
  }

  // Etapa 3: Desafio de Enigma
  document.querySelectorAll(".quiz-answer").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.innerText === "Alpargatas Branca") {
        showMessage(
          "Resposta correta! Está achando que so JessKbank é dificil? Vamos para a ultima etapa.",
          () => {
            document.getElementById("stage3").classList.add("hidden");
            document.getElementById("final-stage").classList.remove("hidden");
          }
        );
      } else {
        showMessage("Ops, resposta errada! Melhore Jessica!");
      }
    });
  });

  // Função para exibir mensagens dentro do jogo
  function showMessage(text, callback) {
    const messagePanel = document.getElementById("message-panel");
    const messageText = document.getElementById("message-text");
    const messageButton = document.getElementById("message-button");

    messageText.innerText = text;
    messagePanel.classList.remove("hidden");
    messageButton.onclick = () => {
      messagePanel.classList.add("hidden");
      if (callback) callback();
    };
  }

  // Função para resetar o jogo
  function resetGame() {
    // Reseta o jogo após colisão
    mario.style.left = "50px";
    isJumping = false;
    document.getElementById("stage1").classList.remove("hidden");
    document.getElementById("stage2").classList.add("hidden");
    document.getElementById("stage3").classList.add("hidden");
    document
      .querySelectorAll(".coin")
      .forEach((coin) => (coin.style.display = "block"));
    coinsCollected = 0;
    successfulJumps = 0; // Reseta o contador de pulos
  }
});

// Função para fazer o botão "Sim" fugir do mouse
function makeButtonRunAway(button) {
  button.addEventListener("mouseover", () => {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calcula novas posições aleatórias dentro do container
    const maxWidth = containerRect.width - buttonRect.width;
    const maxHeight = containerRect.height - buttonRect.height;

    let randomX = Math.random() * maxWidth;
    let randomY = Math.random() * maxHeight;

    // Aplica as novas posições ao botão
    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.zIndex = 1000; // Garante que o botão esteja sempre visível
  });

  // Adiciona funcionalidade ao botão "Não"
  document.getElementById("no-button").addEventListener("click", function () {
    showMessage(
      " O E-mail com a resposta foi enviado para Luciana.dev@gmail avisando que você não aceitou! 😭"
    );
  });

  // Função para mostrar uma mensagem na tela
  function showMessage(message) {
    alert(message);
  }
}

// Função para criar corações animados
function createHearts() {
  const heartsContainer = document.getElementById("hearts-container");
  heartsContainer.classList.remove("hidden");
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heartsContainer.appendChild(heart);
  }
}

// Função para exibir a mensagem
function showMessage() {
  document.getElementById("welcome-message").classList.remove("hidden");
}

// Executa quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
  // Configurar o botão "Sim" para fugir do mouse
  const yesButton = document.getElementById("yes-button");
  makeButtonRunAway(yesButton);

  // Desativa o comportamento de fuga após 5 segundos
  setTimeout(() => {
    yesButton.style.position = "static"; // Reseta a posição do botão
    yesButton.removeEventListener("mouseover", makeButtonRunAway);
  }, 8000);

  // Adiciona uma animação de corações e exibe a mensagem quando o botão "Sim" é clicado
  yesButton.addEventListener("click", () => {
    createHearts();
    showMessage();
  });
});
