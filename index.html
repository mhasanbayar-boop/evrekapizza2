const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Kalıcı Dosya Yolları (Verilerin Hiçbir Zaman Silinmemesi İçin)
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const CATALOG_FILE = path.join(__dirname, 'catalog.json');

// --- SİPARİŞLER İÇİN KALICI DEPOLAMA ---
function getOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (err) {
    console.error('Siparişler okunurken hata:', err);
    return [];
  }
}

function saveOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Siparişler kaydedilirken hata:', err);
  }
}

// --- MENÜ / KATALOG DEPOLAMA (INDEX.HTML İLE TAM UYUMLU BOYUTLAR VE KATEGORİLER) ---
const initialCatalog = [
  // Klasik Pizzalar (Orta ve Jumbo Boy Seçenekleriyle)
  {
    id: 'c1',
    title: 'Pepperoni',
    category: 'pizza',
    basePrice: 260,
    description: 'Mozzarella, kaşar, sucuk, mantar, biber, mısır, zeytin',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'c2',
    title: 'Etobur (Meat-Lovers)',
    category: 'pizza',
    basePrice: 260,
    description: 'Mozzarella, kaşar, sucuk, salam, sosis',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'c3',
    title: 'Vejetaryen (Vegetarian)',
    category: 'pizza',
    basePrice: 260,
    description: 'Mozzarella, kaşar, mantar, biber, mısır, zeytin',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'c4',
    title: 'Fungi (Mantar)',
    category: 'pizza',
    basePrice: 260,
    description: 'Mozzarella, kaşar, bol mantar, mısır, kekik',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'c5',
    title: 'Bol Karışık (Mixed Meat)',
    category: 'pizza',
    basePrice: 270,
    description: 'Mozzarella, kaşar, salam, sosis, sucuk, biber, mısır, zeytin',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'c6',
    title: 'Margarita (Margherita)',
    category: 'pizza',
    basePrice: 260,
    description: 'Mozzarella, kaşar, domates',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },

  // Special Premium Pizzalar
  {
    id: 'p1',
    title: 'Evreka İmza Dilimler',
    category: 'pizza',
    basePrice: 350,
    description: 'Kavurmalı-dana sucuklu, et dönerli-tavuklu veya tercih edilen 4 farklı dilim',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p2',
    title: 'Evreka Special Deluxe',
    category: 'pizza',
    basePrice: 330,
    description: 'Kaşar, mozzarella, sucuk, pastırma, biber, mısır, zeytin, mantar, cheddar',
    image: 'https://images.unsplash.com/photo-1595750017127-14e4ac151121?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p3',
    title: 'Kavurmalı - Sultan Roast',
    category: 'pizza',
    basePrice: 320,
    description: 'Mozzarella, kaşar, dana kavurma, biber',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p4',
    title: 'Mexican Fire Signature',
    category: 'pizza',
    basePrice: 330,
    description: 'Mozzarella, kaşar, sucuk, jalapeño biber, mısır',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p5',
    title: 'Calzone - Folded Italian Pizza',
    category: 'pizza',
    basePrice: 320,
    description: 'Tercihe göre sebzeli, 3 peynirli veya etli kapalı pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },

  // Burgerler
  {
    id: 'b1',
    title: 'Hamburger (Classic)',
    category: 'burger',
    basePrice: 260,
    description: 'Susamlı ekmek, 100gr dana izgara köfte, domates, marul, turşu, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
  },
  {
    id: 'b2',
    title: 'Cheeseburger',
    category: 'burger',
    basePrice: 280,
    description: 'Susamlı ekmek, 100gr dana köfte, domates, marul, turşu, cheddar, karamelize soğan',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300'
  },
  {
    id: 'b3',
    title: 'Double Burger',
    category: 'burger',
    basePrice: 350,
    description: 'Susamlı ekmek, 2x 100gr dana köfte, cheddar, domates, marul, turşu, karamelize soğan',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300'
  },
  {
    id: 'b4',
    title: 'Evreka Special Burger',
    category: 'burger',
    basePrice: 390,
    description: 'Susamlı ekmek, 100gr dana köfte, pastırma, sucuk, cheddar, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300'
  },
  {
    id: 'b5',
    title: 'Crispy Chicken Burger',
    category: 'burger',
    basePrice: 220,
    description: 'Susamlı ekmek, çıtır tavuk eti, domates, marul, özel sos',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=300'
  },

  // Salatalar
  {
    id: 's1',
    title: 'Tavuk Göbek Salata',
    category: 'salad',
    basePrice: 200,
    description: 'Marul, kornişon turşu, mısır, tavuk parçaları, mayonez, yoğurt',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300'
  },
  {
    id: 's2',
    title: 'Tonno Salata',
    category: 'salad',
    basePrice: 200,
    description: 'Marul, soğan, maydanoz, çeri domates, kapya biber, mısır, ton balığı, limon suyu',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300'
  },
  {
    id: 's3',
    title: 'Mevsim Salata',
    category: 'salad',
    basePrice: 150,
    description: 'Mevsimine göre taze yeşillikler',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300'
  },

  // Atıştırmalıklar (Side)
  {
    id: 'w1',
    title: 'Kapsalon',
    category: 'side',
    basePrice: 300,
    description: 'Patates kızartma, döner, kaşar, yeşillik, domates, sos',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300'
  },
  {
    id: 'sn1',
    title: 'Patates Cips',
    category: 'side',
    basePrice: 100,
    description: 'Çıtır patates kızartması',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300'
  },
  {
    id: 'sn2',
    title: 'Elma Dilim Patates',
    category: 'side',
    basePrice: 110,
    description: 'Baharatlı elma dilim patates',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300'
  },
  {
    id: 'sn3',
    title: '6\'lı Tavuk Nugget',
    category: 'side',
    basePrice: 100,
    description: 'Çıtır tavuk nugget',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },
  {
    id: 'sn5',
    title: '6\'lı Soğan Halkası',
    category: 'side',
    basePrice: 90,
    description: 'Çıtır soğan halkası',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300'
  },
  {
    id: 'sn8',
    title: 'Schnitzel',
    category: 'side',
    basePrice: 90,
    description: 'Tavuk schnitzel',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },

  // Tatlılar
  {
    id: 'd1',
    title: 'Waffle',
    category: 'dessert',
    basePrice: 150,
    description: 'Çikolatalı ve meyveli waffle',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300'
  },
  {
    id: 'd2',
    title: 'Çikolatalı Pizza',
    category: 'dessert',
    basePrice: 250,
    description: 'Tatlı çikolata dolgulu özel pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300'
  },
  {
    id: 'd3',
    title: 'Cup Tiramisu',
    category: 'dessert',
    basePrice: 150,
    description: 'Kup tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300'
  },
  {
    id: 'd5',
    title: 'Sütlaç',
    category: 'dessert',
    basePrice: 150,
    description: 'Fırın sütlaç',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300'
  },

  // İçecekler
  {
    id: 'cd1',
    title: 'ColaTurka / Sarıyer (Kutu)',
    category: 'beverage',
    basePrice: 90,
    description: '330ml kutu',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300'
  },
  {
    id: 'cd2',
    title: 'Pepsi (Kutu)',
    category: 'beverage',
    basePrice: 90,
    description: '330ml kutu',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300'
  },
  {
    id: 'cd3',
    title: 'Coca-Cola (Kutu)',
    category: 'beverage',
    basePrice: 90,
    description: '330ml kutu',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300'
  },
  {
    id: 'cd5',
    title: 'Ayran',
    category: 'beverage',
    basePrice: 40,
    description: 'Buz gibi ayran',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300'
  },
  {
    id: 'cd6',
    title: 'Su 0.5Lt',
    category: 'beverage',
    basePrice: 25,
    description: 'Doğal kaynak suyu',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300'
  },
  {
    id: 'cf9',
    title: 'Çay',
    category: 'beverage',
    basePrice: 25,
    description: 'Taze demlenmiş dökme çay',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300'
  },
  {
    id: 'cf10',
    title: 'Türk Kahvesi',
    category: 'beverage',
    basePrice: 80,
    description: 'Közde Türk kahvesi',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300'
  }
];

function getCatalog() {
  try {
    if (!fs.existsSync(CATALOG_FILE)) {
      fs.writeFileSync(CATALOG_FILE, JSON.stringify(initialCatalog, null, 2));
      return initialCatalog;
    }
    return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  } catch (err) {
    console.error('Katalog okunurken hata:', err);
    return initialCatalog;
  }
}

function saveCatalog(catalog) {
  try {
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  } catch (err) {
    console.error('Katalog kaydedilirken hata:', err);
  }
}

let nextOrderId = 1001;
const existingOrders = getOrders();
if (existingOrders.length > 0) {
  const maxId = Math.max(...existingOrders.map(o => Number(o.id) || 1000));
  if (maxId >= nextOrderId) {
    nextOrderId = maxId + 1;
  }
}

// --- API ENDPOINTLERİ ---

// Müşteri Menü Katalog Endpoint'i (index.html buraya istek atıyor)
app.get('/api/catalog', (req, res) => {
  const catalog = getCatalog();
  res.json({ success: true, catalog });
});

// Siparişleri Listele (Kalıcı Dosyadan Okur)
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({ success: true, orders });
});

// Yeni Sipariş Oluştur (Kalıcı Dosyaya Yazar ve Asla Silinmez)
app.post('/api/orders', (req, res) => {
  const { tableName, items, totalPrice } = req.body;
  if (!tableName || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Eksik sipariş bilgisi' });
  }

  const orders = getOrders();
  const newOrder = {
    id: nextOrderId++,
    tableName,
    items,
    totalPrice,
    status: 'WAITING',
    createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('tr-TR')
  };

  orders.push(newOrder);
  saveOrders(orders);
  res.json({ success: true, order: newOrder });
});

// Sipariş Durumunu Güncelle (Kalıcı Olarak Kaydeder)
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, handledBy, timeLogs } = req.body;
  const orders = getOrders();
  const order = orders.find(o => String(o.id) === String(id));
  
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  
  order.status = status;
  if (handledBy) order.handledBy = handledBy;
  if (timeLogs) order.timeLogs = timeLogs;
  
  saveOrders(orders);
  res.json({ success: true, order });
});

// Sayfa Yönlendirmeleri
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
  console.log(`🚀 Evreka Pizza Sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});
