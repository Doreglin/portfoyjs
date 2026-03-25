# 🎨 Portfolio Canvas Builder

> Sürükle-bırak (Drag & Drop) mantığıyla çalışan, tamamen Vanilla JS (Saf JavaScript) ile geliştirilmiş dinamik portfolyo oluşturucu.

Bu proje, herhangi bir frontend framework'ü (React, Vue vb.) kullanılmadan, component tabanlı mimarinin ve yerel state (durum) yönetiminin Vanilla JS ile nasıl kurgulanabileceğini göstermek amacıyla geliştirilmiştir. Kullanıcılar boş bir tuval üzerine bileşenleri sürükleyip bırakarak kendi web sitelerini tasarlayabilirler.

## 📸 Ekran Görüntüsü ve Arayüz

<img width="1919" height="1079" alt="Ekran görüntüsü 2026-03-25 084804" src="https://github.com/user-attachments/assets/e8d9cc8b-2148-4a0a-b1bf-8a3b31fe6fc5" />

> **Arayüz Açıklaması:** > Yukarıdaki görselde, uygulamanın ana düzenleme ekranı görülmektedir. 
> * **Sol Panel:** Kullanıcının tuvale sürükleyebileceği "Hero", "About", "Projects" ve "Contact" gibi hazır bileşenleri içerir.
> * **Orta Alan (Kanvas):** Bileşenlerin serbestçe bırakılabildiği, taşınabildiği ve sayfa düzeninin oluşturulduğu ana çalışma alanıdır. Ekranda ortalanmış yönlendirme simgesi, kullanıcılara boş tuvali nasıl kullanacaklarını gösterir.
> * **Sağ Panel:** Orta alandan seçilen herhangi bir bileşenin renk, boyut, metin ve görsel url'si gibi özelliklerinin anlık olarak değiştirilebildiği dinamik ayar menüsüdür.
> * **Üst Menü:** Kanvası tamamen temizleme ve projeyi son kullanıcı gözünden deneyimlemek için "Preview (Önizleme)" moduna geçiş butonlarını barındırır.

## 🚀 Özellikler

* **Serbest Tuval (Free Canvas):** Bileşenleri sol menüden sürükleyip ekranın istediğiniz bir X/Y koordinatına bırakabilirsiniz.
* **Kusursuz Taşıma (Drag & Drop):** Tuval üzerindeki öğeleri farenizle tam tuttuğunuz noktadan sürükleyerek yerlerini değiştirebilirsiniz.
* **Canlı Düzenleme:** Sağ panel üzerinden seçili bileşenin başlık, açıklama, renk, genişlik ve yükseklik gibi ayarlarını anlık olarak değiştirebilirsiniz.
* **Akıllı Önizleme (Preview) Modu:** Tasarım modundan çıkıp "Preview" moduna geçildiğinde, tuvaldeki öğeler Y eksenine göre yukarıdan aşağıya sıralanır ve tam ekran (%100 genişlik) responsive bir web sitesine dönüşür.
* **Yerel Kayıt (Local Storage):** Yaptığınız tüm değişiklikler tarayıcınızın yerel belleğine kaydedilir. Sayfayı yenileseniz bile tasarımınız kaybolmaz.
* **Dinamik Proje Yönetimi:** Portfolyonuza eklediğiniz proje kartlarının görsellerini, başlıklarını ve detaylarını doğrudan arayüzden güncelleyebilirsiniz.

## 🛠️ Kurulum ve Çalıştırma

Projede ES6 Modülleri (`import/export`) kullanıldığı için dosyayı doğrudan tarayıcıda açmak (file://) CORS hatasına yol açacaktır. Projeyi bir yerel sunucu (local server) ile çalıştırmanız gerekir.

### Seçenek 1: VS Code Live Server (Önerilen)
1. Projeyi VS Code ile açın.
2. Eklentiler sekmesinden **"Live Server"** eklentisini kurun.
3. `index.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğine tıklayın.

### Seçenek 2: Node.js / npx
Eğer bilgisayarınızda Node.js kuruluysa, terminali proje dizininde açıp şu komutu çalıştırın:

npx serve .
📁 Dosya Yapısı
Plaintext
/portfolio-builder
├── index.html              # Ana HTML iskeleti ve Tailwind CDN
└── src/
    ├── App.js              # State yönetimi, sürükle-bırak motoru ve ana DOM render işlemleri
    └── components/         # HTML string döndüren JS bileşenleri
        ├── HeroSection.js  # Karşılama alanı
        ├── AboutSection.js # Hakkımda alanı
        ├── ProjectsSection.js # Proje kartları alanı
        └── ContactSection.js  # İletişim formu
💻 Teknolojiler
HTML5 & CSS3

JavaScript (ES6+)

Tailwind CSS (CDN)

HTML5 Native Drag and Drop API

LocalStorage API
