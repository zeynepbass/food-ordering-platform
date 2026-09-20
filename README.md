# 🍕 Feane – Yemek Sipariş Uygulaması

Next.js, MongoDB ve Redux Toolkit ile geliştirilmiş, uçtan uca bir yemek sipariş platformu. Müşteriler kayıt olup ürünleri sepete ekleyerek sipariş verebilir ve siparişlerini canlı takip edebilir; yönetici ise ürün, kategori, sipariş, rezervasyon ve site alt bilgisini admin panelinden yönetir.

## ✨ Özellikler

**Müşteri**
- E-posta/şifre ile kayıt ve giriş, GitHub ile giriş (NextAuth)
- Kategoriye göre filtrelenebilir menü ve anlık ürün arama
- Ürün detayında boyut ve ekstra seçimi, seçime göre hesaplanan fiyat
- Redux ile sepet yönetimi ve sipariş oluşturma
- Sipariş durum takibi (hazırlanıyor → yolda → teslim edildi)
- Profil yönetimi: hesap bilgileri, şifre değiştirme, geçmiş siparişler
- Masa rezervasyonu

**Yönetici**
- Cookie tabanlı admin girişi
- Ürün ekleme / silme (Cloudinary ile görsel yükleme)
- Kategori ekleme / silme
- Sipariş durumunu bir sonraki aşamaya taşıma
- Rezervasyon listesi
- Footer (iletişim, çalışma saatleri, sosyal medya) düzenleme

## 🛠️ Kullanılan Teknolojiler

| Alan | Teknoloji |
| --- | --- |
| Framework | Next.js 14 (Pages Router), React 18 |
| Veritabanı | MongoDB, Mongoose |
| Kimlik doğrulama | NextAuth.js (Credentials + GitHub), bcryptjs |
| State yönetimi | Redux Toolkit, React Redux |
| Formlar ve doğrulama | Formik, Yup |
| Stil | Tailwind CSS, PostCSS, Autoprefixer |
| HTTP istemcisi | Axios |
| Görsel depolama | Cloudinary |
| Arayüz kütüphaneleri | react-slick, react-icons, react-toastify, react-spinners, NProgress |
| Kod kalitesi | ESLint (`next/core-web-vitals`) |

## 🧩 Kullanılan Hook'lar

Projede yerleşik React hook'larının yanında `src/hooks` altında yeniden kullanılabilir özel hook'lar bulunur:

| Hook | Görevi |
| --- | --- |
| `useFetch` | Bir servis fonksiyonundan veri çeker; `data`, `loading`, `error`, `refetch` döndürür |
| `useToggle` | Menü, arama ve modal gibi aç/kapat durumlarını yönetir |
| `useOutsideClick` | Bir elemanın dışına tıklamayı yakalar (modal kapatma) |
| `useCurrentUser` | Oturumdaki kullanıcının veritabanı kaydını getirir |
| `useProductOptions` | Ürün boyutu ve ekstralarını tutar, toplam fiyatı `useMemo` ile hesaplar |

`useMemo` ve `useCallback` şu yerlerde kullanılır: menü filtreleme (`MenuWrapper`), arama sonuçları (`SearchModal`), sipariş/rezervasyon sıralama, fiyat hesabı (`useProductOptions`) ve form başlangıç değerleri (`FooterSettings`). Sık render edilen `MenuItem` bileşeni `React.memo` ile sarılıdır.

## 📁 Klasör Yapısı

```
├── public/                     Statik görseller
└── src/
    ├── components/
    │   ├── admin/              Admin paneli bileşenleri (ProductManager, OrderManager, ...)
    │   ├── cart/               CartTable, CartSummary
    │   ├── common/             Title, Logo, Modal, DataTable, DashboardLayout, Seo
    │   ├── form/               Input, FormFields
    │   ├── home/               HeroSlider, Campaigns, AboutSection, Testimonials
    │   ├── layout/             Layout, Header, Footer, SearchModal
    │   ├── order/              OrderStatusTracker
    │   ├── product/            MenuWrapper, MenuItem, ProductDetail, SizeSelector
    │   ├── profile/            AccountSettings, PasswordSettings, UserOrders
    │   └── reservation/        ReservationSection
    ├── constants/              Sabitler: navigasyon, form alanları, sipariş durumları, içerik
    ├── hooks/                  Özel React hook'ları
    ├── models/                 Mongoose modelleri
    ├── pages/                  Sayfalar ve API rotaları (yalnızca route dosyaları)
    │   └── api/                REST API uçları
    ├── redux/                  store ve cartSlice
    ├── schemas/                Yup doğrulama şemaları
    ├── server/                 Sunucu katmanı: dbConnect, auth, guards, queries, createHandler
    ├── services/               İstemci tarafı API servisleri (axios)
    ├── styles/                 Global CSS
    └── utils/                  Yardımcı fonksiyonlar
```

**Mimari kararlar**
- `pages/` içinde sadece route dosyaları bulunur; arayüz `components/` altındadır.
- Sayfalar sunucu tarafında `server/queries` ile doğrudan veritabanını okur, kendi API'sine istek atmaz.
- API rotaları `createHandler` ile yazılır: metot yönlendirme, hata yakalama ve `405` yanıtı tek yerden yönetilir.
- Yetkilendirme `server/guards` içindedir: admin işlemleri `requireAdmin`, kullanıcı işlemleri `requireSession` ile korunur.
- İstemci tarafı HTTP çağrıları `services/` katmanındadır, bileşenler axios'u doğrudan kullanmaz.
- Form alanları `constants/formFields` içinde tanımlanır ve `FormFields` bileşeni ile render edilir.
- Import'lar `@/` takma adıyla `src` klasörüne bağlanır.

## 🚀 Kurulum

```bash
git clone https://github.com/<kullanici-adi>/Food-ordering.git
cd Food-ordering
npm install
cp .env.example .env.local
npm run dev
```

Uygulama `http://localhost:3000` adresinde açılır. Yönetici paneli `http://localhost:3000/admin` adresindedir.

### Ortam Değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | API tabanı (varsayılan `/api`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary bulut adı |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |
| `MONGODB_URI` | MongoDB bağlantı adresi |
| `NEXTAUTH_URL` | Uygulamanın adresi |
| `NEXTAUTH_SECRET` | NextAuth oturum imzalama anahtarı |
| `GITHUB_ID`, `GITHUB_SECRET` | GitHub OAuth bilgileri |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Admin giriş bilgileri |
| `ADMIN_TOKEN` | Admin cookie değeri (uzun ve rastgele bir metin olmalı) |

### İlk Kullanım

1. `/admin` adresinden admin bilgileriyle giriş yapın.
2. **Categories** sekmesinden kategori ekleyin (örn. `Pizza`, `Hamburger`).
3. **Products** sekmesinden ürün ekleyin. `Pizza` kategorisi 3 boyut fiyatı, diğer kategoriler tek fiyat alır.
4. **Footer** sekmesinden iletişim bilgilerini kaydedin.

### Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production derlemesi |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |

## 🔌 API Uçları

| Uç | Metot | Erişim |
| --- | --- | --- |
| `/api/products`, `/api/products/:id` | GET · POST · DELETE | GET herkese açık, diğerleri admin |
| `/api/categories`, `/api/categories/:id` | GET · POST · DELETE | GET herkese açık, diğerleri admin |
| `/api/orders` | GET · POST | GET: admin (tümü) veya kullanıcı (kendi siparişleri), POST: giriş yapmış kullanıcı |
| `/api/orders/:id` | GET · PUT · DELETE | GET herkese açık, diğerleri admin |
| `/api/reservations` | GET · POST | GET admin, POST herkese açık |
| `/api/footer`, `/api/footer/:id` | GET · POST · PUT | GET herkese açık, diğerleri admin |
| `/api/users`, `/api/users/:id` | GET · PUT | Yalnızca hesap sahibi |
| `/api/users/register` | POST | Herkese açık |
| `/api/admin` | POST · DELETE | Admin giriş / çıkış |

## 📄 Lisans

Bu proje [LICENSE](LICENSE) dosyasındaki koşullarla lisanslanmıştır.
