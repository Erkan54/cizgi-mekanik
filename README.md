# Çizgi Mekanik · Mekanik Tesisat ve İklimlendirme

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Mekanik tesisat ve iklimlendirme hizmetlerini tanıtan çok sayfalı kurumsal web sitesi.

## Özellikler

- Isıtma, soğutma, havalandırma ve klima santrali hizmet sayfaları.
- Chiller, kombi/kalorifer, yerden ısıtma, su ve yangın tesisatı içerikleri.
- Hafif çelik platform, firma bilgileri ve vizyon/misyon sayfaları.
- Mobil menü, sayfa geçişleri ve telefon/WhatsApp iletişim bağlantıları.

## Yerel önizleme

Build adımı veya npm bağımlılığı yoktur. Python 3 ile proje klasöründen:

```sh
git clone https://github.com/Erkan54/cizgi-mekanik.git
cd cizgi-mekanik
python -m http.server 8000
```

Tarayıcıda `http://localhost:8000` adresini açın. Bu komut yalnızca statik dosyaları sunar; veritabanı veya özel backend başlatmaz.

## Dosya haritası

| Dosya / klasör | İşlev |
| --- | --- |
| `index.html` | Ana sayfa |
| `hizmet.html` | Hizmet listesi |
| `sakarya-*.html` | Hizmet odaklı detay sayfaları |
| `firmalar.html` | Firma/reference içerikleri |
| `hakkimizda.html / vizyon-misyon.html` | Kurumsal bilgiler |
| `assets/` | Görsel varlıklar |
| `css/ / js/` | Stiller ve etkileşimler |

## Yapılandırma ve yayın

Kurumsal ad, metin, logo ve iletişim bağlantıları HTML dosyalarında; ortak etkileşimler `js/main.js` içindedir. `robots.txt`, `sitemap.xml`, canonical ve sosyal paylaşım URL'lerini yayın alan adıyla eşleyin. Depoda ayrı bir teklif veritabanı, randevu servisi veya iş emri backend'i bulunmaz.

Dosyalar statik barındırmaya uygundur. Yayından önce mobil menü, göreli dosya yolları, iletişim bağlantıları ve kullanılan dış kaynakları tarayıcıda kontrol edin. Otomatik uygulama test paketi bu depoda tanımlı değildir.
