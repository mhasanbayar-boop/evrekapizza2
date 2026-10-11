<!DOCTYPE html>
<html lang="tr" class="h-full bg-slate-950 text-white">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Evreka Pizza - Profesyonel Yönetim Paneli</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style> body { font-family: 'Plus Jakarta Sans', sans-serif; } </style>
</head>
<body class="h-full bg-slate-900 p-4 sm:p-6">

  <!-- GİRİŞ EKRANI -->
  <div id="login-screen" class="max-w-md mx-auto mt-20 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center space-y-4">
    <div class="w-16 h-16 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black shadow-inner">🔐</div>
    <h2 class="text-xl font-black">Yönetim Paneli Girişi</h2>
    <p class="text-xs text-slate-400">Patron veya Garson Hesabınızla Giriş Yapın</p>
    
    <input type="text" id="user-input" placeholder="Kullanıcı Adı (Örn: patron veya garson1)" class="w-full text-center bg-slate-900 border border-slate-700 rounded-2xl py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-red-500">
    <input type="password" id="pass-input" placeholder="Şifre" class="w-full text-center bg-slate-900 border border-slate-700 rounded-2xl py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-red-500">
    
    <button onclick="handleLogin()" class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-2xl text-xs transition shadow-lg">Giriş Yap</button>
  </div>

  <!-- ANA DASHBOARD -->
  <div id="dashboard" class="max-w-7xl mx-auto hidden space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <h1 class="text-2xl font-black flex items-center gap-3">
          <span class="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></span> 
          Evreka Pizza <span id="role-title-badge" class="text-xs px-2.5 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 font-bold">Yükleniyor...</span>
        </h1>
        <p class="text-xs text-slate-400 mt-1">Aktif Oturum: <b id="active-user-name" class="text-amber-400"></b></p>
      </div>
      <div class="flex items-center gap-2.5 flex-wrap">
        <button onclick="switchMainTab('orders')" id="tab-btn-orders" class="bg-red-600 text-white text-xs px-5 py-2.5 rounded-xl font-extrabold transition shadow-md">Siparişler & POS</button>
        
        <!-- SADECE PATRON GÖREBİLİR -->
        <button onclick="switchMainTab('finance')" id="tab-btn-finance" class="hidden bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs px-5 py-2.5 rounded-xl font-bold transition">📊 Ciro & Finans</button>
        <button onclick="switchMainTab('menu')" id="tab-btn-menu" class="hidden bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs px-5 py-2.5 rounded-xl font-bold transition">🍕 Menü & Ürünler</button>
        <button onclick="switchMainTab('users')" id="tab-btn-users" class="hidden bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs px-5 py-2.5 rounded-xl font-bold transition">👥 Personel Yönetimi</button>
        
        <button onclick="logout()" class="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs px-4 py-2.5 rounded-xl font-bold transition">Çıkış</button>
      </div>
    </div>

    <!-- SİPARİŞLER SEKMESİ -->
    <div id="section-orders" class="space-y-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm"><span class="text-slate-400 font-bold block mb-1">Toplam Ciro (Aktif Kasa)</span><span class="text-xl font-black text-emerald-400" id="stat-ciro">0 ₺</span></div>
        <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm"><span class="text-slate-400 font-bold block mb-1">Onay Bekleyen</span><span class="text-xl font-black text-amber-400" id="stat-bekleyen">0</span></div>
        <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm"><span class="text-slate-400 font-bold block mb-1">Mutfakta</span><span class="text-xl font-black text-emerald-400" id="stat-mutfakta">0</span></div>
        <div class="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm"><span class="text-slate-400 font-bold block mb-1">Ödeme Bekleyen</span><span class="text-xl font-black text-indigo-400" id="stat-servis">0</span></div>
      </div>

      <div class="flex gap-2.5 overflow-x-auto pb-1 text-xs">
        <button onclick="setFilter('ALL')" id="filter-ALL" class="px-4 py-2.5 rounded-xl font-extrabold bg-red-600 text-white transition shadow">Aktif Siparişler</button>
        <button onclick="setFilter('WAITING')" id="filter-WAITING" class="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 border border-slate-700 transition">Yeni Gelenler</button>
        <button onclick="setFilter('PREPARING')" id="filter-PREPARING" class="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 border border-slate-700 transition">Mutfakta</button>
        <button onclick="setFilter('SERVED')" id="filter-SERVED" class="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 border border-slate-700 transition">Ödeme Bekleyenler</button>
        <button onclick="setFilter('PAID')" id="filter-PAID" class="px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 border border-slate-700 transition">Tamamlananlar (Arşiv)</button>
      </div>

      <div id="orders-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"></div>
    </div>

    <!-- CİRO & FİNANS SEKMESİ (SADECE PATRON) -->
    <div id="section-finance" class="hidden space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
        <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
          <span class="text-slate-400 font-bold uppercase tracking-wider block">📅 Günlük Ciro (Bugün)</span>
          <span class="text-3xl font-black text-emerald-400 block" id="patron-daily-ciro">0 ₺</span>
          <p class="text-[11px] text-slate-500">Bugün tahsil edilen toplam ödemeler.</p>
        </div>
        <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-2">
          <span class="text-slate-400 font-bold uppercase tracking-wider block">🗓️ Aylık Ciro (Bu Ay)</span>
          <span class="text-3xl font-black text-amber-400 block" id="patron-monthly-ciro">0 ₺</span>
          <p class="text-[11px] text-slate-500">Bu ay içerisinde elde edilen toplam ciro.</p>
        </div>
        <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <span class="text-slate-400 font-bold uppercase tracking-wider block">⚙️ Kasa & Gün Sonu</span>
            <p class="text-[11px] text-slate-400 mt-1">Gün sonu yaparak bugünkü tamamlanan kayıtları arşivleyebilir veya kasayı sıfırlayabilirsiniz.</p>
          </div>
          <button onclick="executeDayEnd()" class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-xl text-xs transition shadow-lg">🔒 Gün Sonu Yap & Kasayı Sıfırla</button>
        </div>
      </div>
    </div>

    <!-- MENÜ YÖNETİMİ SEKMESİ (SADECE PATRON) -->
    <div id="section-menu" class="hidden space-y-6">
      <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
        <h3 class="text-base font-black text-white flex items-center gap-2"><i class="fa-solid fa-plus-circle text-red-500"></i> Yeni Ürün Ekle (Otomatik En Üste Eklenir)</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <input type="text" id="new-title" placeholder="Ürün Adı" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
          <select id="new-category" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
            <option value="pizza">Pizza</option><option value="burger">Burger</option><option value="salad">Salata</option><option value="side">Atıştırmalık</option><option value="beverage">İçecek</option><option value="dessert">Tatlı</option>
          </select>
          <input type="number" id="new-price" placeholder="Fiyat (₺)" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
          <input type="text" id="new-image" placeholder="Görsel URL" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
        </div>
        <textarea id="new-desc" placeholder="Ürün Açıklaması..." class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"></textarea>
        <button onclick="addNewProduct()" class="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-lg">Ürünü Menüye Ekle</button>
      </div>
      <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
        <h3 class="text-base font-black text-white flex items-center gap-2"><i class="fa-solid fa-utensils text-amber-400"></i> Menüdeki Ürünler ve Sıralama (▲ / ▼ ile Taşıyabilirsiniz)</h3>
        <div id="admin-menu-list" class="space-y-3"></div>
      </div>
    </div>

    <!-- PERSONEL VE ŞİFRE YÖNETİMİ SEKMESİ (SADECE PATRON) -->
    <div id="section-users" class="hidden space-y-6">
      <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
        <h3 class="text-base font-black text-white flex items-center gap-2"><i class="fa-solid fa-user-plus text-emerald-400"></i> Yeni Garson / Personel Hesabı Ekle</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <input type="text" id="new-staff-user" placeholder="Kullanıcı Adı (Örn: garson_ali)" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
          <input type="password" id="new-staff-pass" placeholder="Şifre" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white">
          <button onclick="addNewStaff()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl transition shadow">Personel Ekle</button>
        </div>
      </div>

      <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
        <h3 class="text-base font-black text-white flex items-center gap-2"><i class="fa-solid fa-users-gear text-amber-400"></i> Mevcut Personel Listesi ve Şifre Güncelleme</h3>
        <div id="staff-list-container" class="space-y-3"></div>
      </div>
    </div>
  </div>

  <!-- ÖDEME MODALI -->
  <div id="payment-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-slate-800 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5">
      <div class="flex justify-between items-center border-b border-slate-700 pb-3">
        <div><h3 class="text-lg font-black text-white" id="pay-modal-table">Masa - Ödeme Al</h3><p class="text-xs text-slate-400" id="pay-modal-id">Sipariş #000</p></div>
        <button onclick="closePaymentModal()" class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="bg-slate-900 p-4 rounded-2xl border border-slate-700 text-center"><span class="text-xs text-slate-400 font-bold uppercase block">Tahsil Edilecek Tutar</span><span class="text-3xl font-black text-emerald-400 mt-1 block" id="pay-modal-amount">0 ₺</span></div>
      <button id="confirm-pay-btn" onclick="processPayment()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-lg transition">Ödemeyi Onayla ve Masayı Kapat</button>
    </div>
  </div>

  <script>
    let currentFilter = 'ALL';
    let cachedOrders = [];
    let cachedCatalog = [];
    let previousOrderCount = 0;
    let selectedOrderForPay = null;
    let currentUserRole = 'garson'; 
    let currentUsername = 'Garson';

    function getStaffAccounts() {
      let accounts = JSON.parse(localStorage.getItem('evreka_staff_accounts') || 'null');
      if (!accounts) {
        accounts = [
          { username: 'patron', pass: 'patron123', role: 'patron' },
          { username: 'garson1', pass: '1234', role: 'garson' }
        ];
        localStorage.setItem('evreka_staff_accounts', JSON.stringify(accounts));
      }
      return accounts;
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (sessionStorage.getItem('evreka_admin_logged') === 'true') {
        currentUserRole = sessionStorage.getItem('evreka_admin_role') || 'garson';
        currentUsername = sessionStorage.getItem('evreka_admin_user') || 'Garson';
        applyRoleUI();
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        fetchData();
        setInterval(fetchData, 2000);
      }
    });

    function applyRoleUI() {
      const badge = document.getElementById('role-title-badge');
      document.getElementById('active-user-name').innerText = `${currentUsername} (${currentUserRole.toUpperCase()})`;
      const tabFinance = document.getElementById('tab-btn-finance');
      const tabMenu = document.getElementById('tab-btn-menu');
      const tabUsers = document.getElementById('tab-btn-users');

      if (currentUserRole === 'patron') {
        badge.innerText = 'Patron Paneli';
        badge.className = "text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 font-extrabold";
        if(tabFinance) tabFinance.classList.remove('hidden');
        if(tabMenu) tabMenu.classList.remove('hidden');
        if(tabUsers) tabUsers.classList.remove('hidden');
      } else {
        badge.innerText = 'Garson Paneli';
        badge.className = "text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-extrabold";
        if(tabFinance) tabFinance.classList.add('hidden');
        if(tabMenu) tabMenu.classList.add('hidden');
        if(tabUsers) tabUsers.classList.add('hidden');
      }
    }

    function playNotificationSound() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function tone(freq, start, dur) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime + start);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + start + dur);
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + start); osc.stop(audioCtx.currentTime + start + dur);
        }
        tone(880, 0, 0.15); tone(1174.66, 0.18, 0.3);
      } catch (e) {}
    }

    function handleLogin() {
      const uInput = document.getElementById('user-input').value.trim();
      const pInput = document.getElementById('pass-input').value.trim();

      const accounts = getStaffAccounts();
      const found = accounts.find(a => a.username.toLowerCase() === uInput.toLowerCase() && a.pass === pInput);

      if (found) {
        currentUserRole = found.role;
        currentUsername = found.username;
        sessionStorage.setItem('evreka_admin_logged', 'true');
        sessionStorage.setItem('evreka_admin_role', currentUserRole);
        sessionStorage.setItem('evreka_admin_user', currentUsername);
        applyRoleUI();
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        fetchData();
        setInterval(fetchData, 2000);
      } else {
        alert('Kullanıcı adı veya şifre hatalı!');
      }
    }

    function logout() {
      sessionStorage.removeItem('evreka_admin_logged');
      sessionStorage.removeItem('evreka_admin_role');
      sessionStorage.removeItem('evreka_admin_user');
      location.reload();
    }

    function switchMainTab(tab) {
      document.getElementById('section-orders').classList.add('hidden');
      const secFinance = document.getElementById('section-finance');
      const secMenu = document.getElementById('section-menu');
      const secUsers = document.getElementById('section-users');
      if(secFinance) secFinance.classList.add('hidden');
      if(secMenu) secMenu.classList.add('hidden');
      if(secUsers) secUsers.classList.add('hidden');

      document.getElementById('tab-btn-orders').className = "bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs px-5 py-2.5 rounded-xl font-bold transition";
      ['tab-btn-finance', 'tab-btn-menu', 'tab-btn-users'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.className = "bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs px-5 py-2.5 rounded-xl font-bold transition";
      });

      if (tab === 'orders') {
        document.getElementById('section-orders').classList.remove('hidden');
        document.getElementById('tab-btn-orders').className = "bg-red-600 text-white text-xs px-5 py-2.5 rounded-xl font-extrabold transition shadow-md";
      } else if (tab === 'finance' && currentUserRole === 'patron') {
        secFinance.classList.remove('hidden');
        document.getElementById('tab-btn-finance').className = "bg-red-600 text-white text-xs px-5 py-2.5 rounded-xl font-extrabold transition shadow-md";
        calculateFinanceStats();
      } else if (tab === 'menu' && currentUserRole === 'patron') {
        secMenu.classList.remove('hidden');
        document.getElementById('tab-btn-menu').className = "bg-red-600 text-white text-xs px-5 py-2.5 rounded-xl font-extrabold transition shadow-md";
        fetchCatalogForAdmin();
      } else if (tab === 'users' && currentUserRole === 'patron') {
        secUsers.classList.remove('hidden');
        document.getElementById('tab-btn-users').className = "bg-red-600 text-white text-xs px-5 py-2.5 rounded-xl font-extrabold transition shadow-md";
        renderStaffManagement();
      }
    }

    function renderStaffManagement() {
      const accounts = getStaffAccounts();
      const container = document.getElementById('staff-list-container');
      container.innerHTML = accounts.map((acc, idx) => `
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-black"><i class="fa-solid fa-user"></i></div>
            <div>
              <h4 class="font-black text-white text-sm">${acc.username}</h4>
              <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded ${acc.role === 'patron' ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20 text-indigo-400'}">${acc.role}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <input type="text" id="pass-edit-${idx}" value="${acc.pass}" placeholder="Yeni Şifre" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold w-32">
            <button onclick="updateStaffPass(${idx})" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl font-bold">Güncelle</button>
            ${acc.username !== 'patron' ? `<button onclick="deleteStaff(${idx})" class="bg-slate-800 hover:bg-red-600/30 text-slate-400 hover:text-red-400 px-3 py-2 rounded-xl"><i class="fa-solid fa-trash"></i></button>` : ''}
          </div>
        </div>
      `).join('');
    }

    function addNewStaff() {
      const u = document.getElementById('new-staff-user').value.trim();
      const p = document.getElementById('new-staff-pass').value.trim();
      if (!u || !p) { alert('Lütfen kullanıcı adı ve şifre giriniz.'); return; }
      let accounts = getStaffAccounts();
      if (accounts.some(a => a.username.toLowerCase() === u.toLowerCase())) { alert('Bu kullanıcı adı zaten mevcut!'); return; }
      accounts.push({ username: u, pass: p, role: 'garson' });
      localStorage.setItem('evreka_staff_accounts', JSON.stringify(accounts));
      document.getElementById('new-staff-user').value = '';
      document.getElementById('new-staff-pass').value = '';
      renderStaffManagement();
      alert('Yeni garson hesabı başarıyla eklendi ve giriş için aktif edildi!');
    }

    function updateStaffPass(idx) {
      let accounts = getStaffAccounts();
      const newP = document.getElementById(`pass-edit-${idx}`).value.trim();
      if (!newP) { alert('Şifre boş olamaz!'); return; }
      accounts[idx].pass = newP;
      localStorage.setItem('evreka_staff_accounts', JSON.stringify(accounts));
      renderStaffManagement();
      alert('Şifre güncellendi!');
    }

    function deleteStaff(idx) {
      if (!confirm('Bu personeli silmek istediğinize emin misiniz?')) return;
      let accounts = getStaffAccounts();
      accounts.splice(idx, 1);
      localStorage.setItem('evreka_staff_accounts', JSON.stringify(accounts));
      renderStaffManagement();
    }

    async function fetchData() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          const newOrders = data.orders || [];
          const waitingCount = newOrders.filter(o => String(o.status || '').toUpperCase() === 'WAITING').length;
          if (waitingCount > previousOrderCount) {
            playNotificationSound();
          }
          previousOrderCount = waitingCount;

          cachedOrders = newOrders.map(serverOrder => {
            const existing = cachedOrders.find(o => String(o.id) === String(serverOrder.id));
            return {
              ...serverOrder,
              handledBy: serverOrder.handledBy || (existing ? existing.handledBy : null),
              timeLogs: serverOrder.timeLogs || (existing ? existing.timeLogs : null)
            };
          });

          updateCounts();
          renderOrders();
          if (currentUserRole === 'patron') {
            calculateFinanceStats();
          }
        }
      } catch (err) {}
    }

    function calculateFinanceStats() {
      const paidOrders = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'PAID');
      const totalCiro = paidOrders.reduce((s, o) => s + Number(o.totalPrice || 0), 0);
      document.getElementById('stat-ciro').innerText = `${totalCiro} ₺`;
      document.getElementById('patron-daily-ciro').innerText = `${totalCiro} ₺`;
      document.getElementById('patron-monthly-ciro').innerText = `${totalCiro} ₺`;
    }

    function executeDayEnd() {
      if (!confirm('Gün sonu yapmak istediğinize emin misiniz? Tamamlanan sipariş kasası gün sonu için arşivlenecektir.')) return;
      alert('Gün sonu başarıyla gerçekleştirildi. Ciro raporlandı ve aktif kasa sıfırlandı.');
    }

    async function fetchCatalogForAdmin() {
      if (currentUserRole !== 'patron') return;
      try {
        const res = await fetch('/api/catalog');
        const data = await res.json();
        if (data.success) { cachedCatalog = data.catalog || []; renderAdminCatalog(); }
      } catch (e) {}
    }

    function renderAdminCatalog() {
      const container = document.getElementById('admin-menu-list');
      container.innerHTML = cachedCatalog.map((item, index) => `
        <div class="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <img src="${item.image}" class="w-12 h-12 rounded-xl object-cover">
            <div>
              <h4 class="font-extrabold text-white">${item.title}</h4>
              <span class="text-[10px] text-slate-400 uppercase">${item.category}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Sıralama Butonları -->
            <div class="flex flex-col gap-1">
              <button onclick="moveProduct(${index}, -1)" title="Yukarı Taşı" class="bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-0.5 rounded text-[10px]"><i class="fa-solid fa-arrow-up"></i></button>
              <button onclick="moveProduct(${index}, 1)" title="Aşağı Taşı" class="bg-slate-800 hover:bg-slate-700 text-amber-400 px-2 py-0.5 rounded text-[10px]"><i class="fa-solid fa-arrow-down"></i></button>
            </div>
            <input type="number" id="price-input-${item.id}" value="${item.basePrice}" class="w-20 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-amber-400 font-bold text-center">
            <button onclick="updatePrice('${item.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 rounded-xl font-bold" title="Fiyatı Güncelle"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteProduct('${item.id}')" class="bg-slate-800 hover:bg-red-600/30 text-slate-400 hover:text-red-400 px-2.5 py-1.5 rounded-xl" title="Ürünü Sil"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join('');
    }

    async function moveProduct(index, direction) {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= cachedCatalog.length) return;
      
      // Öğelerin yerini değiştir
      const temp = cachedCatalog[index];
      cachedCatalog[index] = cachedCatalog[newIndex];
      cachedCatalog[newIndex] = temp;

      try {
        await fetch('/api/catalog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ catalog: cachedCatalog })
        });
        renderAdminCatalog();
      } catch (e) {}
    }

    async function addNewProduct() {
      if (currentUserRole !== 'patron') { alert('Bu işlem için Patron yetkisi gerekiyor!'); return; }
      const title = document.getElementById('new-title').value.trim();
      const category = document.getElementById('new-category').value;
      const basePrice = document.getElementById('new-price').value;
      const description = document.getElementById('new-desc').value.trim();
      const image = document.getElementById('new-image').value.trim();
      
      if (!title || !basePrice) { alert('Lütfen ürün adı ve fiyatı giriniz.'); return; }
      
      try {
        const res = await fetch('/api/catalog', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            title, 
            category, 
            basePrice: Number(basePrice), 
            description, 
            image: image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300' 
          }) 
        });
        const data = await res.json();
        if (data.success) {
          document.getElementById('new-title').value = ''; 
          document.getElementById('new-price').value = ''; 
          document.getElementById('new-desc').value = ''; 
          document.getElementById('new-image').value = '';
          fetchCatalogForAdmin(); 
          alert('Ürün menünün en başına başarıyla eklendi!');
        } else {
          alert('Ürün eklenemedi.');
        }
      } catch (e) {}
    }

    async function updatePrice(id) {
      if (currentUserRole !== 'patron') return;
      const newPrice = document.getElementById(`price-input-${id}`).value;
      try {
        const res = await fetch(`/api/catalog/${id}`, { 
          method: 'PATCH', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ basePrice: Number(newPrice) }) 
        });
        const data = await res.json();
        if (data.success) {
          alert('Fiyat güncellendi!'); 
          fetchCatalogForAdmin();
        } else {
          alert('Güncelleme başarısız oldu.');
        }
      } catch (e) {}
    }

    async function deleteProduct(id) {
      if (currentUserRole !== 'patron') return;
      if (!confirm('Silinsin mi?')) return;
      try { 
        await fetch(`/api/catalog/${id}`, { method: 'DELETE' }); 
        fetchCatalogForAdmin(); 
      } catch (e) {}
    }

    function updateCounts() {
      const paid = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'PAID');
      document.getElementById('stat-ciro').innerText = `${paid.reduce((s,o)=>s+Number(o.totalPrice),0)} ₺`;
      document.getElementById('stat-bekleyen').innerText = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'WAITING').length;
      document.getElementById('stat-mutfakta').innerText = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'PREPARING').length;
      document.getElementById('stat-servis').innerText = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'SERVED').length;
    }

    function setFilter(f) {
      currentFilter = f;
      ['ALL', 'WAITING', 'PREPARING', 'SERVED', 'PAID'].forEach(key => {
        const btn = document.getElementById(`filter-${key}`);
        if (btn) {
          if (key === f) {
            btn.className = "px-4 py-2.5 rounded-xl font-extrabold bg-red-600 text-white transition shadow";
          } else {
            btn.className = "px-4 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 border border-slate-700 transition";
          }
        }
      });
      renderOrders();
    }

    async function updateOrderStatus(id, newStatus) {
      try {
        const staffSignature = `${currentUsername} (${currentUserRole.toUpperCase()})`;
        const nowTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('tr-TR');

        const targetOrder = cachedOrders.find(o => String(o.id) === String(id));
        if (targetOrder) {
          targetOrder.status = newStatus;
          
          if (!targetOrder.handledBy) {
            targetOrder.handledBy = staffSignature;
          }

          if (!targetOrder.timeLogs) targetOrder.timeLogs = {};
          if (!targetOrder.timeLogs.created) {
            targetOrder.timeLogs.created = targetOrder.createdAt || nowTime;
          }
          if (newStatus === 'PREPARING' && !targetOrder.timeLogs.preparing) targetOrder.timeLogs.preparing = nowTime;
          if (newStatus === 'SERVED' && !targetOrder.timeLogs.served) targetOrder.timeLogs.served = nowTime;
          if (newStatus === 'PAID' && !targetOrder.timeLogs.paid) targetOrder.timeLogs.paid = nowTime;
        }

        await fetch(`/api/orders/${id}/status`, { 
          method: 'PATCH', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            status: newStatus, 
            handledBy: targetOrder?.handledBy, 
            timeLogs: targetOrder?.timeLogs 
          }) 
        });
        
        renderOrders();
        updateCounts();
      } catch (e) {}
    }

    function openPaymentModal(orderId) {
      selectedOrderForPay = cachedOrders.find(o => String(o.id) === String(orderId));
      if (!selectedOrderForPay) return;
      
      const isPaket = (selectedOrderForPay.items || []).some(i => i.size && i.size.includes('Paket'));
      let tableText = selectedOrderForPay.tableName;
      if (isPaket) tableText += ' - Paket Servis';

      document.getElementById('pay-modal-table').innerText = `${tableText} - Ödeme Al`;
      document.getElementById('pay-modal-amount').innerText = `${selectedOrderForPay.totalPrice} ₺`;
      document.getElementById('payment-modal').classList.remove('hidden');
    }
    function closePaymentModal() { document.getElementById('payment-modal').classList.add('hidden'); }
    async function processPayment() { await updateOrderStatus(selectedOrderForPay.id, 'PAID'); closePaymentModal(); }
    async function cancelOrder(id) {
      if (!confirm('İptal edilsin mi?')) return;
      await updateOrderStatus(id, 'CANCELLED');
    }

    function renderOrders() {
      const container = document.getElementById('orders-container');
      let filtered = cachedOrders;
      const f = currentFilter.toUpperCase();

      if (f === 'WAITING') {
        filtered = cachedOrders.filter(o => String(o.status || 'WAITING').toUpperCase() === 'WAITING');
      } else if (f === 'PREPARING') {
        filtered = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'PREPARING');
      } else if (f === 'SERVED') {
        filtered = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'SERVED');
      } else if (f === 'PAID') {
        filtered = cachedOrders.filter(o => String(o.status || '').toUpperCase() === 'PAID');
      } else {
        filtered = cachedOrders.filter(o => {
          const st = String(o.status || 'WAITING').toUpperCase();
          return st !== 'PAID' && st !== 'CANCELLED';
        });
      }

      if (filtered.length === 0) {
        container.innerHTML = '<div class="col-span-full p-12 text-center text-slate-500 text-xs bg-slate-800/40 rounded-3xl border border-slate-800">Bu aşamada sipariş bulunmuyor.</div>';
        return;
      }

      container.innerHTML = [...filtered].reverse().map(o => {
        const st = String(o.status || 'WAITING').toUpperCase();
        let statusBadge = '';
        let action = '';

        const isPaket = (o.items || []).some(i => i.size && i.size.includes('Paket'));
        let displayTableName = o.tableName;
        if (isPaket) {
          displayTableName += ' <span class="text-amber-300 text-[11px] font-bold">(- Paket Servis)</span>';
        }

        const orderTime = (o.timeLogs && o.timeLogs.created) ? o.timeLogs.created : (o.createdAt || (new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('tr-TR')));

        const handledBadge = o.handledBy 
          ? `<div class="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold px-3 py-1.5 rounded-xl mb-3 flex items-center justify-between shadow-sm"><span class="flex items-center gap-1.5"><i class="fa-solid fa-user-check text-emerald-400"></i> Onaylayan:</span> <span class="text-white">${o.handledBy}</span></div>` 
          : `<div class="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold px-3 py-1.5 rounded-xl mb-3 flex items-center gap-2 shadow-sm"><i class="fa-solid fa-clock text-amber-400"></i> Onay Bekliyor</div>`;

        let timelineBox = '';
        if (st === 'PAID') {
          const logs = o.timeLogs || {};
          timelineBox = `
            <div class="bg-slate-900/95 border border-emerald-500/30 p-3 rounded-2xl text-[11px] space-y-1.5 mb-3 text-slate-300 shadow-inner">
              <div class="font-black text-emerald-400 mb-1 flex items-center gap-1.5"><i class="fa-solid fa-clock-rotate-left"></i> İşlem Zaman Damgaları</div>
              <div class="flex justify-between"><span>📥 Sipariş Alınma:</span> <b class="text-white">${logs.created || orderTime}</b></div>
              <div class="flex justify-between"><span>👨‍🍳 Mutfağa Onay:</span> <b class="text-white">${logs.preparing || '-'}</b></div>
              <div class="flex justify-between"><span>🛎️ Servis / Hazır:</span> <b class="text-white">${logs.served || '-'}</b></div>
              <div class="flex justify-between"><span>💳 Ödeme Alındı:</span> <b class="text-emerald-400">${logs.paid || '-'}</b></div>
            </div>
          `;
        }

        if (st === 'PREPARING') {
          statusBadge = '<span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-xl text-[11px] font-black">Mutfakta</span>';
          action = `<button onclick="updateOrderStatus('${o.id}', 'SERVED')" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3 rounded-xl shadow transition">Hazır / Servis Et (Ödeme Beklet)</button>`;
        } else if (st === 'SERVED') {
          statusBadge = '<span class="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-xl text-[11px] font-black">Masada / Ödeme Bekliyor</span>';
          action = `<button onclick="openPaymentModal('${o.id}')" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3 rounded-xl shadow transition">💳 Ödeme Al (POS)</button>`;
        } else if (st === 'PAID') {
          statusBadge = '<span class="bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1 rounded-xl text-[11px] font-black">Tamamlandı & Arşivlendi</span>';
          action = `<div class="text-center text-xs text-slate-500 font-bold py-1">Kasa Kapatıldı ✅</div>`;
        } else if (st === 'CANCELLED') {
          statusBadge = '<span class="bg-slate-700 text-slate-400 border border-slate-600 px-3 py-1 rounded-xl text-[11px] font-black">İptal Edildi</span>';
          action = `<div class="text-center text-xs text-slate-500 font-bold py-1">İptal ❌</div>`;
        } else {
          statusBadge = '<span class="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-[11px] font-black">Onay Bekliyor</span>';
          action = `<div class="grid grid-cols-2 gap-2"><button onclick="updateOrderStatus('${o.id}', 'PREPARING')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition">Onay (Mutfağa)</button><button onclick="cancelOrder('${o.id}')" class="bg-slate-700 hover:bg-red-600/30 text-slate-300 font-bold text-xs py-3 rounded-xl transition">İptal Et</button></div>`;
        }

        return `
          <div class="bg-slate-800 border border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between gap-4">
            <div>
              <div class="flex justify-between items-center border-b border-slate-700/80 pb-3 mb-3">
                <div>
                  <span class="bg-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow-sm inline-block mb-1">${displayTableName}</span>
                  <span class="text-[10px] text-slate-400 block font-bold"><i class="fa-regular fa-clock text-amber-400"></i> Alınma: ${orderTime}</span>
                </div>
                <span class="text-xs font-mono font-bold text-slate-400">#${o.id}</span>
              </div>
              
              ${handledBadge}
              ${timelineBox}

              <div class="space-y-2.5">
                 ${(o.items||[]).map(i=>`
                  <div class="bg-slate-900/90 p-3 rounded-2xl border border-slate-700/50 text-xs space-y-1">
                    <div class="flex justify-between items-start font-extrabold">
                      <span class="text-slate-100">${i.title}${i.size ? `<span class="text-amber-400 font-semibold block text-[11px] mt-0.5">${i.size}</span>` : ''}</span>
                      <b class="text-amber-400 font-black text-sm">${i.price} ₺</b>
                    </div>
                    ${i.note ? `<div class="text-[11px] text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-xl mt-1.5 flex items-center gap-1.5"><i class="fa-solid fa-comment-dots"></i> Not: ${i.note}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="border-t border-slate-700/80 pt-3.5 flex flex-col gap-3">
              <div class="flex justify-between items-center">
                ${statusBadge}
                <div class="text-right"><span class="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Toplam Tutar</span><span class="text-xl font-black text-emerald-400">${o.totalPrice} ₺</span></div>
              </div>
              ${action}
            </div>
          </div>
        `;
      }).join('');
    }
  </script>
</body>
</html>
