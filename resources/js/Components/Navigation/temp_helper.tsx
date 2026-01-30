import useLanguage, { Locale } from "@/hooks/useLanguage";

    const { setLanguage } = useLanguage();

    const toggleLanguage = (lang: Locale) => {
        if (lang !== locale) {
            setLanguage(lang);
            if (onShowToast) {
                onShowToast(lang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language changed to English', 'info');
            }
        }
    };
