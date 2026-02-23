import{j as a}from"./app-mK9lOIls.js";const o=({sections:r,activeSection:l,scrollToSection:d,isMenuSticky:s})=>a.jsxs("div",{className:"w-full",children:[a.jsxs("div",{className:"hidden md:flex flex-col gap-2 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm",children:[a.jsx("div",{className:"px-4 py-2 mb-2",children:a.jsx("span",{className:"text-xs font-bold text-gray-400 uppercase tracking-widest",children:"Navigation"})}),r.map(e=>a.jsxs("button",{onClick:()=>d(e.id),className:`px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 text-left flex items-center gap-3 ${l===e.id?"bg-[#1e3a5f] text-white shadow-md translate-x-1":"text-[#1e3a5f] hover:bg-gray-50"}`,children:[a.jsx("div",{className:`w-1.5 h-1.5 rounded-full transition-all ${l===e.id?"bg-white scale-125":"bg-[#1e3a5f]/20"}`}),e.label]},e.id))]}),a.jsx("div",{className:`md:hidden about-subnavbar ${s?"fixed top-[75px] left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100 py-2 px-3 z-50 w-[92vw]":"bg-gray-100/60 rounded-2xl py-2 px-2"}`,children:a.jsx("div",{className:"flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth",children:r.map(e=>a.jsx("button",{onClick:()=>d(e.id),className:`px-4 py-2 text-[11px] font-black rounded-xl whitespace-nowrap flex-shrink-0 uppercase tracking-tighter transition-all ${l===e.id?"bg-[#1e3a5f] text-white shadow-lg":"text-[#1e3a5f] hover:bg-white/80"}`,children:e.label},e.id))})}),a.jsx("style",{children:`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `})]});export{o as default};
