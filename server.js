const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Siparişlerin kalıcı olarak saklanacağı dosya yolu
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Dosyadan siparişleri okuma fonksiyonu
function getOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Siparişler okunurken hata oluştu:', err);
    return [];
  }
}

// Dosyaya siparişleri kaydetme fonksiyonu
function saveOrders(orders) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Siparişler kaydedilirken hata oluştu:', err);
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

// Komple Menü Veritabanı
const menu = {
  classicPizzas: [
    { id: 'c1', name: 'Pepperoni', description: 'Mozzarella, kaşar, sucuk, mantar, biber, mısır, zeytin', prices: { medium: 260, jumbo: 330 } },
    { id: 'c2', name: 'Etobur (Meat-Lovers)', description: 'Mozzarella, kaşar, sucuk, salam, sosis', prices: { medium: 260, jumbo: 330 } },
    { id: 'c3', name: 'Vejetaryen (Vegetarian)', description: 'Mozzarella, kaşar, mantar, biber, mısır, zeytin', prices: { medium: 260, jumbo: 330 } },
    { id: 'c4', name: 'Fungi (Mantar)', description: 'Mozzarella, kaşar, bol mantar, mısır, kekik', prices: { medium: 260, jumbo: 330 } },
    { id: 'c5', name: 'Bol Karışık (Mixed Meat)', description: 'Mozzarella, kaşar, salam, sosis, sucuk, biber, mısır, zeytin', prices: { medium: 270, jumbo: 340 } },
    { id: 'c6', name: 'Margarita (Margherita)', description: 'Mozzarella, kaşar, domates', prices: { medium: 260, jumbo: 330 } }
  ],
  specialPremiumPizzas: [
    { id: 'p1', name: 'Evreka İmza Dilimler (Signature Slices)', description: 'Kavurmalı-dana sucuklu, et dönerli-tavuklu veya tercih edilen 4 farklı dilim', prices: { medium: 350, jumbo: 420 } },
    { id: 'p2', name: 'Evreka Special Deluxe', description: 'Kaşar, mozzarella, sucuk, pastırma, biber, mısır, zeytin, mantar, cheddar peyniri', prices: { medium: 330, jumbo: 400 } },
    { id: 'p3', name: 'Kavurmalı - Sultan Roast', description: 'Mozzarella, kaşar, dana kavurma, biber', prices: { medium: 320, jumbo: 390 } },
    { id: 'p4', name: 'Dana Sucuklu - Smoked Beef Signatura', description: 'Mozzarella, kaşar, dana sucuk', prices: { medium: 320, jumbo: 390 } },
    { id: 'p5', name: 'Mexican - Mexican Fire Signature', description: 'Mozzarella, kaşar, sucuk, jalapeño biber, mısır', prices: { medium: 330, jumbo: 400 } },
    { id: 'p6', name: 'Pastırmalı - Pastırma Signatura', description: 'Mozzarella, kaşar, dana pastırma, biber', prices: { medium: 320, jumbo: 390 } },
    { id: 'p7', name: 'Dönerli Pizza - Döner Kebap Signatura', description: 'Özel sos, mozzarella, kaşar, et döner, biber', prices: { medium: 320, jumbo: 390 } },
    { id: 'p8', name: 'Ton Balıklı - Tuna Signatura', description: 'Mozzarella, kaşar, ton balığı, mısır, soğan', prices: { medium: 310, jumbo: 380 } },
    { id: 'p9', name: 'Tavuklu - Chicken Royale', description: 'Mozzarella, kaşar, tavuk parçaları, biber, mısır', prices: { medium: 310, jumbo: 380 } },
    { id: 'p10', name: 'Evreka Közlüce - Köz Signatura', description: 'Mozzarella, kaşar, köz biber, köz patlıcan, biber', prices: { medium: 300, jumbo: 370 } },
    { id: 'p11', name: 'Küflü Peynirli - Blue Cheese Pizza', description: 'Mozzarella, kaşar, küflü peynir, mantar, biber', prices: { medium: 290, jumbo: 360 } },
    { id: 'p12', name: 'Dört Peynirli - Quattro Formaggi', description: 'Mozzarella, kaşar, cheddar peyniri, üçgen peynir', prices: { medium: 310, jumbo: 380 } },
    { id: 'p13', name: 'Akdeniz Pizza', description: 'Çeri domates, biber, beyaz peynir, zeytin', prices: { medium: 300, jumbo: 370 } },
    { id: 'p14', name: 'Calzone - Folded Italian Pizza', description: 'Tercihe göre sebzeli, 3 peynirli veya etli üzeri susamlı ve yumurta sarılı kapalı pizza', prices: { medium: 320, jumbo: 390 } },
    { id: 'p15', name: 'Hot Honey Pizza (Acı - Tatlı)', description: 'Mozzarella, sucuk, sıcak acı bal sos', prices: { medium: 320, jumbo: 390 } }
  ],
  burgers: [
    { id: 'b1', name: 'Hamburger (Classic)', price: 260, description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, domates, marul, turşu, karamelize soğan, özel sos' },
    { id: 'b2', name: 'Cheeseburger', price: 280, description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, domates, marul, turşu, cheddar peyniri, karamelize soğan, özel sos' },
    { id: 'b3', name: 'Double Burger', price: 350, description: 'Susamlı burger ekmeği, 2 x 100gr dana izgara köfte, cheddar peyniri, domates, marul, turşu, karamelize soğan, özel sos' },
    { id: 'b4', name: 'Evreka Special (Signature Burger)', price: 390, description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, pastırma ve sucuk, cheddar peyniri, karamelize soğan, domates, özel sos' },
    { id: 'b5', name: 'Mexican Fire Burger', price: 300, description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, cheddar peyniri, domates, jalapeño biber, acı sos' },
    { id: 'b6', name: 'Truffle Deluxe Burger', price: 300, description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, mantar, truffle mayo, cheddar peyniri, turşu, özel sos' },
    { id: 'b7', name: 'Crispy Chicken Burger (Tavuk Burger)', price: 220, description: 'Susamlı burger ekmeği, çıtır tavuk eti, domates, marul, özel sos' },
    { id: 'b8', name: 'Evreka Double Kapalı Burger', price: 350, description: 'Evreka hamur, cheddar peyniri, karamelize soğan ve 2 adet dana köfte, turşu, burger sos, hamur üzeri susam ve yumurta sarısı' }
  ],
  salads: [
    { id: 's1', name: 'Tavuk Göbek Salata', price: 200, description: 'Marul, kornişon turşu, mısır, tavuk parçaları, mayonez, yoğurt' },
    { id: 's2', name: 'Tonno Salata', price: 200, description: 'Marul, soğan, maydanoz, çeri domates, kapya biber, mısır, ton balığı salatalık, limon suyu' },
    { id: 's3', name: 'Mevsim Salata', price: 150, description: 'Mevsimine göre taze yeşillikler' }
  ],
  worldCuisine: [
    { id: 'w1', name: 'Kapsalon', price: 300, description: 'Patates kızartma, döner, kaşar, yeşillik, domates, sos' }
  ],
  desserts: [
    { id: 'd1', name: 'Waffle', price: 150 },
    { id: 'd2', name: 'Çikolatalı Pizza', price: 250 },
    { id: 'd3', name: 'Cup Tiramisu', price: 150 },
    { id: 'd4', name: 'Cup Magnolia', price: 150 },
    { id: 'd5', name: 'Sütlaç', price: 150 },
    { id: 'd6', name: 'Dondurma', price: 150 },
    { id: 'd7', name: 'Cheesecake Çeşitleri', price: 150 },
    { id: 'd8', name: 'Brownie', price: 150 },
    { id: 'd9', name: 'Ekmek Kadayıfı + Üzeri Top Dondurma', price: 150 },
    { id: 'd10', name: '2 Dilim Baklava + Üzeri Top Dondurma', price: 150 }
  ],
  coffeeAndHotDrinks: [
    { id: 'cf1', name: 'Americano', price: 100 },
    { id: 'cf2', name: 'Espresso', price: 100 },
    { id: 'cf3', name: 'Nescafe', price: 100 },
    { id: 'cf4', name: 'Cappuccino', price: 100 },
    { id: 'cf5', name: 'Macchiato', price: 100 },
    { id: 'cf6', name: 'Latte', price: 100 },
    { id: 'cf7', name: 'Filtre Kahve', price: 100 },
    { id: 'cf8', name: 'Bitki Çayı', price: 100 },
    { id: 'cf9', name: 'Çay', price: 25 },
    { id: 'cf10', name: 'Türk Kahvesi', price: 80 }
  ],
  coldDrinks: [
    { id: 'cd1', name: 'ColaTurka / Sarıyer (200ml şişe)', price: 70 },
    { id: 'cd2', name: 'ColaTurka / Sarıyer (330ml kutu)', price: 90 },
    { id: 'cd3', name: 'ColaTurka / Sarıyer (1Lt)', price: 110 },
    { id: 'cd4', name: 'Pepsi (200ml şişe)', price: 70 },
    { id: 'cd5', name: 'Pepsi (330ml kutu)', price: 90 },
    { id: 'cd6', name: 'Pepsi (1Lt)', price: 110 },
    { id: 'cd7', name: 'Coca-Cola (200ml şişe)', price: 70 },
    { id: 'cd8', name: 'Coca-Cola (330ml kutu)', price: 90 },
    { id: 'cd9', name: 'Coca-Cola (1Lt)', price: 110 },
    { id: 'cd10', name: 'Fanta (200ml şişe)', price: 70 },
    { id: 'cd11', name: 'Fanta (330ml kutu)', price: 90 },
    { id: 'cd12', name: 'Fanta (1Lt)', price: 110 },
    { id: 'cd13', name: 'Soğuk Çay Çeşitleri (330ml kutu)', price: 90 },
    { id: 'cd14', name: 'Juss-Tea Çeşitleri (250ml kutu)', price: 70 },
    { id: 'cd15', name: 'Meyve Suyu Çeşitleri (330ml kutu)', price: 90 },
    { id: 'cd16', name: 'Sprite Kutu', price: 90 },
    { id: 'cd17', name: 'Sprite Şişe', price: 70 },
    { id: 'cd18', name: 'Meyveli Soda Çeşitleri', price: 60 },
    { id: 'cd19', name: 'Sade Soda Şişe', price: 50 },
    { id: 'cd20', name: 'Gazoz', price: 65 },
    { id: 'cd21', name: 'Çocuk Meyve Suyu (200ml)', price: 30 },
    { id: 'cd22', name: 'Çocuk Meyve Suyu Capri-Sun', price: 50 },
    { id: 'cd23', name: 'Enerji İçeceği', price: 100 },
    { id: 'cd24', name: 'Şalgam Suyu', price: 60 },
    { id: 'cd25', name: 'Ayran', price: 40 },
    { id: 'cd26', name: 'Su 0.5Lt', price: 25 },
    { id: 'cd27', name: 'Soğuk Kahve Çeşitleri', price: 110 }
  ],
  snacks: [
    { id: 'sn1', name: 'Patates Cips', price: 100 },
    { id: 'sn2', name: 'Elma Dilim Patates', price: 110 },
    { id: 'sn3', name: '6\'lı Tavuk Nugget', price: 100 },
    { id: 'sn4', name: '6\'lı Tavuk Topları', price: 90 },
    { id: 'sn5', name: '6\'lı Soğan Halkası', price: 90 },
    { id: 'sn6', name: '3\'lü Çıtır Tavuk', price: 90 },
    { id: 'sn7', name: '4\'lü Patates Kroket', price: 90 },
    { id: 'sn8', name: 'Schnitzel', price: 90 }
  ],
  extraMenus: [
    { id: 'em1', name: 'Sınırsız Menü (Evreka Unlimited)', price: 549, description: 'Sınırsız pizza + sınırsız cips + ilk 200 ml şişe içecek bizden' },
    { id: 'em2', name: 'Avantaj Menü 1 (Power Combo)', price: 599, description: '2 adet orta boy klasik pizza veya burger + çıtır chicken veya klasik + 1 litre içecek' },
    { id: 'em3', name: 'Fantastik 4\'lü Menü (Party Box)', price: 880, description: '3 adet klasik orta boy pizza + 1 litre içecek' },
    { id: 'em4', name: 'Muhteşem 5\'li (Mega Feast)', price: 890, description: '3 adet orta boy klasik pizza + patates cips + 1 litre içecek' },
    { id: 'em5', name: 'Kanka Menü (Duo Menu)', price: 700, description: '2 adet büyük boy klasik pizza + 1 litre içecek' },
    { id: 'em6', name: 'Evreka Aile Menüsü (Evreka Family Feast)', price: 799, description: '2 adet büyük boy klasik pizza + patates cips + 8\'li soğan halkası + 1 litre içecek' },
    { id: 'em7', name: 'Evreka Sokak Lezzetleri (Street Menu)', prices: { klasikRoll: 320, specialRoll: 380, klasikPatso: 150, specialPatso: 200 } }
  ],
  kidsMenus: [
    { id: 'km1', name: 'Pizza Çocuk Menüsü (Kids Pizza Meal)', price: 340, description: '2 dilim sucuklu klasik pizza + patates cips + 2 adet soğan halkası + sürpriz yumurta veya çikolata + meyve suyu' },
    { id: 'km2', name: 'Burger Çocuk Menüsü (Kids Burger Meal)', price: 340, description: '1 adet chicken veya hamburger + patates cips + 2 adet soğan halkası + sürpriz yumurta veya çikolata + meyve suyu' }
  ],
  snackBoxes: [
    { id: 'sb1', name: 'Evreka Eko Menü', price: 330, description: '1 adet schnitzel + patates cips (kajun baharatlı) + 1 adet nugget + 4 adet soğan halkası + 1 çıtır tavuk + 2 adet nugget + 4 adet soğan halkası + 2 adet çıtır tavuk + ranch sos + pizza baharatı + şişe içecek' },
    { id: 'sb2', name: 'Evreka Premium Menü', price: 600, description: '2 adet schnitzel + patates cips + 4 adet nugget + 4 adet soğan halkası + çıtır tavuk + şişe içecek' }
  ],
  loveMenuAndBreakfast: [
    { id: 'lm1', name: 'Evreka Kahvaltı', price: 500 },
    { id: 'lm2', name: 'Yumurtalı Sucuklu Pizza Menü', price: 400, description: 'Kaşar peynir + sucuk + yumurta + cips + şişe içecek + çay' },
    { id: 'lm3', name: 'Bol Peynirli Pizza Menü', price: 400, description: 'Kaşar peynir + eriyen peynir çeşitleri + cips + domates + yeşillik + çay' }
  ]
};

// Admin / Garson Giriş API
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === '1234' || password === 'admin') {
    res.json({ success: true, message: 'Giriş başarılı' });
  } else {
    res.status(401).json({ success: false, error: 'Geçersiz Şifre!' });
  }
});

// Menüyü Listele API
app.get('/api/menu', (req, res) => {
  res.json({ success: true, menu });
});

// Siparişleri Listele (Kalıcı dosyadan okur)
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({ success: true, orders });
});

// Yeni Sipariş Oluştur (Kalıcı dosyaya yazar)
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
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  saveOrders(orders);
  res.json({ success: true, order: newOrder });
});

// Siparişi Onayla (Mutfağa Gönder - Onaylayan ve Zaman Damgası ile Kalıcı Kayıt)
app.patch('/api/orders/:id/approve', (req, res) => {
  const { id } = req.params;
  const { approvedBy } = req.body; // Hangi garson/admin onayladıysa
  const orders = getOrders();
  const order = orders.find(o => String(o.id) === String(id));
  
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  
  order.status = 'PREPARING';
  if (approvedBy) {
    order.approvedBy = approvedBy;
  }
  order.approvedAt = new Date().toISOString();
  
  saveOrders(orders);
  res.json({ success: true, order });
});

// Sipariş Durumunu Güncelle
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, updatedBy } = req.body;
  const orders = getOrders();
  const order = orders.find(o => String(o.id) === String(id));
  
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  
  order.status = status;
  if (updatedBy) {
    order.updatedBy = updatedBy;
  }
  order.lastUpdated = new Date().toISOString();
  
  saveOrders(orders);
  res.json({ success: true, order });
});

// Siparişi İptal Et
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { cancelledBy } = req.body;
  const orders = getOrders();
  const order = orders.find(o => String(o.id) === String(id));
  
  if (!order) return res.status(404).json({ success: false, error: 'Sipariş bulunamadı' });
  
  order.status = 'CANCELLED';
  if (cancelledBy) {
    order.cancelledBy = cancelledBy;
  }
  order.cancelledAt = new Date().toISOString();
  
  saveOrders(orders);
  res.json({ success: true, message: 'Sipariş iptal edildi', order });
});

// Sayfa Yönlendirmeleri
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.listen(PORT, () => {
  console.log(`🚀 Evreka Pizza Sunucusu http://localhost:${PORT} adresinde çalışıyor.`);
});
