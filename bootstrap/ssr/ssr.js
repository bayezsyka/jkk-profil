import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect, createContext, useContext, forwardRef, useImperativeHandle } from "react";
import { Link, usePage, router, Head, useForm, createInertiaApp } from "@inertiajs/react";
import { OrgChart } from "d3-org-chart";
import ReactQuill from "react-quill";
import { Transition, Dialog, TransitionChild, DialogPanel, Listbox, Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const AboutSubNavbar = ({
  sections,
  activeSection,
  scrollToSection,
  isMenuSticky
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col gap-2 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4 py-2 mb-2", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Navigation" }) }),
      sections.map((section) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => scrollToSection(section.id),
          className: `px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 text-left flex items-center gap-3 ${activeSection === section.id ? "bg-[#1e3a5f] text-white shadow-md translate-x-1" : "text-[#1e3a5f] hover:bg-gray-50"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `w-1.5 h-1.5 rounded-full transition-all ${activeSection === section.id ? "bg-white scale-125" : "bg-[#1e3a5f]/20"}` }),
            section.label
          ]
        },
        section.id
      ))
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `md:hidden about-subnavbar ${isMenuSticky ? "fixed top-[75px] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100 py-2 px-3 z-50 w-[92vw]" : "bg-gray-100/60 rounded-2xl py-2 px-2"}`,
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth", children: sections.map((section) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => scrollToSection(section.id),
            className: `px-4 py-2 text-[11px] font-black rounded-xl whitespace-nowrap flex-shrink-0 uppercase tracking-tighter transition-all ${activeSection === section.id ? "bg-[#1e3a5f] text-white shadow-lg" : "text-[#1e3a5f] hover:bg-white/80"}`,
            children: section.label
          },
          section.id
        )) })
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            ` })
  ] });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutSubNavbar
}, Symbol.toStringTag, { value: "Module" }));
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      ...props,
      src: "/images/logo.webp",
      alt: "Application Logo"
    }
  );
}
function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 text-gray-900 focus:border-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") + className,
      children
    }
  );
}
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
const useLanguage = () => {
  const pageProps = usePage().props;
  const locale = pageProps.locale || "id";
  const translations = pageProps.translations || {};
  const t = (key) => {
    const keys = key.split(".");
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };
  const setLanguage = (lang) => {
    const { pathname, search, hash } = window.location;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["id", "en"].includes(segments[0])) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    const newPath = "/" + segments.join("/");
    router.visit(newPath + search + hash);
  };
  return {
    t,
    locale,
    currentLanguage: locale,
    // Alias for backward compatibility
    setLanguage,
    translations
  };
};
const PageHeader = ({
  title,
  breadcrumbs,
  backgroundImage = "/images/header-bg.webp",
  heightClass = "h-[250px] md:h-[300px]",
  imageOpacity = 0.2,
  imageMixBlendMode = "overlay",
  overlayOpacity = 1,
  textPosition = "center",
  hasBottomContent = false
}) => {
  const { locale, t } = useLanguage();
  const getAlignmentClass = () => {
    switch (textPosition) {
      case "top":
        return "items-start pt-32 md:pt-48";
      case "bottom":
        if (hasBottomContent) {
          return "items-end pb-[32vh] md:pb-[48vh]";
        } else {
          return "items-end pb-24 md:pb-24";
        }
      default:
        return "items-center";
    }
  };
  const getTitleClass = () => {
    if (textPosition === "bottom") {
      return "text-3xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight";
    }
    return "text-3xl md:text-4xl font-bold text-white tracking-tight";
  };
  const isFullScreen = heightClass.includes("h-screen") || heightClass.includes("min-h-screen");
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative w-full ${heightClass} flex ${getAlignmentClass()}`,
      style: {
        background: `linear-gradient(90deg, #1e3a8a 0%, #172554 100%)`,
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: backgroundImage,
            alt: `Background Header ${title} - PT Jaya Karya Kontruksi`,
            className: "w-full h-full object-cover",
            style: {
              opacity: imageOpacity,
              mixBlendMode: imageMixBlendMode
            },
            fetchpriority: "high"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-10",
            style: {
              background: "linear-gradient(90deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.8) 50%, rgba(30, 58, 138, 0.4) 100%)",
              opacity: overlayOpacity
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-20", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-xs md:text-sm text-gray-300 mb-2 md:mb-4", children: [
            /* @__PURE__ */ jsx(Link, { href: `/${locale}`, className: "hover:text-white transition-colors", children: /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "w-3 h-3 md:w-4 md:h-4",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" }),
                  /* @__PURE__ */ jsx("path", { d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" })
                ]
              }
            ) }),
            breadcrumbs.map((item, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "/" }),
              item.href ? /* @__PURE__ */ jsx(
                Link,
                {
                  href: item.href,
                  className: "hover:text-white transition-colors",
                  children: item.label
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: item.label })
            ] }, index))
          ] }),
          /* @__PURE__ */ jsx("h1", { className: getTitleClass(), children: title })
        ] }),
        isFullScreen && /* @__PURE__ */ jsx("div", { className: "absolute bottom-16 md:bottom-8 left-0 right-0 z-40 flex justify-center animate-bounce", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleScrollDown,
            className: "text-white hover:text-gray-200 transition-colors focus:outline-none",
            "aria-label": t("common.scrollDown"),
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-8 h-8 md:w-10 md:h-10", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) })
          }
        ) })
      ]
    }
  );
};
const typeIcons = {
  article: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }),
  project: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }),
  gallery: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
  service: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  ] }),
  page: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) })
};
const typeLabels = {
  article: { id: "Artikel", en: "Article" },
  project: { id: "Proyek", en: "Project" },
  gallery: { id: "Galeri", en: "Gallery" },
  service: { id: "Layanan", en: "Service" },
  page: { id: "Halaman", en: "Page" }
};
const typeColors = {
  article: "#3B82F6",
  project: "#10B981",
  gallery: "#8B5CF6",
  service: "#F59E0B",
  page: "#6B7280"
};
const SearchOverlay = ({ isOpen, onClose }) => {
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const doSearch = useCallback(async (searchQuery) => {
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
      console.error("Search failed:", err);
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
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex].url);
    } else if (e.key === "Escape") {
      onClose();
    }
  };
  const navigateTo = (url) => {
    onClose();
    window.location.href = url;
  };
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll("[data-search-item]");
      items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);
  if (!isOpen) return null;
  const groupedResults = {};
  results.forEach((r) => {
    if (!groupedResults[r.type]) groupedResults[r.type] = [];
    groupedResults[r.type].push(r);
  });
  let globalIndex = -1;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.60)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 9998,
          animation: "searchFadeIn 0.2s ease-out"
        },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          paddingTop: "10vh",
          animation: "searchSlideDown 0.25s ease-out"
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              width: "100%",
              maxWidth: "640px",
              margin: "0 16px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70vh"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
                    gap: "12px"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "#94A3B8",
                        viewBox: "0 0 24 24",
                        style: { flexShrink: 0 },
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        ref: inputRef,
                        type: "text",
                        value: query,
                        onChange: (e) => setQuery(e.target.value),
                        onKeyDown: handleKeyDown,
                        placeholder: locale === "id" ? "Cari artikel, proyek, layanan..." : "Search articles, projects, services...",
                        style: {
                          flex: 1,
                          border: "none",
                          outline: "none",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#1E293B",
                          backgroundColor: "transparent"
                        }
                      }
                    ),
                    query && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setQuery(""),
                        style: {
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          color: "#94A3B8",
                          display: "flex",
                          flexShrink: 0
                        },
                        children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: onClose,
                        style: {
                          background: "rgba(15, 23, 42, 0.06)",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#64748B",
                          flexShrink: 0,
                          letterSpacing: "0.5px"
                        },
                        children: "ESC"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: resultsRef,
                  style: {
                    overflowY: "auto",
                    flex: 1
                  },
                  children: [
                    isLoading && query.length >= 2 && /* @__PURE__ */ jsxs("div", { style: { padding: "32px 20px", textAlign: "center" }, children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            width: "32px",
                            height: "32px",
                            border: "3px solid rgba(59, 130, 246, 0.2)",
                            borderTopColor: "#3B82F6",
                            borderRadius: "50%",
                            animation: "searchSpin 0.6s linear infinite",
                            margin: "0 auto 12px"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { style: { fontSize: "14px", color: "#94A3B8", margin: 0 }, children: locale === "id" ? "Mencari..." : "Searching..." })
                    ] }),
                    !isLoading && query.length < 2 && /* @__PURE__ */ jsxs("div", { style: { padding: "40px 20px", textAlign: "center" }, children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px"
                          },
                          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "#6366F1", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { style: { fontSize: "14px", color: "#64748B", margin: 0, fontWeight: 500 }, children: locale === "id" ? "Ketik minimal 2 karakter untuk mencari" : "Type at least 2 characters to search" }),
                      /* @__PURE__ */ jsx("div", { style: { marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }, children: [
                        { label: locale === "id" ? "Batching Plant" : "Batching Plant", q: "batching" },
                        { label: locale === "id" ? "Konstruksi" : "Construction", q: locale === "id" ? "konstruksi" : "construction" },
                        { label: locale === "id" ? "Aspal" : "Asphalt", q: locale === "id" ? "aspal" : "asphalt" }
                      ].map((suggestion) => /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setQuery(suggestion.q),
                          style: {
                            background: "rgba(59, 130, 246, 0.06)",
                            border: "1px solid rgba(59, 130, 246, 0.15)",
                            borderRadius: "20px",
                            padding: "6px 14px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#3B82F6",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.background = "rgba(59, 130, 246, 0.12)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.background = "rgba(59, 130, 246, 0.06)";
                          },
                          children: suggestion.label
                        },
                        suggestion.q
                      )) })
                    ] }),
                    !isLoading && query.length >= 2 && results.length === 0 && /* @__PURE__ */ jsxs("div", { style: { padding: "40px 20px", textAlign: "center" }, children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px"
                          },
                          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "#EF4444", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { style: { fontSize: "15px", fontWeight: 600, color: "#1E293B", margin: "0 0 6px" }, children: locale === "id" ? "Tidak ditemukan" : "No results found" }),
                      /* @__PURE__ */ jsx("p", { style: { fontSize: "13px", color: "#94A3B8", margin: 0 }, children: locale === "id" ? `Tidak ada hasil untuk "${query}". Coba kata kunci lain.` : `No results for "${query}". Try a different keyword.` })
                    ] }),
                    !isLoading && results.length > 0 && /* @__PURE__ */ jsx("div", { style: { padding: "8px 0" }, children: Object.entries(groupedResults).map(([type, items]) => /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            padding: "10px 20px 6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          },
                          children: [
                            /* @__PURE__ */ jsx("span", { style: { color: typeColors[type] || "#6B7280" }, children: typeIcons[type] }),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.8px",
                                  color: "#94A3B8"
                                },
                                children: typeLabels[type]?.[locale] || type
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                style: {
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "#CBD5E1",
                                  background: "rgba(15, 23, 42, 0.04)",
                                  padding: "1px 6px",
                                  borderRadius: "4px"
                                },
                                children: items.length
                              }
                            )
                          ]
                        }
                      ),
                      items.map((result) => {
                        globalIndex++;
                        const idx = globalIndex;
                        const isSelected = selectedIndex === idx;
                        return /* @__PURE__ */ jsxs(
                          "button",
                          {
                            "data-search-item": true,
                            onClick: () => navigateTo(result.url),
                            onMouseEnter: () => setSelectedIndex(idx),
                            style: {
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 20px",
                              border: "none",
                              background: isSelected ? "rgba(59, 130, 246, 0.06)" : "transparent",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "background 0.1s ease"
                            },
                            children: [
                              result.thumbnail ? /* @__PURE__ */ jsx(
                                "div",
                                {
                                  style: {
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                    backgroundColor: "#F1F5F9"
                                  },
                                  children: /* @__PURE__ */ jsx(
                                    "img",
                                    {
                                      src: result.thumbnail,
                                      alt: "",
                                      style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                      },
                                      onError: (e) => {
                                        e.target.style.display = "none";
                                      }
                                    }
                                  )
                                }
                              ) : /* @__PURE__ */ jsx(
                                "div",
                                {
                                  style: {
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "8px",
                                    flexShrink: 0,
                                    background: `linear-gradient(135deg, ${typeColors[result.type]}15, ${typeColors[result.type]}25)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: typeColors[result.type]
                                  },
                                  children: typeIcons[result.type]
                                }
                              ),
                              /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontSize: "14px",
                                      fontWeight: 600,
                                      color: "#1E293B",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis"
                                    },
                                    children: result.title
                                  }
                                ),
                                result.description && /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontSize: "12px",
                                      color: "#94A3B8",
                                      marginTop: "2px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis"
                                    },
                                    children: result.description
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  className: "w-4 h-4",
                                  fill: "none",
                                  stroke: isSelected ? "#3B82F6" : "#CBD5E1",
                                  viewBox: "0 0 24 24",
                                  style: { flexShrink: 0, transition: "stroke 0.15s" },
                                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" })
                                }
                              )
                            ]
                          },
                          `${result.type}-${result.url}-${idx}`
                        );
                      })
                    ] }, type)) })
                  ]
                }
              ),
              results.length > 0 && /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    padding: "10px 20px",
                    borderTop: "1px solid rgba(15, 23, 42, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "#94A3B8"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      results.length,
                      " ",
                      locale === "id" ? "hasil ditemukan" : "results found"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "6px", alignItems: "center" }, children: [
                      /* @__PURE__ */ jsx("span", { style: {
                        background: "rgba(15, 23, 42, 0.06)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: 600
                      }, children: "↑↓" }),
                      /* @__PURE__ */ jsx("span", { children: locale === "id" ? "navigasi" : "navigate" }),
                      /* @__PURE__ */ jsx("span", { style: {
                        background: "rgba(15, 23, 42, 0.06)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: 600,
                        marginLeft: "4px"
                      }, children: "↵" }),
                      /* @__PURE__ */ jsx("span", { children: locale === "id" ? "pilih" : "select" })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
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
            ` })
  ] });
};
const TopBar = ({ onShowToast, className, style, isTransparent = false, isMobile = false, onSearchClick }) => {
  const { locale, setLanguage, t } = useLanguage();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleLanguageChange = (lang) => {
    if (lang !== locale) {
      setLanguage(lang);
      if (onShowToast) {
        onShowToast(t("common.lang_changed"), "info");
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `top-bar ${className || ""}`,
      style: {
        height: isMobile ? "36px" : "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0",
        color: "white",
        fontSize: "0.85rem",
        position: "relative",
        ...style
      },
      children: [
        !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/${locale}/kontak-kami`,
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "inherit",
                fontWeight: 500,
                marginRight: "20px",
                transition: "opacity 0.2s"
              },
              className: "hover:opacity-80",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  }
                ) }),
                t("nav.contact")
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                width: "1px",
                height: "12px",
                backgroundColor: "currentColor",
                opacity: 0.3,
                marginRight: "20px"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onSearchClick?.(),
              style: {
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginRight: "20px"
              },
              "aria-label": "Search",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleLanguageChange("id"),
              style: {
                background: "none",
                border: "none",
                color: "inherit",
                fontWeight: locale === "id" ? 700 : 400,
                opacity: locale === "id" ? 1 : 0.6,
                cursor: "pointer",
                fontSize: "inherit"
              },
              children: "ID"
            }
          ),
          /* @__PURE__ */ jsx("span", { style: { opacity: 0.4 }, children: "|" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleLanguageChange("en"),
              style: {
                background: "none",
                border: "none",
                color: "inherit",
                fontWeight: locale === "en" ? 700 : 400,
                opacity: locale === "en" ? 1 : 0.6,
                cursor: "pointer",
                fontSize: "inherit"
              },
              children: "EN"
            }
          )
        ] })
      ]
    }
  );
};
const Navbar = ({ onShowToast, className, style, forceTransparent }) => {
  const { t, locale, setLanguage } = useLanguage();
  const { url } = usePage();
  const toggleLanguage = (lang) => {
    if (lang !== locale) {
      setLanguage(lang);
      if (onShowToast) {
        onShowToast(t("common.lang_changed"), "info");
      }
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const apply = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) {
        setMobileOpen(false);
        setMobileSearchOpen(false);
      }
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isMobile) return;
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen, isMobile]);
  const isHomepage = ["/", "/id", "/en"].includes(url) || url === "/";
  const isTransparent = (forceTransparent || isHomepage) && !isScrolled;
  const textColor = isTransparent ? "white" : "#1f2937";
  const topBarColor = isTransparent ? "rgba(255,255,255,0.9)" : "#526086";
  const menuItems = useMemo(
    () => [
      {
        label: t("nav.about"),
        href: `/${locale}/tentang-kami`
      },
      {
        label: t("services.batching.title"),
        href: `/${locale}/services/batching-plant`
      },
      {
        label: t("services.contractor.title"),
        href: `/${locale}/services/construction`
      },
      {
        label: t("services.asphalt.title"),
        href: `/${locale}/services/asphalt-mixing-plant`
      },
      {
        label: t("nav.nav_articles"),
        // Using existing key, or plain text if key missing? Let's use key.
        href: `/${locale}/artikel`
      },
      {
        label: t("nav.others"),
        children: [
          { label: t("nav.nav_gallery"), href: `/${locale}/galeri` },
          { label: t("nav.nav_projects"), href: `/${locale}/projek` }
        ]
      }
    ],
    [t, locale]
  );
  const toggleMobileSection = (label) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: `fixed w-full z-50 transition-all duration-300 ${className || ""}`,
        style: {
          backgroundColor: isTransparent ? "transparent" : "rgba(255, 255, 255, 0.98)",
          backdropFilter: isTransparent ? "none" : "blur(10px)",
          boxShadow: isTransparent ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
          padding: isMobile ? "10px 16px" : "10px 0",
          ...style
        },
        children: [
          !isMobile ? /* @__PURE__ */ jsxs(
            "div",
            {
              className: "container mx-auto px-4 sm:px-6 lg:px-8",
              style: {
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gridTemplateRows: isScrolled ? "0px auto" : "auto auto",
                gap: isScrolled ? "0px" : "0px 32px",
                alignItems: "center",
                transition: "all 0.4s ease"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      gridRow: "1 / span 2",
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      paddingRight: "20px"
                    },
                    children: /* @__PURE__ */ jsx("a", { href: `/${locale}`, style: { display: "block", transition: "transform 0.3s" }, children: /* @__PURE__ */ jsx(
                      ApplicationLogo,
                      {
                        className: "transition-all duration-300",
                        style: {
                          width: isScrolled ? "45px" : "70px",
                          height: isScrolled ? "45px" : "70px"
                        }
                      }
                    ) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      gridColumn: "2",
                      overflow: "hidden",
                      opacity: isScrolled ? 0 : 1,
                      transform: isScrolled ? "translateY(-10px)" : "translateY(0)",
                      transition: "all 0.3s ease"
                    },
                    children: /* @__PURE__ */ jsx(TopBar, { onShowToast, isTransparent, style: { color: topBarColor }, onSearchClick: () => setSearchOverlayOpen(true) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      gridColumn: "2",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: isScrolled ? "0" : "8px",
                      transition: "padding 0.3s ease"
                    },
                    children: /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "32px" }, children: menuItems.map((item) => /* @__PURE__ */ jsxs(
                      "div",
                      {
                        onMouseEnter: () => setHoveredMenu(item.label),
                        onMouseLeave: () => setHoveredMenu(null),
                        style: { position: "relative" },
                        children: [
                          item.href ? /* @__PURE__ */ jsx(
                            "a",
                            {
                              href: item.href,
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "8px 0",
                                fontSize: "15px",
                                fontWeight: 600,
                                textDecoration: "none",
                                color: url === item.href ? "#3B82F6" : textColor,
                                transition: "color 0.2s"
                              },
                              children: item.label
                            }
                          ) : /* @__PURE__ */ jsxs(
                            "button",
                            {
                              style: {
                                background: "none",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "8px 0",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                color: textColor,
                                transition: "color 0.2s"
                              },
                              children: [
                                item.label,
                                item.children && /* @__PURE__ */ jsx(
                                  "svg",
                                  {
                                    className: "w-3 h-3",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    style: { marginTop: "2px" },
                                    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                                  }
                                )
                              ]
                            }
                          ),
                          item.children && hoveredMenu === item.label && /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                top: "100%",
                                right: 0,
                                backgroundColor: "white",
                                borderRadius: "8px",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                padding: "8px 0",
                                minWidth: "220px",
                                zIndex: 100,
                                animation: "fadeIn 0.2s ease-in-out"
                              },
                              children: item.children.map((child) => /* @__PURE__ */ jsx(
                                "a",
                                {
                                  href: child.href,
                                  style: {
                                    display: "block",
                                    padding: "10px 20px",
                                    color: "#4b5563",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    transition: "all 0.2s"
                                  },
                                  onMouseEnter: (e) => {
                                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                                    e.currentTarget.style.color = "#1f2937";
                                    e.currentTarget.style.paddingLeft = "24px";
                                  },
                                  onMouseLeave: (e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#4b5563";
                                    e.currentTarget.style.paddingLeft = "20px";
                                  },
                                  children: child.label
                                },
                                child.href
                              ))
                            }
                          )
                        ]
                      },
                      item.label
                    )) })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px"
              },
              children: [
                /* @__PURE__ */ jsx("a", { href: `/${locale}`, style: { display: "flex", alignItems: "center" }, "aria-label": "Home", children: /* @__PURE__ */ jsx(ApplicationLogo, { style: { width: "42px", height: "42px" } }) }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setSearchOverlayOpen(true),
                      style: {
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        background: "#0B2D5C",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      "aria-label": "Search",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setMobileOpen((v) => !v),
                      style: {
                        width: "52px",
                        height: "52px",
                        borderRadius: "999px",
                        border: "3px solid #0B2D5C",
                        cursor: "pointer",
                        background: mobileOpen ? "#3B82F6" : "white",
                        color: mobileOpen ? "white" : "#0B2D5C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease"
                      },
                      "aria-label": mobileOpen ? "Close menu" : "Open menu",
                      children: mobileOpen ? /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M4 6h16M4 12h16M4 18h16"
                        }
                      ) })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx("style", { children: `
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(5px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                ` })
        ]
      }
    ),
    isMobile && mobileOpen && /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.20)",
          zIndex: 999
        },
        onClick: () => setMobileOpen(false)
      }
    ),
    isMobile && mobileOpen && /* @__PURE__ */ jsxs(
      "aside",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#ffffff",
          zIndex: 1e3,
          display: "flex",
          flexDirection: "column"
        },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                borderBottom: "1px solid rgba(15, 23, 42, 0.08)"
              },
              children: [
                /* @__PURE__ */ jsx("a", { href: `/${locale}`, style: { display: "flex", alignItems: "center", gap: "8px" }, "aria-label": "Home", children: /* @__PURE__ */ jsx(ApplicationLogo, { style: { width: "40px", height: "40px" } }) }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setSearchOverlayOpen(true),
                      style: {
                        width: "38px",
                        height: "38px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        background: "#0B2D5C",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      "aria-label": "Search",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setMobileOpen(false),
                      style: {
                        width: "44px",
                        height: "44px",
                        borderRadius: "999px",
                        border: "2px solid #0B2D5C",
                        cursor: "pointer",
                        background: "#3B82F6",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      "aria-label": "Close menu",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "nav",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                padding: "10px 0"
              },
              children: menuItems.map((item) => {
                const expanded = !!mobileExpanded[item.label];
                return /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => item.children ? toggleMobileSection(item.label) : item.href && (window.location.href = item.href),
                      style: {
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "14px 18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "20px",
                        letterSpacing: "0.5px",
                        fontWeight: 500,
                        color: "#0f172a",
                        cursor: "pointer"
                      },
                      children: [
                        /* @__PURE__ */ jsx("span", { children: item.label }),
                        item.children && /* @__PURE__ */ jsx("span", { style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#0f172a",
                            style: {
                              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                              opacity: 0.9
                            },
                            children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                          }
                        ) })
                      ]
                    }
                  ),
                  item.children && /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        maxHeight: expanded ? 800 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.25s ease"
                      },
                      children: /* @__PURE__ */ jsx("div", { style: { padding: "0 18px 10px 18px" }, children: item.children.map((child) => /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: child.href,
                          style: {
                            display: "block",
                            padding: "10px 2px",
                            fontSize: "16px",
                            color: "#334155",
                            textDecoration: "none"
                          },
                          children: child.label
                        },
                        child.href
                      )) })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { style: { height: "1px", background: "rgba(15, 23, 42, 0.08)" } })
                ] }, item.label);
              })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                padding: "14px 16px",
                borderTop: "1px solid rgba(15, 23, 42, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/${locale}/kontak-kami`,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      color: "#64748b",
                      border: "1px solid rgba(15, 23, 42, 0.12)"
                    },
                    "aria-label": "Contact",
                    children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.27 1.05l-2.2 2.2a16 16 0 007.07 7.07l2.2-2.2a1 1 0 011.05-.27l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C10.85 21 3 13.15 3 3.5V5z"
                      }
                    ) })
                  }
                ),
                /* @__PURE__ */ jsx("div", { style: { width: "1px", height: "26px", background: "rgba(15, 23, 42, 0.12)" } }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background: "rgba(2, 132, 199, 0.10)",
                      border: "1px solid rgba(2, 132, 199, 0.18)"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            width: "30px",
                            height: "30px",
                            borderRadius: "999px",
                            background: "rgba(2, 132, 199, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0ea5e9"
                          },
                          children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
                            /* @__PURE__ */ jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M12 21a9 9 0 100-18 9 9 0 000 18z"
                              }
                            ),
                            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3.6 9h16.8" }),
                            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3.6 15h16.8" })
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", paddingRight: "4px" }, children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => toggleLanguage("id"),
                            style: {
                              background: "none",
                              border: "none",
                              color: "#0B2D5C",
                              fontWeight: locale === "id" ? 800 : 400,
                              opacity: locale === "id" ? 1 : 0.6,
                              cursor: "pointer",
                              fontSize: "inherit"
                            },
                            children: "ID"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { style: { opacity: 0.4, color: "#0B2D5C" }, children: "|" }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => toggleLanguage("en"),
                            style: {
                              background: "none",
                              border: "none",
                              color: "#0B2D5C",
                              fontWeight: locale === "en" ? 800 : 400,
                              opacity: locale === "en" ? 1 : 0.6,
                              cursor: "pointer",
                              fontSize: "inherit"
                            },
                            children: "EN"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: /* @__PURE__ */ jsx(TopBar, { onShowToast, isTransparent: false, isMobile: true, style: { color: "#526086" } }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SearchOverlay, { isOpen: searchOverlayOpen, onClose: () => setSearchOverlayOpen(false) })
  ] });
};
const Footer = () => {
  const { company } = usePage().props;
  const { locale, t } = useLanguage();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          background: "linear-gradient(180deg, #6B7FA6 0%, #5E7198 100%)",
          color: "#fdfdfe",
          padding: isMobile ? "24px 16px 20px" : isTablet ? "32px 24px 28px" : "48px 32px 42px",
          position: "relative"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "rgba(253,253,254,0.15)"
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                flexDirection: isMobile || isTablet ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile || isTablet ? "center" : "center",
                gap: isMobile ? "20px" : isTablet ? "24px" : "36px",
                textAlign: isMobile || isTablet ? "center" : "left"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: {
                  flex: isMobile || isTablet ? "unset" : "1.3",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile || isTablet ? "center" : "flex-start"
                }, children: [
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      style: {
                        fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
                        fontWeight: 800,
                        margin: isMobile ? "0 0 8px 0" : "0 0 14px 0",
                        letterSpacing: "0.4px"
                      },
                      children: t("footer.company")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: isMobile ? "32px" : "44px",
                        height: isMobile ? "2px" : "3px",
                        backgroundColor: "rgba(253,253,254,0.35)",
                        marginBottom: isMobile ? "10px" : "18px",
                        borderRadius: "2px"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "address",
                    {
                      style: {
                        fontSize: isMobile ? "12px" : "14px",
                        color: "rgba(253,253,254,0.9)",
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: isMobile ? "100%" : "540px",
                        fontStyle: "normal"
                      },
                      children: company.address
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: isMobile || isTablet ? "center" : "flex-end",
                      alignItems: "center",
                      flex: isMobile || isTablet ? "unset" : "1"
                    },
                    children: /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: `/${locale}/kontak-kami`,
                        style: {
                          display: "inline-flex",
                          alignItems: "center",
                          gap: isMobile ? "6px" : "10px",
                          backgroundColor: "#FDFDFE",
                          color: "#4A5B7C",
                          textDecoration: "none",
                          fontSize: isMobile ? "12px" : "14px",
                          fontWeight: 700,
                          padding: isMobile ? "10px 18px" : isTablet ? "12px 22px" : "14px 26px",
                          borderRadius: "9999px",
                          boxShadow: "0 12px 26px rgba(0,0,0,0.18)",
                          transition: "all 0.2s ease"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 16px 34px rgba(0,0,0,0.22)";
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,0.18)";
                        },
                        children: [
                          t("topbar.contact"),
                          /* @__PURE__ */ jsx(
                            "svg",
                            {
                              width: isMobile ? "14" : "18",
                              height: isMobile ? "14" : "18",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                }
                              )
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          backgroundColor: "#4B5C80",
          padding: isMobile ? "10px 16px" : "14px 32px"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            },
            children: /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: isMobile ? "10px" : "12px",
                  color: "rgba(253,253,254,0.75)",
                  margin: 0,
                  textAlign: "center"
                },
                children: [
                  "© ",
                  currentYear,
                  " ",
                  t("footer.company")
                ]
              }
            )
          }
        )
      }
    )
  ] });
};
const Toast = ({ message, type, onClose, duration = 3e3 }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#10B981";
      case "error":
        return "#EF4444";
      case "info":
      default:
        return "#0B2B5A";
    }
  };
  const getIcon = () => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) });
      case "error":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) });
      case "info":
      default:
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "toast-container",
      style: {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        transform: isVisible ? "translateX(0)" : "translateX(120%)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease-out"
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "toast",
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderRadius: "12px",
            backgroundColor: getBackgroundColor(),
            color: "white",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            minWidth: "280px"
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "toast-icon", children: getIcon() }),
            /* @__PURE__ */ jsx("span", { className: "toast-message", style: { flex: 1, fontSize: "14px", fontWeight: 500 }, children: message }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                },
                style: {
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                  padding: 0
                },
                onMouseEnter: (e) => e.currentTarget.style.opacity = "1",
                onMouseLeave: (e) => e.currentTarget.style.opacity = "0.7",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ]
        }
      )
    }
  );
};
function PublicLayout({
  children,
  title,
  headerTitle,
  breadcrumbs = [],
  headerImage,
  transparentHeader = false,
  hidePageHeader = false,
  headerHeight,
  headerImageOpacity,
  headerImageMixBlendMode,
  headerOverlayOpacity,
  headerTextPosition,
  headerHasBottomContent = false,
  ...rest
}) {
  const { t } = useLanguage();
  const { app_url, current_url, localized_urls } = usePage().props;
  const pageTitle = title || t("footer.company");
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 44);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [toast, setToast] = useState(null);
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const hideToast = () => {
    setToast(null);
  };
  const effectiveHeaderTitle = headerTitle || pageTitle.replace(/ - JKK.*| - Jaya Karya Kontruksi.*/, "");
  const effectiveBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : [{ label: effectiveHeaderTitle }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageTitle }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" }),
      headerImage && /* @__PURE__ */ jsx("link", { rel: "preload", as: "image", href: headerImage }),
      !headerImage && /* @__PURE__ */ jsx("link", { rel: "preload", as: "image", href: "/images/header-bg.webp" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: current_url }),
      Object.entries(localized_urls || {}).map(([locale, url]) => /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: locale, href: url }, locale)),
      Object.keys(localized_urls || {}).length > 0 && /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: localized_urls.id || current_url }),
      effectiveBreadcrumbs.length > 0 && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": effectiveBreadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.label,
          "item": crumb.href ? crumb.href.startsWith("http") ? crumb.href : new URL(crumb.href, `${app_url}/`).toString() : void 0
        }))
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-gray-50 flex flex-col`, children: [
      /* @__PURE__ */ jsx(
        Navbar,
        {
          onShowToast: showToast,
          forceTransparent: !!effectiveHeaderTitle || transparentHeader,
          style: {
            position: effectiveHeaderTitle || transparentHeader ? "fixed" : "sticky",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 50
          }
        }
      ),
      /* @__PURE__ */ jsxs("main", { className: `flex-grow ${transparentHeader ? "" : ""}`, children: [
        !hidePageHeader && effectiveHeaderTitle && /* @__PURE__ */ jsx(
          PageHeader,
          {
            title: effectiveHeaderTitle,
            breadcrumbs: effectiveBreadcrumbs,
            backgroundImage: headerImage,
            heightClass: headerHeight,
            imageOpacity: headerImageOpacity,
            imageMixBlendMode: headerImageMixBlendMode,
            overlayOpacity: headerOverlayOpacity,
            textPosition: headerTextPosition,
            hasBottomContent: headerHasBottomContent
          }
        ),
        children
      ] }),
      /* @__PURE__ */ jsx(Footer, {}),
      toast && /* @__PURE__ */ jsx(
        Toast,
        {
          message: toast.message,
          type: toast.type,
          onClose: hideToast
        }
      )
    ] })
  ] });
}
const ProfileSection = ({ id }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id, className: "scroll-mt-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-6", children: t("about.profile.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed mb-6 text-justify", children: t("about.profile.content1") }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed text-justify", children: t("about.profile.content2") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden rounded-2xl shadow-xl", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[4/4]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/profil.webp",
          alt: "Company Profile",
          width: "600",
          height: "600",
          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/40 to-transparent" })
    ] })
  ] }) });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProfileSection
}, Symbol.toStringTag, { value: "Module" }));
const VisionMissionSection = ({ id }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id, className: "scroll-mt-32", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 md:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4 uppercase tracking-wider", children: t("about.vision.vision_title") }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-[#1e3a5f] mb-6 rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed text-justify", children: t("about.vision.vision_content") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#1e3a5f] p-8 md:p-10 rounded-3xl shadow-xl text-white", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider", children: t("about.vision.mission_title") }),
      /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-white/30 mb-6 rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg leading-relaxed text-justify", children: t("about.vision.mission_items.0") })
    ] })
  ] }) });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VisionMissionSection
}, Symbol.toStringTag, { value: "Module" }));
const ValuesSection = ({ id }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id, className: "scroll-mt-32", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2", children: t("about.values.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-[#1e3a5f]/60 font-medium uppercase tracking-widest text-sm", children: t("about.values.subtitle") }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-blue-600 mt-4 rounded-full" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6 bg-blue-50/50 rounded-2xl", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-lg leading-relaxed text-justify italic", children: [
      '"',
      t("about.values.content"),
      '"'
    ] }) })
  ] }) });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ValuesSection
}, Symbol.toStringTag, { value: "Module" }));
const StructureSection$1 = React.lazy(() => Promise.resolve().then(() => __vite_glob_0_6));
const CompanyGallerySection$1 = React.lazy(() => Promise.resolve().then(() => __vite_glob_0_2));
const AboutInfo = ({ organizationMembers, companyGallery }) => {
  const { t, locale } = useLanguage();
  const [activeSection, setActiveSection] = useState("profil");
  const [isMenuSticky, setIsMenuSticky] = useState(false);
  const menuRef = useRef(null);
  const sectionsConfig = [
    { id: "profil", label: t("about.profile.title"), Component: ProfileSection },
    { id: "visi-misi", label: t("about.vision.title"), Component: VisionMissionSection },
    { id: "nilai", label: t("about.values.title"), Component: ValuesSection },
    { id: "struktur", label: t("nav.about_structure"), Component: StructureSection$1 },
    ...companyGallery && companyGallery.length > 0 ? [{ id: "galeri", label: t("about.company_gallery.title"), Component: CompanyGallerySection$1 }] : []
  ];
  const breadcrumbs = [
    { label: t("nav.about"), href: `/${locale}/tentang-kami` },
    { label: sectionsConfig.find((s) => s.id === activeSection)?.label || t("about.profile.title") }
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        setIsMenuSticky(rect.top <= 100);
      }
      const sectionElements = sectionsConfig.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 250;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionsConfig[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${t("nav.about")} | Pengalaman & Visi` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Pelajari profil PT. Jaya Karya Kontruksi (JKK), visi misi, dan dedikasi kami dalam menyediakan layanan konstruksi jalan dan beton berkualitas di Brebes." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "profil JKK, tentang PT. Jaya Karya Kontruksi, visi misi konstruksi, kontraktor jalan Brebes, sejarah perusahaan konstruksi" })
    ] }),
    /* @__PURE__ */ jsxs(
      PublicLayout,
      {
        title: t("nav.about"),
        headerTitle: t("nav.about"),
        breadcrumbs,
        children: [
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12", children: [
            /* @__PURE__ */ jsx("aside", { className: "md:w-64 flex-shrink-0", ref: menuRef, children: /* @__PURE__ */ jsx("div", { className: "md:sticky md:top-32", children: /* @__PURE__ */ jsx(
              AboutSubNavbar,
              {
                sections: sectionsConfig.map(({ id, label }) => ({ id, label })),
                activeSection,
                scrollToSection,
                isMenuSticky
              }
            ) }) }),
            /* @__PURE__ */ jsx("main", { className: "flex-1 max-w-4xl space-y-24", children: sectionsConfig.map(({ id, Component }) => /* @__PURE__ */ jsx(
              React.Suspense,
              {
                fallback: /* @__PURE__ */ jsx("div", { id, className: "scroll-mt-32 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-64 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 border-4 border-[#1e3a5f]/20 border-t-[#1e3a5f] rounded-full animate-spin" }) }),
                children: /* @__PURE__ */ jsx(
                  Component,
                  {
                    id,
                    data: id === "struktur" ? organizationMembers : id === "galeri" ? companyGallery : void 0
                  }
                )
              },
              id
            )) })
          ] }) }),
          /* @__PURE__ */ jsx("style", { children: `
                .scroll-mt-32 {
                    scroll-margin-top: 130px;
                }
                @media (max-width: 768px) {
                    .scroll-mt-32 {
                        scroll-margin-top: 100px;
                    }
                }
            ` })
        ]
      }
    )
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutInfo
}, Symbol.toStringTag, { value: "Module" }));
const CompanyGallerySection = ({ id, data: photos }) => {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  if (!photos || photos.length === 0) return null;
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };
  const goPrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };
  return /* @__PURE__ */ jsxs("section", { id, className: "scroll-mt-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f]", children: t("about.company_gallery.title") }),
        /* @__PURE__ */ jsx("div", { className: "w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "columns-1 sm:columns-2 gap-6 space-y-6", children: photos.map((photo, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "break-inside-avoid group cursor-pointer",
          onClick: () => openLightbox(index),
          children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${photo.image_path}`,
                alt: `Foto Dokumentasi Perusahaan PT Jaya Karya Kontruksi - Galeri ${index + 1}`,
                width: "800",
                height: "600",
                className: "w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105",
                loading: "lazy",
                decoding: "async"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/20 transition-all duration-500 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100", children: /* @__PURE__ */ jsx("div", { className: "bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-[#1e3a5f]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" }) }) }) }) })
          ] })
        },
        photo.id
      )) })
    ] }),
    lightboxIndex !== null && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center",
        onClick: closeLightbox,
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeLightbox,
              className: "absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white/80 text-sm font-bold", children: [
            lightboxIndex + 1,
            " / ",
            photos.length
          ] }),
          photos.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: goPrev,
              className: "absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${photos[lightboxIndex].image_path}`,
              alt: `Galeri Perusahaan JKK - Foto ${lightboxIndex + 1}`,
              className: "max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl",
              onClick: (e) => e.stopPropagation()
            }
          ),
          photos.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: goNext,
              className: "absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors z-10",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
            }
          )
        ]
      }
    )
  ] });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompanyGallerySection
}, Symbol.toStringTag, { value: "Module" }));
const HistorySection = ({ id }) => {
  const { t } = useLanguage();
  const historyItems = [
    { year: t("about.history.items.0.year"), event: t("about.history.items.0.event") },
    { year: t("about.history.items.1.year"), event: t("about.history.items.1.event") },
    { year: t("about.history.items.2.year"), event: t("about.history.items.2.event") },
    { year: t("about.history.items.3.year"), event: t("about.history.items.3.event") }
  ];
  return /* @__PURE__ */ jsx("section", { id, className: "scroll-mt-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4", children: t("about.history.title") }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-[#1e3a5f] mb-6 rounded-full" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed", children: t("about.history.desc") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:w-2/3 space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200", children: historyItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "relative pl-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-[0.2rem] top-1 w-6 h-6 bg-[#1e3a5f] border-4 border-white rounded-full shadow-sm" }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-600 mb-1", children: item.year }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg", children: item.event })
    ] }, idx)) })
  ] }) });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HistorySection
}, Symbol.toStringTag, { value: "Module" }));
const ManagementSection = ({ id }) => {
  const { t } = useLanguage();
  const managers = [
    { name: "Ir. H. Sudirman", role: t("about.management.roles.ceo"), img: "https://i.pravatar.cc/300?img=11" },
    { name: "Agung Wijaya, S.T.", role: t("about.management.roles.coo"), img: "https://i.pravatar.cc/300?img=12" },
    { name: "Sari Permata, M.M.", role: t("about.management.roles.cfo"), img: "https://i.pravatar.cc/300?img=5" }
  ];
  return /* @__PURE__ */ jsxs("section", { id, className: "scroll-mt-32", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f]", children: t("about.management.title") }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10", children: managers.map((person, idx) => /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
      /* @__PURE__ */ jsx("div", { className: "relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-xl", children: /* @__PURE__ */ jsx("img", { src: person.img, alt: person.name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#1e3a5f]", children: person.name }),
      /* @__PURE__ */ jsx("p", { className: "text-blue-600 font-medium uppercase tracking-wider text-sm mt-1", children: person.role })
    ] }, idx)) })
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ManagementSection
}, Symbol.toStringTag, { value: "Module" }));
const StructureSection = ({ id, data: rawData }) => {
  const { t } = useLanguage();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const chartData = (rawData || []).map((member) => ({
    id: member.id.toString(),
    parentId: member.parent_id ? member.parent_id.toString() : null,
    name: member.name,
    role: member.role.startsWith("about.structure.roles.") ? t(member.role) : member.role,
    image: member.photo_path ? `/storage/${member.photo_path}` : null
  }));
  const roots = chartData.filter((node) => !node.parentId);
  if (roots.length > 1) {
    const virtualRootId = "virtual-root";
    chartData.push({
      id: virtualRootId,
      parentId: null,
      name: "PT. JAYA KARYA KONTRUKSI",
      role: "Struktur Organisasi",
      image: null
    });
    roots.forEach((root) => {
      root.parentId = virtualRootId;
    });
  }
  useLayoutEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const isMobile = window.innerWidth < 768;
      chartRef.current = new OrgChart().container(chartContainerRef.current).data(chartData).nodeWidth((d) => 220).nodeHeight((d) => 90).childrenMargin((d) => 50).compactMarginBetween((d) => 35).compactMarginPair((d) => 30).compact(isMobile).nodeContent((d) => {
        return `
                        <div style="
                            background: white;
                            border: 2px solid #1e3a5f;
                            border-radius: 12px;
                            padding: 12px;
                            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            height: 100%;
                            width: 100%;
                            transition: all 0.3s;
                        ">
                            <div style="width: 100%; min-width: 0;">
                                <div style="
                                    color: #1e3a5f;
                                    font-weight: 800;
                                    font-size: 14px;
                                    margin-bottom: 4px;
                                    text-transform: uppercase;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                ">${d.data.name}</div>
                                <div style="
                                    color: #64748b;
                                    font-size: 11px;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                ">${d.data.role}</div>
                            </div>
                        </div>
                    `;
      }).render();
      setTimeout(() => {
        chartRef.current?.fit();
      }, 100);
      const handleResize = () => {
        const isNowMobile = window.innerWidth < 768;
        chartRef.current?.compact(isNowMobile)?.render()?.fit();
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return /* @__PURE__ */ jsx("section", { id, className: "scroll-mt-32", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#1e3a5f]", children: t("about.structure.title") }),
      /* @__PURE__ */ jsx("div", { className: "w-20 h-1 bg-[#1e3a5f] mx-auto mt-4 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { ref: chartContainerRef, className: "min-h-[600px] w-full cursor-grab active:cursor-grabbing" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 right-6 flex flex-col gap-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => chartRef.current?.fit(),
          className: "p-3 bg-white border border-gray-100 rounded-xl shadow-lg hover:bg-gray-50 transition-colors text-[#1e3a5f] font-bold text-xs",
          children: t("about.structure.fit")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center items-center gap-4 text-gray-400 text-xs font-medium", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
        t("about.structure.zoom")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
        t("about.structure.pan")
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
        t("about.structure.expand")
      ] })
    ] })
  ] }) });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StructureSection
}, Symbol.toStringTag, { value: "Module" }));
const Structure = ({ organizationMembers }) => {
  const { t, locale } = useLanguage();
  const breadcrumbs = [
    { label: t("nav.about"), href: `/${locale}/tentang-kami` },
    { label: t("nav.about_structure") }
  ];
  return /* @__PURE__ */ jsx(
    PublicLayout,
    {
      title: t("nav.about_structure"),
      headerTitle: t("nav.about_structure"),
      breadcrumbs,
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12 md:py-20", children: /* @__PURE__ */ jsx(StructureSection, { id: "struktur", data: organizationMembers }) })
    }
  );
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Structure
}, Symbol.toStringTag, { value: "Module" }));
function AdminLayout({ children }) {
  const user = usePage().props.auth.user;
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isExpanded = isHovered;
  const closeMobile = () => setIsMobileOpen(false);
  return /* @__PURE__ */ jsxs("div", { className: "h-screen bg-slate-50 flex overflow-hidden", children: [
    isMobileOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden",
        onClick: closeMobile
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        className: `fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none lg:relative ${isExpanded ? "w-64" : "w-20"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0 overflow-hidden", children: /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 flex-shrink-0", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: `font-bold text-slate-800 transition-all duration-300 whitespace-nowrap ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`, children: "JKK Admin" })
          ] }) }),
          /* @__PURE__ */ jsxs("nav", { className: "flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar", children: [
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.dashboard"),
                active: route().current("admin.dashboard"),
                icon: /* @__PURE__ */ jsx(DashboardIcon, {}),
                label: "Dashboard",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.projects.index"),
                active: route().current("admin.projects.*"),
                icon: /* @__PURE__ */ jsx(ProjectIcon, {}),
                label: "Proyek",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.articles.index"),
                active: route().current("admin.articles.*"),
                icon: /* @__PURE__ */ jsx(ArticleIcon, {}),
                label: "Artikel",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.categories.index"),
                active: route().current("admin.categories.*"),
                icon: /* @__PURE__ */ jsx(CategoryIcon, {}),
                label: "Kategori",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.organization.index"),
                active: route().current("admin.organization.*"),
                icon: /* @__PURE__ */ jsx(OrgIcon, {}),
                label: "Struktur Organisasi",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.concrete-prices.index"),
                active: route().current("admin.concrete-prices.*"),
                icon: /* @__PURE__ */ jsx(CalculatorIcon, {}),
                label: "Harga Beton",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.asphalt-prices.index"),
                active: route().current("admin.asphalt-prices.*"),
                icon: /* @__PURE__ */ jsx(TruckIcon, {}),
                label: "Harga Aspal",
                expanded: isExpanded
              }
            ),
            /* @__PURE__ */ jsx(
              SidebarLink,
              {
                href: route("admin.company-gallery.index"),
                active: route().current("admin.company-gallery.*"),
                icon: /* @__PURE__ */ jsx(GalleryIcon, {}),
                label: "Galeri Perusahaan",
                expanded: isExpanded
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-slate-100 space-y-1 flex-shrink-0", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("logout"),
              method: "post",
              as: "button",
              className: "w-full flex items-center px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all group",
              title: "Logout",
              children: [
                /* @__PURE__ */ jsx(LogoutIcon, { className: "w-5 h-5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: `ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`, children: "Keluar" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-6 justify-between z-40", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100",
              onClick: () => setIsMobileOpen(true),
              children: /* @__PURE__ */ jsx(MenuIcon, {})
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Admin" }),
            /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-900", children: route().current("admin.dashboard") ? "Dashboard" : route().current("admin.projects.*") ? "Proyek" : route().current("admin.articles.*") ? "Artikel" : route().current("admin.categories.*") ? "Kategori" : route().current("admin.organization.*") ? "Struktur Organisasi" : route().current("admin.concrete-prices.*") ? "Harga Beton" : route().current("admin.asphalt-prices.*") ? "Harga Aspal" : route().current("admin.company-gallery.*") ? "Galeri Perusahaan" : "" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-right hidden sm:block", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 leading-none", children: user.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold", children: "Super Admin" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 border-2 border-white", children: user.name.charAt(0).toUpperCase() })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto bg-slate-50/50 scroll-smooth", children: /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 max-w-7xl mx-auto", children: [
        usePage().props.flash?.success && /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-500 shadow-sm border-l-4 border-l-emerald-500", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-emerald-500 p-1 rounded-full text-white", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: usePage().props.flash.success })
        ] }),
        children
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .custom-scrollbar::-webkit-scrollbar { display: none; }
                .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ` } })
  ] });
}
function SidebarLink({ href, active, icon, label, expanded }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href,
      className: `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative ${active ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200" : "text-slate-600 hover:bg-slate-100/50 hover:text-blue-600"}`,
      children: [
        active && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full opacity-80" }),
        /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 transition-transform duration-300 ${!active && "group-hover:scale-110 group-hover:rotate-3"}`, children: icon }),
        /* @__PURE__ */ jsx("span", { className: `ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden font-semibold ${expanded ? "w-auto opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-4"}`, children: label }),
        !expanded && /* @__PURE__ */ jsxs("div", { className: "absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-[60] pointer-events-none shadow-2xl border border-slate-700 translate-x-2 group-hover:translate-x-0", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: label }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700" })
        ] })
      ]
    }
  );
}
const DashboardIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) });
const ProjectIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" }) });
const OrgIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) });
const ArticleIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) });
const CategoryIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" }) });
const CalculatorIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 7h6m0 4h-6m4 4h-4a2 2 0 01-2-2v-5m-2.4 8.7a8.5 8.5 0 1113.846-5.462" }) });
const TruckIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }) });
const GalleryIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) });
const LogoutIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) });
const MenuIcon = () => /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h7" }) });
const ChevronRightIcon = ({ className }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) });
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) });
const SplashScreen = ({ onComplete }) => {
  const { t } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3e3);
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `splash-screen ${fadeOut ? "fade-out" : ""}`,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #526086 0%, #667BA3 50%, #4A5678 100%)",
        transition: "opacity 0.5s ease-out",
        opacity: fadeOut ? 0 : 1
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "splash-bg-circle splash-bg-circle-1" }),
        /* @__PURE__ */ jsx("div", { className: "splash-bg-circle splash-bg-circle-2" }),
        /* @__PURE__ */ jsx("div", { className: "splash-bg-circle splash-bg-circle-3" }),
        /* @__PURE__ */ jsx("div", { className: "splash-logo-container", children: /* @__PURE__ */ jsx("div", { className: "splash-logo-circle", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo.webp",
            alt: "Logo",
            className: "splash-logo-img",
            style: { width: "80%", height: "auto" }
          }
        ) }) }),
        /* @__PURE__ */ jsx("h1", { className: "splash-company-name", children: t("footer.company") }),
        /* @__PURE__ */ jsx("p", { className: "splash-tagline", children: t("splash.tagline") }),
        /* @__PURE__ */ jsxs("div", { className: "splash-loading-dots", children: [
          /* @__PURE__ */ jsx("span", { className: "splash-dot" }),
          /* @__PURE__ */ jsx("span", { className: "splash-dot" }),
          /* @__PURE__ */ jsx("span", { className: "splash-dot" })
        ] })
      ]
    }
  );
};
function Checkbox({
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const DropDownContext = createContext({
  open: false,
  setOpen: () => {
  },
  toggleOpen: () => {
  }
});
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({
  className = "",
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function InputError({
  message,
  className = "",
  ...props
}) {
  return message ? /* @__PURE__ */ jsx(
    "p",
    {
      ...props,
      className: "text-sm text-red-600 " + className,
      children: message
    }
  ) : null;
}
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      className: `block text-sm font-medium text-gray-700 ` + className,
      children: value ? value : children
    }
  );
}
function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {
  }
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              DialogPanel,
              {
                className: `mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function SecondaryButton({
  type = "button",
  className = "",
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({
  type = "text",
  className = "",
  isFocused = false,
  ...props
}, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }));
  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " + className,
      ref: localRef
    }
  );
});
async function convertToWebP(file, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: "image/webp",
                lastModified: Date.now()
              });
              resolve(newFile);
            } else {
              reject(new Error("Canvas toBlob failed"));
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const ImageUpload = ({ label, onChange, error, initialPreview }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() => {
    if (!initialPreview) return null;
    if (initialPreview.startsWith("http") || initialPreview.startsWith("data:")) return initialPreview;
    return `/storage/${initialPreview}`;
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedSize, setProcessedSize] = useState(0);
  const [fileSize, setFileSize] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (initialPreview && !selectedFile) {
      const url = initialPreview.startsWith("http") || initialPreview.startsWith("data:") ? initialPreview : `/storage/${initialPreview}`;
      setPreviewUrl(url);
    }
  }, [initialPreview]);
  const handleFileChange = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setFileSize(formatBytes(file.size));
      setPreviewUrl(null);
      setProgress(0);
      setProcessedSize(0);
    }
  };
  const processImage = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setProgress(0);
    setProcessedSize(0);
    try {
      const totalSize = selectedFile.size;
      let currentProcessed = 0;
      const interval = setInterval(() => {
        currentProcessed += totalSize * 0.1;
        if (currentProcessed >= totalSize) {
          currentProcessed = totalSize;
          clearInterval(interval);
        }
        setProcessedSize(currentProcessed);
        setProgress(Math.round(currentProcessed / totalSize * 100));
      }, 100);
      const webpFile = await convertToWebP(selectedFile);
      clearInterval(interval);
      setProgress(100);
      setProcessedSize(totalSize);
      setTimeout(() => {
        setUploading(false);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
          onChange(webpFile);
        };
        reader.readAsDataURL(webpFile);
      }, 500);
    } catch (err) {
      console.error("Image processing failed:", err);
      setUploading(false);
      alert("Gagal memproses gambar. Pastikan file yang diunggah adalah gambar yang valid.");
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileSize(null);
    setProgress(0);
    setProcessedSize(0);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-slate-700", children: label }),
    /* @__PURE__ */ jsxs("div", { className: `relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${previewUrl ? "border-blue-100 bg-blue-50/30" : "border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300"}`, children: [
      !previewUrl && !uploading && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-4 py-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-2xl shadow-sm border border-slate-100", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 font-semibold uppercase tracking-wider", children: "Pilih Thumbnail" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: "PNG, JPG, WEBP • Max 10MB" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            className: "hidden",
            onChange: handleFileChange,
            accept: "image/*"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => fileInputRef.current?.click(),
            className: "text-sm bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5",
            children: "Cari File"
          }
        )
      ] }),
      selectedFile && !previewUrl && !uploading && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4 py-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-slate-50 p-3 rounded-xl", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-slate-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate", children: selectedFile.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-medium", children: fileSize })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: removeFile,
              className: "text-slate-400 hover:text-red-500 transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: processImage,
            className: "w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-100 hover:-translate-y-0.5",
            children: "Unggah & Konversi"
          }
        )
      ] }),
      uploading && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-6 py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24", children: [
          /* @__PURE__ */ jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "48",
                cy: "48",
                r: "40",
                stroke: "currentColor",
                strokeWidth: "8",
                fill: "transparent",
                className: "text-slate-100"
              }
            ),
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "48",
                cy: "48",
                r: "40",
                stroke: "currentColor",
                strokeWidth: "8",
                strokeDasharray: 2 * Math.PI * 40,
                strokeDashoffset: 2 * Math.PI * 40 * (1 - progress / 100),
                strokeLinecap: "round",
                fill: "transparent",
                className: "text-blue-600 transition-all duration-300"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-slate-800", children: [
            progress,
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800", children: "Sedang Mengoptimalkan..." }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 font-medium tracking-wide font-mono", children: [
            formatBytes(processedSize),
            " / ",
            fileSize
          ] })
        ] })
      ] }),
      previewUrl && !uploading && /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: previewUrl,
            alt: "Preview",
            className: "w-full h-64 object-cover rounded-2xl border border-slate-200"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-white", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold truncate max-w-[200px]", children: selectedFile?.name || "Gambar Terpilih" }),
            /* @__PURE__ */ jsxs("p", { className: "opacity-80", children: [
              "Converted to WebP • ",
              fileSize
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => fileInputRef.current?.click(),
                className: "bg-white/20 backdrop-blur-md p-2 rounded-xl hover:bg-white/30 transition-colors",
                title: "Ganti Gambar",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: removeFile,
                className: "bg-red-500/80 p-2 rounded-xl hover:bg-red-500 transition-colors shadow-lg",
                title: "Hapus Gambar",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
              }
            )
          ] })
        ] }) })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-red-500 text-xs mt-2 font-medium bg-red-50 p-2 rounded-lg border border-red-100", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ jsx("span", { children: error })
    ] })
  ] });
};
const MultiImageUpload = ({ label, onChange, error }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const lastSentFilesRef = useRef([]);
  useEffect(() => {
    const allProcessedFiles = files.filter((f) => f.status === "done" && f.processedFile).map((f) => f.processedFile);
    const isChanged = allProcessedFiles.length !== lastSentFilesRef.current.length || allProcessedFiles.some((f, i) => f !== lastSentFilesRef.current[i]);
    if (isChanged) {
      lastSentFilesRef.current = allProcessedFiles;
      onChange(allProcessedFiles);
    }
  }, [files, onChange]);
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length === 0) return;
    const newFileStates = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      processedFile: null,
      progress: 0,
      processedSize: 0,
      previewUrl: URL.createObjectURL(file),
      status: "pending"
    }));
    setFiles((prev) => [...prev, ...newFileStates]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const processFile = async (id) => {
    const fileState = files.find((f) => f.id === id);
    if (!fileState || fileState.status !== "pending") return;
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: "processing" } : f));
    try {
      const totalSize = fileState.originalFile.size;
      let currentProcessed = 0;
      const interval = setInterval(() => {
        currentProcessed += totalSize * 0.15;
        if (currentProcessed >= totalSize) {
          currentProcessed = totalSize;
          clearInterval(interval);
        }
        setFiles((prev) => prev.map((f) => f.id === id ? {
          ...f,
          processedSize: currentProcessed,
          progress: Math.round(currentProcessed / totalSize * 100)
        } : f));
      }, 100);
      const webpFile = await convertToWebP(fileState.originalFile);
      clearInterval(interval);
      const newPreviewUrl = URL.createObjectURL(webpFile);
      setFiles((prev) => prev.map((f) => f.id === id ? {
        ...f,
        status: "done",
        processedFile: webpFile,
        progress: 100,
        processedSize: totalSize,
        previewUrl: newPreviewUrl
      } : f));
    } catch (err) {
      console.error("Image processing failed:", err);
      setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: "error" } : f));
    }
  };
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };
  const startAll = () => {
    files.filter((f) => f.status === "pending").forEach((f) => processFile(f.id));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Unggah satu atau beberapa foto sekaligus" })
      ] }),
      files.some((f) => f.status === "pending") && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: startAll,
          className: "text-xs bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-600 shadow-sm transition-all",
          children: "Proses Semua"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-all cursor-pointer group",
        onClick: () => fileInputRef.current?.click(),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 font-bold", children: "Klik untuk menambah foto" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Gunakan format JPG, PNG, atau WebP" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              multiple: true,
              className: "hidden",
              onChange: handleFileChange,
              accept: "image/*"
            }
          )
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4", children: files.map((file) => /* @__PURE__ */ jsx("div", { className: "relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group", children: /* @__PURE__ */ jsxs("div", { className: "flex p-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100", children: file.previewUrl ? /* @__PURE__ */ jsx("img", { src: file.previewUrl, className: "w-full h-full object-cover", alt: "preview" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 truncate pr-6", children: file.originalFile.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-medium", children: formatBytes(file.originalFile.size) }),
        file.status === "processing" && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-100 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "bg-blue-600 h-1.5 rounded-full transition-all duration-300",
              style: { width: `${file.progress}%` }
            }
          ) }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-blue-600 font-mono mt-1", children: [
            formatBytes(file.processedSize),
            " / ",
            formatBytes(file.originalFile.size)
          ] })
        ] }),
        file.status === "done" && /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center text-emerald-600", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Teroptimasi" })
        ] }),
        file.status === "pending" && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              processFile(file.id);
            },
            className: "mt-2 text-[10px] text-blue-600 font-bold hover:underline uppercase tracking-wider",
            children: "Klik untuk optimasi"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            removeFile(file.id);
          },
          className: "absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
        }
      )
    ] }) }, file.id)) }),
    error && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-red-500 text-xs mt-2 font-medium bg-red-50 p-2 rounded-lg border border-red-100", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ jsx("span", { children: error })
    ] })
  ] });
};
function Create$1({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    category_id: "",
    status: "PUBLISHED",
    // Default to PUBLISHED
    content: "",
    excerpt: "",
    thumbnail: null,
    published_at: "",
    seo_title: "",
    seo_keywords: ""
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.articles.store"), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Buat Artikel" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Buat Artikel Baru" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.articles.index"),
            className: "text-gray-600 hover:text-gray-900",
            children: "Kembali ke Daftar"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Judul" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                required: true
              }
            ),
            errors.title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Kategori" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.category_id,
                onChange: (e) => setData("category_id", e.target.value),
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Kategori" }),
                  categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                ]
              }
            ),
            errors.category_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.category_id })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
            ImageUpload,
            {
              label: "Thumbnail",
              onChange: (file) => setData("thumbnail", file),
              error: errors.thumbnail
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Konten" }),
          /* @__PURE__ */ jsx("div", { className: "h-96 mb-12", children: /* @__PURE__ */ jsx(
            ReactQuill,
            {
              theme: "snow",
              value: data.content,
              onChange: (content) => setData("content", content),
              style: { height: "300px" }
            }
          ) }),
          errors.content && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.content })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowAdvanced(!showAdvanced),
            className: "flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-4 h-4 mr-2 transform transition-transform ${showAdvanced ? "rotate-90" : ""}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" })
                }
              ),
              showAdvanced ? "Sembunyikan Pengaturan Lanjutan" : "Tampilkan Pengaturan Lanjutan (SEO, Status, Tanggal)"
            ]
          }
        ) }),
        showAdvanced && /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6 space-y-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.status,
                  onChange: (e) => setData("status", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "DRAFT", children: "Draft" }),
                    /* @__PURE__ */ jsx("option", { value: "PUBLISHED", children: "Published" }),
                    /* @__PURE__ */ jsx("option", { value: "ARCHIVED", children: "Archived" })
                  ]
                }
              ),
              errors.status && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tanggal Terbit" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "datetime-local",
                  value: data.published_at,
                  onChange: (e) => setData("published_at", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                  placeholder: "Leave blank for 'Now'"
                }
              ),
              errors.published_at && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.published_at })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "SEO Settings" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "SEO Title" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.seo_title,
                    onChange: (e) => setData("seo_title", e.target.value),
                    className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                    placeholder: "Biarkan kosong untuk menggunakan judul artikel"
                  }
                ),
                errors.seo_title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.seo_title })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "SEO Keywords" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.seo_keywords,
                    onChange: (e) => setData("seo_keywords", e.target.value),
                    className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                    placeholder: "Kata kunci dipisahkan koma"
                  }
                ),
                errors.seo_keywords && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.seo_keywords })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all shadow-md ${processing ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg transform hover:-translate-y-0.5"}`,
            children: processing ? "Menyimpan..." : "Terbitkan Artikel"
          }
        ) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Edit$2({ article, categories }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    // Spoof PUT for Inertia/Laravel file upload limitations
    title: article.title,
    category_id: article.category_id,
    status: article.status,
    content: article.content,
    thumbnail: null,
    published_at: article.published_at ? article.published_at.substring(0, 16) : "",
    // Format for datetime-local
    seo_title: article.seo_title || "",
    seo_keywords: article.seo_keywords || ""
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.articles.update", article.id), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Artikel" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Edit Artikel" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.articles.index"),
            className: "text-gray-600 hover:text-gray-900",
            children: "Kembali ke Daftar"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Judul" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                required: true
              }
            ),
            errors.title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.category_id,
                onChange: (e) => setData("category_id", Number(e.target.value)),
                className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Category" }),
                  categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                ]
              }
            ),
            errors.category_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.category_id })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
            ImageUpload,
            {
              label: "Thumbnail",
              onChange: (file) => setData("thumbnail", file),
              error: errors.thumbnail,
              initialPreview: article.thumbnail
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Content" }),
          /* @__PURE__ */ jsx("div", { className: "h-96 mb-12", children: /* @__PURE__ */ jsx(
            ReactQuill,
            {
              theme: "snow",
              value: data.content,
              onChange: (content) => setData("content", content),
              style: { height: "300px" }
            }
          ) }),
          errors.content && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.content })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowAdvanced(!showAdvanced),
            className: "flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `w-4 h-4 mr-2 transform transition-transform ${showAdvanced ? "rotate-90" : ""}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" })
                }
              ),
              showAdvanced ? "Sembunyikan Pengaturan Lanjutan" : "Tampilkan Pengaturan Lanjutan (SEO, Status, Tanggal)"
            ]
          }
        ) }),
        showAdvanced && /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6 space-y-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.status,
                  onChange: (e) => setData("status", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "DRAFT", children: "Draft" }),
                    /* @__PURE__ */ jsx("option", { value: "PUBLISHED", children: "Published" }),
                    /* @__PURE__ */ jsx("option", { value: "ARCHIVED", children: "Archived" })
                  ]
                }
              ),
              errors.status && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Published At" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "datetime-local",
                  value: data.published_at,
                  onChange: (e) => setData("published_at", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                }
              ),
              errors.published_at && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.published_at })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "SEO Settings" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "SEO Title" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.seo_title,
                    onChange: (e) => setData("seo_title", e.target.value),
                    className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                    placeholder: "Leave blank to use article title"
                  }
                ),
                errors.seo_title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.seo_title })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "SEO Keywords" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.seo_keywords,
                    onChange: (e) => setData("seo_keywords", e.target.value),
                    className: "w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500",
                    placeholder: "Comma separated keywords"
                  }
                ),
                errors.seo_keywords && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.seo_keywords })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-all ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
            children: processing ? "Memperbarui..." : "Perbarui Artikel"
          }
        ) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$2
}, Symbol.toStringTag, { value: "Module" }));
function Index$6({ articles }) {
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      router.delete(route("admin.articles.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Artikel" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Manajemen Artikel" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.articles.create"),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors",
            children: "Artikel Baru"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Judul" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Dilihat" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tanggal" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: articles.data.length > 0 ? articles.data.map((article) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: article.title }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800", children: article.category.name }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${article.status === "PUBLISHED" ? "bg-green-100 text-green-800" : article.status === "DRAFT" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: article.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: article.views }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(article.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.articles.edit", article.id),
                className: "text-indigo-600 hover:text-indigo-900 mr-4",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(article.id),
                className: "text-red-600 hover:text-red-900",
                children: "Hapus"
              }
            )
          ] })
        ] }, article.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "px-6 py-4 text-center text-gray-500", children: "Tidak ada artikel ditemukan." }) }) })
      ] }) }),
      articles.links && articles.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center space-x-1", children: articles.links.map((link, i) => !link.url ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-3 py-1 border rounded bg-gray-100 text-gray-400",
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url,
          className: `px-3 py-1 border rounded ${link.active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] })
  ] });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$6
}, Symbol.toStringTag, { value: "Module" }));
function AsphaltPriceIndex({ prices }) {
  const [editingPrice, setEditingPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
    price_loco: 0,
    price_tergelar: 0,
    description: ""
  });
  const openEditModal = (price) => {
    setEditingPrice(price);
    setData({
      price_loco: price.price_loco,
      price_tergelar: price.price_tergelar,
      description: price.description || ""
    });
    clearErrors();
    setIsModalOpen(true);
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingPrice) {
      put(route("admin.asphalt-prices.update", editingPrice.id), {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingPrice(null);
          reset();
        }
      });
    }
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Harga Aspa" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 tracking-tight", children: "Harga Aspal (Hotmix)" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Kelola daftar harga aspal untuk kalkulator." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left bg-white", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Jenis Hotmix" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Harga Loco / Di AMP" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Harga Tergelar" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Satuan" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: prices.map((price) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500 transition-all", children: price.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-bold text-blue-600", children: formatCurrency(price.price_loco) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-bold text-green-600", children: formatCurrency(price.price_tergelar) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm text-gray-600", children: [
          "Per ",
          price.unit
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => openEditModal(price),
            className: "px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",
            children: "Edit Harga"
          }
        ) })
      ] }, price.id)) })
    ] }) }) }),
    isModalOpen && editingPrice && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold text-gray-800", children: [
          "Edit Harga: ",
          editingPrice.name
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Harga Loco (Rp)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: data.price_loco,
              onChange: (e) => setData("price_loco", Number(e.target.value)),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-medium",
              placeholder: "Harga Loco...",
              required: true,
              min: "0"
            }
          ),
          errors.price_loco && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.price_loco })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Harga Tergelar (Rp)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: data.price_tergelar,
              onChange: (e) => setData("price_tergelar", Number(e.target.value)),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-medium",
              placeholder: "Harga Tergelar...",
              required: true,
              min: "0"
            }
          ),
          errors.price_tergelar && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.price_tergelar })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Keterangan (Opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
              placeholder: "Contoh: Promo..."
            }
          ),
          errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsModalOpen(false),
              className: "flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm",
              children: "Batal"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm disabled:opacity-50 shadow-lg shadow-blue-200",
              children: processing ? "Menyimpan..." : "Simpan"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AsphaltPriceIndex
}, Symbol.toStringTag, { value: "Module" }));
function Index$5({ categories }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: "",
    description: ""
  });
  const openCreateModal = () => {
    setEditingCategory(null);
    setData({ name: "", description: "" });
    clearErrors();
    setIsCreateModalOpen(true);
  };
  const openEditModal = (category) => {
    setEditingCategory(category);
    setData({ name: category.name, description: category.description || "" });
    clearErrors();
    setIsCreateModalOpen(true);
  };
  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingCategory(null);
    reset();
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      put(route("admin.categories.update", editingCategory.id), {
        onSuccess: () => closeModal()
      });
    } else {
      post(route("admin.categories.store"), {
        onSuccess: () => closeModal()
      });
    }
  };
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      router.delete(route("admin.categories.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Categories" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Categories" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: openCreateModal,
          className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "Add Category"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Articles" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: categories.data.length > 0 ? categories.data.map((category) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: category.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-500 text-sm", children: category.slug }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full", children: category.articles_count }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-right space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openEditModal(category),
              className: "text-gray-400 hover:text-blue-600 transition-colors",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(category.id),
              className: "text-gray-400 hover:text-red-600 transition-colors",
              children: "Delete"
            }
          )
        ] })
      ] }, category.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-gray-400", children: "No categories found." }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Modal, { show: isCreateModalOpen, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-4", children: editingCategory ? "Edit Category" : "Create New Category" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
              placeholder: "e.g. Tips Konstruksi",
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description (Optional)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
              rows: 3,
              placeholder: "Short description..."
            }
          ),
          errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeModal,
              className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50",
              children: processing ? "Saving..." : "Save Category"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
function Index$4({ photos }) {
  const [showUpload, setShowUpload] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const { data, setData, post, processing, errors, reset } = useForm({
    images: []
  });
  const handleImagesChange = React.useCallback((files) => {
    setData("images", files);
  }, [setData]);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.company-gallery.store"), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setShowUpload(false);
      }
    });
  };
  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus foto ini?")) {
      setDeletingId(id);
      router.delete(route("admin.company-gallery.destroy", id), {
        onFinish: () => setDeletingId(null)
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Galeri Perusahaan" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Galeri Perusahaan" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm mt-1", children: "Kelola foto-foto galeri perusahaan yang ditampilkan di halaman Tentang Kami" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowUpload(!showUpload),
            className: `flex items-center font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 ${showUpload ? "bg-slate-200 text-slate-600 shadow-slate-100 hover:bg-slate-300" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100"}`,
            children: showUpload ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }),
              "Batal"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
              "Tambah Foto"
            ] })
          }
        )
      ] }) }),
      showUpload && /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 animate-in slide-in-from-top duration-300", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-6", children: [
        /* @__PURE__ */ jsx(
          MultiImageUpload,
          {
            label: "Upload Foto Galeri",
            onChange: handleImagesChange,
            error: errors.images
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4 border-t border-slate-100", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing || data.images.length === 0,
            className: `flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5 ${processing || data.images.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`,
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Mengupload..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
              "Simpan Foto"
            ] })
          }
        ) })
      ] }) }),
      photos.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-16 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-800", children: "Belum ada foto" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: 'Klik tombol "Tambah Foto" untuk menambahkan foto ke galeri.' })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500 font-medium", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-800 font-bold", children: photos.length }),
          " foto dalam galeri"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: photos.map((photo) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `/storage/${photo.image_path}`,
                  alt: "Gallery",
                  className: "w-full h-full object-cover cursor-pointer",
                  onClick: () => setLightboxPhoto(`/storage/${photo.image_path}`)
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 right-3 flex justify-between items-end", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setLightboxPhoto(`/storage/${photo.image_path}`),
                    className: "p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors shadow-lg",
                    title: "Lihat foto",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-slate-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" }) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(photo.id),
                    disabled: deletingId === photo.id,
                    className: "p-2 bg-red-500/90 backdrop-blur-sm rounded-xl hover:bg-red-600 transition-colors shadow-lg",
                    title: "Hapus foto",
                    children: deletingId === photo.id ? /* @__PURE__ */ jsxs("svg", { className: "animate-spin w-4 h-4 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                      /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                    ] }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                  }
                )
              ] }) })
            ]
          },
          photo.id
        )) })
      ] })
    ] }),
    lightboxPhoto && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4",
        onClick: () => setLightboxPhoto(null),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLightboxPhoto(null),
              className: "absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: lightboxPhoto,
              alt: "Preview",
              className: "max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl",
              onClick: (e) => e.stopPropagation()
            }
          )
        ]
      }
    )
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
function ConcretePriceIndex({ prices }) {
  const [editingPrice, setEditingPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
    price: 0,
    description: ""
  });
  const openEditModal = (price) => {
    setEditingPrice(price);
    setData({
      price: price.price,
      description: price.description || ""
    });
    clearErrors();
    setIsModalOpen(true);
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingPrice) {
      put(route("admin.concrete-prices.update", editingPrice.id), {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingPrice(null);
          reset();
        }
      });
    }
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Harga Beton" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 tracking-tight", children: "Harga Beton" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Kelola daftar harga beton untuk kalkulator." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left bg-white", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Kode" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Mutu Beton" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Harga" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Keterangan" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: prices.map((price) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500 transition-all", children: price.code }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-600 font-medium", children: price.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-bold text-blue-600", children: formatCurrency(price.price) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-400", children: price.description || "-" }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => openEditModal(price),
            className: "px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors",
            children: "Edit Harga"
          }
        ) })
      ] }, price.id)) })
    ] }) }) }),
    isModalOpen && editingPrice && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold text-gray-800", children: [
          "Edit Harga: ",
          editingPrice.name
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Harga (Rp)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: data.price,
              onChange: (e) => setData("price", Number(e.target.value)),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono font-medium",
              placeholder: "Masukkan harga...",
              required: true,
              min: "0"
            }
          ),
          errors.price && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.price })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Keterangan (Opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
              placeholder: "Contoh: Promo..."
            }
          ),
          errors.description && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsModalOpen(false),
              className: "flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm",
              children: "Batal"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm disabled:opacity-50 shadow-lg shadow-blue-200",
              children: processing ? "Menyimpan..." : "Simpan"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConcretePriceIndex
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard$1() {
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard Admin" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Dashboard" }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Welcome to the admin panel." })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard$1
}, Symbol.toStringTag, { value: "Module" }));
const COMMON_ROLES = [
  { key: "about.structure.roles.director", label: "Direktur" },
  { key: "about.structure.roles.mgr_batching", label: "Manager Batching Plant" },
  { key: "about.structure.roles.pm", label: "Project Manager" },
  { key: "about.structure.roles.admin", label: "Administrasi" },
  { key: "about.structure.roles.mgr_equipment", label: "Equipment Manager" },
  { key: "about.structure.roles.mgr_finance", label: "Finance Manager" },
  { key: "about.structure.roles.finance", label: "Keuangan" },
  { key: "about.structure.roles.executor", label: "Pelaksana" }
];
const buildTree = (members) => {
  const map = /* @__PURE__ */ new Map();
  const roots = [];
  members.forEach((member) => {
    map.set(member.id, { ...member, children: [] });
  });
  members.forEach((member) => {
    const node = map.get(member.id);
    if (node) {
      if (member.parent_id && map.has(member.parent_id)) {
        map.get(member.parent_id).children.push(node);
      } else {
        roots.push(node);
      }
    }
  });
  const sortNodes = (nodes) => {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach((node) => sortNodes(node.children));
  };
  sortNodes(roots);
  return roots;
};
const OrgMemberNode = ({
  node,
  level = 0,
  onAddSubordinate,
  onEdit,
  onDelete,
  t
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: `relative flex items-center group transition-all duration-300 ${level > 0 ? "ml-8 mt-4" : "mb-4"}`, children: [
      level > 0 && /* @__PURE__ */ jsx("div", { className: "absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gray-200" }),
      /* @__PURE__ */ jsxs("div", { className: `
                    relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[320px]
                    flex items-center gap-4 z-10
                    ${level === 0 ? "border-l-4 border-l-blue-600" : ""}
                `, children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 overflow-hidden shrink-0", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", children: node.name.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 truncate", children: node.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 truncate", children: node.role.startsWith("about.structure.roles.") ? t(node.role) : node.role }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: [
            "Urutan: ",
            node.order
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onAddSubordinate(node.id),
              className: "p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors",
              title: "Tambah Bawahan",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onEdit(node),
              className: "p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              title: "Edit",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onDelete(node.id),
              className: "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
              title: "Hapus",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
            }
          )
        ] }),
        hasChildren && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsExpanded(!isExpanded),
            className: `
                                absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 shadow-sm z-20 transition-transform duration-200
                                ${isExpanded ? "rotate-180" : "rotate-0"}
                            `,
            children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          }
        )
      ] })
    ] }),
    hasChildren && isExpanded && /* @__PURE__ */ jsx("div", { className: "relative border-l-2 border-gray-100 ml-[2.25rem] pl-4 pb-2", children: node.children.map((child) => /* @__PURE__ */ jsx(
      OrgMemberNode,
      {
        node: child,
        level: level + 1,
        onAddSubordinate,
        onEdit,
        onDelete,
        t
      },
      child.id
    )) })
  ] });
};
function OrganizationIndex({ members }) {
  const { t } = useLanguage();
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const treeData = useMemo(() => buildTree(members), [members]);
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    name: "",
    role: "",
    parent_id: "",
    order: 0
  });
  const openCreateModal = (parentId) => {
    setEditingMember(null);
    reset();
    clearErrors();
    if (parentId) {
      setData("parent_id", parentId);
    }
    setIsModalOpen(true);
  };
  const openEditModal = (member) => {
    setEditingMember(member);
    setData({
      name: member.name,
      role: member.role,
      parent_id: member.parent_id || "",
      order: member.order
    });
    clearErrors();
    setIsModalOpen(true);
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingMember) {
      post(route("admin.organization.update", editingMember.id), {
        onSuccess: () => {
          setIsModalOpen(false);
          reset();
        }
      });
    } else {
      post(route("admin.organization.store"), {
        onSuccess: () => {
          setIsModalOpen(false);
          reset();
        }
      });
    }
  };
  const deleteMember = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini? Anggota di bawahnya akan dialihkan ke atasan anggota ini.")) {
      router.delete(route("admin.organization.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Struktur Organisasi" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 tracking-tight", children: "Struktur Organisasi" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Kelola hierarki dan bagan organisasi secara interaktif." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => openCreateModal(),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "Tambah Root Baru"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white/50 rounded-3xl p-6 md:p-8 min-h-[500px] overflow-x-auto", children: /* @__PURE__ */ jsx("div", { className: "min-w-[600px]", children: treeData.length > 0 ? treeData.map((node) => /* @__PURE__ */ jsx(
      OrgMemberNode,
      {
        node,
        onAddSubordinate: openCreateModal,
        onEdit: openEditModal,
        onDelete: deleteMember,
        t
      },
      node.id
    )) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-gray-400", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }),
      /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Belum ada struktur organisasi." }),
      /* @__PURE__ */ jsx("button", { onClick: () => openCreateModal(), className: "text-blue-600 hover:underline mt-2 text-sm", children: "Buat anggota pertama" })
    ] }) }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-800", children: editingMember ? "Edit Anggota" : "Tambah Anggota Baru" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setIsModalOpen(false), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Nama Lengkap" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
              placeholder: "Masukkan nama...",
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Jabatan" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: data.role,
              onChange: (e) => setData("role", e.target.value),
              className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Jabatan --" }),
                COMMON_ROLES.map((role) => /* @__PURE__ */ jsx("option", { value: role.key, children: role.label }, role.key)),
                !COMMON_ROLES.find((r) => r.key === data.role) && data.role && /* @__PURE__ */ jsx("option", { value: data.role, children: data.role }),
                /* @__PURE__ */ jsx("option", { value: "custom", children: "-- Lainnya (Ketik Manual) --" })
              ]
            }
          ),
          data.role === "custom" && /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "w-full mt-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
              placeholder: "Ketik jabatan manual...",
              onBlur: (e) => setData("role", e.target.value),
              autoFocus: true
            }
          ),
          errors.role && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.role })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Atasan" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.parent_id,
                onChange: (e) => setData("parent_id", e.target.value),
                className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Root (Paling Atas) --" }),
                  members.filter((m) => !editingMember || m.id !== editingMember.id).map((m) => /* @__PURE__ */ jsxs("option", { value: m.id, children: [
                    m.name,
                    " (",
                    m.role.startsWith("about.structure.roles.") ? t(m.role) : m.role,
                    ")"
                  ] }, m.id))
                ]
              }
            ),
            errors.parent_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.parent_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Urutan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.order,
                onChange: (e) => setData("order", parseInt(e.target.value)),
                className: "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              }
            ),
            errors.order && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.order })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsModalOpen(false),
              className: "flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm",
              children: "Batal"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm disabled:opacity-50 shadow-lg shadow-blue-200",
              children: processing ? "Menyimpan..." : "Simpan"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OrganizationIndex
}, Symbol.toStringTag, { value: "Module" }));
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    location: "",
    date: "",
    category: "construction",
    subcategory: "",
    description: "",
    images: []
  });
  const handleImagesChange = React.useCallback((files) => {
    setData("images", files);
  }, [setData]);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.projects.store"), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Proyek" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Tambah Proyek Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm mt-1", children: "Lengkapi informasi proyek di bawah ini" })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.projects.index"),
            className: "flex items-center text-slate-500 hover:text-slate-800 font-semibold transition-colors",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              "Kembali"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Nama Proyek" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                placeholder: "Masukkan nama atau judul proyek",
                required: true
              }
            ),
            errors.title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Lokasi" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.location,
                onChange: (e) => setData("location", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                placeholder: "e.g. Jakarta Selatan, Bali",
                required: true
              }
            ),
            errors.location && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.location })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Tanggal Proyek" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.date,
                onChange: (e) => setData("date", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                required: true
              }
            ),
            errors.date && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Kategori Utama" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.category,
                onChange: (e) => setData("category", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "construction", children: "Construction" }),
                  /* @__PURE__ */ jsx("option", { value: "batching_plant", children: "Batching Plant" }),
                  /* @__PURE__ */ jsx("option", { value: "asphalt_mixing_plant", children: "Asphalt Mixing Plant" })
                ]
              }
            ),
            errors.category && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Sub-Layanan (Opsional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.subcategory,
                onChange: (e) => setData("subcategory", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                placeholder: "e.g. Jembatan, Pengaspalan, dsb"
              }
            ),
            errors.subcategory && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.subcategory })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Deskripsi Proyek" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                rows: 4,
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4",
                placeholder: "Jelaskan detail proyek di sini..."
              }
            ),
            errors.description && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
            MultiImageUpload,
            {
              label: "Foto Proyek",
              onChange: handleImagesChange,
              error: errors.images
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5 ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Menyimpan..."
            ] }) : "Simpan Proyek"
          }
        ) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Edit$1({ project }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    // Laravel spoofing for PUT with files
    title: project.title,
    location: project.location,
    date: project.date.split("T")[0],
    category: project.category,
    subcategory: project.subcategory || "",
    description: project.description || "",
    images: []
  });
  const handleImagesChange = React.useCallback((files) => {
    setData("images", files);
  }, [setData]);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.projects.update", project.id), {
      forceFormData: true
    });
  };
  const handleDeleteImage = (imageId) => {
    if (confirm("Apakah Anda yakin ingin menghapus gambar ini?")) {
      router.delete(route("admin.project-images.destroy", imageId), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Proyek" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800", children: "Edit Proyek" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm mt-1", children: project.title })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.projects.index"),
            className: "flex items-center text-slate-500 hover:text-slate-800 font-semibold transition-colors",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              "Kembali"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Nama Proyek" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                required: true
              }
            ),
            errors.title && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Lokasi" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.location,
                onChange: (e) => setData("location", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                required: true
              }
            ),
            errors.location && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.location })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Tanggal Proyek" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.date,
                onChange: (e) => setData("date", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3",
                required: true
              }
            ),
            errors.date && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Kategori Utama" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.category,
                onChange: (e) => setData("category", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "construction", children: "Construction" }),
                  /* @__PURE__ */ jsx("option", { value: "batching_plant", children: "Batching Plant" }),
                  /* @__PURE__ */ jsx("option", { value: "asphalt_mixing_plant", children: "Asphalt Mixing Plant" })
                ]
              }
            ),
            errors.category && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Sub-Layanan (Opsional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.subcategory,
                onChange: (e) => setData("subcategory", e.target.value),
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              }
            ),
            errors.subcategory && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.subcategory })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: "Deskripsi" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                rows: 4,
                className: "w-full border-slate-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4"
              }
            ),
            errors.description && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.description })
          ] }),
          project.images && project.images.length > 0 && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 mb-4", children: "Galeri Foto Saat Ini" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: project.images.map((img) => /* @__PURE__ */ jsxs("div", { className: "relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `/storage/${img.image_path}`,
                  alt: "Project",
                  className: "w-full h-32 object-cover transition-transform group-hover:scale-110"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDeleteImage(img.id),
                  className: "absolute top-2 right-2 bg-red-500 text-white rounded-xl p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg",
                  title: "Hapus Gambar",
                  children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }, img.id)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
            MultiImageUpload,
            {
              label: "Tambah Foto Baru",
              onChange: handleImagesChange,
              error: errors.images
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: `flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5 ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Menyimpan..."
            ] }) : "Perbarui Proyek"
          }
        ) })
      ] })
    ] })
  ] });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function Index$3({ projects }) {
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      router.delete(route("admin.projects.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Proyek" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Daftar Proyek" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.projects.create"),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors",
            children: "Tambah Proyek Baru"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Judul" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Lokasi" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tanggal" }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: projects.data.length > 0 ? projects.data.map((project) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: project.title }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize", children: project.category.replace(/_/g, " ") }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: project.location }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(project.date).toLocaleDateString() }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.projects.edit", project.id),
                className: "text-indigo-600 hover:text-indigo-900 mr-4",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(project.id),
                className: "text-red-600 hover:text-red-900",
                children: "Hapus"
              }
            )
          ] })
        ] }, project.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-4 text-center text-gray-500", children: "Tidak ada proyek ditemukan." }) }) })
      ] }) }),
      projects.links && projects.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center space-x-1", children: projects.links.map((link, i) => link.url ? /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url,
          className: `px-3 py-1 border rounded ${link.active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"}`,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      ) : /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-3 py-1 border rounded bg-gray-100 text-gray-400",
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function Index$2({ articles, categories, filters }) {
  const { t, locale } = useLanguage();
  const { app_url, current_url } = usePage().props;
  const [search, setSearch] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "all");
  const hasActiveFilters = Boolean((filters.search || "").trim() || filters.category && filters.category !== "all");
  const robotsContent = hasActiveFilters ? "noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const articlesIndexUrl = new URL(route("articles.index", { locale }), `${app_url}/`).toString();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (filters.search || "")) {
        router.get(route("articles.index", { locale }), {
          search,
          category: selectedCategory !== "all" ? selectedCategory : void 0
        }, {
          preserveState: true,
          replace: true
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    router.get(route("articles.index", { locale }), {
      search: search || void 0,
      category: category !== "all" ? category : void 0
    }, {
      preserveState: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs(
    PublicLayout,
    {
      title: t("nav.articles"),
      headerTitle: t("nav.articles"),
      headerImage: "/images/header-bg.webp",
      breadcrumbs: [
        { label: t("nav.home"), href: route("home", { locale }) },
        { label: t("nav.articles") }
      ],
      children: [
        /* @__PURE__ */ jsxs(Head, { children: [
          /* @__PURE__ */ jsx(
            "meta",
            {
              name: "description",
              content: "Kumpulan artikel PT. Jaya Karya Kontruksi seputar jasa konstruksi, batching plant, AMP, dan proyek infrastruktur."
            }
          ),
          /* @__PURE__ */ jsx(
            "meta",
            {
              name: "keywords",
              content: "artikel konstruksi, blog konstruksi, batching plant, asphalt mixing plant, ready mix, proyek infrastruktur"
            }
          ),
          /* @__PURE__ */ jsx("meta", { name: "robots", content: robotsContent }),
          /* @__PURE__ */ jsx("link", { rel: "canonical", href: hasActiveFilters ? articlesIndexUrl : current_url }),
          /* @__PURE__ */ jsx(
            "script",
            {
              type: "application/ld+json",
              dangerouslySetInnerHTML: {
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "CollectionPage",
                  "name": t("nav.articles"),
                  "url": hasActiveFilters ? articlesIndexUrl : current_url,
                  "description": "Kumpulan artikel PT. Jaya Karya Kontruksi.",
                  "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": articles.data.map((article, index) => ({
                      "@type": "ListItem",
                      "position": index + 1,
                      "url": new URL(route("articles.show", { locale, slug: article.slug }), `${app_url}/`).toString(),
                      "name": article.title
                    }))
                  }
                })
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-10 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/3", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: t("topbar.search"),
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                }
              ),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/4", children: /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedCategory,
                onChange: handleCategoryChange,
                className: "w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "all", children: t("common.allCategories") }),
                  categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.slug, children: cat.name }, cat.id))
                ]
              }
            ) })
          ] }),
          articles.data.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: articles.data.map((article) => /* @__PURE__ */ jsxs(
            "article",
            {
              className: "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full group relative",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: article.thumbnail,
                      alt: article.title,
                      className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-20", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm", children: article.category.name }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center text-xs text-gray-500 mb-3 space-x-2", children: /* @__PURE__ */ jsx("span", { children: new Date(article.published_at).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }) }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("articles.show", { locale, slug: article.slug }),
                      className: "focus:outline-none after:absolute after:inset-0 after:z-10",
                      children: article.title
                    }
                  ) }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-3 flex-1", children: article.excerpt }),
                  /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-gray-100 mt-auto relative z-20", children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("articles.show", { locale, slug: article.slug }),
                      className: "inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors",
                      children: [
                        t("common.readMore"),
                        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                      ]
                    }
                  ) })
                ] })
              ]
            },
            article.id
          )) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
            /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: t("common.noArticles") }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: t("common.checkSearch") })
          ] }),
          articles.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-1", children: articles.links.map((link, i) => link.url ? /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `px-4 py-2 text-sm rounded-md transition-colors ${link.active ? "bg-blue-600 text-white font-medium shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 hover:text-blue-600 border border-gray-200"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            },
            i
          ) : /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-4 py-2 text-sm rounded-md bg-gray-50 text-gray-400 border border-transparent cursor-not-allowed",
              dangerouslySetInnerHTML: { __html: link.label }
            },
            i
          )) }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
const ServiceIcon = ({ type }) => {
  if (type === "batching") return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) });
  if (type === "construction") return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
  return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" }) });
};
function Show$1({ article, relatedArticles }) {
  const { locale, t } = useLanguage();
  const { app_url, current_url, localized_urls } = usePage().props;
  const siteName = "PT. Jaya Karya Kontruksi";
  const siteUrl = app_url.replace(/\/$/, "");
  const canonicalUrl = current_url;
  const articleTitle = article.seo_title || article.title;
  const articleDescription = (article.excerpt || article.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).slice(0, 160);
  const articleKeywords = article.seo_keywords || `artikel konstruksi, ${article.title}, JKK blog, berita konstruksi, info batching plant, info AMP`;
  const articleImage = article.thumbnail ? new URL(article.thumbnail, `${siteUrl}/`).toString() : `${siteUrl}/images/hero-kontruksi.jpeg`;
  const shareText = encodeURIComponent(`${article.title} ${canonicalUrl}`);
  const shareUrl = encodeURIComponent(canonicalUrl);
  const services = [
    {
      id: 1,
      title: t("services.batching.title"),
      description: t("services.batching.desc"),
      type: "batching",
      route: "services.batching"
    },
    {
      id: 2,
      title: t("services.contractor.title"),
      description: t("services.contractor.desc"),
      type: "construction",
      route: "services.construction"
    },
    {
      id: 3,
      title: t("services.asphalt.title"),
      description: t("services.asphalt.desc"),
      type: "asphalt",
      route: "services.asphalt"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${articleTitle} | ${siteName}` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: articleDescription }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: articleKeywords }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
      Object.entries(localized_urls || {}).map(([hrefLang, url]) => /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang, href: url }, hrefLang)),
      Object.keys(localized_urls || {}).length > 0 && /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: localized_urls.id || canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: articleTitle }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: articleDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: articleImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: article.published_at }),
      /* @__PURE__ */ jsx("meta", { property: "article:modified_time", content: article.updated_at || article.published_at }),
      /* @__PURE__ */ jsx("meta", { property: "article:section", content: article.category.name }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: articleTitle }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: articleDescription }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: articleImage }),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${canonicalUrl}#article`,
              "mainEntityOfPage": canonicalUrl,
              "headline": articleTitle,
              "description": articleDescription,
              "image": [articleImage],
              "url": canonicalUrl,
              "inLanguage": locale === "id" ? "id-ID" : "en-US",
              "datePublished": article.published_at,
              "dateModified": article.updated_at || article.published_at,
              "articleSection": article.category.name,
              "keywords": articleKeywords,
              "author": {
                "@type": "Person",
                "name": article.user?.name || t("footer.company")
              },
              "publisher": {
                "@type": "Organization",
                "name": siteName,
                "url": siteUrl,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/images/logo.webp`
                }
              }
            })
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": t("nav.home"),
                  "item": `${siteUrl}/${locale}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t("nav.articles"),
                  "item": `${siteUrl}/${locale}/artikel`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": article.title,
                  "item": canonicalUrl
                }
              ]
            })
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col", children: [
      /* @__PURE__ */ jsx(
        Navbar,
        {
          forceTransparent: true,
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 50
          }
        }
      ),
      /* @__PURE__ */ jsxs("header", { className: "relative w-full min-h-[450px] md:min-h-[500px] flex items-end overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: {
              backgroundImage: `url(${article.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-10",
            style: {
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 40%, rgba(15, 23, 42, 0.3) 70%, rgba(15, 23, 42, 0.1) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-10 md:pb-14", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm text-gray-300 mb-6", children: [
            /* @__PURE__ */ jsx(Link, { href: `/${locale}`, className: "hover:text-white transition-colors", children: /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "w-4 h-4",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" }),
                  /* @__PURE__ */ jsx("path", { d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "/" }),
            /* @__PURE__ */ jsx(Link, { href: route("articles.index", { locale }), className: "hover:text-white transition-colors", children: t("nav.articles") }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "/" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("articles.index", { locale, category: article.category.slug }),
                className: "hover:text-white transition-colors",
                children: article.category.name
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("articles.index", { locale, category: article.category.slug }),
              className: "inline-block bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5 hover:bg-blue-500 transition-colors",
              children: article.category.name
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl", children: article.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm", children: (article.user.name || "J")[0].toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: article.user.name || t("footer.company") })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
              new Date(article.published_at).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-blue-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
              ] }),
              article.views,
              " ",
              t("articles.read")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
        /* @__PURE__ */ jsxs("article", { className: "lg:col-span-8", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "prose prose-blue prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 font-sans bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10",
              dangerouslySetInnerHTML: { __html: article.content }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-1", children: t("articles.share") }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: t("articles.share_desc") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://wa.me/?text=${shareText}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(article.title)}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1 h-6 bg-blue-600 mr-3 rounded-full" }),
              t("services.title")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: services.map((service) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: route(service.route, { locale }),
                className: "group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(ServiceIcon, { type: service.type }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors", children: service.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-1", children: service.description })
                  ] }),
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
                ]
              },
              service.id
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 opacity-10", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", children: [
              /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "40" }),
              /* @__PURE__ */ jsx("circle", { cx: "80", cy: "20", r: "20" })
            ] }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3 text-white relative z-10", children: t("articles.cta_title") }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-100 mb-5 text-sm leading-relaxed relative z-10", children: t("articles.cta_desc") }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("contact", { locale }),
                className: "relative z-10 block w-full text-center bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl",
                children: t("topbar.contact")
              }
            )
          ] }),
          relatedArticles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1 h-6 bg-blue-600 mr-3 rounded-full" }),
              t("articles.related_popular")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: relatedArticles.map((item, index) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("articles.show", { locale, slug: item.slug }),
                className: "group flex gap-3 items-start",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors", children: index + 1 }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1", children: item.title }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                      ] }),
                      item.views,
                      " ",
                      t("articles.read")
                    ] })
                  ] })
                ]
              },
              item.id
            )) })
          ] })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show$1
}, Symbol.toStringTag, { value: "Module" }));
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-20 w-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg", children })
  ] });
}
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Login({
  status,
  canResetPassword
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 block", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData(
              "remember",
              e.target.checked || false
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Log in" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            children: "Already registered?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({
  token,
  email
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
const Contact = () => {
  const { t, locale } = useLanguage();
  const { company } = usePage().props;
  const breadcrumbs = [{ label: t("nav.home"), href: route("home", { locale }) }, { label: t("nav.contact") }];
  const kantorUtamaMapSrc = `https://www.google.com/maps?q=-6.877444,109.072917&z=16&output=embed`;
  const basecampMapSrc = `https://www.google.com/maps?q=-6.942694,108.918111&z=16&output=embed`;
  return /* @__PURE__ */ jsx(
    PublicLayout,
    {
      title: t("contact.title"),
      headerTitle: t("contact.title"),
      breadcrumbs,
      children: /* @__PURE__ */ jsx("div", { className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-end justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: t("contact.location.title") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: t("contact.location.subtitle") })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 border-b border-gray-200 bg-gray-50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800", children: t("contact.location.office_label") }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1", children: `6°52'38.8"S 109°04'22.5"E` })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full h-[260px] bg-gray-100 relative z-0", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: kantorUtamaMapSrc,
                  width: "100%",
                  height: "100%",
                  style: { border: 0 },
                  allowFullScreen: true,
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                  title: t("contact.location.office_map_title")
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 border-b border-gray-200 bg-gray-50", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800", children: t("contact.location.basecamp_label") }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1", children: `6°56'33.7"S 108°55'05.2"E` })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full h-[260px] bg-gray-100 relative z-0", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: basecampMapSrc,
                  width: "100%",
                  height: "100%",
                  style: { border: 0 },
                  allowFullScreen: true,
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                  title: t("contact.location.basecamp_map_title")
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/50 p-8 md:p-10 rounded-2xl border border-blue-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#1e3a8a]", children: t("contact.other.title") }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://jayakaryakontruksi.com",
                target: "_blank",
                rel: "noreferrer",
                className: "text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors",
                children: "jayakaryakontruksi.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 h-px bg-blue-100" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
              ] }) }),
              /* @__PURE__ */ jsxs("address", { className: "not-italic", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 mb-1", children: t("contact.office") }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed text-sm", children: company?.address || t("contact.address_not_set") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }) }),
              /* @__PURE__ */ jsxs("address", { className: "not-italic", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 mb-1", children: t("contact.phone") }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: company?.phone || "(021) 1234-5678" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsxs("address", { className: "not-italic", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 mb-1", children: t("contact.email") }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `mailto:${company?.email_1 || "jayakarya24@gmail.com"}`,
                    className: "text-blue-700 hover:text-blue-800 transition-colors text-sm font-semibold",
                    children: company?.email_1 || "jayakarya24@gmail.com"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-1 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 mb-1", children: t("contact.website") }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://jayakaryakontruksi.com",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-blue-700 hover:text-blue-800 transition-colors text-sm font-semibold",
                    children: "jayakaryakontruksi.com"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }) }) })
    }
  );
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
function Authenticated({
  header,
  children
}) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsxs("nav", { className: "border-b border-gray-100 bg-white", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto fill-current text-gray-800" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden space-x-8 sm:-my-px sm:ms-10 sm:flex", children: /* @__PURE__ */ jsx(
            NavLink,
            {
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: "Dashboard"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:ms-6 sm:flex sm:items-center", children: /* @__PURE__ */ jsx("div", { className: "relative ms-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",
              children: [
                user.name,
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "-me-0.5 ms-2 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("profile.edit"),
                children: "Profile"
              }
            ),
            /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                children: "Log Out"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "-me-2 flex items-center sm:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown(
              (previousState) => !previousState
            ),
            className: "inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none",
            children: /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "h-6 w-6",
                stroke: "currentColor",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M4 6h16M4 12h16M4 18h16"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: showingNavigationDropdown ? "inline-flex" : "hidden",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                ]
              }
            )
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-1 pb-3 pt-2", children: /* @__PURE__ */ jsx(
              ResponsiveNavLink,
              {
                href: route("dashboard"),
                active: route().current("dashboard"),
                children: "Dashboard"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pb-1 pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-medium text-gray-800", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
                /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
                /* @__PURE__ */ jsx(
                  ResponsiveNavLink,
                  {
                    method: "post",
                    href: route("logout"),
                    as: "button",
                    children: "Log Out"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: header }) }),
    /* @__PURE__ */ jsx("main", { children })
  ] });
}
function Dashboard() {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({ projects }) {
  const { t, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = useMemo(() => {
    return projects.flatMap(
      (project) => project.images.map((image) => ({
        id: image.id,
        src: `/storage/${image.image_path}`,
        projectTitle: project.title,
        projectLocation: project.location,
        projectDate: project.date,
        category: project.category,
        originalProject: project
      }))
    );
  }, [projects]);
  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return allImages;
    return allImages.filter((img) => img.category === activeCategory);
  }, [allImages, activeCategory]);
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };
  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };
  useState(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  const categories = [
    { id: "all", label: t("gallery.filters.all") },
    { id: "batching_plant", label: t("gallery.filters.batching_plant") },
    { id: "asphalt_mixing_plant", label: t("gallery.filters.asphalt_mixing_plant") },
    { id: "construction", label: t("gallery.filters.construction") }
  ];
  return /* @__PURE__ */ jsxs(
    PublicLayout,
    {
      title: t("gallery.title"),
      headerTitle: t("gallery.our_gallery"),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-10", children: categories.map((cat) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveCategory(cat.id),
              className: `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"}`,
              children: cat.label
            },
            cat.id
          )) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              layout: true,
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredImages.map((item, index) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.8 },
                  transition: { duration: 0.3 },
                  className: "group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-slate-200",
                  onClick: () => openLightbox(index),
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: item.src,
                        alt: item.projectTitle,
                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg leading-tight mb-1", children: item.projectTitle }),
                      /* @__PURE__ */ jsxs("p", { className: "text-slate-300 text-sm", children: [
                        item.projectLocation,
                        " • ",
                        new Date(item.projectDate).getFullYear()
                      ] })
                    ] })
                  ]
                },
                item.id
              )) })
            }
          ),
          filteredImages.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-slate-500", children: /* @__PURE__ */ jsx("p", { children: t("gallery.empty") }) })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: lightboxOpen && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm",
            onClick: () => setLightboxOpen(false),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2",
                  onClick: () => setLightboxOpen(false),
                  children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 disabled:opacity-30 hidden md:block",
                  onClick: prevImage,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 hidden md:block",
                  onClick: nextImage,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative max-w-7xl max-h-[90vh] flex flex-col items-center",
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.img,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.2 },
                        src: filteredImages[currentImageIndex].src,
                        alt: filteredImages[currentImageIndex].projectTitle,
                        className: "max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                      },
                      filteredImages[currentImageIndex].id
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 },
                        className: "mt-4 text-center text-white",
                        children: [
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: filteredImages[currentImageIndex].projectTitle }),
                          /* @__PURE__ */ jsxs("p", { className: "text-slate-400 mt-1", children: [
                            filteredImages[currentImageIndex].projectLocation,
                            " • ",
                            new Date(filteredImages[currentImageIndex].projectDate).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { day: "numeric", month: "long", year: "numeric" })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full md:hidden mt-4 px-4", children: [
                      /* @__PURE__ */ jsx("button", { onClick: prevImage, className: "text-white p-2 bg-white/10 rounded-full", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }),
                      /* @__PURE__ */ jsx("button", { onClick: nextImage, className: "text-white p-2 bg-white/10 rounded-full", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })
                    ] })
                  ]
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function DeleteUserForm({
  className = ""
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password",
            value: "Password",
            className: "sr-only"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({
  className = ""
}) {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "current_password",
            value: "Current Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.current_password,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          InputLabel,
          {
            htmlFor: "password_confirmation",
            value: "Confirm Password"
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(
          InputError,
          {
            message: errors.password_confirmation,
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({
  mustVerifyEmail,
  status
}) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Index({ projects }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx(
    PublicLayout,
    {
      title: t("projects.list"),
      headerTitle: t("projects.list"),
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: projects.data.map((project, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: index * 0.1 },
            className: "bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] bg-gray-200 relative overflow-hidden", children: [
                project.images.length > 0 ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `/storage/${project.images[0].image_path}`,
                    alt: project.title,
                    className: "w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-20", children: t(`gallery.filters.${project.category}`) !== `gallery.filters.${project.category}` ? t(`gallery.filters.${project.category}`) : project.category.replace("_", " ") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 flex-1 flex flex-col", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500 mb-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                    new Date(project.date).getFullYear()
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
                    ] }),
                    project.location
                  ] })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-3 line-clamp-2", children: /* @__PURE__ */ jsx(Link, { href: route("projects.show", project.id), className: "hover:text-blue-600 transition-colors after:absolute after:inset-0 after:z-10", children: project.title }) }),
                project.description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-6 line-clamp-3 flex-1", children: project.description }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("projects.show", project.id),
                    className: "inline-flex items-center justify-center w-full px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 font-medium transition-colors gap-2 group relative z-20",
                    children: [
                      t("common.viewDetail"),
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 transition-transform group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                    ]
                  }
                )
              ] })
            ]
          },
          project.id
        )) }),
        projects.total > projects.data.length && /* @__PURE__ */ jsxs("div", { className: "mt-12 flex justify-center gap-2", children: [
          projects.prev_page_url && /* @__PURE__ */ jsx(
            Link,
            {
              href: projects.prev_page_url,
              className: "px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors",
              children: t("common.previous")
            }
          ),
          projects.next_page_url && /* @__PURE__ */ jsx(
            Link,
            {
              href: projects.next_page_url,
              className: "px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors",
              children: t("common.next")
            }
          )
        ] })
      ] })
    }
  );
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function Show({ project }) {
  const { t, locale } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };
  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };
  useState(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  return /* @__PURE__ */ jsxs(
    PublicLayout,
    {
      title: `${project.title} - ${t("nav.projects")}`,
      headerTitle: t("projects.our_work"),
      breadcrumbs: [
        { label: t("nav.projects"), href: route("projects.index", { locale }) },
        { label: project.title }
      ],
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto mb-12", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4 capitalize", children: project.category.replace("_", " ") }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-slate-800 mb-4", children: project.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
                ] }),
                /* @__PURE__ */ jsx("span", { children: project.location })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                /* @__PURE__ */ jsx("span", { children: new Date(project.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long", day: "numeric" }) })
              ] }),
              project.subcategory && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" }) }),
                /* @__PURE__ */ jsx("span", { children: project.subcategory })
              ] })
            ] }),
            project.description && /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: project.description }) })
          ] }),
          project.images.length > 0 && /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-6 border-l-4 border-blue-600 pl-4", children: t("gallery.our_gallery") }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: project.images.map((image, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm",
                onClick: () => openLightbox(index),
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `/storage/${image.image_path}`,
                      alt: `${project.title} - Image ${index + 1}`,
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-slate-800", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" }) }) }) })
                ]
              },
              image.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: lightboxOpen && project.images.length > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm",
            onClick: () => setLightboxOpen(false),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2",
                  onClick: () => setLightboxOpen(false),
                  children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              ),
              project.images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 disabled:opacity-30 hidden md:block",
                    onClick: prevImage,
                    children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 hidden md:block",
                    onClick: nextImage,
                    children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative max-w-7xl max-h-[90vh] flex flex-col items-center",
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.img,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.2 },
                        src: `/storage/${project.images[currentImageIndex].image_path}`,
                        alt: project.title,
                        className: "max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                      },
                      project.images[currentImageIndex].id
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 },
                        className: "mt-4 text-center text-white",
                        children: [
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: project.title }),
                          /* @__PURE__ */ jsxs("p", { className: "text-slate-400 mt-1", children: [
                            "Image ",
                            currentImageIndex + 1,
                            " of ",
                            project.images.length
                          ] })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
function MarqueeStrip({ images, direction = "left", speed = 50 }) {
  const looped = useMemo(() => {
    if (images.length === 0) return [];
    const count = images.length < 5 ? 8 : 4;
    return Array(count).fill(images).flat();
  }, [images]);
  if (looped.length === 0) return null;
  const duration = Math.max(35, looped.length * (speed / 10));
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "flex items-center gap-3 md:gap-5 px-2",
      animate: { x: direction === "left" ? "-50%" : "0%" },
      initial: { x: direction === "left" ? "0%" : "-50%" },
      transition: {
        ease: "linear",
        duration,
        repeat: Infinity
      },
      style: { width: "max-content" },
      children: looped.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative shrink-0 w-[220px] sm:w-[300px] md:w-[380px] aspect-[16/10] rounded-xl overflow-hidden group/card",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.src,
                alt: item.projectTitle,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105",
                loading: "eager",
                draggable: false
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm md:text-base leading-tight line-clamp-1 drop-shadow-lg", children: item.projectTitle }),
              /* @__PURE__ */ jsx("p", { className: "text-white/70 text-xs md:text-sm mt-0.5 drop-shadow", children: item.projectLocation })
            ] })
          ]
        },
        `${item.id}-${index}`
      ))
    }
  );
}
function ServicePageHeader({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  projects = []
}) {
  const { locale, t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const galleryImages = useMemo(() => {
    return projects.flatMap(
      (project) => project.images.map((image) => ({
        id: image.id,
        src: image.image_path.startsWith("http") ? image.image_path : `/storage/${image.image_path}`,
        projectTitle: project.title,
        projectLocation: project.location
      }))
    );
  }, [projects]);
  const hasGallery = galleryImages.length > 0;
  const handleScrollDown = () => {
    const headerEl = document.getElementById("service-header-end");
    if (headerEl) {
      headerEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full min-h-screen flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: backgroundImage,
          alt: "",
          className: `w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"}`,
          onLoad: () => setImageLoaded(true),
          fetchpriority: "high"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-[1]",
          style: {
            background: `linear-gradient(
                            180deg,
                            rgba(15, 23, 42, 0.85) 0%,
                            rgba(15, 23, 42, 0.55) 35%,
                            rgba(15, 23, 42, 0.40) 55%,
                            rgba(15, 23, 42, 0.70) 80%,
                            rgba(15, 23, 42, 0.95) 100%
                        )`
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-[2]",
          style: {
            background: `linear-gradient(
                            135deg,
                            rgba(30, 58, 138, 0.50) 0%,
                            rgba(30, 58, 138, 0.10) 50%,
                            rgba(30, 58, 138, 0.30) 100%
                        )`
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-[3]",
          style: {
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(15, 23, 42, 0.5) 100%)"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 flex-1 flex flex-col justify-end pb-24 md:justify-center md:pb-0 pt-28 md:pt-36", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          animate: "visible",
          children: [
            /* @__PURE__ */ jsxs(
              motion.nav,
              {
                variants: itemVariants,
                className: "flex items-center gap-2 text-xs md:text-sm mb-5 md:mb-7",
                children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: `/${locale}`,
                      className: "text-white/50 hover:text-white transition-colors duration-300",
                      children: /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          className: "w-3.5 h-3.5 md:w-4 md:h-4",
                          children: [
                            /* @__PURE__ */ jsx("path", { d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" }),
                            /* @__PURE__ */ jsx("path", { d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" })
                          ]
                        }
                      )
                    }
                  ),
                  breadcrumbs.map((item, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-white/30", children: "/" }),
                    item.href ? /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: item.href,
                        className: "text-white/50 hover:text-white transition-colors duration-300",
                        children: item.label
                      }
                    ) : /* @__PURE__ */ jsx("span", { className: "text-white/80 font-medium", children: item.label })
                  ] }, index))
                ]
              }
            ),
            /* @__PURE__ */ jsx(motion.div, { variants: itemVariants, className: "mb-5 md:mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 md:w-14 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 md:w-4 h-1 bg-blue-400/40 rounded-full" })
            ] }) }),
            /* @__PURE__ */ jsx(
              motion.h1,
              {
                variants: itemVariants,
                className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl",
                children: title
              }
            ),
            subtitle && /* @__PURE__ */ jsx(
              motion.p,
              {
                variants: itemVariants,
                className: "mt-4 md:mt-6 text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-light",
                children: subtitle
              }
            )
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.5, duration: 0.8 },
          children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleScrollDown,
              className: "group flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-500 focus:outline-none",
              "aria-label": t("common.scrollDown"),
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium", children: "Scroll" }),
                /* @__PURE__ */ jsx("div", { className: "relative w-5 h-8 md:w-6 md:h-9 border border-white/20 rounded-full flex justify-center group-hover:border-white/40 transition-colors duration-500", children: /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "w-1 h-1.5 md:w-1.5 md:h-2 bg-white/60 rounded-full mt-1.5",
                    animate: { y: [0, 10, 0] },
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }
                ) })
              ]
            }
          )
        }
      )
    ] }),
    hasGallery && /* @__PURE__ */ jsxs("div", { className: "relative bg-slate-900 py-10 md:py-14 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(MarqueeStrip, { images: galleryImages, direction: "left", speed: 50 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "service-header-end" })
  ] });
}
const DEFAULT_ASPHALT_PRICES = [
  {
    id: "fallback-1",
    name: "AC-WC",
    price_loco: 1275e3,
    price_tergelar: 145e4,
    unit: "TON",
    description: null
  },
  {
    id: "fallback-2",
    name: "AC-BC",
    price_loco: 125e4,
    price_tergelar: 1425e3,
    unit: "TON",
    description: null
  }
];
function AsphaltCalculator({ asphaltPrices = [] }) {
  const { locale, t } = useLanguage();
  const prices = asphaltPrices.length > 0 ? asphaltPrices : DEFAULT_ASPHALT_PRICES;
  const [selectedType, setSelectedType] = useState(prices[0]);
  const [weight, setWeight] = useState(1);
  const [priceType, setPriceType] = useState("loco");
  const [includePPN, setIncludePPN] = useState(false);
  const [result, setResult] = useState({
    unitPrice: 0,
    subtotal: 0,
    ppn: 0,
    total: 0
  });
  useEffect(() => {
    if (!selectedType) return;
    const w = weight === "" ? 0 : Number(weight);
    const unitPrice = priceType === "loco" ? selectedType.price_loco : selectedType.price_tergelar;
    const subtotal = unitPrice * w;
    const ppn = includePPN ? subtotal * 0.11 : 0;
    const total = subtotal + ppn;
    setResult({
      unitPrice,
      subtotal,
      ppn,
      total
    });
  }, [selectedType, weight, includePPN, priceType]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", id: "calculator", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.calculator.subtitle") }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4", children: t("services.calculator.asphalt_title") }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base max-w-xl", children: t("services.calculator.asphalt_description") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 border-b lg:border-b-0 lg:border-r border-slate-100", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs", children: "1" }),
          t("services.calculator.parameter_title")
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t("services.calculator.quality_label") }),
            /* @__PURE__ */ jsx(Listbox, { value: selectedType, onChange: setSelectedType, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsxs(Listbox.Button, { className: "relative w-full cursor-pointer bg-slate-50 py-3 pl-4 pr-10 text-left rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm hover:bg-slate-100", children: [
                /* @__PURE__ */ jsx("span", { className: "block truncate font-medium text-slate-900", children: selectedType?.name }),
                /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-5 w-5 text-gray-400", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", clipRule: "evenodd" }) }) })
              ] }),
              /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(Listbox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: prices.map((type, typeIdx) => /* @__PURE__ */ jsx(
                Listbox.Option,
                {
                  className: ({ active }) => `relative cursor-default select-none py-2.5 pl-10 pr-4 ${active ? "bg-slate-50 text-slate-900" : "text-slate-700"}`,
                  value: type,
                  children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: `block truncate ${selected ? "font-semibold text-primary" : "font-normal"}`, children: type.name }),
                    selected ? /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-primary", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", clipRule: "evenodd" }) }) }) : null
                  ] })
                },
                typeIdx
              )) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t("services.calculator.price_type") }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setPriceType("loco"),
                  className: `
                                                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                                ${priceType === "loco" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100"}
                                            `,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: t("services.calculator.price_loco") }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70 mt-1", children: t("services.calculator.price_loco_desc") }),
                    priceType === "loco" && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setPriceType("tergelar"),
                  className: `
                                                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                                ${priceType === "tergelar" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100"}
                                            `,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: t("services.calculator.price_tergelar") }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70 mt-1", children: t("services.calculator.price_tergelar_desc") }),
                    priceType === "tergelar" && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t("services.calculator.weight_label") }),
            /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg shadow-sm", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  step: "0.01",
                  className: "block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-medium",
                  placeholder: "0.00",
                  value: weight,
                  onChange: (e) => setWeight(e.target.value === "" ? "" : Math.max(0, parseFloat(e.target.value)))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "text-slate-500 sm:text-sm font-medium", children: t("services.calculator.unit_ton") }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 border-t border-slate-100 mt-4 pt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: t("services.calculator.vat_label") }) }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: includePPN,
                onChange: setIncludePPN,
                className: `${includePPN ? "bg-primary" : "bg-slate-200"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`,
                children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `${includePPN ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`
                  }
                )
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/50 p-8 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs", children: "2" }),
            t("services.calculator.details_title")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-slate-600", children: [
                t("services.calculator.unit_price"),
                " (",
                priceType === "loco" ? t("services.calculator.price_loco") : t("services.calculator.price_tergelar"),
                ")"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-900", children: [
                formatCurrency(result.unitPrice),
                /* @__PURE__ */ jsxs("span", { className: "text-slate-400 font-normal ml-1", children: [
                  "/",
                  t("services.calculator.unit_ton")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: t("services.calculator.weight_label") }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-900", children: [
                weight === "" ? 0 : weight,
                " ",
                t("services.calculator.unit_ton")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm pt-4 border-t border-slate-200", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: t("services.calculator.subtotal") }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-900", children: formatCurrency(result.subtotal) })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: includePPN && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm pt-2 text-slate-600", children: [
                  /* @__PURE__ */ jsx("span", { children: t("services.calculator.vat") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-900", children: [
                    "+ ",
                    formatCurrency(result.ppn)
                  ] })
                ] })
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mt-8 pt-6 border-t border-slate-200 border-dashed", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: t("services.calculator.total") }),
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-primary", children: formatCurrency(result.total) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-400 mt-2 text-right space-y-0.5", children: [
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_asphalt_change") }),
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_asphalt_tergelar") }),
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_terms") })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/${locale}/kontak-kami`,
              className: "w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-slate-900/10 flex items-center justify-center",
              children: [
                t("services.calculator.order_btn"),
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 ml-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
function ProjectCard({
  project,
  className = "",
  showCategory = true,
  showDescription = true,
  compact = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] bg-gray-200 relative overflow-hidden group", children: [
      project.images.length > 0 ? /* @__PURE__ */ jsx(
        "img",
        {
          src: project.images[0].image_path.startsWith("http") ? project.images[0].image_path : `/storage/${project.images[0].image_path}`,
          alt: `Proyek Konstruksi ${project.title} - ${project.location} | PT Jaya Karya Kontruksi`,
          loading: "lazy",
          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
      showCategory && /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm shadow-sm z-20", children: project.category.replace(/_/g, " ") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${compact ? "p-3" : "p-6"} flex-1 flex flex-col`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center text-xs sm:text-sm text-gray-500 ${compact ? "mb-2 gap-2 sm:gap-4" : "mb-3 gap-4"}`, children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          !compact && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
          new Date(project.date).getFullYear()
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 truncate text-[10px] sm:text-sm", children: [
          !compact && /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 text-blue-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: project.location })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: `${compact ? "text-sm sm:text-lg" : "text-xl"} font-bold text-slate-800 ${compact ? "mb-2" : "mb-3"} line-clamp-2 group-hover:text-blue-600 transition-colors`, children: /* @__PURE__ */ jsx(Link, { href: route("projects.show", project.id), className: "hover:text-blue-600 transition-colors after:absolute after:inset-0 after:z-10", children: project.title }) }),
      showDescription && project.description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-6 line-clamp-3 flex-1", children: project.description }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("projects.show", project.id),
          className: `inline-flex items-center justify-center w-full px-2 sm:px-4 ${compact ? "py-1.5 text-xs sm:text-sm" : "py-2.5"} bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600 font-medium transition-all gap-1 sm:gap-2 group border border-slate-200 relative z-20`,
          children: [
            "Lihat Detail",
            /* @__PURE__ */ jsx("svg", { className: `${compact ? "w-3 h-3" : "w-4 h-4"} transition-transform group-hover:translate-x-1`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
          ]
        }
      )
    ] })
  ] });
}
function AsphaltMixPlant({ projects, asphaltPrices }) {
  const { t } = useLanguage();
  const latestProjects = projects.slice(0, 4);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${t("services.asphalt.title")} - Jaya Karya Kontruksi` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Layanan Asphalt Mix Plant (AMP) di Brebes. Menyediakan berbagai tipe aspal hotmix berkualitas tinggi untuk proyek pengaspalan jalan Anda." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "asphalt mix plant, aspal hotmix, harga aspal hotmix, jual aspal, pengaspalan jalan, kontraktor aspal, JKK AMP" })
    ] }),
    /* @__PURE__ */ jsxs(
      PublicLayout,
      {
        title: t("services.asphalt.title"),
        hidePageHeader: true,
        children: [
          /* @__PURE__ */ jsx(
            ServicePageHeader,
            {
              title: t("services.asphalt.title"),
              subtitle: t("services.asphalt.desc"),
              breadcrumbs: [
                { label: t("nav.services"), href: `#` },
                { label: t("services.asphalt.title") }
              ],
              backgroundImage: "/images/hero-amp.webp",
              projects
            }
          ),
          projects.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-20 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.asphalt.title") }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight", children: t("projects.latest_projects") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-left md:text-right", children: /* @__PURE__ */ jsxs("a", { href: route("projects.index"), className: "group inline-flex items-center justify-center px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300", children: [
                t("common.viewAll"),
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8", children: latestProjects.map((project) => /* @__PURE__ */ jsx(
              ProjectCard,
              {
                project,
                showCategory: false,
                showDescription: false,
                compact: true
              },
              project.id
            )) })
          ] }) }),
          /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mb-12", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.asphalt.terms.title") }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4", children: t("services.asphalt.terms.subtitle") }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-lg", children: t("services.asphalt.terms.short_info") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: [0, 1, 2, 3, 4, 5].map((index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-slate-50 border border-slate-200 rounded-lg p-6",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold", children: index + 1 }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 text-base mb-2", children: t(`services.asphalt.terms.items.${index}.title`) }),
                    /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm", children: t(`services.asphalt.terms.items.${index}.desc`) })
                  ] })
                ] })
              },
              index
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-lg p-6 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-700 mb-4", children: t("services.asphalt.terms.full_terms_note") }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#calculator",
                  className: "inline-flex items-center gap-2 px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300",
                  children: [
                    t("services.asphalt.terms.view_calculator"),
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
                  ]
                }
              )
            ] })
          ] }) }),
          asphaltPrices.length > 0 && /* @__PURE__ */ jsx("div", { id: "calculator", children: /* @__PURE__ */ jsx(AsphaltCalculator, { asphaltPrices }) })
        ]
      }
    )
  ] });
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AsphaltMixPlant
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_CONCRETE_TYPES = [
  { id: "B.0", name: "B.0", price: 785e3 }
];
function BatchingCalculator({ initialPrices = [] }) {
  const { locale, t } = useLanguage();
  const prices = initialPrices.length > 0 ? initialPrices : DEFAULT_CONCRETE_TYPES;
  const defaultType = prices.find((p) => p.name.includes("K-200")) || prices[0];
  const [selectedType, setSelectedType] = useState(defaultType);
  const [volume, setVolume] = useState(1);
  const [includePPN, setIncludePPN] = useState(false);
  const [result, setResult] = useState({
    basePrice: 0,
    subtotal: 0,
    ppn: 0,
    total: 0
  });
  useEffect(() => {
    const vol = volume === "" ? 0 : Number(volume);
    const basePrice = selectedType.price;
    const subtotal = basePrice * vol;
    const ppn = includePPN ? subtotal * 0.11 : 0;
    const total = subtotal + ppn;
    setResult({
      basePrice,
      subtotal,
      ppn,
      total
    });
  }, [selectedType, volume, includePPN]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.calculator.subtitle") }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4", children: t("services.calculator.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base max-w-xl", children: t("services.calculator.description") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 border-b lg:border-b-0 lg:border-r border-slate-100", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs", children: "1" }),
          t("services.calculator.parameter_title")
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t("services.calculator.quality_label") }),
            /* @__PURE__ */ jsx(Listbox, { value: selectedType, onChange: setSelectedType, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
              /* @__PURE__ */ jsxs(Listbox.Button, { className: "relative w-full cursor-pointer bg-slate-50 py-3 pl-4 pr-10 text-left rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm hover:bg-slate-100", children: [
                /* @__PURE__ */ jsx("span", { className: "block truncate font-medium text-slate-900", children: selectedType.name }),
                /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-5 w-5 text-gray-400", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z", clipRule: "evenodd" }) }) })
              ] }),
              /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(Listbox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: prices.map((type, typeIdx) => /* @__PURE__ */ jsx(
                Listbox.Option,
                {
                  className: ({ active }) => `relative cursor-default select-none py-2.5 pl-10 pr-4 ${active ? "bg-slate-50 text-slate-900" : "text-slate-700"}`,
                  value: type,
                  children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: `block truncate ${selected ? "font-semibold text-primary" : "font-normal"}`, children: type.name }),
                    selected ? /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-primary", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z", clipRule: "evenodd" }) }) }) : null
                  ] })
                },
                typeIdx
              )) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: t("services.calculator.volume_label") }),
            /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg shadow-sm", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  step: "0.1",
                  className: "block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm font-medium",
                  placeholder: "0.0",
                  value: volume,
                  onChange: (e) => setVolume(e.target.value === "" ? "" : Math.max(0, parseFloat(e.target.value)))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "text-slate-500 sm:text-sm font-medium", children: "m³" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 border-t border-slate-100 mt-4 pt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: t("services.calculator.vat_label") }) }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: includePPN,
                onChange: setIncludePPN,
                className: `${includePPN ? "bg-primary" : "bg-slate-200"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`,
                children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `${includePPN ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`
                  }
                )
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/50 p-8 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs", children: "2" }),
            t("services.calculator.details_title")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-slate-600", children: [
                t("services.calculator.unit_price"),
                " (",
                selectedType.name,
                ")"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-900", children: [
                formatCurrency(result.basePrice),
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal ml-1", children: "/m³" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "Volume" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-900", children: [
                volume === "" ? 0 : volume,
                " m³"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm pt-4 border-t border-slate-200", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: t("services.calculator.subtotal") }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-900", children: formatCurrency(result.subtotal) })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: includePPN && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm pt-2 text-slate-600", children: [
                  /* @__PURE__ */ jsx("span", { children: t("services.calculator.vat") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-900", children: [
                    "+ ",
                    formatCurrency(result.ppn)
                  ] })
                ] })
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mt-8 pt-6 border-t border-slate-200 border-dashed", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 uppercase tracking-wide", children: t("services.calculator.total") }),
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-primary", children: formatCurrency(result.total) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-400 mt-2 text-right space-y-0.5", children: [
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_radius") }),
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_pump") }),
            /* @__PURE__ */ jsx("p", { children: t("services.calculator.note_change") })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `/${locale}/kontak-kami`,
              className: "w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-slate-900/10 flex items-center justify-center",
              children: [
                t("services.calculator.order_btn"),
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 ml-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
function BatchingPlant({ projects, concretePrices }) {
  const { t } = useLanguage();
  const latestProjects = projects.slice(0, 4);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${t("services.batching.title")} - Jaya Karya Kontruksi` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Penyedia beton ready mix berkualitas di Brebes. Kami melayani pengiriman beton cor mutu tinggi untuk berbagai proyek konstruksi dengan standar SNI." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "batching plant, beton ready mix, harga beton cor, supply beton, jkk" })
    ] }),
    /* @__PURE__ */ jsxs(
      PublicLayout,
      {
        title: t("services.batching.title"),
        hidePageHeader: true,
        children: [
          /* @__PURE__ */ jsx(
            ServicePageHeader,
            {
              title: t("services.batching.title"),
              subtitle: t("services.batching.desc"),
              breadcrumbs: [
                { label: t("nav.services"), href: `#` },
                { label: t("services.batching.title") }
              ],
              backgroundImage: "/images/hero-batchingplant.webp",
              projects
            }
          ),
          projects.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-20 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.batching.title") }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight", children: t("projects.latest_projects") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-left md:text-right", children: /* @__PURE__ */ jsxs("a", { href: route("projects.index"), className: "group inline-flex items-center justify-center px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300", children: [
                t("common.viewAll"),
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8", children: latestProjects.map((project) => /* @__PURE__ */ jsx(
              ProjectCard,
              {
                project,
                showCategory: false,
                showDescription: false,
                compact: true
              },
              project.id
            )) })
          ] }) }),
          concretePrices.length > 0 && /* @__PURE__ */ jsx(BatchingCalculator, { initialPrices: concretePrices })
        ]
      }
    )
  ] });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BatchingPlant
}, Symbol.toStringTag, { value: "Module" }));
function Construction({ projects }) {
  const { t } = useLanguage();
  const latestProjects = projects.slice(0, 4);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `${t("services.contractor.title")} - Jaya Karya Kontruksi` }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Layanan jasa konstruksi umum di Brebes. Spesialis pembangunan jalan, jembatan, gedung, dan infrastruktur dengan standar kualitas tinggi." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "jasa konstruksi, kontraktor umum, bangun jalan, bangun jembatan, konstruksi gedung, brebes" })
    ] }),
    /* @__PURE__ */ jsxs(
      PublicLayout,
      {
        title: t("services.contractor.title"),
        hidePageHeader: true,
        children: [
          /* @__PURE__ */ jsx(
            ServicePageHeader,
            {
              title: t("services.contractor.title"),
              subtitle: t("services.contractor.desc"),
              breadcrumbs: [
                { label: t("nav.services"), href: `#` },
                { label: t("services.contractor.title") }
              ],
              backgroundImage: "/images/hero-kontruksi.jpeg",
              projects
            }
          ),
          projects.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-20 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary font-bold tracking-wider uppercase text-sm mb-2 block", children: t("services.contractor.title") }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight", children: t("projects.latest_projects") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-left md:text-right", children: /* @__PURE__ */ jsxs("a", { href: route("projects.index"), className: "group inline-flex items-center justify-center px-6 py-2 border-2 border-primary/20 text-primary font-bold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300", children: [
                t("common.viewAll"),
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8", children: latestProjects.map((project) => /* @__PURE__ */ jsx(
              ProjectCard,
              {
                project,
                showCategory: false,
                showDescription: false,
                compact: true
              },
              project.id
            )) })
          ] }) })
        ]
      }
    )
  ] });
}
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Construction
}, Symbol.toStringTag, { value: "Module" }));
const HeroSection = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const slides = [
    {
      image: "/images/hero-kontruksi.jpeg",
      titleKey: "hero.slides.0.title"
    },
    {
      image: "/images/hero-batchingplant.webp",
      titleKey: "hero.slides.1.title"
    },
    {
      image: "/images/hero-amp.webp",
      titleKey: "hero.slides.2.title"
    }
  ];
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 6e3);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen min-h-[600px] overflow-hidden bg-slate-900", children: [
    slides.map((slide, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image,
            alt: t(slide.titleKey),
            className: "absolute inset-0 w-full h-full object-cover",
            fetchpriority: index === 0 ? "high" : "auto",
            loading: index === 0 ? "eager" : "lazy"
          }
        )
      },
      index
    )),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "relative min-h-[120px] md:min-h-[160px]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 md:w-14 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "w-3 h-1 bg-blue-400/40 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-xl min-h-[2em]", children: slides.map((slide, index) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `absolute inset-x-0 bottom-0 transition-all duration-700 ease-out ${currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`,
            children: t(slide.titleKey)
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-8 md:pb-10 mt-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: slides.map((_, index) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setCurrentSlide(index),
              className: `h-1 rounded-full transition-all duration-500 ${currentSlide === index ? "w-10 bg-white" : "w-4 bg-white/30 hover:bg-white/50"}`,
              "aria-label": `Go to slide ${index + 1}`
            },
            index
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 ml-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: prevSlide,
                className: "p-2 text-white/60 hover:text-white transition-colors",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M15 18l-6-6 6-6" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsPaused((p) => !p),
                className: "p-2 text-white/60 hover:text-white transition-colors",
                "aria-label": isPaused ? "Play" : "Pause",
                children: isPaused ? /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M5 3l14 9-14 9V3z" }) }) : /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: [
                  /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
                  /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: nextSlide,
                className: "p-2 text-white/60 hover:text-white transition-colors",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M9 18l6-6-6-6" }) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-center gap-2 text-white/30", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] font-medium", children: "Scroll" }),
          /* @__PURE__ */ jsx("div", { className: "w-5 h-8 border border-white/20 rounded-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-bounce" }) })
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeroSection
}, Symbol.toStringTag, { value: "Module" }));
const serviceData = [
  {
    id: "batching",
    titleKey: "services.batching.title",
    descKey: "services.batching.desc",
    image: "/images/hero-batchingplant.webp",
    routePath: "services/batching-plant"
  },
  {
    id: "construction",
    titleKey: "services.contractor.title",
    descKey: "services.contractor.desc",
    image: "/images/hero-kontruksi.jpeg",
    routePath: "services/construction"
  },
  {
    id: "asphalt",
    titleKey: "services.asphalt.title",
    descKey: "services.asphalt.desc",
    image: "/images/hero-amp.webp",
    routePath: "services/asphalt-mixing-plant"
  }
];
const Services = () => {
  const { t, locale } = useLanguage();
  return /* @__PURE__ */ jsx("section", { className: "py-10 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 md:mb-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5", children: t("nav.services") }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-3xl lg:text-4xl font-bold text-slate-900", children: t("services.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base", children: t("services.description") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5", children: serviceData.map((service) => /* @__PURE__ */ jsxs(
      Link,
      {
        href: `/${locale}/${service.routePath}`,
        className: "group relative rounded-lg md:rounded-xl overflow-hidden aspect-[16/10] md:aspect-[4/5] shadow-md hover:shadow-lg transition-shadow duration-300",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: service.image,
              alt: t(service.titleKey),
              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-4 md:p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base md:text-xl font-bold text-white mb-0.5 md:mb-1", children: t(service.titleKey) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/60 text-xs md:text-sm line-clamp-2 hidden sm:block", children: t(service.descKey) }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center text-white/50 group-hover:text-white text-xs font-medium transition-colors mt-2 md:mt-3", children: [
              t("common.viewDetail"),
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            ] })
          ] })
        ]
      },
      service.id
    )) })
  ] }) });
};
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Services
}, Symbol.toStringTag, { value: "Module" }));
const categoryLabels = {
  batching_plant: "Batching Plant",
  construction: "Konstruksi",
  asphalt_mixing_plant: "Asphalt Mixing Plant"
};
const LatestProjectsSection = ({ projects }) => {
  const { t, locale } = useLanguage();
  if (!projects || projects.length === 0) return null;
  const displayProjects = projects.slice(0, 3);
  return /* @__PURE__ */ jsx("section", { className: "py-10 md:py-24 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5", children: t("projects.our_work") }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-3xl lg:text-4xl font-bold text-slate-900", children: t("projects.latest_projects") }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block", children: t("projects.latest_projects_desc") })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/${locale}/projek`,
          className: "mt-2 md:mt-0 inline-flex items-center text-primary font-semibold text-xs md:text-sm hover:underline group",
          children: [
            t("common.viewAll"),
            " ",
            t("nav.projects"),
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 scrollbar-hide", children: displayProjects.map((project) => /* @__PURE__ */ jsxs(
      Link,
      {
        href: `/${locale}/projek/${project.id}`,
        className: "group bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-start",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-slate-100", children: [
            project.images?.[0] ? /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${project.images[0].image_path}`,
                alt: project.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-slate-300", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] md:text-xs font-medium rounded-md", children: categoryLabels[project.category] || project.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 md:p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm md:text-base font-semibold text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-2", children: project.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3 text-slate-400 text-xs", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 truncate", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-3 h-3 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: project.location })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-300", children: "·" }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: new Date(project.date).toLocaleDateString("id-ID", { year: "numeric", month: "short" }) })
            ] })
          ] })
        ]
      },
      project.id
    )) })
  ] }) });
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LatestProjectsSection
}, Symbol.toStringTag, { value: "Module" }));
const PhotoGallerySection = ({ images }) => {
  const { t, locale } = useLanguage();
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);
  useEffect(() => {
    if (images && images.length > 0) {
      setShuffledImages(shuffleArray(images));
    }
  }, [images, shuffleArray]);
  useEffect(() => {
    if (shuffledImages.length > 0 && !isPaused && !selectedImage) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
      }, 4e3);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shuffledImages.length, isPaused, selectedImage]);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % shuffledImages.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length);
  if (!shuffledImages || shuffledImages.length === 0) return null;
  const getVisibleImages = () => {
    const result = [];
    const len = shuffledImages.length;
    for (let i = -2; i <= 2; i++) {
      const idx = (currentIndex + i + len) % len;
      result.push({ image: shuffledImages[idx], offset: i });
    }
    return result;
  };
  return /* @__PURE__ */ jsxs("section", { className: "py-10 md:py-24 bg-slate-900 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5", children: t("gallery.title") }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-3xl lg:text-4xl font-bold text-white", children: t("gallery.our_gallery") }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block", children: t("gallery.description") })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/${locale}/galeri`,
          className: "mt-2 md:mt-0 inline-flex items-center text-blue-400 font-semibold text-xs md:text-sm hover:underline group",
          children: [
            t("common.viewAll"),
            " ",
            t("gallery.title"),
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative h-[200px] sm:h-[320px] md:h-[440px] lg:h-[480px] flex items-center justify-center",
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
        children: [
          /* @__PURE__ */ jsx("div", { className: "relative w-full h-full flex items-center justify-center", style: { perspective: "1000px" }, children: getVisibleImages().map(({ image, offset }) => {
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute transition-all duration-700 ease-out cursor-pointer ${isCenter ? "z-30" : offset === -1 || offset === 1 ? "z-20" : "z-10"}`,
                style: {
                  transform: `translateX(${offset * (isMobile ? 140 : 220)}px) scale(${1 - absOffset * 0.15}) rotateY(${offset * -10}deg)`,
                  opacity: 1 - absOffset * 0.35,
                  filter: isCenter ? "none" : "brightness(0.5)"
                },
                onClick: () => isCenter && setSelectedImage(image),
                children: /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden rounded-lg shadow-xl ${isCenter ? "ring-1 ring-white/20" : ""}`, children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `/storage/${image.image_path}`,
                      alt: `Dokumentasi Proyek ${image.project_title} - JKK Gallery`,
                      loading: "lazy",
                      className: "w-[180px] sm:w-[280px] md:w-[380px] lg:w-[460px] h-[130px] sm:h-[210px] md:h-[285px] lg:h-[320px] object-cover"
                    }
                  ),
                  isCenter && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3 md:p-4", children: /* @__PURE__ */ jsx("p", { className: "text-white font-medium text-xs md:text-sm drop-shadow line-clamp-1", children: image.project_title }) })
                ] })
              },
              `${image.id}-${offset}`
            );
          }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: goToPrev,
              className: "absolute left-2 md:left-8 z-40 p-2 md:p-2.5 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors",
              "aria-label": "Previous",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 md:w-5 md:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: goToNext,
              className: "absolute right-2 md:right-8 z-40 p-2 md:p-2.5 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors",
              "aria-label": "Next",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 md:w-5 md:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
            }
          )
        ]
      }
    ),
    selectedImage && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4",
        onClick: () => setSelectedImage(null),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-50",
              onClick: () => setSelectedImage(null),
              "aria-label": "Close",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "max-w-5xl max-h-[90vh] relative", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${selectedImage.image_path}`,
                alt: `Detail Foto Proyek ${selectedImage.project_title} | PT Jaya Karya Kontruksi`,
                className: "max-w-full max-h-[85vh] object-contain rounded-lg"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-white text-center mt-3 text-sm font-medium", children: selectedImage.project_title })
          ] })
        ]
      }
    )
  ] });
};
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PhotoGallerySection
}, Symbol.toStringTag, { value: "Module" }));
const LatestArticlesSection = ({ articles }) => {
  const { t, locale } = useLanguage();
  if (!articles || articles.length === 0) return null;
  const displayArticles = articles.slice(0, 3);
  const featuredArticle = displayArticles[0];
  const sideArticles = displayArticles.slice(1);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "py-10 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-1.5", children: t("articles.blog") }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-3xl lg:text-4xl font-bold text-slate-900", children: t("articles.latest_articles") }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-1 md:mt-2 max-w-xl text-xs md:text-base hidden md:block", children: t("articles.latest_articles_desc") })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/${locale}/artikel`,
          className: "mt-2 md:mt-0 inline-flex items-center text-primary font-semibold text-xs md:text-sm hover:underline group",
          children: [
            t("common.viewAll"),
            " ",
            t("nav.articles"),
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-5", children: [
      featuredArticle && /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/${locale}/artikel/${featuredArticle.slug}`,
          className: "group bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] md:aspect-[16/10] overflow-hidden bg-slate-100", children: [
              featuredArticle.thumbnail ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: featuredArticle.thumbnail,
                  alt: featuredArticle.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-slate-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }),
              featuredArticle.category && /* @__PURE__ */ jsx("span", { className: "absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-2.5 md:py-1 bg-primary text-white text-[10px] md:text-xs font-medium rounded-md", children: featuredArticle.category.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 md:p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-slate-400 text-[10px] md:text-xs gap-2 md:gap-3 mb-1 md:mb-2", children: [
                /* @__PURE__ */ jsx("span", { children: formatDate(featuredArticle.published_at) }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                  ] }),
                  featuredArticle.views
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm md:text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2", children: featuredArticle.title }),
              featuredArticle.excerpt && /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs md:text-sm line-clamp-2 mt-1 hidden md:block", children: featuredArticle.excerpt })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: sideArticles.map((article) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: `/${locale}/artikel/${article.slug}`,
          className: "group flex bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "relative w-24 sm:w-32 md:w-40 flex-shrink-0 overflow-hidden bg-slate-100", children: article.thumbnail ? /* @__PURE__ */ jsx(
              "img",
              {
                src: article.thumbnail,
                alt: article.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 p-3 md:p-4 flex flex-col justify-center min-w-0", children: [
              article.category && /* @__PURE__ */ jsx("span", { className: "text-primary text-[10px] md:text-xs font-semibold mb-0.5 md:mb-1", children: article.category.name }),
              /* @__PURE__ */ jsx("h3", { className: "text-xs md:text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2", children: article.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-slate-400 text-[10px] md:text-xs gap-2 mt-1", children: [
                /* @__PURE__ */ jsx("span", { children: formatDate(article.published_at) }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "w-2.5 h-2.5 md:w-3 md:h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                  ] }),
                  article.views
                ] })
              ] })
            ] })
          ]
        },
        article.id
      )) })
    ] })
  ] }) });
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LatestArticlesSection
}, Symbol.toStringTag, { value: "Module" }));
const WelcomeContent = ({
  latestProjects,
  galleryImages,
  latestArticles
}) => {
  const [showSplash, setShowSplash] = useState(true);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) setShowSplash(false);
  }, []);
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splashShown", "true");
  };
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  if (showSplash) {
    return /* @__PURE__ */ jsx(SplashScreen, { onComplete: handleSplashComplete });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, { onShowToast: showToast }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(Services, {}),
      /* @__PURE__ */ jsx(LatestProjectsSection, { projects: latestProjects }),
      /* @__PURE__ */ jsx(PhotoGallerySection, { images: galleryImages }),
      /* @__PURE__ */ jsx(LatestArticlesSection, { articles: latestArticles })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    toast && /* @__PURE__ */ jsx(
      Toast,
      {
        message: toast.message,
        type: toast.type,
        onClose: () => setToast(null)
      }
    )
  ] });
};
function Welcome() {
  useLanguage();
  const { latestProjects, galleryImages, latestArticles, app_url: rawAppUrl, company } = usePage().props;
  const app_url = rawAppUrl.replace("www.", "");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Beranda" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "PT Jaya Karya Kontruksi (JKK) - Perusahaan jasa konstruksi, penyedia asphalt mix plant (AMP), dan penyedia beton ready mix berkualitas di Brebes." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "jaya karya kontruksi, jkk, kontraktor jalan, aspal hotmix, ready mix, batching plant, pt jkk, konstruksi brebes" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Jaya Karya Kontruksi" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Jaya Karya Kontruksi | Kontraktor Jalan & Ready Mix" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Layanan jasa konstruksi, penyedia asphalt mix plant (AMP), dan penyedia beton ready mix berkualitas di Brebes." }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: app_url }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: `${app_url}/images/hero-kontruksi.jpeg` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Jaya Karya Kontruksi",
        "alternateName": "PT JKK",
        "url": app_url,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${app_url}/id/artikel?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PT Jaya Karya Kontruksi",
        "url": app_url,
        "logo": `${app_url}/images/logo.webp`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": company.phone,
          "contactType": "customer service",
          "areaServed": "ID",
          "availableLanguage": ["id", "en"]
        },
        "sameAs": [
          "https://www.facebook.com/jayakaryakontruksi",
          "https://www.instagram.com/jayakaryakontruksi"
        ]
      }) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ConstructionBusiness",
        "name": "PT Jaya Karya Kontruksi",
        "alternateName": "JKK",
        "description": "PT Jaya Karya Kontruksi (JKK) adalah perusahaan konstruksi terkemuka yang spesialis dalam pembangunan jalan, produksi aspal hotmix, dan penyediaan beton ready mix berkualitas SNI.",
        "url": app_url,
        "logo": `${app_url}/images/logo.webp`,
        "image": `${app_url}/images/hero-kontruksi.jpeg`,
        "@id": app_url,
        "telephone": company.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": company.address,
          "addressLocality": "Brebes",
          "addressRegion": "Jawa Tengah",
          "postalCode": "52212",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.8774,
          "longitude": 109.0729
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "17:00"
        },
        "sameAs": [
          "https://www.facebook.com/jayakaryakontruksi",
          "https://www.instagram.com/jayakaryakontruksi"
        ]
      }) }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx("link", { rel: "preload", as: "image", href: "/images/hero-kontruksi.jpeg" }),
      /* @__PURE__ */ jsx("link", { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap", rel: "stylesheet" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "jkk-website", children: /* @__PURE__ */ jsx(
      WelcomeContent,
      {
        latestProjects: latestProjects || [],
        galleryImages: galleryImages || [],
        latestArticles: latestArticles || []
      }
    ) })
  ] });
}
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
const AboutSection = () => {
  const { t } = useLanguage();
  const cards = [
    {
      icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "white", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z" }) }),
      title: t("about.construction.title"),
      description: t("about.construction.desc")
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "white", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z" }) }),
      title: t("about.infrastructure.title"),
      description: t("about.infrastructure.desc")
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "white", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" }) }),
      title: t("about.energy.title"),
      description: t("about.energy.desc")
    }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "about",
      style: {
        padding: "100px 24px",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
      },
      children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            style: {
              textAlign: "center",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#171717",
              marginBottom: "64px",
              letterSpacing: "-0.02em"
            },
            children: t("about.title")
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "about-cards-grid",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px"
            },
            children: cards.map((card, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "about-card",
                style: {
                  backgroundColor: "white",
                  borderRadius: "24px",
                  padding: "40px 32px",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.12)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.06)";
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: "72px",
                        height: "72px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #526086 0%, #667BA3 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px"
                      },
                      children: card.icon
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      style: {
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#171717",
                        marginBottom: "12px"
                      },
                      children: card.title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        fontSize: "15px",
                        color: "#6b7280",
                        lineHeight: 1.7
                      },
                      children: card.description
                    }
                  )
                ]
              },
              index
            ))
          }
        )
      ] })
    }
  );
};
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutSection
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const appName = "Jaya Karya Kontruksi";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About/AboutSubNavbar.tsx": __vite_glob_0_0, "./Pages/About/Info.tsx": __vite_glob_0_1, "./Pages/About/Sections/CompanyGallerySection.tsx": __vite_glob_0_2, "./Pages/About/Sections/HistorySection.tsx": __vite_glob_0_3, "./Pages/About/Sections/ManagementSection.tsx": __vite_glob_0_4, "./Pages/About/Sections/ProfileSection.tsx": __vite_glob_0_5, "./Pages/About/Sections/StructureSection.tsx": __vite_glob_0_6, "./Pages/About/Sections/ValuesSection.tsx": __vite_glob_0_7, "./Pages/About/Sections/VisionMissionSection.tsx": __vite_glob_0_8, "./Pages/About/Structure.tsx": __vite_glob_0_9, "./Pages/Admin/Articles/Create.tsx": __vite_glob_0_10, "./Pages/Admin/Articles/Edit.tsx": __vite_glob_0_11, "./Pages/Admin/Articles/Index.tsx": __vite_glob_0_12, "./Pages/Admin/AsphaltPrices/Index.tsx": __vite_glob_0_13, "./Pages/Admin/Categories/Index.tsx": __vite_glob_0_14, "./Pages/Admin/CompanyGallery/Index.tsx": __vite_glob_0_15, "./Pages/Admin/ConcretePrices/Index.tsx": __vite_glob_0_16, "./Pages/Admin/Dashboard.tsx": __vite_glob_0_17, "./Pages/Admin/Organization/Index.tsx": __vite_glob_0_18, "./Pages/Admin/Projects/Create.tsx": __vite_glob_0_19, "./Pages/Admin/Projects/Edit.tsx": __vite_glob_0_20, "./Pages/Admin/Projects/Index.tsx": __vite_glob_0_21, "./Pages/Articles/Index.tsx": __vite_glob_0_22, "./Pages/Articles/Show.tsx": __vite_glob_0_23, "./Pages/Auth/ConfirmPassword.tsx": __vite_glob_0_24, "./Pages/Auth/ForgotPassword.tsx": __vite_glob_0_25, "./Pages/Auth/Login.tsx": __vite_glob_0_26, "./Pages/Auth/Register.tsx": __vite_glob_0_27, "./Pages/Auth/ResetPassword.tsx": __vite_glob_0_28, "./Pages/Auth/VerifyEmail.tsx": __vite_glob_0_29, "./Pages/Contact/Index.tsx": __vite_glob_0_30, "./Pages/Dashboard.tsx": __vite_glob_0_31, "./Pages/Gallery/Index.tsx": __vite_glob_0_32, "./Pages/Profile/Edit.tsx": __vite_glob_0_33, "./Pages/Profile/Partials/DeleteUserForm.tsx": __vite_glob_0_34, "./Pages/Profile/Partials/UpdatePasswordForm.tsx": __vite_glob_0_35, "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": __vite_glob_0_36, "./Pages/Projects/Index.tsx": __vite_glob_0_37, "./Pages/Projects/Show.tsx": __vite_glob_0_38, "./Pages/Services/AsphaltMixPlant.tsx": __vite_glob_0_39, "./Pages/Services/BatchingPlant.tsx": __vite_glob_0_40, "./Pages/Services/Construction.tsx": __vite_glob_0_41, "./Pages/Welcome/Index.tsx": __vite_glob_0_42, "./Pages/Welcome/Sections/AboutSection.tsx": __vite_glob_0_43, "./Pages/Welcome/Sections/ContactSection.tsx": __vite_glob_0_44, "./Pages/Welcome/Sections/HeroSection.tsx": __vite_glob_0_45, "./Pages/Welcome/Sections/LatestArticlesSection.tsx": __vite_glob_0_46, "./Pages/Welcome/Sections/LatestProjectsSection.tsx": __vite_glob_0_47, "./Pages/Welcome/Sections/PhotoGallerySection.tsx": __vite_glob_0_48, "./Pages/Welcome/Sections/Services.tsx": __vite_glob_0_49 });
      const page2 = pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}/Index.tsx`];
      if (!page2) {
        throw new Error(`Page not found: ${name}`);
      }
      return page2.default;
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
