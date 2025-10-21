document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nisn = document.getElementById("nisn").value.trim();
  const password = document.getElementById("password").value.trim();
  const level = document.getElementById("level").value;

  if (!level) {
    alert("Silakan pilih level terlebih dahulu!");
    return;
  }

  if (!nisn || !password) {
    alert("Harap isi NISN dan password!");
    return;
  }

  // Pilih file JSON berdasarkan level
  const dataFile = level === "siswa" ? "data_siswa.json" : "data_kurir.json";

  fetch(dataFile)
    .then(res => res.json())
    .then(data => {
      let user;

      // Cari user berdasarkan level
      user = data.find(u => u.nisn == nisn && u.password == password);

      if (user) {
        localStorage.setItem("user", JSON.stringify({ ...user, level }));
        alert(`Selamat datang, ${user.nama}!`);
        window.location.href = "../front/index.html";
      } else {
        alert("NISN atau password salah!");
      }
    })
    .catch(err => {
      alert("Gagal memuat data pengguna!");
      console.error(err);
    });
});
