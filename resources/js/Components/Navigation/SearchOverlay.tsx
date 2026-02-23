import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface SearchResult {
    type: 'article' | 'project' | 'gallery' | 'service' | 'page';
    title: string;
    description: string | null;
    thumbnail: string | null;
    url: string;
    category: string | null;
}

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const typeIcons: Record<string, JSX.Element> = {
    article: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
    ),
    project: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    gallery: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    service: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    page: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
};

const typeLabels: Record<string, Record<string, string>> = {
    article: { id: 'Artikel', en: 'Article' },
    project: { id: 'Proyek', en: 'Project' },
    gallery: { id: 'Galeri', en: 'Gallery' },
    service: { id: 'Layanan', en: 'Service' },
    page: { id: 'Halaman', en: 'Page' },
};

const typeColors: Record<string, string> = {
    article: '#3B82F6',
    project: '#10B981',
    gallery: '#8B5CF6',
    service: '#F59E0B',
    page: '#6B7280',
};

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const { locale, t } = useLanguage();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Focus input when overlay opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            setQuery('');
            setResults([]);
            setSelectedIndex(-1);
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Debounced search
    const doSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&locale=${locale}`);
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error('Search failed:', err);
            setResults([]);
        }
        setIsLoading(false);
    }, [locale]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (query.length < 2) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        debounceRef.current = setTimeout(() => doSearch(query), 300);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, doSearch]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
            e.preventDefault();
            navigateTo(results[selectedIndex].url);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const navigateTo = (url: string) => {
        onClose();
        window.location.href = url;
    };

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0 && resultsRef.current) {
            const items = resultsRef.current.querySelectorAll('[data-search-item]');
            items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    if (!isOpen) return null;

    // Group results by type
    const groupedResults: Record<string, SearchResult[]> = {};
    results.forEach(r => {
        if (!groupedResults[r.type]) groupedResults[r.type] = [];
        groupedResults[r.type].push(r);
    });

    let globalIndex = -1;

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.60)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 9998,
                    animation: 'searchFadeIn 0.2s ease-out',
                }}
                onClick={onClose}
            />

            {/* Search Panel */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10vh',
                    animation: 'searchSlideDown 0.25s ease-out',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '640px',
                        margin: '0 16px',
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '70vh',
                    }}
                >
                    {/* Search Input Area */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '16px 20px',
                            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                            gap: '12px',
                        }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="#94A3B8"
                            viewBox="0 0 24 24"
                            style={{ flexShrink: 0 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={locale === 'id' ? 'Cari artikel, proyek, layanan...' : 'Search articles, projects, services...'}
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#1E293B',
                                backgroundColor: 'transparent',
                            }}
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    color: '#94A3B8',
                                    display: 'flex',
                                    flexShrink: 0,
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(15, 23, 42, 0.06)',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#64748B',
                                flexShrink: 0,
                                letterSpacing: '0.5px',
                            }}
                        >
                            ESC
                        </button>
                    </div>

                    {/* Results Area */}
                    <div
                        ref={resultsRef}
                        style={{
                            overflowY: 'auto',
                            flex: 1,
                        }}
                    >
                        {/* Loading State */}
                        {isLoading && query.length >= 2 && (
                            <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        border: '3px solid rgba(59, 130, 246, 0.2)',
                                        borderTopColor: '#3B82F6',
                                        borderRadius: '50%',
                                        animation: 'searchSpin 0.6s linear infinite',
                                        margin: '0 auto 12px',
                                    }}
                                />
                                <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                                    {locale === 'id' ? 'Mencari...' : 'Searching...'}
                                </p>
                            </div>
                        )}

                        {/* Empty / Prompt State */}
                        {!isLoading && query.length < 2 && (
                            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="#6366F1" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p style={{ fontSize: '14px', color: '#64748B', margin: 0, fontWeight: 500 }}>
                                    {locale === 'id' ? 'Ketik minimal 2 karakter untuk mencari' : 'Type at least 2 characters to search'}
                                </p>
                                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                                    {[
                                        { label: locale === 'id' ? 'Batching Plant' : 'Batching Plant', q: 'batching' },
                                        { label: locale === 'id' ? 'Konstruksi' : 'Construction', q: locale === 'id' ? 'konstruksi' : 'construction' },
                                        { label: locale === 'id' ? 'Aspal' : 'Asphalt', q: locale === 'id' ? 'aspal' : 'asphalt' },
                                    ].map((suggestion) => (
                                        <button
                                            key={suggestion.q}
                                            onClick={() => setQuery(suggestion.q)}
                                            style={{
                                                background: 'rgba(59, 130, 246, 0.06)',
                                                border: '1px solid rgba(59, 130, 246, 0.15)',
                                                borderRadius: '20px',
                                                padding: '6px 14px',
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: '#3B82F6',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.06)';
                                            }}
                                        >
                                            {suggestion.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {!isLoading && query.length >= 2 && results.length === 0 && (
                            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="#EF4444" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', margin: '0 0 6px' }}>
                                    {locale === 'id' ? 'Tidak ditemukan' : 'No results found'}
                                </p>
                                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                                    {locale === 'id'
                                        ? `Tidak ada hasil untuk "${query}". Coba kata kunci lain.`
                                        : `No results for "${query}". Try a different keyword.`}
                                </p>
                            </div>
                        )}

                        {/* Results List - Grouped by type */}
                        {!isLoading && results.length > 0 && (
                            <div style={{ padding: '8px 0' }}>
                                {Object.entries(groupedResults).map(([type, items]) => (
                                    <div key={type}>
                                        {/* Group Header */}
                                        <div
                                            style={{
                                                padding: '10px 20px 6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            <span style={{ color: typeColors[type] || '#6B7280' }}>
                                                {typeIcons[type]}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.8px',
                                                    color: '#94A3B8',
                                                }}
                                            >
                                                {typeLabels[type]?.[locale] || type}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    color: '#CBD5E1',
                                                    background: 'rgba(15, 23, 42, 0.04)',
                                                    padding: '1px 6px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {items.length}
                                            </span>
                                        </div>

                                        {/* Group Items */}
                                        {items.map((result) => {
                                            globalIndex++;
                                            const idx = globalIndex;
                                            const isSelected = selectedIndex === idx;

                                            return (
                                                <button
                                                    key={`${result.type}-${result.url}-${idx}`}
                                                    data-search-item
                                                    onClick={() => navigateTo(result.url)}
                                                    onMouseEnter={() => setSelectedIndex(idx)}
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        background: isSelected ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        transition: 'background 0.1s ease',
                                                    }}
                                                >
                                                    {/* Thumbnail */}
                                                    {result.thumbnail ? (
                                                        <div
                                                            style={{
                                                                width: '44px',
                                                                height: '44px',
                                                                borderRadius: '8px',
                                                                overflow: 'hidden',
                                                                flexShrink: 0,
                                                                backgroundColor: '#F1F5F9',
                                                            }}
                                                        >
                                                            <img
                                                                src={result.thumbnail}
                                                                alt=""
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: '44px',
                                                                height: '44px',
                                                                borderRadius: '8px',
                                                                flexShrink: 0,
                                                                background: `linear-gradient(135deg, ${typeColors[result.type]}15, ${typeColors[result.type]}25)`,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: typeColors[result.type],
                                                            }}
                                                        >
                                                            {typeIcons[result.type]}
                                                        </div>
                                                    )}

                                                    {/* Text */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div
                                                            style={{
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                                color: '#1E293B',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                            }}
                                                        >
                                                            {result.title}
                                                        </div>
                                                        {result.description && (
                                                            <div
                                                                style={{
                                                                    fontSize: '12px',
                                                                    color: '#94A3B8',
                                                                    marginTop: '2px',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                }}
                                                            >
                                                                {result.description}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Arrow */}
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke={isSelected ? '#3B82F6' : '#CBD5E1'}
                                                        viewBox="0 0 24 24"
                                                        style={{ flexShrink: 0, transition: 'stroke 0.15s' }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {results.length > 0 && (
                        <div
                            style={{
                                padding: '10px 20px',
                                borderTop: '1px solid rgba(15, 23, 42, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '11px',
                                color: '#94A3B8',
                            }}
                        >
                            <span>{results.length} {locale === 'id' ? 'hasil ditemukan' : 'results found'}</span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <span style={{
                                    background: 'rgba(15, 23, 42, 0.06)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: 600,
                                }}>↑↓</span>
                                <span>{locale === 'id' ? 'navigasi' : 'navigate'}</span>
                                <span style={{
                                    background: 'rgba(15, 23, 42, 0.06)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    marginLeft: '4px',
                                }}>↵</span>
                                <span>{locale === 'id' ? 'pilih' : 'select'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes searchFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes searchSlideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes searchSpin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
};

export default SearchOverlay;
