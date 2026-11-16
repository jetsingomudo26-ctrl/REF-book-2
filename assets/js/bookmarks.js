/**
 * Pustaka Pelajar - Bookmark Manager
 * File: assets/js/bookmarks.js
 * Description: Manages saving, removing, checking, and rendering favorite books using localStorage
 */

const BOOKMARK_STORAGE_KEY = 'pustaka_pelajar_bookmarks';

/**
 * Mendapatkan daftar ID buku yang disimpan di localStorage
 * @returns {Array<number>} Array berisi ID buku favorit
 */
function getBookmarks() {
    try {
        const stored = localStorage.getItem(BOOKMARK_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Gagal mengambil data bookmark dari localStorage:', error);
        return [];
    }
}

/**
 * Memeriksa apakah suatu ID buku sudah ditandai sebagai favorit
 * @param {number|string} bookId - ID buku yang akan diperiksa
 * @returns {boolean} Status keberadaan ID dalam bookmark
 */
function isBookmarked(bookId) {
    const bookmarks = getBookmarks();
    return bookmarks.includes(Number(bookId));
}

/**
 * Menambahkan atau menghapus ID buku dari bookmark (toggle)
 * @param {number|string} bookId - ID buku yang akan diubah status bookmark-nya
 * @returns {boolean} Status baru: true jika sekarang tersimpan, false jika dihapus
 */
function toggleBookmark(bookId) {
    const numericId = Number(bookId);
    let bookmarks = getBookmarks();
    const index = bookmarks.indexOf(numericId);

    if (index > -1) {
        // Jika sudah ada, hapus dari bookmark
        bookmarks.splice(index, 1);
    } else {
        // Jika belum ada, tambahkan ke bookmark
        bookmarks.push(numericId);
    }

    try {
        localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Gagal menyimpan data bookmark ke localStorage:', error);
    }

    return bookmarks.includes(numericId);
}

/**
 * Merender daftar buku favorit ke dalam kontainer HTML yang ditentukan
 * @param {Array<Object>} allBooksData - Seluruh data referensi buku yang tersedia
 * @param {string} containerId - ID elemen kontainer HTML tempat card buku akan dirender
 */
function renderBookmarksList(allBooksData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const bookmarkedIds = getBookmarks();
    const favoriteBooks = allBooksData.filter(book => bookmarkedIds.includes(Number(book.id)));

    container.innerHTML = "";

    if (favoriteBooks.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-500 text-sm">
                Belum ada buku favorit yang disimpan.
            </div>
        `;
        return;
    }

    favoriteBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow";
        
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded">${book.category}</span>
                    <button type="button" data-book-id="${book.id}" class="remove-bookmark-btn text-xs text-red-600 hover:underline font-medium">Hapus</button>
                </div>
                <h3 class="font-semibold text-slate-900 text-base mb-1">${book.title}</h3>
                <p class="text-xs text-slate-600 mb-4">Penulis: ${book.author} (${book.year})</p>
            </div>
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-xs text-slate-500">Tersimpan</span>
                <a href="${book.downloadUrl}" class="text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white px-3 py-1.5 rounded transition-colors">Akses Buku</a>
            </div>
        `;

        container.appendChild(card);
    });

    // Tambahkan event listener untuk tombol hapus pada setiap card bookmark
    container.querySelectorAll('.remove-bookmark-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-book-id');
            toggleBookmark(bookId);
            renderBookmarksList(allBooksData, containerId);
        });
    });
}

