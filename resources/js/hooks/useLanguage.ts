import { usePage, router } from '@inertiajs/react';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Supported locales in the application
 */
export type Locale = 'id' | 'en';

/**
 * Generic recursive type for nested translations object
 */
interface NestedTranslations {
    [key: string]: string | NestedTranslations;
}

/**
 * Specific type for CTA buttons
 */
interface CTATranslations {
    learn: string;
    contact: string;
}

/**
 * Specific type for section items with title and description
 */
interface SectionItem {
    title: string;
    desc: string;
}

/**
 * Contact form translations
 */
interface ContactFormTranslations {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    submit: string;
}

interface CalculatorTranslations {
    subtitle: string;
    title: string;
    description: string;
    parameter_title: string;
    quality_label: string;
    volume_label: string;
    vat_label: string;
    details_title: string;
    unit_price: string;
    subtotal: string;
    vat: string;
    total: string;
    note_radius: string;
    note_pump: string;
    note_change: string;
    order_btn: string;
}

/**
 * Full translations interface matching the JSON structure
 */
export interface Translations {
    nav: {
        home: string;
        about: string;
        about_profile: string;
        about_vision: string;
        about_structure: string;
        about_certification: string;
        services: string;
        services_construction: string;
        services_infrastructure: string;
        services_renovation: string;
        services_consultation: string;
        projects: string;
        projects_ongoing: string;
        projects_completed: string;
        projects_portfolio: string;
        contact: string;
    };
    topbar: {
        contact: string;
        search: string;
        searchBtn: string;
    };
    splash: {
        tagline: string;
    };
    hero: {
        title: string;
        subtitle: string;
        description: string;
        cta: CTATranslations;
    };
    about: {
        title: string;
        description: string;
        construction: SectionItem;
        infrastructure: SectionItem;
        energy: SectionItem;
    };
    stats: {
        years: string;
        years_value: string;
        projects: string;
        projects_value: string;
        employees: string;
        employees_value: string;
        clients: string;
        clients_value: string;
        provinces: string;
    };
    services: {
        title: string;
        description: string;
        contractor: SectionItem;
        batching: SectionItem;
        asphalt: SectionItem;
        calculator: CalculatorTranslations;
    };
    contact: {
        title: string;
        description: string;
        office: string;
        basecamp: string;
        phone: string;
        email: string;
        address: string;
        form: ContactFormTranslations;
    };
    footer: {
        company: string;
        description: string;
        quickLinks: string;
        services: string;
        contactInfo: string;
        copyright: string;
        followUs: string;
    };
    toast: {
        langChanged: string;
    };
    common: {
        readMore: string;
        viewAll: string;
        loading: string;
        error: string;
        success: string;
        close: string;
    };
}

/**
 * Inertia page props including translations
 */
interface PageProps {
    locale?: Locale;
    translations?: Translations | NestedTranslations;
    [key: string]: unknown;
}

/**
 * Return type for the useLanguage hook
 */
interface UseLanguageReturn {
    /** Translation function - pass dot-notation key to get translated string */
    t: (key: string) => string;
    /** Current active locale */
    locale: Locale;
    /** Current active locale (alias for locale) */
    currentLanguage: Locale;
    /** Function to switch language */
    setLanguage: (lang: Locale) => void;
    /** Full translations object for direct access */
    translations: Translations | NestedTranslations;
}

// =============================================================================
// Hook Implementation
// =============================================================================

/**
 * Custom hook for accessing translations from Inertia shared props.
 * 
 * @example
 * ```tsx
 * const { t, locale, setLanguage } = useLanguage();
 * 
 * // Get translation with dot notation
 * const title = t('hero.title');
 * const ctaText = t('hero.cta.learn');
 * 
 * // Switch language
 * setLanguage('en');
 * ```
 */
export const useLanguage = (): UseLanguageReturn => {
    // Get props from Inertia page
    const pageProps = usePage().props as PageProps;
    
    const locale: Locale = (pageProps.locale as Locale) || 'id';
    const translations = pageProps.translations || {} as Translations;

    /**
     * Get translation value by dot-notation key.
     * Supports nested keys like 'hero.cta.learn'
     * 
     * @param key - Dot-notation key (e.g., 'hero.title', 'nav.home')
     * @returns Translated string or the key itself if not found
     */
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                // Key not found - return the key itself for debugging
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    /**
     * Switch the application language.
     * This will navigate to the language switch route and reload the page.
     * 
     * @param lang - Target locale ('id' or 'en')
     */
    const setLanguage = (lang: Locale): void => {
        const { pathname, search, hash } = window.location;
        const segments = pathname.split('/').filter(Boolean);

        // Check if first segment is a locale
        if (segments.length > 0 && ['id', 'en'].includes(segments[0])) {
            segments[0] = lang;
        } else {
            // If no locale in URL (shouldn't happen with new routing but safe to handle), prepend it
            segments.unshift(lang);
        }

        const newPath = '/' + segments.join('/');
        router.visit(newPath + search + hash);
    };

    return {
        t,
        locale,
        currentLanguage: locale, // Alias for backward compatibility
        setLanguage,
        translations,
    };
};

/**
 * Utility type helper to get nested translation keys
 * Can be used for type-safe translation keys in the future
 */
export type TranslationKey = 
    | `nav.${keyof Translations['nav']}`
    | `topbar.${keyof Translations['topbar']}`
    | `splash.${keyof Translations['splash']}`
    | `hero.${keyof Translations['hero']}`
    | `hero.cta.${keyof CTATranslations}`
    | `about.${keyof Translations['about']}`
    | `stats.${keyof Translations['stats']}`
    | `services.${keyof Translations['services']}`
    | `contact.${keyof Translations['contact']}`
    | `contact.form.${keyof ContactFormTranslations}`
    | `footer.${keyof Translations['footer']}`
    | `toast.${keyof Translations['toast']}`
    | `common.${keyof Translations['common']}`;

export default useLanguage;