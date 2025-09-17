document.addEventListener('DOMContentLoaded', function() {
  // Game variables
  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attemptsLeft = 7;
  let gameOver = false;

  const guessInput = document.getElementById('guessInput');
  const guessBtn = document.getElementById('guessBtn');
  const feedback = document.getElementById('feedback');
  const attemptsLeftEl = document.getElementById('attemptsLeft');
  const progressFill = document.getElementById('progressFill');
  const errorText = document.getElementById('error-text');

  // Update display
  attemptsLeftEl.textContent = `Intentos restantes: ${attemptsLeft}`;

  // Make a guess
  window.makeGuess = function() {
    if (gameOver) return;

    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      errorText.textContent = 'Por favor, ingresa un número entre 1 y 100.';
      return;
    }

    attemptsLeft--;
    attemptsLeftEl.textContent = `Intentos restantes: ${attemptsLeft}`;

    // Update progress
    const progress = ((7 - attemptsLeft) / 7) * 100;
    progressFill.style.width = progress + '%';

    guessInput.value = '';

    if (guess === secretNumber) {
      feedback.textContent = `¡Correcto! El número era ${secretNumber}. ¡Ganaste!`;
      feedback.style.color = '#10b981';
      gameOver = true;
      guessBtn.disabled = true;
      guessInput.disabled = true;
    } else if (attemptsLeft === 0) {
      feedback.textContent = `¡Perdiste! El número era ${secretNumber}.`;
      feedback.style.color = '#ef4444';
      gameOver = true;
      guessBtn.disabled = true;
      guessInput.disabled = true;
    } else {
      if (guess < secretNumber) {
        feedback.textContent = '¡Demasiado bajo! Intenta un número mayor.';
      } else {
        feedback.textContent = '¡Demasiado alto! Intenta un número menor.';
      }
      feedback.style.color = '#f59e0b';
    }

    errorText.textContent = '';
  };

  // Enter key support
  guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      makeGuess();
    }
  });

  // Hover effects for card
  const card = document.querySelector('.card');
  card.addEventListener('mouseenter', function() {
    if (!gameOver) {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
    }
  });

  card.addEventListener('mouseleave', function() {
    if (!gameOver) {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 32px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)';
    }
  });
});

// Info popup toggle
function toggleInfoPopup() {
  const popup = document.getElementById('infoPopup');
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
}

// New game
function newGame() {
  location.reload(); // Simple reload to reset
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
  const popup = document.getElementById('infoPopup');
  const infoBtn = event.target.closest('button[onclick="toggleInfoPopup()"]');
  
  if (!popup.contains(event.target) && !infoBtn) {
    popup.style.display = 'none';
  }
});
