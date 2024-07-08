function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

let angle;

function setup() {
  createCanvas(1528, 704);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // Hitung sudut berdasarkan posisi mouse, maksimum 90 derajat
  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  // Gambar pohon pertama dari kiri bawah layar dengan hue warna 0 (merah)
  drawTree(width / 4, height, 0);

  // Gambar pohon kedua dari tengah bawah layar dengan hue warna 120 (hijau)
  drawTree(width / 2, height, 120);

  // Gambar pohon ketiga dari kanan bawah layar dengan hue warna 240 (biru)
  drawTree(3 * width / 4, height, 240);

  describe(
    'Tiga pohon digambar dengan menggambar cabang secara rekursif, dengan sudut ditentukan oleh posisi mouse pengguna dan warna yang berbeda. Mata mengikuti kursor di bagian atas setiap pohon.'
  );
}

function drawTree(x, y, hue) {
  // Mulai pohon dari posisi yang diberikan
  translate(x, y);

  // Gambar garis 120 piksel dengan hue warna yang diberikan
  stroke(hue, 255, 255);
  line(0, 0, 0, -120);

  // Pindah ke ujung garis tersebut
  translate(0, -120);

  // Mulai percabangan rekursif dengan hue warna yang diberikan
  branch(120, 0, hue);

  // Gambar mata di atas pohon
  drawEyes(0, 0);

  // Reset matriks transformasi
  resetMatrix();
}

function branch(h, level, hue) {
  // Atur hue berdasarkan tingkat rekursi dan hue awal
  stroke((hue + level * 25) % 360, 255, 255);

  // Setiap cabang akan berukuran 2/3 dari cabang sebelumnya
  h *= 0.66;

  // Gambar jika panjang cabang > 2, jika tidak hentikan rekursi
  if (h > 2) {
    // Gambar cabang kanan
    // Simpan sistem koordinat saat ini
    push();

    // Putar dengan sudut
    rotate(angle);

    // Gambar cabang
    line(0, 0, 0, -h);

    // Pindah ke ujung cabang
    translate(0, -h);

    // Panggil branch() secara rekursif
    branch(h, level + 1, hue);

    // Kembalikan sistem koordinat yang disimpan
    pop();

    // Gambar cabang kiri
    push();
    rotate(-angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1, hue);
    pop();
  }
}

function drawEyes(x, y) {
  // Mata kiri
  let leftX = x - 25;
  let leftY = y - 25;
  let leftAngle = atan2(mouseY - (y + height / 2), mouseX - (x + width / 2));

  push();
  translate(leftX, leftY);
  fill(255);
  ellipse(0, 0, 50, 50);
  rotate(leftAngle);
  fill(0);
  ellipse(12.5, 0, 25, 25);
  pop();

  // Mata kanan
  let rightX = x + 25;
  let rightY = y - 25;
  let rightAngle = atan2(mouseY - (y + height / 2), mouseX - (x + width / 2));

  push();
  translate(rightX, rightY);
  fill(255);
  ellipse(0, 0, 50, 50);
  rotate(rightAngle);
  fill(0);
  ellipse(12.5, 0, 25, 25);
  pop();
}