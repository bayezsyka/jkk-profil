<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Pastikan User tersedia
        $user = User::where('email', 'admin@jayakaryakontruksi.com')->first();

        if (!$user) {
            $user = User::create([
                'name' => 'Admin JKK',
                'email' => 'admin@jayakaryakontruksi.com',
                'password' => \Illuminate\Support\Facades\Hash::make('jkk@2026'),
            ]);
        }

        // 2. Seed Categories
        $categories = [
            [
                'name' => 'Edukasi Konstruksi',
                'slug' => 'edukasi-konstruksi',
                'description' => 'Informasi mendalam tentang proses, alat, dan teknologi di dunia konstruksi.'
            ],
            [
                'name' => 'Update Proyek',
                'slug' => 'update-proyek',
                'description' => 'Kabar terbaru dari perkembangan proyek-proyek yang sedang kami kerjakan.'
            ],
            [
                'name' => 'Tips & Trik',
                'slug' => 'tips-trik',
                'description' => 'Tips praktis seputar pemilihan material bangunan dan panduan pembangunan.'
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $eduCategory = Category::where('slug', 'edukasi-konstruksi')->first();

        // 3. Data Artikel
        $articles = [
            [
                'title' => 'Apa itu Asphalt Mixing Plant?',
                'slug' => Str::slug('Apa itu Asphalt Mixing Plant?'),
                'excerpt' => 'Mengenal lebih jauh tentang Asphalt Mixing Plant (AMP), fasilitas produksi campuran aspal panas yang krusial bagi pembangunan infrastruktur jalan.',
                'content' => '
                    <p><strong>Asphalt Mixing Plant (AMP)</strong> adalah fasilitas produksi campuran aspal panas (<em>hot mix asphalt</em>) yang menggabungkan proses <strong>pemanasan agregat</strong>, <strong>pengeringan</strong>, <strong>penakaran</strong>, dan <strong>pencampuran</strong> dengan aspal dalam komposisi tertentu. AMP berperan penting dalam pekerjaan <strong>pembangunan</strong>, <strong>peningkatan</strong>, dan <strong>pemeliharaan</strong> jalan agar hasil perkerasan memenuhi standar mutu, ketahanan, dan kenyamanan berkendara.</p>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Fungsi Utama AMP</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Menghasilkan campuran aspal dengan <strong>gradasi agregat</strong> dan <strong>kadar aspal</strong> sesuai desain campuran (Job Mix Formula).</li>
                        <li>Menjaga <strong>konsistensi kualitas</strong> produksi pada volume besar.</li>
                        <li>Mengatur <strong>temperatur</strong> agregat dan aspal untuk memastikan campuran mudah dihampar dan dipadatkan.</li>
                        <li>Mendukung efisiensi proyek melalui proses produksi yang terukur dan terkontrol.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Komponen Penting pada AMP</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Cold Bin</strong>: tempat penampungan agregat awal sesuai fraksi ukuran.</li>
                        <li><strong>Conveyor &amp; Feeder</strong>: mengalirkan agregat menuju unit pemanas dan pengering.</li>
                        <li><strong>Dryer Drum</strong>: memanaskan dan mengeringkan agregat, sekaligus mengurangi kadar air.</li>
                        <li><strong>Dust Collector/Baghouse</strong>: menangkap debu agar emisi lebih terkendali.</li>
                        <li><strong>Hot Bin &amp; Screen</strong>: menyaring dan menampung agregat panas sesuai gradasi.</li>
                        <li><strong>Asphalt Tank</strong>: penyimpanan aspal dengan kontrol suhu.</li>
                        <li><strong>Mixing Unit</strong>: pencampuran agregat panas, filler, dan aspal hingga homogen.</li>
                        <li><strong>Control Panel</strong>: sistem kontrol untuk penakaran, suhu, waktu mixing, dan pencatatan produksi.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Jenis AMP</h2>
                    <p>Secara umum, AMP dibagi menjadi:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Batch Type</strong>: produksi per batch, akurasi tinggi, cocok untuk kebutuhan variasi desain campuran.</li>
                        <li><strong>Drum Mix (Continuous)</strong>: produksi kontinu, efisien untuk volume besar dengan komposisi relatif stabil.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Hal yang Menentukan Kualitas Campuran</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Kontrol temperatur</strong> agregat dan aspal agar viskositas sesuai.</li>
                        <li><strong>Kalibrasi timbangan</strong> dan sistem penakaran yang presisi.</li>
                        <li><strong>Gradasi agregat</strong> dan kualitas material (kebersihan, kekerasan, kadar air).</li>
                        <li><strong>Waktu pencampuran</strong> dan homogenitas campuran.</li>
                        <li><strong>Pengendalian emisi dan debu</strong> untuk operasi yang lebih aman dan ramah lingkungan.</li>
                    </ul>

                    <p class="mt-6">Dengan pengoperasian yang benar dan pengawasan mutu yang konsisten, AMP membantu menghasilkan lapisan aspal yang <strong>kuat</strong>, <strong>awet</strong>, dan <strong>stabil</strong> terhadap beban lalu lintas serta perubahan cuaca.</p>
                ',
                'thumbnail' => 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Asphalt_mixing_plant.jpg',
                'status' => 'PUBLISHED',
                'published_at' => Carbon::now()->subDays(2),
                'category_id' => $eduCategory->id,
                'user_id' => $user->id,
                'views' => 125,
            ],
            [
                'title' => 'Apa itu Jasa Konstruksi?',
                'slug' => Str::slug('Apa itu Jasa Konstruksi?'),
                'excerpt' => 'Memahami peran penting jasa konstruksi dalam mewujudkan infrastruktur berkualitas, mulai dari perencanaan hingga pengawasan.',
                'content' => '
                    <p><strong>Jasa Konstruksi</strong> adalah layanan profesional yang mencakup rangkaian kegiatan untuk mewujudkan suatu bangunan atau infrastruktur, mulai dari <strong>perencanaan</strong>, <strong>pelaksanaan</strong>, hingga <strong>pengawasan</strong>. Layanan ini menjadi fondasi penting dalam pembangunan gedung, jalan, jembatan, kawasan industri, utilitas, dan berbagai proyek lain yang menuntut standar keselamatan dan mutu yang tinggi.</p>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Ruang Lingkup Jasa Konstruksi</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Konsultansi Perencanaan</strong>: studi kelayakan, desain, gambar kerja, spesifikasi teknis, dan rencana anggaran biaya.</li>
                        <li><strong>Pelaksanaan Konstruksi</strong>: pekerjaan sipil, struktur, arsitektur, mekanikal-elektrikal, hingga finishing sesuai dokumen kontrak.</li>
                        <li><strong>Konsultansi Pengawasan</strong>: memastikan pekerjaan sesuai desain, mutu material, metode kerja, jadwal, serta keselamatan.</li>
                        <li><strong>Manajemen Konstruksi</strong>: koordinasi menyeluruh (biaya, mutu, waktu, risiko, dan komunikasi para pihak).</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Pihak yang Umum Terlibat</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Pemilik/Owner</strong>: pihak yang membutuhkan proyek dan menyediakan anggaran.</li>
                        <li><strong>Konsultan</strong>: perencana dan/atau pengawas yang memastikan proyek sesuai standar.</li>
                        <li><strong>Kontraktor</strong>: pelaksana pekerjaan di lapangan sesuai lingkup kerja.</li>
                        <li><strong>Subkontraktor &amp; Supplier</strong>: penyedia tenaga spesialis dan material.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Aspek Penting dalam Pekerjaan Konstruksi</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Mutu</strong>: material, metode, dan hasil pekerjaan sesuai spesifikasi.</li>
                        <li><strong>Waktu</strong>: pengendalian jadwal dengan perencanaan yang realistis dan monitoring rutin.</li>
                        <li><strong>Biaya</strong>: efisiensi penggunaan sumber daya dan kontrol perubahan pekerjaan.</li>
                        <li><strong>Keselamatan (K3)</strong>: prosedur kerja aman, APD, inspeksi, dan mitigasi risiko.</li>
                        <li><strong>Kepatuhan</strong>: izin, standar teknis, dan regulasi yang berlaku.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Manfaat Menggunakan Penyedia Jasa Konstruksi Profesional</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Hasil pekerjaan lebih <strong>rapi</strong>, <strong>aman</strong>, dan <strong>tahan lama</strong>.</li>
                        <li>Dokumentasi proyek lebih tertib: laporan harian, uji material, dan berita acara.</li>
                        <li>Pengelolaan risiko lebih baik sehingga mengurangi potensi keterlambatan dan pembengkakan biaya.</li>
                        <li>Koordinasi antar disiplin lebih efektif, terutama untuk proyek kompleks.</li>
                    </ul>

                    <p class="mt-6">Singkatnya, jasa konstruksi bukan sekadar membangun, tetapi memastikan proyek berjalan dengan <strong>standar mutu</strong> yang terukur, <strong>ketepatan waktu</strong>, dan <strong>keselamatan</strong> kerja yang konsisten dari awal hingga serah terima.</p>
                ',
                'thumbnail' => 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
                'status' => 'PUBLISHED',
                'published_at' => Carbon::now()->subDay(),
                'category_id' => $eduCategory->id,
                'user_id' => $user->id,
                'views' => 84,
            ],
            [
                'title' => 'Apa itu Batching Plant?',
                'slug' => Str::slug('Apa itu Batching Plant?'),
                'excerpt' => 'Panduan lengkap memahami Batching Plant, jantung dari produksi beton ready-mix berkualitas tinggi untuk proyek beton modern.',
                'content' => '
                    <p><strong>Batching Plant</strong> adalah fasilitas produksi beton siap pakai (<em>ready-mix concrete</em>) yang berfungsi menakar dan mencampur material seperti <strong>semen</strong>, <strong>agregat</strong> (pasir dan batu split), <strong>air</strong>, serta <strong>bahan tambah</strong> (admixture) secara presisi. Tujuannya adalah menghasilkan beton dengan <strong>mutu konsisten</strong> sesuai kebutuhan struktur, baik untuk proyek gedung, jalan, jembatan, hingga pekerjaan infrastruktur skala besar.</p>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Kenapa Batching Plant Penting?</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Akurasi komposisi</strong> lebih tinggi dibanding pencampuran manual.</li>
                        <li><strong>Konsistensi mutu</strong> karena penakaran menggunakan sistem timbangan dan kontrol otomatis.</li>
                        <li><strong>Kapasitas besar</strong> sehingga cocok untuk proyek berkelanjutan dan volume tinggi.</li>
                        <li><strong>Efisiensi waktu</strong> dan mengurangi pemborosan material.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Komponen Utama Batching Plant</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Aggregate Bin</strong>: penampung agregat berdasarkan ukuran/gradasi.</li>
                        <li><strong>Weighing System</strong>: timbangan agregat, semen, air, dan admixture.</li>
                        <li><strong>Conveyor/Belt</strong>: memindahkan agregat ke mixer.</li>
                        <li><strong>Mixing Unit</strong>: proses pencampuran hingga homogen (pan mixer atau twin shaft tergantung tipe).</li>
                        <li><strong>Cement Silo</strong>: penyimpanan semen dengan sistem screw conveyor.</li>
                        <li><strong>Water Tank &amp; Pump</strong>: suplai air dengan kontrol volume.</li>
                        <li><strong>Control Panel</strong>: mengatur resep campuran, urutan mixing, dan pencatatan produksi.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Jenis Batching Plant</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Wet Mix</strong>: material dicampur di plant, keluar sebagai beton siap kirim ke truck mixer.</li>
                        <li><strong>Dry Mix</strong>: material ditakar di plant, pencampuran akhir dilakukan di truck mixer.</li>
                        <li><strong>Mobile vs Stationary</strong>: mobile mudah dipindah untuk proyek temporer, stationary untuk produksi jangka panjang.</li>
                    </ul>

                    <h2 class="text-xl font-bold mt-6 mb-4 text-slate-800">Faktor yang Mempengaruhi Mutu Beton</h2>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Rasio air-semen</strong> yang tepat sesuai target mutu.</li>
                        <li><strong>Kualitas agregat</strong>: kebersihan, kadar lumpur, gradasi, dan kekuatan.</li>
                        <li><strong>Kalibrasi timbangan</strong> dan konsistensi penakaran.</li>
                        <li><strong>Waktu mixing</strong> agar adukan homogen dan tidak segregasi.</li>
                        <li><strong>Kontrol slump</strong> dan penggunaan admixture sesuai kebutuhan kerja lapangan.</li>
                    </ul>

                    <p class="mt-6">Dengan sistem produksi yang terukur, batching plant membantu memastikan beton yang dihasilkan memiliki <strong>kekuatan</strong>, <strong>workability</strong>, dan <strong>durabilitas</strong> sesuai spesifikasi, sehingga konstruksi menjadi lebih aman dan andal.</p>
                ',
                'thumbnail' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
                'status' => 'PUBLISHED',
                'published_at' => Carbon::now(),
                'category_id' => $eduCategory->id,
                'user_id' => $user->id,
                'views' => 210,
            ],
        ];

        foreach ($articles as $articleData) {
            Article::updateOrCreate(['slug' => $articleData['slug']], $articleData);
        }
    }
}
