import { usePage } from '@inertiajs/react';

// Definisikan tipe struktur terjemahan
interface Translations {
    [key: string]: string | Translations;
}

export const useLanguage = () => {
    // Ambil props dari Inertia tanpa constraint
    const pageProps = usePage().props as {
        locale?: string;
        translations?: Translations;
        [key: string]: unknown;
    };
    
    const locale = pageProps.locale || 'id';
    const translations = pageProps.translations || {};

    /**
     * Fungsi untuk mengambil teks terjemahan.
     * Contoh penggunaan: t('hero.title') atau t('nav.home')
     */
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                // Jika key tidak ditemukan, kembalikan key-nya agar kita sadar ada yang hilang
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    // Fungsi untuk ganti bahasa (memanggil route Laravel)
    const setLanguage = (lang: 'id' | 'en') => {
        // Visit URL switch language, ini akan reload page otomatis dengan data baru
        window.location.href = `/language/${lang}`;
    };

    return { t, currentLanguage: locale, setLanguage };
};