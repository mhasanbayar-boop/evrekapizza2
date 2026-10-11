const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Kalıcı Dosya Yolları (Verilerin Asla Silinmemesi İçin)
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

// --- TÜM MENÜ / KATALOG (GÖRSELLERDEN EKSİKSİZ AKTARILMIŞTIR) ---
const initialCatalog = [
  // 1. KLASİK PİZZALAR
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

  // 2. SPECIAL & PREMIUM PİZZALAR
  {
    id: 'p1',
    title: 'Evreka İmza Dilimler (Signature Slices)',
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
    description: 'Kaşar, mozzarella, sucuk, pastırma, biber, mısır, zeytin, mantar, cheddar peyniri',
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
    title: 'Dana Sucuklu - Smoked Beef Signatura',
    category: 'pizza',
    basePrice: 320,
    description: 'Mozzarella, kaşar, dana sucuk',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p5',
    title: 'Mexican - Mexican Fire Signature',
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
    id: 'p6',
    title: 'Pastırmalı - Pastırma Signatura',
    category: 'pizza',
    basePrice: 320,
    description: 'Mozzarella, kaşar, dana pastırma, biber',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p7',
    title: 'Dönerli Pizza - Döner Kebap Signatura',
    category: 'pizza',
    basePrice: 320,
    description: 'Özel sos, mozzarella, kaşar, et döner, biber',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p8',
    title: 'Ton Balıklı - Tuna Signatura',
    category: 'pizza',
    basePrice: 310,
    description: 'Mozzarella, kaşar, ton balığı, mısır, soğan',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p9',
    title: 'Tavuklu - Chicken Royale',
    category: 'pizza',
    basePrice: 310,
    description: 'Mozzarella, kaşar, tavuk parçaları, biber, mısır',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p10',
    title: 'Evreka Közlüce - Köz Signatura',
    category: 'pizza',
    basePrice: 300,
    description: 'Mozzarella, kaşar, köz biber, köz patlıcan, biber',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p11',
    title: 'Küflü Peynirli - Blue Cheese Pizza',
    category: 'pizza',
    basePrice: 290,
    description: 'Mozzarella, kaşar, küflü peynir, mantar, biber',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p12',
    title: 'Dört Peynirli - Quattro Formaggi',
    category: 'pizza',
    basePrice: 310,
    description: 'Mozzarella, kaşar, cheddar peyniri, üçgen peynir',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p13',
    title: 'Akdeniz Pizza',
    category: 'pizza',
    basePrice: 300,
    description: 'Çeri domates, biber, beyaz peynir, zeytin',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p14',
    title: 'Calzone - Folded Italian Pizza',
    category: 'pizza',
    basePrice: 320,
    description: 'Tercihe göre sebzeli, 3 peynirli veya etli üzeri susamlı ve yumurta sarılı kapalı pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },
  {
    id: 'p15',
    title: 'Hot Honey Pizza (Acı - Tatlı)',
    category: 'pizza',
    basePrice: 320,
    description: 'Mozzarella, sucuk, sıcak acı bal sos',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300',
    sizes: [
      { id: 'medium', name: 'Orta Boy (Medium)', priceOffset: 0 },
      { id: 'jumbo', name: 'Büyük Boy (Jumbo)', priceOffset: 70 }
    ]
  },

  // 3. BURGERLER
  {
    id: 'b1',
    title: 'Hamburger (Classic)',
    category: 'burger',
    basePrice: 260,
    description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, domates, marul, turşu, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
  },
  {
    id: 'b2',
    title: 'Cheeseburger',
    category: 'burger',
    basePrice: 280,
    description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, domates, marul, turşu, cheddar peyniri, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300'
  },
  {
    id: 'b3',
    title: 'Double Burger',
    category: 'burger',
    basePrice: 350,
    description: 'Susamlı burger ekmeği, 2 x 100gr dana izgara köfte, cheddar peyniri, domates, marul, turşu, karamelize soğan, özel sos',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300'
  },
  {
    id: 'b4',
    title: 'Evreka Special (Signature Burger)',
    category: 'burger',
    basePrice: 390,
    description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, pastırma ve sucuk, cheddar peyniri, karamelize soğan, domates, özel sos',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300'
  },
  {
    id: 'b5',
    title: 'Mexican Fire Burger',
    category: 'burger',
    basePrice: 300,
    description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, cheddar peyniri, domates, jalapeño biber, acı sos',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
  },
  {
    id: 'b6',
    title: 'Truffle Deluxe Burger',
    category: 'burger',
    basePrice: 300,
    description: 'Susamlı burger ekmeği, 100gr dana izgara köfte, mantar, truffle mayo, cheddar peyniri, turşu, özel sos',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300'
  },
  {
    id: 'b7',
    title: 'Crispy Chicken Burger (Tavuk Burger)',
    category: 'burger',
    basePrice: 220,
    description: 'Susamlı burger ekmeği, çıtır tavuk eti, domates, marul, özel sos',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=300'
  },
  {
    id: 'b8',
    title: 'Evreka Double Kapalı Burger',
    category: 'burger',
    basePrice: 350,
    description: 'Evreka hamur, cheddar peyniri, karamelize soğan ve 2 adet dana köfte, turşu, burger sos, hamur üzeri susam ve yumurta sarısı',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300'
  },

  // 4. SALATALAR
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
    description: 'Marul, soğan, maydanoz, çeri domates, kapya biber, mısır, ton balığı salatalık, limon suyu',
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

  // 5. DÜNYA MUTFAĞI
  {
    id: 'w1',
    title: 'Kapsalon',
    category: 'side',
    basePrice: 300,
    description: 'Patates kızartma, döner, kaşar, yeşillik, domates, sos',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300'
  },

  // 6. ATIŞTIRMALIKLAR (SNACK)
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
    description: '6\'lı çıtır tavuk nugget',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },
  {
    id: 'sn4',
    title: '6\'lı Tavuk Topları',
    category: 'side',
    basePrice: 90,
    description: '6\'lı tavuk topları',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },
  {
    id: 'sn5',
    title: '6\'lı Soğan Halkası',
    category: 'side',
    basePrice: 90,
    description: '6\'lı çıtır soğan halkası',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300'
  },
  {
    id: 'sn6',
    title: '3\'lü Çıtır Tavuk',
    category: 'side',
    basePrice: 90,
    description: '3\'lü özel kaplamalı çıtır tavuk',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },
  {
    id: 'sn7',
    title: '4\'lü Patates Kroket',
    category: 'side',
    basePrice: 90,
    description: '4\'lü patates kroket',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300'
  },
  {
    id: 'sn8',
    title: 'Schnitzel',
    category: 'side',
    basePrice: 90,
    description: 'Tavuk schnitzel',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300'
  },

  // 7. TATLILAR (DESSERTS)
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
    id: 'd4',
    title: 'Cup Magnolia',
    category: 'dessert',
    basePrice: 150,
    description: 'Kup magnolia',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300'
  },
  {
    id: 'd5',
    title: 'Sütlaç',
    category: 'dessert',
    basePrice: 150,
    description: 'Fırın sütlaç',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300'
  },
  {
    id: 'd6',
    title: 'Dondurma',
    category: 'dessert',
    basePrice: 150,
    description: 'Top dondurma çeşitleri',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300'
  },
  {
    id: 'd7',
    title: 'Cheesecake Çeşitleri',
    category: 'dessert',
    basePrice: 150,
    description: 'Günlük cheesecake çeşitleri',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300'
  },
  {
    id: 'd8',
    title: 'Brownie',
    category: 'dessert',
    basePrice: 150,
    description: 'Çikolatalı brownie',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300'
  },
  {
    id: 'd9',
    title: 'Ekmek Kadayıfı + Üzeri Top Dondurma',
    category: 'dessert',
    basePrice: 150,
    description: 'Geleneksel ekmek kadayıfı ve dondurma',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300'
  },
  {
    id: 'd10',
    title: '2 Dilim Baklava + Üzeri Top Dondurma',
    category: 'dessert',
    basePrice: 150,
    description: 'Fıstıklı baklava ve top dondurma',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337cc?w=300'
  },

  // 8. SICAK KAHVE & İÇECEKLER
  { id: 'cf1', title: 'Americano', category: 'beverage', basePrice: 100, description: 'Sıcak Americano', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300' },
  { id: 'cf2', title: 'Espresso', category: 'beverage', basePrice: 100, description: 'Sert espresso', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300' },
  { id: 'cf3', title: 'Nescafe', category: 'beverage', basePrice: 100, description: 'Nescafe', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300' },
  { id: 'cf4', title: 'Cappuccino', category: 'beverage', basePrice: 100, description: 'Bol köpüklü cappuccino', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300' },
  { id: 'cf5', title: 'Macchiato', category: 'beverage', basePrice: 100, description: 'Macchiato', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300' },
  { id: 'cf6', title: 'Latte', category: 'beverage', basePrice: 100, description: 'Sütlü caffe latte', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300' },
  { id: 'cf7', title: 'Filtre Kahve', category: 'beverage', basePrice: 100, description: ' taze filtre kahve', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300' },
  { id: 'cf8', title: 'Bitki Çayı', category: 'beverage', basePrice: 100, description: 'Sağlıklı bitki çayları', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300' },
  { id: 'cf9', title: 'Çay', category: 'beverage', basePrice: 25, description: 'Demli Türk çayı', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300' },
  { id: 'cf10', title: 'Türk Kahvesi', category: 'beverage', basePrice: 80, description: 'Közde Türk kahvesi', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300' },
  { id: 'cd27', title: 'Soğuk Kahve Çeşitleri', category: 'beverage', basePrice: 110, description: 'Buzlu soğuk kahve', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300' },

  // 9. SOĞUK İÇECEKLER
  { id: 'cd1', title: 'ColaTurka / Sarıyer (200ml Şişe)', category: 'beverage', basePrice: 70, description: '200ml cam şişe', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd2', title: 'ColaTurka / Sarıyer (330ml Kutu)', category: 'beverage', basePrice: 90, description: '330ml kutu', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd3', title: 'ColaTurka / Sarıyer (1Lt)', category: 'beverage', basePrice: 110, description: '1 Litre şişe', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd4', title: 'Pepsi (200ml Şişe)', category: 'beverage', basePrice: 70, description: '200ml şişe', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300' },
  { id: 'cd5', title: 'Pepsi (330ml Kutu)', category: 'beverage', basePrice: 90, description: '330ml kutu', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300' },
  { id: 'cd6', title: 'Pepsi (1Lt)', category: 'beverage', basePrice: 110, description: '1 Litre şişe', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300' },
  { id: 'cd7', title: 'Coca-Cola (200ml Şişe)', category: 'beverage', basePrice: 70, description: '200ml şişe', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd8', title: 'Coca-Cola (330ml Kutu)', category: 'beverage', basePrice: 90, description: '330ml kutu', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd9', title: 'Coca-Cola (1Lt)', category: 'beverage', basePrice: 110, description: '1 Litre şişe', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd10', title: 'Fanta (200ml Şişe)', category: 'beverage', basePrice: 70, description: '200ml şişe', image: 'https://images.unsplash.com/photo-1624552184280-9e9632bbeee9?w=300' },
  { id: 'cd11', title: 'Fanta (330ml Kutu)', category: 'beverage', basePrice: 90, description: '330ml kutu', image: 'https://images.unsplash.com/photo-1624552184280-9e9632bbeee9?w=300' },
  { id: 'cd12', title: 'Fanta (1Lt)', category: 'beverage', basePrice: 110, description: '1 Litre şişe', image: 'https://images.unsplash.com/photo-1624552184280-9e9632bbeee9?w=300' },
  { id: 'cd13', title: 'Soğuk Çay Çeşitleri (330ml Kutu)', category: 'beverage', basePrice: 90, description: 'Ice tea çeşitleri', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' },
  { id: 'cd14', title: 'Juss-Tea Çeşitleri (250ml Kutu)', category: 'beverage', basePrice: 70, description: 'Juss-tea kutu', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' },
  { id: 'cd15', title: 'Meyve Suyu Çeşitleri (330ml Kutu)', category: 'beverage', basePrice: 90, description: 'Kutu meyve suyu', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300' },
  { id: 'cd16', title: 'Sprite Kutu', category: 'beverage', basePrice: 90, description: 'Sprite 330ml kutu', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=300' },
  { id: 'cd17', title: 'Sprite Şişe', category: 'beverage', basePrice: 70, description: 'Sprite şişe', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=300' },
  { id: 'cd18', title: 'Meyveli Soda Çeşitleri', category: 'beverage', basePrice: 60, description: 'Meyveli maden suyu', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300' },
  { id: 'cd19', title: 'Sade Soda Şişe', category: 'beverage', basePrice: 50, description: 'Doğal maden suyu', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300' },
  { id: 'cd20', title: 'Gazoz', category: 'beverage', basePrice: 65, description: 'Geleneksel gazoz', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300' },
  { id: 'cd21', title: 'Çocuk Meyve Suyu (200ml)', category: 'beverage', basePrice: 30, description: '200ml çocuk meyve suyu', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300' },
  { id: 'cd22', title: 'Çocuk Meyve Suyu Capri-Sun', category: 'beverage', basePrice: 50, description: 'Capri-sun', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300' },
  { id: 'cd23', title: 'Enerji İçeceği', category: 'beverage', basePrice: 100, description: 'Enerji içeceği', image: 'https://images.unsplash.com/photo-1622543925917-763c33d1a66e?w=300' },
  { id: 'cd24', title: 'Şalgam Suyu', category: 'beverage', basePrice: 60, description: 'Acılı / acısız şalgam', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300' },
  { id: 'cd25', title: 'Ayran', category: 'beverage', basePrice: 40, description: 'Buz gibi yayık ayranı', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300' },
  { id: 'cd26', title: 'Su 0.5Lt', category: 'beverage', basePrice: 25, description: '0.5 Litre su', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300' }
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

function saveCatalog(catalog) {
  try {
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  } catch (err) {}
}

let nextOrderId = 1001;
const existingOrders = getOrders();
if (existingOrders.length > 0) {
  const maxId = Math.max(...existingOrders.map(o => Number(o.id) || 1000));
  if (maxId >= nextOrderId) nextOrderId = maxId + 1;
}

// --- API ENDPOINTLERİ ---
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
