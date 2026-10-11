const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const ORDERS_FILE = path.join(__dirname, 'orders.json');
const CATALOG_FILE = path.join(__dirname, 'catalog.json');

function getOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (err) {
    return [];
  }
}

function saveOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {}
}

const initialCatalog = [
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
    id: 'b1',
    title: 'Hamburger (Classic)',
    category: 'burger',
    basePrice: 260,
    description: 'Susamlı ekmek, 100gr dana izgara köfte, domates, marul, turşu, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
  },
  {
    id: 's1',
    title: 'Tavuk Göbek Salata',
    category: 'salad',
    basePrice: 200,
    description: 'Marul, kornişon turşu, mısır, tavuk parçaları, mayonez, yoğurt',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300'
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
    id: 'd1',
    title: 'Waffle',
    category: 'dessert',
    basePrice: 150,
    description: 'Çikolatalı ve meyveli waffle',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300'
  },
  {
    id: 'cd1',
    title: 'Coca-Cola (Kutu)',
    category: 'beverage',
    basePrice: 90,
    description: '330ml kutu',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300'
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
    return initialCatalog;
  }
}

let nextOrderId = 1001;
const existingOrders = getOrders();
if (existingOrders.length > 0) {
  const maxId = Math.max(...existingOrders.map(o => Number(o.id) || 1000));
  if (maxId >= nextOrderId) nextOrderId = maxId + 1;
}

app.get('/api/catalog', (req, res) => {
  res.json({ success: true, catalog: getCatalog() });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders: getOrders() });
});

app.post('/api/orders', (req, res) => {
  const { tableName, items, totalPrice } = req.body;
  if (!tableName || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Eksik sipariş bilgisi' });
  }

  const orders = getOrders();
  
  // Türkiye saat dilimine tam uyumlu, 2 saat geri kalma sorununu çözen saat damgası
  const now = new Date();
  const timeString = now.toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul' });

  const newOrder = {
    id: nextOrderId++,
    tableName,
    items,
    totalPrice,
    status: 'WAITING',
    createdAt: `${timeString} - ${dateString}`
  };

  orders.push(newOrder);
  saveOrders(orders);
  res.json({ success: true, order: newOrder });
});

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

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
  console.log(`🚀 Evreka Pizza Sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});
