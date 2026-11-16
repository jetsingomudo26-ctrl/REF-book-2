/**
 * Pustaka Pelajar - Utility Helper Functions
 * File: assets/js/utils.js
 * Description: Collection of modular helper functions for string formatting, sanitization, and UI notifications
 */

/**
 * Membersihkan string pencarian dari karakter khusus dan spasi berlebih (Sanitization)
 * @param {string} input - Teks input mentah dari pengguna
 * @returns {string} Teks yang sudah dibersihkan dan diubah ke huruf kecil
 */
function sanitizeSearchQuery(input) {
    if (typeof input !== 'string') return '';
    return input
        .trim()
        .toLowerCase()
        .replace(/[^\w\snot]/gi, ''); // Menghapus karakter non-alfanumerik kecuali spasi
}

/**
 * Memformat string teks menjadi format kapital pada setiap awal kata (Title Case)
 * @param {string} text - Teks yang akan diformat
 * @returns {string} Teks dengan format Title Case
 */
function toTitleCase(text) {
    if (typeof text !== 'string') return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Memotong teks yang terlalu panjang dan menambahkan elipsis (...) di akhir
 * @param {string} text - Teks asli
 * @param {number} maxLength - Batas maksimum karakter sebelum dipotong
 * @returns {string} Teks yang telah dipotong atau teks asli jika lebih pendek dari batas
 */
function truncateText(text, maxLength = 100) {
    if (typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Menampilkan pemberitahuan sementara (toast notification) di layar
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {string} [type='info'] - Jenis pemberitahuan ('info', 'success', 'error')
 * @param {number} [duration=3000] - Durasi tampil dalam milidetik
 */
function showToast(message, type = 'info', duration = 3000) {
    // Periksa apakah elemen toast container sudah ada, jika belum buat secara dinamis
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all transform translate-y-2 opacity-0 flex items-center gap-2 ${
        type === 'success' ? 'bg-slate-900 text-white' :
        type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
    }`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Trigger animasi masuk
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    });

    // Hapus toast setelah durasi selesai
    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300); // Waktu transisi keluar
    }, duration);
}

/**
 * Debounce function untuk membatasi frekuensi eksekusi fungsi (misalnya pada input pencarian real-time)
 * @param {Function} func - Fungsi yang akan dieksekusi
 * @param {number} delay - Waktu jeda dalam milidetik
 * @returns {Function} Fungsi yang telah dibungkus dengan debounce
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

