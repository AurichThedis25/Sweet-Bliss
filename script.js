/* =============================================
   Sweet Bliss Bakery - Main Script
   Includes: Menu, UI, Langflow Chatbot
   ============================================= */

// ===== LANGFLOW CONFIG =====
const LANGFLOW_CONFIG = {
  apiKey: 'sk-FcTPs91GkHkHh1AbjsTOcNdNe4yI6uMQMxKYozGMIEc',
  url: 'http://localhost:7860/api/v1/run/a5b8d396-3554-40aa-9794-f9570b0ea5d8',
};

// ===== MENU DATA =====
const menuItems = [
  {
    id: 1,
    name: 'Classic Birthday Cake',
    category: 'cake',
    emoji: '🎂',
    desc: 'Kue ulang tahun klasik dengan frosting buttercream lembut dan dekorasi cantik.',
    price: 'Rp 185.000',
    badge: 'Best Seller',
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #fce4ec, #f8bbd9)',
  },
  {
    id: 2,
    name: 'Red Velvet Cake',
    category: 'cake',
    emoji: '🍰',
    desc: 'Kue red velvet premium dengan cream cheese frosting yang kaya dan lezat.',
    price: 'Rp 220.000',
    badge: 'Premium',
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #ffebee, #ef9a9a)',
  },
  {
    id: 3,
    name: 'Vanilla Cupcake Box',
    category: 'cupcake',
    emoji: '🧁',
    desc: 'Box berisi 6 cupcake vanilla dengan topping sprinkle warna-warni.',
    price: 'Rp 95.000',
    badge: null,
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #f3e5f5, #ce93d8)',
  },
  {
    id: 4,
    name: 'Chocolate Lava Cupcake',
    category: 'cupcake',
    emoji: '🍫',
    desc: 'Cupcake coklat dengan isi molten chocolate yang meleleh di mulut.',
    price: 'Rp 110.000',
    badge: 'New',
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #efebe9, #bcaaa4)',
  },
  {
    id: 5,
    name: 'Almond Croissant',
    category: 'pastry',
    emoji: '🥐',
    desc: 'Croissant renyah isi krim almond yang harum dan freshly baked setiap pagi.',
    price: 'Rp 35.000',
    badge: null,
    stars: '⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #fff8e1, #ffe082)',
  },
  {
    id: 6,
    name: 'Cheese Danish',
    category: 'pastry',
    emoji: '🫓',
    desc: 'Pastry berlapis butter dengan isian cream cheese manis dan segar.',
    price: 'Rp 40.000',
    badge: null,
    stars: '⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)',
  },
  {
    id: 7,
    name: 'Wedding Tier Cake',
    category: 'special',
    emoji: '💒',
    desc: 'Kue pernikahan 3 tier elegan dengan dekorasi bunga edible dan fondant custom.',
    price: 'Mulai Rp 1.500.000',
    badge: 'Custom',
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #fce4ec, #e1bee7)',
  },
  {
    id: 8,
    name: 'Rainbow Cake',
    category: 'special',
    emoji: '🌈',
    desc: 'Kue pelangi 7 lapis warna dengan cream yang lembut dan tampilan memukau.',
    price: 'Rp 320.000',
    badge: 'Trending',
    stars: '⭐⭐⭐⭐⭐',
    bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
  },
];

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroAnimations();
  renderMenuItems('all');
  initMenuFilter();
  initContactForm();
  initChatbot();
  initScrollTop();
  initAnimations();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// ===== HERO PARALLAX =====
function initHeroAnimations() {
  document.querySelectorAll('.floating-badge').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.5}s`;
  });
}

// ===== MENU RENDER =====
function renderMenuItems(filter) {
  const grid = document.getElementById('menuGrid');
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);

  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px;">Tidak ada item untuk kategori ini.</p>';
    return;
  }

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.style.animationDelay = `${idx * 0.08}s`;
    card.innerHTML = `
      <div class="menu-card-img" style="background: ${item.bg};">
        <span>${item.emoji}</span>
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <div class="menu-card-category">${getCategoryLabel(item.category)}</div>
        <div class="menu-stars">${item.stars}</div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-price">${item.price}</span>
          <button class="menu-add-btn" onclick="handleAddToCart('${item.name}')" title="Pesan">
            <i class="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function getCategoryLabel(cat) {
  const labels = {
    cake: '🎂 Birthday Cake',
    cupcake: '🧁 Cupcake',
    pastry: '🥐 Pastry',
    special: '✨ Special Order',
  };
  return labels[cat] || cat;
}

function handleAddToCart(name) {
  showToast(`🛒 "${name}" siap dipesan! Hubungi kami untuk konfirmasi.`);
}

// ===== MENU FILTER =====
function initMenuFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderMenuItems(this.dataset.filter);
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('✅ Pesan terkirim! Kami akan segera menghubungi Anda.');
    this.reset();
  });
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== SCROLL TOP =====
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== INTERSECTION OBSERVER (animations) =====
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.feature-item, .testimonial-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* =============================================
   CHATBOT (Langflow Integration)
   ============================================= */
let chatSessionId = generateUUID();

function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const container = document.getElementById('chatbotContainer');
  const closeBtn = document.getElementById('chatClose');
  const clearBtn = document.getElementById('clearChat');
  const sendBtn = document.getElementById('chatSend');
  const input = document.getElementById('chatInput');
  const chatIcon = document.getElementById('chatIcon');
  const chatCloseIcon = document.getElementById('chatCloseIcon');
  const notif = document.getElementById('chatNotif');

  // Toggle open/close
  toggle.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    chatIcon.style.display = isOpen ? 'none' : 'block';
    chatCloseIcon.style.display = isOpen ? 'block' : 'none';
    if (isOpen) {
      notif.style.display = 'none';
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    container.classList.remove('open');
    chatIcon.style.display = 'block';
    chatCloseIcon.style.display = 'none';
  });

  clearBtn.addEventListener('click', () => {
    clearChatHistory();
    chatSessionId = generateUUID(); // New session on clear
  });

  // Send on button click
  sendBtn.addEventListener('click', sendMessage);

  // Send on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Quick reply buttons
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const msg = this.dataset.msg;
      sendChatMessage(msg);
    });
  });
}

// Clear chat and restore welcome screen
function clearChatHistory() {
  const messages = document.getElementById('chatMessages');
  messages.innerHTML = `
    <div class="chat-welcome">
      <div class="welcome-emoji">🎂</div>
      <p>Halo! Saya <strong>Sweet Bot</strong>, asisten virtual Sweet Bliss Bakery.</p>
      <p>Tanyakan apa saja tentang menu, harga, pemesanan, atau hal lainnya!</p>
      <div class="quick-replies">
        <button class="quick-btn" data-msg="Apa saja menu yang tersedia?">📋 Lihat Menu</button>
        <button class="quick-btn" data-msg="Berapa harga birthday cake?">💰 Info Harga</button>
        <button class="quick-btn" data-msg="Bagaimana cara memesan?">🛒 Cara Pesan</button>
        <button class="quick-btn" data-msg="Apakah ada promo?">🎉 Promo</button>
      </div>
    </div>
  `;
  // Re-attach quick reply listeners
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      sendChatMessage(this.dataset.msg);
    });
  });
}

// Main send handler (reads from input)
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendChatMessage(text);
}

// Core chat function
async function sendChatMessage(text) {
  if (!text.trim()) return;

  // Remove welcome message if present
  const welcome = document.querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  // Append user message
  appendMessage('user', text);

  // Show typing indicator
  showTyping(true);

  try {
    const reply = await callLangflowAPI(text);
    showTyping(false);
    appendMessage('bot', reply);
  } catch (err) {
    showTyping(false);
    appendMessage('bot', '⚠️ Maaf, saat ini saya tidak dapat terhubung ke server. Silakan hubungi kami langsung melalui WhatsApp atau formulir kontak ya! 😊');
    console.error('[Chatbot Error]', err);
  }
}

// Call Langflow API
async function callLangflowAPI(userMessage) {
  const payload = {
    output_type: 'chat',
    input_type: 'chat',
    input_value: userMessage,
    session_id: chatSessionId,
  };

  const response = await fetch(LANGFLOW_CONFIG.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': LANGFLOW_CONFIG.apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return extractLangflowMessage(data);
}

// Extract text from Langflow response structure
function extractLangflowMessage(data) {
  try {
    // Standard Langflow v1 response path
    const outputs = data?.outputs;
    if (outputs && outputs.length > 0) {
      const firstOutput = outputs[0];
      // Try nested outputs
      if (firstOutput?.outputs && firstOutput.outputs.length > 0) {
        const innerOutput = firstOutput.outputs[0];
        // Message result
        const msg = innerOutput?.results?.message?.text
          || innerOutput?.results?.message?.data?.text
          || innerOutput?.messages?.[0]?.message
          || innerOutput?.messages?.[0]?.text;
        if (msg) return msg;
      }
      // Direct message
      const direct = firstOutput?.results?.message?.text
        || firstOutput?.messages?.[0]?.message;
      if (direct) return direct;
    }
    // Fallback for older structures
    if (data?.result) return data.result;
    if (data?.message) return data.message;
    if (typeof data === 'string') return data;

    return 'Maaf, saya tidak dapat memproses jawaban saat ini. Coba lagi ya! 😊';
  } catch {
    return 'Maaf, terjadi kesalahan dalam memproses jawaban. Silakan coba lagi.';
  }
}

// Append message bubble
function appendMessage(role, text) {
  const messages = document.getElementById('chatMessages');

  const wrapper = document.createElement('div');
  wrapper.className = `chat-msg ${role}`;

  const avatarIcon = role === 'bot' ? '🤖' : '👤';
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  wrapper.innerHTML = `
    <div class="msg-avatar">${avatarIcon}</div>
    <div class="msg-bubble">
      ${formatMessageText(text)}
      <span class="msg-time">${time}</span>
    </div>
  `;

  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

// Format message text: convert **bold**, newlines, URLs
function formatMessageText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

// Show/hide typing indicator
function showTyping(show) {
  const typing = document.getElementById('chatTyping');
  const messages = document.getElementById('chatMessages');
  typing.style.display = show ? 'flex' : 'none';
  if (show) messages.scrollTop = messages.scrollHeight;
}

// Generate UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
