const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

let orders = [];
let nextOrderId = 1001;

// Dinamik Menü Veritabanı (Bellek İçi)
let catalog = [
  { id: 'piz-01', category: 'pizza', title: 'Pepperoni Pizza', description: 'Mozarella/kaşar, sucuk, mantar, biber, mısır, zeytin.', basePrice: 260, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80', sizes: [{id:'sz-m', name:'Orta Boy', priceOffset:0}, {id:'sz-j', name:'Büyük Boy', priceOffset:70}], ingredients: ['Mozarella/Kaşar','Sucuk','Mantar','Biber','Mısır','Zeytin'], extras: [{name:'Ekstra Mozarella', price:45}] },
  { id: 'piz-02', category: 'pizza', title: 'Etobur Pizza', description: 'Mozarella/kaşar, sucuk, salam, sosis.', basePrice: 260, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', sizes: [{id:'sz-m', name:'Orta Boy', priceOffset:0}, {id:'sz-j', name:'Büyük Boy', priceOffset:70}], ingredients: ['Mozarella/Kaşar','Sucuk','Salam','Sosis'], extras: [] },
  { id: 'burg-01', category: 'burger', title: 'Hamburger (Classic)', description: 'Susamlı ekmek, 100gr dana köfte, domates, marul, turşu, sos.', basePrice: 260, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', sizes: [], ingredients: ['Dana Köfte','Domates','Marul','Turşu','Sos'], extras: [{name:'Cheddar', price:35}] },
  { id: 'bev-01', category: 'beverage', title: 'Coca-Cola (330ml)', description: 'Buz gibi kutu soğuk meşrubat.', basePrice: 70, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80', sizes: [], ingredients: ['Kutu İçecek'], extras: [] },
  { id: 'des-01', category: 'dessert', title: 'Sıcak Çikolatalı Waffle', description: 'Özel çikolata ve taze meyvelerle.', basePrice: 150, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80', sizes: [], ingredients: ['Waffle Hamuru','Çikolata','Meyve'], extras: [] }
];

// Auth & Orders API
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === '1234' || password === 'admin') res.json({ success: true });
  else res.status(401).json({ success: false, error: 'Geçersiz Şifre!' });
});

app.get('/api/orders', (req, res) => res.json({ success: true, orders }));

app.post('/api/orders', (req, res) => {
  const { tableName, items, totalPrice } = req.body;
  const newOrder = { id: nextOrderId++, tableName, items, totalPrice, status: 'WAITING', createdAt: new Date().toISOString() };
  orders.push(newOrder);
  res.json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id/approve', (req, res) => {
  const o = orders.find(x => String(x.id) === String(req.params.id));
  if (o) o.status = 'PREPARING';
  res.json({ success: true, order: o });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const o = orders.find(x => String(x.id) === String(req.params.id));
  if (o) o.status = req.body.status;
  res.json({ success: true, order: o });
});

app.delete('/api/orders/:id', (req, res) => {
  const o = orders.find(x => String(x.id) === String(req.params.id));
  if (o) o.status = 'CANCELLED';
  res.json({ success: true });
});

// --- MENÜ YÖNETİMİ API'LERİ ---
app.get('/api/catalog', (req, res) => res.json({ success: true, catalog }));

app.post('/api/catalog', (req, res) => {
  const { title, category, basePrice, description, image } = req.body;
  if (!title || !basePrice) return res.status(400).json({ success: false, error: 'Ürün adı ve fiyatı zorunludur' });
  
  const newItem = {
    id: 'prod-' + Date.now(),
    category: category || 'pizza',
    title,
    description: description || '',
    basePrice: Number(basePrice),
    image: image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sizes: category === 'pizza' ? [{id:'sz-m', name:'Orta Boy', priceOffset:0}, {id:'sz-j', name:'Büyük Boy', priceOffset:70}] : [],
    ingredients: ['Ana Malzeme'],
    extras: []
  };
  catalog.push(newItem);
  res.json({ success: true, item: newItem });
});

app.delete('/api/catalog/:id', (req, res) => {
  catalog = catalog.filter(item => String(item.id) !== String(req.params.id));
  res.json({ success: true });
});

app.patch('/api/catalog/:id/price', (req, res) => {
  const { basePrice } = req.body;
  const item = catalog.find(x => String(x.id) === String(req.params.id));
  if (item) {
    item.basePrice = Number(basePrice);
    res.json({ success: true, item });
  } else {
    res.status(404).json({ success: false, error: 'Ürün bulunamadı' });
  }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => console.log(`🚀 Evreka Pizza Sunucusu http://localhost:${PORT} adresinde çalışıyor.`));
