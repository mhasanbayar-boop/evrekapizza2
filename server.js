const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

let orders = [];
let nextOrderId = 1001;

// Gönderdiğiniz Menü Fotoğraflarındaki Tüm Gerçek Ürünler ve Fiyatlar
let catalog = [
  // --- CLASSIC PİZZALAR ---
  {
    id: 'piz-c1', category: 'pizza', title: 'Pepperoni Pizza', description: 'Mozarella/kaşar, sucuk, mantar, biber, mısır, zeytin.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Sucuk', 'Mantar', 'Biber', 'Mısır', 'Zeytin'], extras: [{name:'Ekstra Mozarella', price:45}]
  },
  {
    id: 'piz-c2', category: 'pizza', title: 'Etobur (Meat-Lovers)', description: 'Mozarella/kaşar, sucuk, salam, sosis.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Sucuk', 'Salam', 'Sosis'], extras: [{name:'Ekstra Peynir', price:45}]
  },
  {
    id: 'piz-c3', category: 'pizza', title: 'Vejetaryen (Vegetarian)', description: 'Mozarella/kaşar, mantar, biber, mısır, zeytin.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Mantar', 'Biber', 'Mısır', 'Zeytin'], extras: []
  },
  {
    id: 'piz-c4', category: 'pizza', title: 'Fungi (Mantar)', description: 'Mozarella/kaşar, bol mantar, mısır, kekik.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Bol Mantar', 'Mısır', 'Kekik'], extras: []
  },
  {
    id: 'piz-c5', category: 'pizza', title: 'Bol Karışık (Mixed Meat)', description: 'Mozarella/kaşar, salam, sosis, sucuk, biber, mısır, zeytin.', basePrice: 270,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Salam', 'Sosis', 'Sucuk', 'Biber', 'Mısır', 'Zeytin'], extras: []
  },
  {
    id: 'piz-c6', category: 'pizza', title: 'Margarita', description: 'Mozarella/kaşar, domates.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Domates'], extras: []
  },

  // --- SPECIAL & PREMIUM PİZZALAR ---
  {
    id: 'piz-s1', category: 'pizza', title: 'Evreka Special Deluxe', description: 'Kaşar, mozarella, sucuk, pastırma, biber, mısır, zeytin, mantar, cheddar peyniri.', basePrice: 330,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Kaşar', 'Mozarella', 'Sucuk', 'Pastırma', 'Biber', 'Mısır', 'Zeytin', 'Mantar', 'Cheddar'], extras: []
  },
  {
    id: 'piz-s2', category: 'pizza', title: 'Kavurmalı Sultan Roast', description: 'Mozarella/kaşar, dana kavurma, biber.', basePrice: 320,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Dana Kavurma', 'Biber'], extras: []
  },
  {
    id: 'piz-s3', category: 'pizza', title: 'Pastırmalı Signatura', description: 'Mozarella/kaşar, dana pastırma, biber.', basePrice: 320,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Mozarella/Kaşar', 'Dana Pastırma', 'Biber'], extras: []
  },
  {
    id: 'piz-s4', category: 'pizza', title: 'Dönerli Pizza', description: 'Özel sos, mozarella/kaşar, et döner, biber.', basePrice: 320,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    sizes: [{ id: 'sz-m', name: 'Orta Boy (Medium)', priceOffset: 0 }, { id: 'sz-j', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }],
    ingredients: ['Özel Sos', 'Mozarella/Kaşar', 'Et Döner', 'Biber'], extras: []
  },

  // --- BURGERLER ---
  {
    id: 'burg-01', category: 'burger', title: 'Hamburger (Classic)', description: 'Susamlı ekmek, 100gr dana köfte, domates, marul, turşu, karamelize soğan, özel sos.', basePrice: 260,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Dana Köfte (100gr)', 'Domates', 'Marul', 'Turşu', 'Karamelize Soğan', 'Özel Sos'], extras: [{name:'Cheddar', price:35}]
  },
  {
    id: 'burg-02', category: 'burger', title: 'Cheeseburger', description: 'Susamlı ekmek, 100gr dana köfte, cheddar, domates, marul, turşu, özel sos.', basePrice: 280,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Dana Köfte', 'Cheddar', 'Domates', 'Marul', 'Turşu', 'Özel Sos'], extras: []
  },
  {
    id: 'burg-03', category: 'burger', title: 'Double Burger', description: 'Susamlı ekmek, 2 x 100gr dana köfte, cheddar, domates, marul, turşu, özel sos.', basePrice: 350,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['2x Dana Köfte', 'Cheddar', 'Domates', 'Marul', 'Turşu', 'Özel Sos'], extras: []
  },
  {
    id: 'burg-04', category: 'burger', title: 'Evreka Special Burger', description: '2x Köfte, pastırma, sucuk, cheddar, karamelize soğan, özel sos.', basePrice: 390,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['2x Dana Köfte', 'Pastırma', 'Sucuk', 'Cheddar', 'Karamelize Soğan'], extras: []
  },
  {
    id: 'burg-05', category: 'burger', title: 'Crispy Chicken Burger', description: 'Çıtır tavuk eti, domates, marul, özel sos.', basePrice: 220,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Çıtır Tavuk', 'Domates', 'Marul', 'Özel Sos'], extras: []
  },

  // --- SALATALAR ---
  {
    id: 'sal-01', category: 'salad', title: 'Tavuk Göbek Salata', description: 'Marul, kornişon turşu, mısır, tavuk parçaları, mayonez, yoğurt.', basePrice: 200,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Marul', 'Kornişon Turşu', 'Mısır', 'Tavuk Parçaları', 'Mayonez', 'Yoğurt'], extras: []
  },
  {
    id: 'sal-02', category: 'salad', title: 'Tonno Salata', description: 'Marul, soğan, maydanoz, çeri domates, kapya biber, mısır, ton balığı, limon suyu.', basePrice: 200,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Marul', 'Soğan', 'Maydanoz', 'Çeri Domates', 'Kapya Biber', 'Ton Balığı'], extras: []
  },
  {
    id: 'sal-03', category: 'salad', title: 'Mevsim Salata', description: 'Mevsimine göre taze yeşillikler.', basePrice: 150,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Taze Yeşillikler', 'Domates', 'Salatalık'], extras: []
  },

  // --- ATIŞTIRMALIKLAR ---
  {
    id: 'sd-01', category: 'side', title: 'Patates Cips', description: 'Baharatlı çıtır patates.', basePrice: 100,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Patates', 'Baharat'], extras: []
  },
  {
    id: 'sd-02', category: 'side', title: "6'lı Soğan Halkası", description: 'Çıtır kaplamalı soğan halkası.', basePrice: 90,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Soğan Halkası'], extras: []
  },
  {
    id: 'sd-03', category: 'side', title: "6'lı Tavuk Nugget", description: 'Çıtır tavuk nugget.', basePrice: 100,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Tavuk Nugget'], extras: []
  },

  // --- İÇECEKLER ---
  {
    id: 'bev-01', category: 'beverage', title: 'Coca-Cola Kutu (330ml)', description: 'Soğuk meşrubat.', basePrice: 70,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Kutu İçecek'], extras: []
  },
  {
    id: 'bev-02', category: 'beverage', title: 'Fanta Kutu (330ml)', description: 'Portakal aromalı gazlı içecek.', basePrice: 70,
    image: 'https://images.unsplash.com/photo-1624552184280-9e9632bbeee9?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Kutu İçecek'], extras: []
  },
  {
    id: 'bev-03', category: 'beverage', title: 'Ayran', description: 'Köpüklü yayık ayranı.', basePrice: 40,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Ayran'], extras: []
  },
  {
    id: 'bev-04', category: 'beverage', title: 'Su (0.5L)', description: 'Doğal kaynak suyu.', basePrice: 25,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Su'], extras: []
  },

  // --- TATLILAR ---
  {
    id: 'des-01', category: 'dessert', title: 'Sıcak Çikolatalı Waffle', description: 'Özel Belçika çikolatası ve taze meyvelerle.', basePrice: 150,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Waffle Hamuru', 'Çikolata', 'Meyveler'], extras: []
  },
  {
    id: 'des-02', category: 'dessert', title: 'Çikolatalı Pizza', description: 'Fırından yeni çıkmış tatlı pizza.', basePrice: 250,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Pizza Tabanı', 'Çikolata'], extras: []
  },
  {
    id: 'des-03', category: 'dessert', title: 'Sütlaç', description: 'Geleneksel fırın sütlaç.', basePrice: 150,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Süt', 'Pirinç', 'Şeker'], extras: []
  },
  {
    id: 'des-04', category: 'dessert', title: 'Cup Tiramisu', description: 'Özel İtalyan tiramisu.', basePrice: 250,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    sizes: [], ingredients: ['Labne', 'Kedi Dili', 'Kahve'], extras: []
  }
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
