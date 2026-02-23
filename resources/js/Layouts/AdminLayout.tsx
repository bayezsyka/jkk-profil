import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/Common/ApplicationLogo';

export default function AdminLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Sidebar is expanded ONLY if hovered
    const isExpanded = isHovered;

    // Handle mobile backdrop click
    const closeMobile = () => setIsMobileOpen(false);

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
                    onClick={closeMobile}
                />
            )}

            {/* Sidebar */}
            <aside 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none lg:relative ${
                    isExpanded ? 'w-64' : 'w-20'
                } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Logo Section */}
                <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0 overflow-hidden">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 flex-shrink-0">
                             <ApplicationLogo className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-bold text-slate-800 transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                            JKK Admin
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <SidebarLink 
                        href={route('admin.dashboard')} 
                        active={route().current('admin.dashboard')}
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.projects.index')} 
                        active={route().current('admin.projects.*')}
                        icon={<ProjectIcon />}
                        label="Proyek"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.articles.index')} 
                        active={route().current('admin.articles.*')}
                        icon={<ArticleIcon />}
                        label="Artikel"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.categories.index')} 
                        active={route().current('admin.categories.*')}
                        icon={<CategoryIcon />}
                        label="Kategori"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.organization.index')} 
                        active={route().current('admin.organization.*')}
                        icon={<OrgIcon />}
                        label="Struktur Organisasi"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.concrete-prices.index')} 
                        active={route().current('admin.concrete-prices.*')}
                        icon={<CalculatorIcon />}
                        label="Harga Beton"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.asphalt-prices.index')} 
                        active={route().current('admin.asphalt-prices.*')}
                        icon={<TruckIcon />}
                        label="Harga Aspal"
                        expanded={isExpanded}
                    />
                    <SidebarLink 
                        href={route('admin.company-gallery.index')} 
                        active={route().current('admin.company-gallery.*')}
                        icon={<GalleryIcon />}
                        label="Galeri Perusahaan"
                        expanded={isExpanded}
                    />
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-slate-100 space-y-1 flex-shrink-0">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all group"
                        title="Logout"
                    >
                        <LogoutIcon className="w-5 h-5 flex-shrink-0" />
                        <span className={`ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
                            Keluar
                        </span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-6 justify-between z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <MenuIcon />
                        </button>
                        
                        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
                            <span className="text-slate-400">Admin</span>
                            <ChevronRightIcon className="w-4 h-4" />
                            <span className="text-slate-900">
                                {route().current('admin.dashboard') ? 'Dashboard' : 
                                 route().current('admin.projects.*') ? 'Proyek' :
                                 route().current('admin.articles.*') ? 'Artikel' :
                                 route().current('admin.categories.*') ? 'Kategori' :
                                 route().current('admin.organization.*') ? 'Struktur Organisasi' : 
                                 route().current('admin.concrete-prices.*') ? 'Harga Beton' :
                                 route().current('admin.asphalt-prices.*') ? 'Harga Aspal' :
                                 route().current('admin.company-gallery.*') ? 'Galeri Perusahaan' : ''}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Super Admin</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 border-2 border-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 scroll-smooth">
                    <div className="p-6 md:p-8 max-w-7xl mx-auto">
                        {(usePage().props as any).flash?.success && (
                            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-500 shadow-sm border-l-4 border-l-emerald-500">
                                <div className="bg-emerald-500 p-1 rounded-full text-white">
                                    <CheckIcon />
                                </div>
                                <span className="text-sm font-semibold">{(usePage().props as any).flash.success}</span>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { display: none; }
                .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ` }} />
        </div>
    );
}

// Helper Components
function SidebarLink({ href, active, icon, label, expanded }: any) {
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative ${
                active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-100/50 hover:text-blue-600'
            }`}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full opacity-80" />
            )}
            
            <div className={`flex-shrink-0 transition-transform duration-300 ${!active && 'group-hover:scale-110 group-hover:rotate-3'}`}>
                {icon}
            </div>
            
            <span className={`ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden font-semibold ${expanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}`}>
                {label}
            </span>
            
            {/* Tooltip for collapsed state */}
            {!expanded && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-[60] pointer-events-none shadow-2xl border border-slate-700 translate-x-2 group-hover:translate-x-0">
                    <span className="font-bold">{label}</span>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-b border-slate-700" />
                </div>
            )}
        </Link>
    );
}

// Icons
const DashboardIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const ProjectIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const OrgIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const ArticleIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const CategoryIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
);

const CalculatorIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 4h-6m4 4h-4a2 2 0 01-2-2v-5m-2.4 8.7a8.5 8.5 0 1113.846-5.462" />
    </svg>
);

const TruckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const GalleryIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);
