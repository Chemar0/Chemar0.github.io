import {
  animate,
  createScope,
  createSpring,
  createTimeline,
  stagger,
  text,
  utils,
  engine,
  waapi
} from 'https://esm.sh/animejs';

const passwordInput = document.querySelector('.pass');
const Title = document.querySelector('.Title');
const loginContainer = document.querySelector('.login');
const IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMl9GkxbI0emfP0ZpOtT4cRPn7yDgMYUgKCw&s';
const letters =document.createTextNode['1', '2', '3'];
const ORIGINAL_TITLE_TEXT = Title?.textContent ?? '';
let titleResetTimer = null;

const isUnlockDate = () => {
  const now = new Date();
  return (
    now.getFullYear() === 2026 &&
    now.getMonth() === 1 &&
    now.getDate() === 14
  );
};

const showNotValentinesMessage = () => {
  if (!Title) return;
  if (titleResetTimer) clearTimeout(titleResetTimer);
  Title.textContent = 'its not valentines day yet';
  titleResetTimer = setTimeout(() => {
    Title.textContent = ORIGINAL_TITLE_TEXT;
    titleResetTimer = null;
  }, 2000);
};

const ensureImage = () => {
  let image = document.querySelector('.success-img');
  if (!image) {
    image = document.createElement('img');
    image.className = 'success-img';
    image.alt = 'Cute monkey';
    image.src = IMAGE_URL;
    loginContainer?.appendChild(image);
  }
  return image;
};

const animatebody = () => {
  return animate('body', {
    background:[
      {to:''}
    ],
    easing: 'outQuad',
    duration:9000,
   
    
    
  });
  
}

const startRgbFireworks = () => {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  document.body.style.margin = '0';
  document.body.style.background = 'black';
  document.body.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rgbPalette = ['#ff3b3b', '#37ff5a', '#3b8dff'];
  const rockets = [];
  const particles = [];
  let running = true;
  let rafId = 0;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const spawnRocket = () => {
    rockets.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -(8 + Math.random() * 4),
      color: rgbPalette[Math.floor(Math.random() * rgbPalette.length)],
      targetY: canvas.height * (0.2 + Math.random() * 0.45),
    });
  };

  const explode = (rocket) => {
    const count = 40 + Math.floor(Math.random() * 35);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 4.2;
      particles.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 55 + Math.random() * 30,
        age: 0,
        color: rocket.color,
      });
    }
  };

  let frame = 0;
  const tick = () => {
    if (!running) return;
    frame += 1;
    if (frame % 18 === 0) spawnRocket();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = rockets.length - 1; i >= 0; i -= 1) {
      const r = rockets[i];
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.05;

      ctx.beginPath();
      ctx.fillStyle = r.color;
      ctx.arc(r.x, r.y, 2.1, 0, Math.PI * 2);
      ctx.fill();

      if (r.y <= r.targetY || r.vy >= -0.6) {
        explode(r);
        rockets.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.vx *= 0.992;
      p.age += 1;

      const alpha = Math.max(0, 1 - p.age / p.life);
      ctx.beginPath();
      ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx.arc(p.x, p.y, 1.9, 0, Math.PI * 2);
      ctx.fill();

      if (p.age >= p.life) {
        particles.splice(i, 1);
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  for (let i = 0; i < 4; i += 1) spawnRocket();
  rafId = requestAnimationFrame(tick);

  setTimeout(() => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const loveText = document.createElement('h2');
    loveText.textContent = 'I LOVE YOU';
    loveText.style.position = 'fixed';
    loveText.style.left = '50%';
    loveText.style.top = '50%';
    loveText.style.transform = 'translate(-50%, -50%)';
    loveText.style.margin = '0';
    loveText.style.color = 'white';
    loveText.style.fontFamily = "Georgia, 'Times New Roman', serif";
    loveText.style.fontSize = '56px';
    loveText.style.zIndex = '3';
    document.body.appendChild(loveText);

    setTimeout(() => {
      window.open('', '_self');
      window.close();
      document.body.innerHTML = '';
    }, 5000);
  }, 10000);
};

const buttonAnimation = () => {
  if (!loginContainer) return;

  const existing = document.querySelector('.choice-buttons');
  if (existing) existing.remove();

  const buttonWrap = document.createElement('div');
  buttonWrap.className = 'choice-buttons';
  buttonWrap.style.display = 'flex';
  buttonWrap.style.justifyContent = 'center';
  buttonWrap.style.alignItems = 'center';
  buttonWrap.style.gap = '14px';
  buttonWrap.style.width = 'min(90vw, 420px)';
  buttonWrap.style.marginTop = '18px';

  const makeButton = (label) => {
    const btn = document.createElement('button');
    btn.className = 'choice-button';
    btn.type = 'button';
    btn.textContent = label;
    btn.style.width = '120px';
    btn.style.height = '46px';
    btn.style.fontSize = '20px';
    btn.style.fontFamily = "'Times New Roman', Times, serif";
    btn.style.textTransform = 'lowercase';
    btn.style.cursor = 'pointer';
    btn.style.border = '2px solid white';
    btn.style.borderRadius = '999px';
    btn.style.background = 'transparent';
    btn.style.color = 'white';
    btn.style.opacity = '0';
    btn.style.transition = 'border-color 220ms ease, transform 180ms linear';

    if (label === 'yes') {
      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = '#22c55e';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'white';
      });
    }

    return btn;
  };

  buttonWrap.appendChild(makeButton('yes'));
  buttonWrap.appendChild(makeButton('no'));
  loginContainer.appendChild(buttonWrap);

  const yesBtn = buttonWrap.querySelectorAll('.choice-button')[0];
  const noBtn = buttonWrap.querySelectorAll('.choice-button')[1];
  let noOffsetX = 0;
  let noOffsetY = 0;
  const MIN_DRIFT_PX = 100;
  const MAX_DRIFT_PX = 200;
  const EDGE_PADDING_PX = 8;

  const rectsOverlap = (a, b) => (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );

  const moveNoButton = () => {
    if (!yesBtn || !noBtn) return;

    const noRect = noBtn.getBoundingClientRect();
    const imageRect = document.querySelector('.success-img')?.getBoundingClientRect();
    const textRect = document.querySelector('.text-container')?.getBoundingClientRect();
    const forbiddenRects = [yesBtn.getBoundingClientRect(), imageRect, textRect].filter(Boolean);

    let chosenDx = 0;
    let chosenDy = 0;
    let found = false;

    for (let i = 0; i < 80; i += 1) {
      const distance = MIN_DRIFT_PX + Math.random() * (MAX_DRIFT_PX - MIN_DRIFT_PX);
      const angle = Math.random() * Math.PI * 2;
      let dx = Math.cos(angle) * distance;
      let dy = Math.sin(angle) * distance;

      const minDx = EDGE_PADDING_PX - noRect.left;
      const maxDx = window.innerWidth - EDGE_PADDING_PX - noRect.right;
      const minDy = EDGE_PADDING_PX - noRect.top;
      const maxDy = window.innerHeight - EDGE_PADDING_PX - noRect.bottom;
      dx = Math.min(Math.max(dx, minDx), maxDx);
      dy = Math.min(Math.max(dy, minDy), maxDy);

      const candidateRect = {
        left: noRect.left + dx,
        right: noRect.right + dx,
        top: noRect.top + dy,
        bottom: noRect.bottom + dy,
      };

      const overlapsAny = forbiddenRects.some((rect) => rectsOverlap(candidateRect, rect));
      if (overlapsAny) continue;

      chosenDx = dx;
      chosenDy = dy;
      found = true;
      break;
    }

    if (!found) return;
    noOffsetX += chosenDx;
    noOffsetY += chosenDy;
    noBtn.style.transform = `translate(${noOffsetX}px, ${noOffsetY}px)`;
  };

  noBtn?.addEventListener('mouseenter', moveNoButton);
  noBtn?.addEventListener('focus', moveNoButton);
  yesBtn?.addEventListener('click', () => {
    startRgbFireworks();
  });

  animate('.choice-button', {
    opacity: [
      { from: 0 },
      { to: 1 },
    ],
    translateY: [
      { from: 12 },
      { to: 0 },
    ],
    easing: 'outQuad',
    delay: stagger(140),
    duration: 500,
  });
};

const textanimation = (onComplete) => { // Defines the typing animation workflow.
  if (!loginContainer) return; // Stop early if the main container is missing.
  const textItems = ['Loading...........', 'Hello chubbas', 'I decided to make this website for you', 'to', 'ask', 'will you be my valentines']; // Words to type in sequence.
  let container = document.querySelector('.text-container'); // Look for existing wrapper.
  if (!container) { // If wrapper does not exist, create it.
    container = document.createElement('div'); // Create wrapper element.
    container.className = 'text-container'; // Set wrapper class name.
    loginContainer.appendChild(container); // Add wrapper to login container.
  } // End wrapper setup.
  let el = container.querySelector('.text'); // Look for existing text element.
  if (!el) { // If text element is missing, create it.
    el = document.createElement('div'); // Create text element node.
    el.className = 'text'; // Set class used by CSS styles.
    container.appendChild(el); // Add text element into wrapper.
  } // End text element setup.

  let wordIndex = 0; // Current word index in textItems.
  let charIndex = 0; // Current character index in active word.
  const TYPE_SPEED_MS = 100; // Milliseconds between typed characters.

  const typeNextChar = () => { // Types one character and schedules next step.
    const word = textItems[wordIndex]; // Get active word.
    el.textContent = word.slice(0, charIndex + 1); // Show text up to current character.
    charIndex += 1; // Move character pointer forward.

    

    if (charIndex < word.length) { // If current word is not complete yet...
      setTimeout(typeNextChar, TYPE_SPEED_MS); // ...schedule typing next character.
      return; // Exit so word-complete logic does not run yet.
    } // End in-word typing branch.

    const wordPauseMs = wordIndex === 0 ? 4000 : 1000; // First word waits longer; later words are faster.


    setTimeout(() => { // Pause before moving to the next word.
      if (wordIndex >= textItems.length - 1) { // If this was the final word...
        onComplete?.();
        return; // ...stop the sequence.
      } // End final-word check.
      wordIndex += 1; // Advance to next word.
      charIndex = 0; // Reset character index for next word.
      el.textContent = '\u00a0'; // Keep line height stable with a non-breaking space.
      setTimeout(typeNextChar, TYPE_SPEED_MS); // Start typing the next word.
    }, wordPauseMs); // Use per-word delay between words.
  }; // End helper function.

  el.textContent = ''; // Clear existing text before starting.
  setTimeout(typeNextChar, TYPE_SPEED_MS); // Start typing after a short delay.
}; // End textanimation.




const applyUnlockedUI = () => {
  passwordInput?.remove();
  Title?.remove();
  const bodyani = animatebody();
  ensureImage();


  





  const imgani = animate('.success-img',{
    opacity:[
      {from:0},
      {to:1},
    ],
     easing: 'linear',
     delay:1800,
     duration:9000,
     
  })

  Promise.all([bodyani.finished, imgani.finished]).then(() => {
    setTimeout(() => {
      textanimation(() => {
        buttonAnimation();
      });
    }, 500);
  });
  

};



//
const RESET_AFTER_MS = 30 * 1000;
try {
  const unlockedAt = Number(localStorage.getItem('unlockedAt'));
  if (unlockedAt && Date.now() - unlockedAt < RESET_AFTER_MS && isUnlockDate()) {
    applyUnlockedUI();
    setTimeout(() => {
      try {
        localStorage.removeItem('unlockedAt');
      } catch (err) {
        console.error('localStorage unavailable:', err);
      }
    }, RESET_AFTER_MS - (Date.now() - unlockedAt));
  } else {
    localStorage.removeItem('unlockedAt');
  }
} catch (err) {
  console.error('localStorage unavailable:', err);
}
//




passwordInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const passwordValue = passwordInput.value;
  if (!isUnlockDate()) {
    if (passwordValue.trim().length > 0) {
      showNotValentinesMessage();
    }
    return;
  }

  if (passwordValue == 'chubbas') {


    try {
      localStorage.setItem('unlockedAt', String(Date.now()));
    } catch (err) {
      console.error('localStorage unavailable:', err);
    }


    applyUnlockedUI();




    setTimeout(() => {
      try {
        localStorage.removeItem('unlockedAt');
      } catch (err) {
        console.error('localStorage unavailable:', err);
      }
    }, RESET_AFTER_MS);
  }
});
