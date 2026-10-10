const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

let orders = [];
let nextOrderId = 1001;

// Admin / Garson Giriş API
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === '1234' || password === 'admin') {
    res.json({ success: true, message: 'Giriş başarılı' });
  } else {
    res.status(401).json({ success: false, error: 'Geçersiz Şifre!' });
  }
});

// Siparişleri Listele
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders });
});

// Yeni Sipariş Oluştur (Müşteri Sepetten Gönderdiğinde)
app.post('/api/orders', (req, res) => {
  const { tableName, items, totalPrice } = req.body;
  if (!tableName || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Eksik sipariş bilgisi' });
  }

  const newOrder = {
    id: nextOrderId++,
    tableName,
    items,
    totalPrice,
    status: 'WAITING',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.json({ success: true, order: newOrder });
});

// Siparişi Onayla (Mutfağa Gönder)
app.patch('/api/orders/:id/approve', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => String(o.id) === String(id));
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  order.status = 'PREPARING';
  res.json({ success: true, order });
});

// Sipariş Durumunu Güncelle (Mutfakta / Masada Servis / Ödendi)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => String(o.id) === String(id));
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  order.status = status;
  res.json({ success: true, order });
});

// Siparişi İptal Et
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => String(o.id) === String(id));
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  order.status = 'CANCELLED';
  res.json({ success: true, message: 'Sipariş iptal edildi' });
});

// Sayfa Yönlendirmeleri
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
  console.log(`🚀 Evreka Pizza Sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});