/**
 * Pustaka Pelajar - Main Interactive Logic
 * File: assets/js/app.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dataset dummy buku referensi sekolah di Indonesia (minimal 6 data)
    const booksData = [
        {
            id: 1,
            title: "Sejarah Pergerakan Nasional Indonesia",
            author: "Dr. A. Effendi",
            category: "Sejarah",
            year: 2022,
            downloadUrl: "#"
        },
        {
            id: 2,
            title: "Biografi Ki Hadjar Dewantara: Bapak Pendidikan",
            author: "Sartono Kartodirdjo",
            category: "Biografi",
            year: 2020,
            downloadUrl: "#"
        },
        {
            id: 3,
            title: "Pengantar Ekosistem dan Keanekaragaman Hayati",
            author: "Dr. Ir. Siti Nuraini",
            category: "Sains",
            year: 2021,
            downloadUrl: "#"
        },
        {
            id: 4,
            title: "Analisis Karya Sastra Angkatan 45",
            author: "H.B. Jassin",
            category: "Sastra",
            year: 2018,
            downloadUrl: "#"
        },
        {
            id: 5,
            title: "Dinamika Ekonomi Makro dan Mikro Indonesia",
            author: "Prof. Dr. M. Sadli",
            category: "Ekonomi",
            year: 2023,
            downloadUrl: "#"
        },
        {
            id: 6,
            title: "Biografi Mohammad Hatta: Jalan Panjang Kemerdekaan",
            author: "Bulan Hatta",
            category: "Biografi",
            year: 2021,
            downloadUrl: "#"
        },
        {
            id: 7,
            title: "Fisika Kuantum Dasar untuk Sekolah Menengah",
            author: "Yohanes Surya, Ph.D.",
            category: "Sains",
            year: 2022,
            downloadUrl: "#"
        }
    ];

    // State aplikasi saat ini
    let currentCategory = "Semua";
    let searchQuery = "";

    // Referensi elemen DOM
    const searchInput = document.getElementById('search-input');
    const categoryContainer = document.getElementById('category-container');
    const bookContainer = document.getElementById('book-container');
    const emptyState = document.getElementById('empty-state');

    /**
     * 2. Fungsi untuk merender daftar buku ke dalam elemen kontainer HTML secara dinamis
     * @param {Array} books - Array objek buku yang akan dirender
     */
    function renderBooks(books) {
        if (!bookContainer) return;

        bookContainer.innerHTML = "";

        if (books.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = "bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow";
            
            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded">${book.category}</span>
                        <span class="text-xs text-slate-500">${book.year}</span>
                    </div>
                    <h3 class="font-semibold text-slate-900 text-base mb-1">${book.title}</h3>
                    <p class="text-xs text-slate-600 mb-4">Penulis: ${book.author}</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-slate-500">Referensi Pelajar</span>
                    <a href="${book.downloadUrl}" class="text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded transition-colors">Akses Buku</a>
                </div>
            `;

            bookContainer.appendChild(card);
        });
    }

    /**
     * 3. Fungsi untuk melakukan filter dan pencarian gabungan
     */
    function filterAndSearchBooks() {
        const filtered = booksData.filter(book => {
            const matchesCategory = currentCategory === "Semua" || book.category.toLowerCase() === currentCategory.toLowerCase();
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  book.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        renderBooks(filtered);
    }

    /**
     * 4. Event listener untuk pencarian real-time berdasarkan input teks
     */
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            searchQuery = event.target.value.trim();
            filterAndSearchBooks();
        });
    }

    /**
     * 5. Event listener untuk filter berdasarkan kategori
     */
    if (categoryContainer) {
        categoryContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-category]');
            if (!button) return;

            // Perbarui kelas tombol aktif
            const buttons = categoryContainer.querySelectorAll('button[data-category]');
            buttons.forEach(btn => {
                btn.classList.remove('bg-slate-900', 'text-white');
                btn.classList.add('bg-white', 'border', 'border-slate-200', 'text-slate-600');
            });

            button.classList.remove('bg-white', 'border', 'border-slate-200', 'text-slate-600');
            button.classList.add('bg-slate-900', 'text-white');

            currentCategory = button.getAttribute('data-category');
            filterAndSearchBooks();
        });
    }

    // Inisialisasi render pertama kali saat halaman dimuat
    renderBooks(booksData);
});

