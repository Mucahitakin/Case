# Express.js API

## Özellikler

- `GET /users` – Tüm kullanıcı adlarını listeler.
- `GET /users/:userId` – Belirli bir kullanıcıyı ID’ye göre getirir (kimlik doğrulama gerekli).
- `PUT /users/:userId` – Belirli bir kullanıcının bilgilerini günceller (kimlik doğrulama gerekli).

## Güvenlik Katmanları

### 1. Helmet Middleware

HTTP başlıklarını güvenli hâle getirerek birçok yaygın güvenlik açığını önler.

```
app.use(helmet());
```
2. Rate Limiting

Aynı IP’den dakikada en fazla 10 istek yapılmasına izin verir. Fazlası 429 Too Many Requests hatası döner.

```
const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.',
});
```

3. Basit Yetkilendirme (BOLA Önlemi)

Sadece ID’si 123 olan kullanıcı, kendi bilgilerine erişebilir veya güncelleyebilir. Başka bir kullanıcı ID’si ile erişim girişiminde bulunanlar 403 Forbidden hatası alır.

```
module.exports = (req, res, next) => {
  const userIdFromToken = '123';
  if (req.params.userId && req.params.userId !== userIdFromToken) {
    return res.status(403).json({ error: 'Access denied: unauthorized user' });
  }
  next();
};
```

Not: Bu kimlik doğrulama örneği statiktir. Gerçek uygulamalarda JWT veya oturum bazlı kimlik doğrulama kullanılması gerekmektedir.


Postman Test Örnekleri

1. Tüm kullanıcı adlarını getir
```
GET http://localhost:5099/users
```
2. Belirli bir kullanıcıyı getir (ID = 123)
```
GET http://localhost:5099/users/123
```
3. Kullanıcı bilgilerini güncelle (ID = 123)
```
PUT http://localhost:5099/users/123
```
Body (JSON):
```
{
  "name": "Leanne Graham",
  "email": "Sincere@april.biz"
}
```

Başka bir ID kullanırsan: 403 Access denied hatası alırsın.


# Güvenlik Test Kontrol Listesi
	• Kimlik doğrulama kontrolü (BOLA)
	• Hassas veri sızıntısı önlenmiş (yalnızca ihtiyaç duyulan alanlar döndürülmeli)
	• Rate Limiting ile DoS/Brute Force saldırılarına karşı koruma
