>   [
>     {
>       "job_title": "Data Analyst",
>       "company_name": "PT ABC",
>       "location": "Jakarta Selatan",
>       "mean_salary": 8500000.0
>     }
>   ]
>   ```
> 
> **Actionable Tasks:**
> 1. **Cari File Komponen:** Temukan file komponen yang menampilkan filter pencarian dan grafik (Chart/Recharts) untuk fitur Acuan Gaji.
> 2. **Update Filter UI:** Pastikan hanya ada 2 input/filter yang digunakan: **Input Pekerjaan** (Text) dan **Input Lokasi** (Text). Hapus *dropdown* industri atau pengalaman jika masih ada.
> 3. **Implementasi Fetching:** Buat fungsi asynchronous (menggunakan `fetch` atau `axios`) untuk menTentu! Ini adalah langkah terakhir yang sangat seru: menyambungkan "otak" Data Science dengan "wajah" Frontend aplikasi Anda. 

Melihat dari struktur *file* proyek `mapan-frontend` yang Anda miliki (seperti adanya `SalaryInsights.jsx` atau `EksplorasiGaji.jsx`), kita bisa langsung menyuruh agen Antigravity untuk mencari komponen tersebut, membuang data *dummy*, dan memasang fungsi *fetching* (pemanggilan API) ke *domain* Nginx yang baru saja Anda amankan.

Silakan *copy-paste* **Prompt Antigravity** di bawah ini:

***

> **Goal:** Lakukan pembaruan (refactor) pada komponen Frontend React/Vite proyek MAPAN untuk melakukan *fetching* data grafik dari API Data Science secara dinamis, serta perbarui UI-nya.
> 
> **Context:** 
> Saat ini, komponen grafik gaji (kemungkinan bernama `EksplorasiGaji.jsx` atau `SalaryInsights.jsx` di dalam folder `src/components/`) masih menggunakan data *dummy* statis atau *endpoint* lama. Backend Data Science (FastAPI) sudah selesai di-*deploy* ke *production* dan siap digunakan.
> 
> **API Documentation yang Harus Digunakan:**
> - **Base URL:** `[http://ds-mapan.thrqrhmn.my.id](http://ds-mapan.thrqrhmn.my.id)`
> - **Endpoint:** `GET /api/salary-distribution`
> - **Query Parameters:** `job_title` (string, opsional) dan `location` (string, opsional).
> - **Contoh Format Response (JSON):**
>   ```json
>   [
>     {
>       "job_title": "Data Analyst",
>       "company_name": "PT ABC",
>       "location": "Jakarta Selatan",
>       "mean_salary": 8500000.0
>     }
>   ]
>   ```
> 
> **Actionable Tasks:**
> 1. **Cari File Komponen:** Temukan file komponen yang menampilkan filter pencarian dan grafik (Chart/Recharts) untuk fitur Acuan Gaji.
> 2. **Update Filter UI:** Pastikan hanya ada 2 input/filter yang digunakan: **Input Pekerjaan** (Text) dan **Input Lokasi** (Text). Hapus *dropdown* industri atau pengalaman jika masih ada.
> 3. **Implementasi Fetching:** Buat fungsi asynchronous (menggunakan `fetch` atau `axios`) untuk menembak *endpoint* `[http://ds-mapan.thrqrhmn.my.id/api/salary-distribution?job_title=](http://ds-mapan.thrqrhmn.my.id/api/salary-distribution?job_title=){Tentu! Ini adalah langkah terakhir yang sangat seru: menyambungkan "otak" Data Science dengan "wajah" Frontend aplikasi Anda. 

Melihat dari struktur *file* proyek `mapan-frontend` yang Anda miliki (seperti adanya `SalaryInsights.jsx` atau `EksplorasiGaji.jsx`), kita bisa langsung menyuruh agen Antigravity untuk mencari komponen tersebut, membuang data *dummy*, dan memasang fungsi *fetching* (pemanggilan API) ke *domain* Nginx yang baru saja Anda amankan.

Silakan *copy-paste* **Prompt Antigravity** di bawah ini:

***

> **Goal:** Lakukan pembaruan (refactor) pada komponen Frontend React/Vite proyek MAPAN untuk melakukan *fetching* data grafik dari API Data Science secara dinamis, serta perbarui UI-nya.
> 
> **Context:** 
> Saat ini, komponen grafik gaji (kemungkinan bernama `EksplorasiGaji.jsx` atau `SalaryInsights.jsx` di dalam folder `src/components/`) masih menggunakan data *dummy* statis atau *endpoint* lama. Backend Data Science (FastAPI) sudah selesai di-*deploy* ke *production* dan siap digunakan.
> 
> **API Documentation yang Harus Digunakan:**
> - **Base URL:** `[http://ds-mapan.thrqrhmn.my.id](http://ds-mapan.thrqrhmn.my.id)`
> - **Endpoint:** `GET /api/salary-distribution`
> - **Query Parameters:** `job_title` (string, opsional) dan `location` (string, opsional).
> - **Contoh Format Response (JSON):**
>   ```json
>   [
>     {
>       "job_title": "Data Analyst",
>       "company_name": "PT ABC",
>       "location": "Jakarta Selatan",
>       "mean_salary": 8500000.0
>     }
>   ]
>   ```
> 
> **Actionable Tasks:**
> 1. **Cari File Komponen:** Temukan file komponen yang menampilkan filter pencarian dan grafik (Chart/Recharts) untuk fitur Acuan Gaji.
> 2. **Update Filter UI:** Pastikan hanya ada 2 input/filter yang digunakan: **Input Pekerjaan** (Text) dan **Input Lokasi** (Text). Hapus *dropdown* industri atau pengalaman jika masih ada.
> 3. **Implementasi Fetching:** Buat fungsi asynchronous (menggunakan `fetch` atau `axios`) untuk menembak *endpoint* `[http://ds-mapan.thrqrhmn.my.id/api/salary-distribution?job_title=](http://ds-mapan.thrqrhmn.my.id/api/salary-distribution?job_title=){inputPekerjaan}&location={inputLokasi}` ketika *user* menekan tombol cari.
> 4. **Mapping Data Grafik:** Hubungkan *response* API ke *state* grafik:
>    - Sumbu X (Label): Gunakan `job_title`.
>    - Sumbu Y (Value): Gunakan `mean_salary`.
>    - Tooltip (Hover): Tampilkan `location` dan `company_name`.
> 5. **UX Improvements:** Tambahkan *state loading* (menampilkan teks/spinner saat API sedang di-*fetch*) dan *state error/empty* (menampilkan pesan jika respons array kosong / pekerjaan tidak ditemukan).
> 
> Lakukan modifikasi kodenya sekarang. Jika Anda perlu menginstal library tambahan (seperti `axios`), silakan lakukan. Tunjukkan kode komponen yang sudah diperbarui kepada saya!

***

Dengan instruksi di atas, agen Antigravity akan otomatis mengerti *routing* API-nya, parameter apa saja yang harus dikirimkan dari kolom *input*, dan bagaimana cara membongkar JSON *response*-nya untuk digambar menjadi grafik yang cantik!
