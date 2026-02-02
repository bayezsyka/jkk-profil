import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface Member {
    id: number;
    name: string;
    role: string;
    parent_id: number | null;
    photo_path: string | null;
    order: number;
    parent?: Member;
}

interface MemberNode extends Member {
    children: MemberNode[];
}

interface PageProps {
    members: Member[];
    auth: any;
}

// Utility to build tree from flat array
const buildTree = (members: Member[]): MemberNode[] => {
    const map = new Map<number, MemberNode>();
    const roots: MemberNode[] = [];

    // First pass: create nodes
    members.forEach(member => {
        map.set(member.id, { ...member, children: [] });
    });

    // Second pass: link parents and children
    members.forEach(member => {
        const node = map.get(member.id);
        if (node) {
            if (member.parent_id && map.has(member.parent_id)) {
                map.get(member.parent_id)!.children.push(node);
            } else {
                roots.push(node);
            }
        }
    });

    // Sort children by order
    const sortNodes = (nodes: MemberNode[]) => {
        nodes.sort((a, b) => a.order - b.order);
        nodes.forEach(node => sortNodes(node.children));
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
}: { 
    node: MemberNode; 
    level?: number; 
    onAddSubordinate: (id: number) => void;
    onEdit: (member: Member) => void;
    onDelete: (id: number) => void;
    t: (key: string) => string;
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col">
            <div className={`relative flex items-center group transition-all duration-300 ${level > 0 ? 'ml-8 mt-4' : 'mb-4'}`}>
                {/* Connecting Lines for children */}
                {level > 0 && (
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gray-200" />
                )}
                {/* Vertical line connector from parent is handled by the parent's container padding/border */}

                <div className={`
                    relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[320px]
                    flex items-center gap-4 z-10
                    ${level === 0 ? 'border-l-4 border-l-blue-600' : ''}
                `}>
                    <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 overflow-hidden shrink-0">
                        {node.photo_path ? (
                            <img src={`/storage/${node.photo_path}`} alt={node.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-bold text-lg">{node.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate">{node.name}</h3>
                        <p className="text-sm text-blue-600 truncate">
                            {node.role.startsWith('about.structure.roles.') ? t(node.role) : node.role}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Urutan: {node.order}</p>
                    </div>

                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onAddSubordinate(node.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Tambah Bawahan"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onEdit(node)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(node.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    {hasChildren && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`
                                absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 shadow-sm z-20 transition-transform duration-200
                                ${isExpanded ? 'rotate-180' : 'rotate-0'}
                            `}
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="relative border-l-2 border-gray-100 ml-[2.25rem] pl-4 pb-2">
                    {node.children.map(child => (
                        <OrgMemberNode 
                            key={child.id} 
                            node={child} 
                            level={level + 1} 
                            onAddSubordinate={onAddSubordinate}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            t={t}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function OrganizationIndex({ members }: PageProps) {
    const { t } = useLanguage();
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Convert flat list to tree
    const treeData = useMemo(() => buildTree(members), [members]);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        role: '',
        parent_id: '' as string | number,
        photo: null as File | null,
        order: 0,
    });

    const openCreateModal = (parentId?: number) => {
        setEditingMember(null);
        reset();
        clearErrors();
        if (parentId) {
            setData('parent_id', parentId);
        }
        setIsModalOpen(true);
    };

    const openEditModal = (member: Member) => {
        setEditingMember(member);
        setData({
            name: member.name,
            role: member.role,
            parent_id: member.parent_id || '',
            photo: null,
            order: member.order,
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingMember) {
            // Laravel quirk: use POST with _method=PUT or just POST for file uploads
            post(route('admin.organization.update', editingMember.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    // Do not reset immediately if there are errors, but here we assume success closes modal
                    reset();
                },
            });
        } else {
            post(route('admin.organization.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const deleteMember = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus anggota ini? Anggota di bawahnya akan dialihkan ke atasan anggota ini.')) {
            router.delete(route('admin.organization.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Struktur Organisasi" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Struktur Organisasi</h1>
                    <p className="text-sm text-gray-500">Kelola hierarki dan bagan organisasi secara interaktif.</p>
                </div>
                <button
                    onClick={() => openCreateModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Root Baru
                </button>
            </div>

            <div className="bg-white/50 rounded-3xl p-6 md:p-8 min-h-[500px] overflow-x-auto">
                <div className="min-w-[600px]">
                    {treeData.length > 0 ? (
                        treeData.map(node => (
                            <OrgMemberNode
                                key={node.id}
                                node={node}
                                onAddSubordinate={openCreateModal}
                                onEdit={openEditModal}
                                onDelete={deleteMember}
                                t={t}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="font-medium">Belum ada struktur organisasi.</p>
                            <button onClick={() => openCreateModal()} className="text-blue-600 hover:underline mt-2 text-sm">
                                Buat anggota pertama
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">
                                {editingMember ? 'Edit Anggota' : 'Tambah Anggota Baru'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    placeholder="Masukkan nama..."
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    placeholder="Masukkan jabatan..."
                                    required
                                />
                                <p className="text-[10px] text-gray-400 mt-1 italic">*Mendukung translation keys (mis: about.structure.roles.director)</p>
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Atasan</label>
                                    <select
                                        value={data.parent_id}
                                        onChange={(e) => setData('parent_id', e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    >
                                        <option value="">-- Root (Paling Atas) --</option>
                                        {members
                                            .filter(m => !editingMember || m.id !== editingMember.id) // Prevent self-parenting
                                            .map((m) => (
                                                <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                                            ))}
                                    </select>
                                    {errors.parent_id && <p className="text-red-500 text-xs mt-1">{errors.parent_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Urutan</label>
                                    <input
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    />
                                    {errors.order && <p className="text-red-500 text-xs mt-1">{errors.order}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Foto (Opsional)</label>
                                <div className="flex items-center gap-4">
                                    {(editingMember?.photo_path || data.photo) && (
                                        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                            {data.photo ? (
                                                <img src={URL.createObjectURL(data.photo)} className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={`/storage/${editingMember?.photo_path}`} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setData('photo', e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                                        accept="image/*"
                                    />
                                </div>
                                {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm disabled:opacity-50 shadow-lg shadow-blue-200"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
