# Food Ordering Platform

Food Ordering Platform, restoranların çevrimiçi sipariş süreçlerini yönetmek için geliştirilmiş bir web uygulamasıdır. Müşteriler menüyü inceleyebilir, ürünleri özelleştirebilir, sipariş oluşturabilir ve siparişlerini takip edebilir. Restoran yöneticileri ise ayrı bir yönetim panelinden ürün kataloğunu, siparişleri ve rezervasyonları yönetebilir.

![Ana sayfa](docs/screenshots/home.png)

## Genel Bakış

Uygulama, Next.js Pages Router kullanılarak geliştirilmiş bir web arayüzüne sahiptir. Sayfalar, menü görüntüleme, ürün seçme, sepet yönetimi, sipariş takibi, kullanıcı profili ve yönetim paneli gibi işlevleri içerir.

## Özellikler

### Müşteri

- **Menü:** Kategorilere göre gruplandırılmış ürünler ve başlık üzerinden ürün arama.
- **Ürün detayları:** Boyut seçimi ve isteğe bağlı ek ürünler. Seçimlere göre fiyatın güncellenmesi.
- **Sepet:** Redux ile yönetilen ve `localStorage` üzerinde saklanan sepet. Sipariş özeti ve ödeme öncesi onay adımı.
- **Sipariş takibi:** Dört aşamalı durum çizelgesi ve sipariş edilen ürünlerin listesi.
- **Profil:** Hesap bilgileri, parola değiştirme ve sipariş geçmişi.
- **Masa rezervasyonu:** Restoran için rezervasyon oluşturma arayüzü.

### Yönetim Paneli

- **Genel bakış:** Ciro, sipariş, ürün, kategori ve rezervasyon sayıları ile son siparişlerin görüntülenmesi.
- **Ürün yönetimi:** Ürünleri listeleme, arama, yeni ürün oluşturma, görsel yükleme arayüzü ve ürün silme.
- **Kategori yönetimi:** Kategori oluşturma ve silme.
- **Sipariş yönetimi:** Sipariş edilen ürünleri ve teslimat adresini görüntüleme, duruma göre filtreleme ve sipariş durumunu bir sonraki aşamaya taşıma.
- **Rezervasyon yönetimi:** Gelecek ve geçmiş rezervasyonların listelenmesi.
- **Alt bilgi yönetimi:** İletişim bilgileri, çalışma saatleri ve sosyal medya bağlantılarının düzenlenmesi.

### Kimlik Doğrulama Arayüzü

- E-posta ve parola ile kayıt olma ve giriş yapma ekranları.
- Yapılandırıldığı durumlarda GitHub ile giriş seçeneği.
- Yönetici girişi için ayrı bir arayüz.

## Teknoloji Yığını

| Teknoloji | Kullanım amacı |
|---|---|
| Next.js 16 (Pages Router) | Sayfa yönlendirme ve web arayüzü |
| React 19 | Bileşen tabanlı arayüz geliştirme |
| Redux Toolkit | Merkezi durum yönetimi |
| React Redux | React bileşenleri ile Redux entegrasyonu |
| Formik | Form yönetimi |
| Yup | Form doğrulama şemaları |
| Tailwind CSS | Stil yönetimi |
| PostCSS | CSS işleme |
| Autoprefixer | Tarayıcı uyumlu CSS oluşturma |
| `next/font` | Yazı tipi optimizasyonu |
| Axios | HTTP istekleri için istemci kütüphanesi |
| `react-slick` | Kaydırılabilir içerikler |
| `react-icons` | İkonlar |
| `react-toastify` | Bildirimler |
| `react-spinners` | Yükleme göstergeleri |
| NProgress | Sayfa geçişi ilerleme göstergesi |

## Frontend Mimarisi

- **Pages Router:** `src/pages` dizini sayfaları ve yönlendirmeyi düzenler.
- **Bileşenler:** Arayüz bileşenleri `admin`, `cart`, `product`, `profile` gibi özelliklere göre gruplandırılır. Ortak bileşenler `common` ve `form` klasörlerinde tutulur.
- **Servis katmanı:** `src/services` dizini, arayüzün veri hizmetleriyle iletişim kurduğu katmandır. Bileşenler doğrudan Axios çağrıları yapmak yerine bu katmanı kullanır.
- **Özel React hook'ları:** `src/hooks` dizininde veri alma, yükleme ve hata durumlarını yönetmek için `useFetch`; açma ve kapatma işlemleri için `useToggle`; kullanıcı bilgileri için `useCurrentUser` ve ürün seçenekleri için `useProductOptions` bulunur.
- **Redux:** `src/redux` dizininde sepet durumunu yöneten bir slice, ürünleri ve toplamları hesaplayan selector'lar ve `localStorage` senkronizasyonu bulunur.
- **Form şemaları:** `src/schemas` dizinindeki Yup şemaları, Formik formlarında doğrulama amacıyla kullanılır.
- **Tasarım sistemi:** Global stiller ve bileşen sınıfları `src/styles` dizininde tutulur.
- **Yardımcı fonksiyonlar:** `src/utils` dizini biçimlendirme ve veri serileştirme gibi işlemleri içerir.

## Proje Yapısı

```text
food-ordering-platform/
├── docs/
│   └── screenshots/        README ekran görüntüleri
├── public/
│   └── images/             Statik ve örnek ürün görselleri
└── src/
    ├── components/
    │   ├── admin/          Yönetim paneli bileşenleri
    │   ├── auth/           Giriş arayüzü
    │   ├── cart/            Sepet bileşenleri
    │   ├── common/          Ortak arayüz bileşenleri
    │   ├── form/            Form bileşenleri
    │   ├── home/            Ana sayfa bileşenleri
    │   ├── layout/          Sayfa düzeni, başlık ve alt bilgi
    │   ├── order/           Sipariş takibi bileşenleri
    │   ├── product/         Menü ve ürün detayları
    │   ├── profile/         Profil ve hesap ayarları
    │   └── reservation/     Rezervasyon arayüzü
    ├── constants/           Site adı, gezinme ve sabit değerler
    ├── hooks/               Özel React hook'ları
    ├── pages/               Sayfalar
    ├── redux/               Redux store ve sepet yönetimi
    ├── schemas/             Form doğrulama şemaları
    ├── services/            İstemci tarafındaki veri hizmetleri
    ├── styles/              Global stiller ve bileşen sınıfları
    └── utils/               Yardımcı fonksiyonlar
```

## Ekran Görüntüleri

Tüm ekran görüntüleri örnek veriler ve demo hesaplarıyla hazırlanmıştır.

### Restoran Arayüzü

| Menü | Ürün Detayı |
|---|---|
| ![Menü](docs/screenshots/menu.png) | ![Ürün detayı](docs/screenshots/product-detail.png) |

| Arama | Sepet |
|---|---|
| ![Arama](docs/screenshots/search.png) | ![Sepet](docs/screenshots/cart.png) |

| Sipariş Oluşturma | Sipariş Takibi |
|---|---|
| ![Sipariş oluşturma](docs/screenshots/checkout.png) | ![Sipariş takibi](docs/screenshots/order-tracking.png) |

| Profil | Sipariş Geçmişi |
|---|---|
| ![Profil](docs/screenshots/profile.png) | ![Sipariş geçmişi](docs/screenshots/profile-orders.png) |

| Parola Ayarları | Rezervasyon |
|---|---|
| ![Parola ayarları](docs/screenshots/profile-password.png) | ![Rezervasyon](docs/screenshots/reservation.png) |

### Giriş

![Giriş ekranı](docs/screenshots/login.png)

### Yönetim Paneli

| Yönetim Paneli | Sipariş Yönetimi |
|---|---|
| ![Yönetim paneli](docs/screenshots/admin-dashboard.png) | ![Sipariş yönetimi](docs/screenshots/admin-orders.png) |

| Ürün Yönetimi | Rezervasyonlar |
|---|---|
| ![Ürün yönetimi](docs/screenshots/admin-products.png) | ![Rezervasyonlar](docs/screenshots/admin-reservations.png) |

### Mobil Görünüm

| Ana Sayfa | Menü | Sipariş Takibi |
|---|---|---|
| ![Mobil ana sayfa](docs/screenshots/mobile-home.png) | ![Mobil menü](docs/screenshots/mobile-menu.png) | ![Mobil sipariş takibi](docs/screenshots/mobile-order.png) |

## Arayüz İyileştirmeleri

- Renk değişkenleri, tipografi, düğmeler, giriş alanları, kartlar ve rozetlerden oluşan tutarlı bir tasarım sistemi oluşturuldu.
- Erişilebilir mobil menü ve sabit gezinme alanı eklendi.
- Ürün kartları, ürün detayları, sepet ve sipariş özeti yeniden tasarlandı.
- Sipariş takibi, aşamaları gösteren bir durum çizelgesine dönüştürüldü.
- Yönetim paneli; genel bakış istatistikleri, filtreler ve durum etiketleriyle düzenlendi.
- Veri gösteren ekranlar için yükleme, boş durum ve hata görünümleri eklendi.
- Görünür etiketler, alan içi hata mesajları ve klavyeyle kullanılabilen diyaloglarla erişilebilir formlar hazırlandı.
- Mobil, tablet ve masaüstü ekran boyutlarında duyarlı tasarım kontrolleri yapıldı.

## Kurulum

**Gereksinimler:** Node.js 20.9 veya üzeri.

Projeyi klonlayıp bağımlılıkları yükleyin:

```bash
git clone https://github.com/zeynepbass/food-ordering-platform.git
cd food-ordering-platform
npm install
```

Uygulama yapılandırmasını oluşturmak için:

```bash
cp .env.example .env.local
```

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Restoran adı, `src/constants/site.js` dosyasındaki tek bir sabit üzerinden yönetilir.

- Restoran arayüzü: `http://localhost:3000`
- Yönetim paneli: `http://localhost:3000/admin`

## Kullanılabilir Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesini oluşturur |
| `npm run start` | Üretim derlemesini çalıştırır |
| `npm run lint` | ESLint kod denetimini çalıştırır |

## Performans

- Sayfaların ilk yüklemesinde sunucu tarafında veri hazırlama yaklaşımı kullanılır.
- Görseller `next/image` üzerinden uygun boyutlarla sunulur.
- Yazı tipleri `next/font` ile optimize edilir.
- Menü ürün kartları gereksiz yeniden render işlemlerini azaltmak amacıyla belleğe alınır.
- Veri alma işlemlerinde eski yanıtların yeni sonuçları ezmesini önlemeye yönelik korumalar bulunur.
