# Math.io

Math.io adalah aplikasi calculator sederhana berbasis website, yang berfungsi untuk membantu melakukan perhitungan matematika sederhana secara online. Website ini didukung dengan ui yang memudahkan pengguna dalam penggunaan websitenya.

# Instalasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda. Unduh dari https://nodejs.org  dan ikuti petunjuk instalasinya.
2. Salin repositori ini ke dalam folder lokal Anda.
3. Buka terminal dan arahkan ke direktori proyek.
4. Jalankan perintah berikut untuk menginstal depedensi :
   <h4>npm install</h4>
5. Penginstalan berhasil ketika folder node_modules sudah muncul pada direktori Anda.

# Konfigurasi
1. Buat file `.env` di direktori utama proyek Anda. Isi file tersebut dengan konfigurasi lingkungan yang diperlukan dalam format
  <h6>ACCESS_TOKEN_SECRET = </h6>
  <h6>DB_HOST = </h6>
  <h6>DB_USER = </h6>
  <h6>DB_PASSWORD = </h6>
  <h6>DB_NAME = </h6>
  
2. Isi entri `ACCESS_TOKEN_SECRET` dengan nilai kunci rahasia JWT yang Anda inginkan
3. Isi entri `DB_HOST` , `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` dengan nilai pengkonfigurasian database yang Anda miliki

CONTOH:
<p>ACCESS_TOKEN_SECRET = hadgfafbsdjfeyg</p>
<p>DB_HOST = localhost</p>
<p>DB_USER = iniNamaUsernameDatabase</p>
<p>DB_PASSWORD = iniPassword</p>
<p>DB_NAME = iniNamaDatabase</p>

(Catatan : Untuk data dan table yang ada pada database, bisa diimport menggunakan file sql yang tersedia)

# Penggunaan
1. Jalankan perintah berikut untuk menjalankan proyek pada terminal direktori:
   <h4>npm run start</h4>
   Proyek akan dijalankan dan dapat diakses melalui `http://localhost:3000`
2. Setelah mengakses `http://localhost:3000` akan tampil halaman utama untuk menuju ke halaman signin
3. <h6>Register</h6> : Masuk ke halaman register jika belum memiliki akun, dengan memasukan username, email, dan password.
4. <h6>Lodin</h6> : Masuk ke halaman login jika sudah memiliki akun, dengan memasukan email dan password
5. <h6>Menu Home</h6> : Setalah Login berhasil akan ditampilkan halaman home sebagai landing page dari aplikasi berbasis website
6. <h6>Menu Calculator</h6> : Menu calculator digunakan untuk melakukan perhitungan matematika yang diinginkan. Perhitungan dilakukan dengan menginputkan number1, number2, dan jenis operation yang diinginkan, lalu menekan button `start`. Lalu anda bisa refresh halaman untuk menampilkan riwayat pencarian anda.
7. <h6>Documentation</h6> : Menu documentation berisikan bagaimana cara menggunakan aplikasi calculator ini, dan apa saja penjelasan yang ada pada aplikasi ini.
8. <h6>Edit Profile</h6> : Menu dropdown pada username yang ditampilkan, pada menu ini Anda dapat melihat data akun anda, dan melakukan pengeditan data tersebut dengan mengisikan username, email, new password, dan old password, sesuai dengan keinganan anda.
9. <h6>Logout</h6> : Berfungsi untuk keluar dari akun, dan kembali pada menu signin
10. Selesai

# Struktur Proyek
- /bin               # Tempat penyimpanan skrip untuk menjalankan server web
- /controllers       # Berisikan logika pada aplikasi
- /models            # Model basis data
- /public            # Berkas publik (CSS, Image, Js)
- /routes            # Rute aplikasi
- /views             # Template tampilan aplikasi
- app.js             # Berkas utama aplikasi
- package.json       # Daftar depedensi dan skrip
- package-lock.json  # Memastikan konsitstenasi instalasi pada paket di berbagai lingkungan
- README.md          # Dokumentasi proyek

# Lisensi
Proyek ini dilisensikan di bawah [Apache License 2.0](LICENSE).
