// ========================================================= 
 // katalog.js — Modul 3: menampilkan katalog dengan DOM 
 // Praktikum Pemrograman Web 1 · Sasirangan Banua 
 // ========================================================= 
  
 // 1. Data katalog: array yang berisi objek-objek produk 
 const katalog = [ 
   { 
     id: 1, 
     nama: "Kain Motif Gigi Haruan", 
     kategori: "kain", 
     harga: 185000, 
     gambar: "img/gigi-haruan.svg", 
     deskripsi: "Kain katun 2 meter bermotif zig-zag menyerupai gigi ikan haruan.", 
   }, 
   { 
     id: 2, 
     nama: "Kain Motif Kambang Kacang", 
     kategori: "kain", 
     harga: 175000, 
     gambar: "img/kambang-kacang.svg", 
     deskripsi: "Motif bunga kacang yang melambangkan keakraban dan kerukunan.", 
   }, 
   { 
     id: 3, 
     nama: "Selendang Iris Pudak", 
     kategori: "aksesoris", 
     harga: 120000, 
     gambar: "img/iris-pudak.svg", 
     deskripsi: "Selendang ringan bermotif irisan daun pudak (pandan).", 
   }, 
   
  {
    id: 4,
    nama: "Kemeja Sasirangan Motif Bayam Raja",
    kategori: "pakaian",
    harga: 250000,
    gambar: "img/bayam-raja.svg",
    deskripsi: "Kemeja pria berbahan katun dengan motif khas Bayam Raja.",
  },
  
{
  id: 5,
  nama: "Kain Motif Kulat Karikit",
  kategori: "kain",
  harga: 190000,
  gambar: "img/amparan-tatak.svg",
  deskripsi: "Kain sasirangan dengan motif Kulat Karikit yang unik.",
},
{
  id: 6,
  nama: "Baju Sasirangan Wanita",
  kategori: "pakaian",
  harga: 275000,
  gambar: "img/ketupat-kandangan.svg",
  deskripsi: "Busana wanita berbahan kain sasirangan yang nyaman digunakan.",
},
{
  id: 7,
  nama: "Ikat Kepala Sasirangan",
  kategori: "aksesoris",
  harga: 65000,
  gambar: "img/naga-balimbur.svg",
  deskripsi: "Aksesoris ikat kepala dengan motif khas Sasirangan Banua.",
},
{
  id: 8,
  nama: "Tas Kain Sasirangan",
  kategori: "aksesoris",
  harga: 95000,
  gambar: "img/ombak-sinapur-karang.svg",
  deskripsi: "Tas kain sederhana dengan sentuhan motif Sasirangan khas Banjar.",
},


 ]; 

// 2. Mengambil elemen HTML
const daftarKatalog = document.querySelector("#daftar-katalog");
const inputCari = document.querySelector("#cari");
const tombolFilter = document.querySelectorAll(".tombol-filter");
const infoJumlah = document.querySelector("#info-jumlah");

let kategoriAktif = "semua";

// 3. Fungsi format harga ke Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

// 4. Membuat kartu produk
function buatKartu(produk) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const gambar = document.createElement("img");
  gambar.src = produk.gambar;
  gambar.alt = produk.nama;

  const isi = document.createElement("div");
  isi.className = "kartu-isi";

  const label = document.createElement("span");
  label.className = "label-kategori";
  label.textContent = produk.kategori;

  const judul = document.createElement("h3");
  judul.textContent = produk.nama;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = produk.deskripsi;

  const harga = document.createElement("p");
  harga.className = "harga";
  harga.textContent = formatRupiah(produk.harga);

  isi.append(label, judul, deskripsi, harga);
  kartu.append(gambar, isi);

  return kartu;
}

// 5. Menampilkan sekumpulan produk ke dalam #daftar-katalog
function tampilkanKatalog(daftarProduk) {
  daftarKatalog.replaceChildren(); // kosongkan isi sebelumnya

  if (daftarProduk.length === 0) {
    const kosong = document.createElement("p");
    kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain.";
    daftarKatalog.append(kosong);
  }

  daftarProduk.forEach((produk) => {
    daftarKatalog.append(buatKartu(produk));
  });

  infoJumlah.textContent = `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;
}

// 7. Menyaring katalog berdasarkan kata kunci DAN kategori aktif
function saringKatalog() {
  const kataKunci = inputCari.value.trim().toLowerCase();

  const hasil = katalog.filter((produk) => {
    const cocokKategori =
      kategoriAktif === "semua" || produk.kategori === kategoriAktif;

    const cocokKata =
      produk.nama.toLowerCase().includes(kataKunci) ||
      produk.deskripsi.toLowerCase().includes(kataKunci);

    return cocokKategori && cocokKata;
  });

  tampilkanKatalog(hasil);
}

// 8. Event: setiap kali pengguna mengetik di kotak pencarian
inputCari.addEventListener("input", saringKatalog);

// 9. Event: tombol filter kategori
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    kategoriAktif = tombol.dataset.kategori;

    tombolFilter.forEach((btn) => {
      btn.classList.remove("aktif");
      btn.setAttribute("aria-pressed", "false");
    });

    tombol.classList.add("aktif");
    tombol.setAttribute("aria-pressed", "true");

    saringKatalog();
  });
});


// 6. Tampilkan semua produk ketika halaman pertama kali dibuka
tampilkanKatalog(katalog);

