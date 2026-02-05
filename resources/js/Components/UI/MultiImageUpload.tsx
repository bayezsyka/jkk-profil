import React, { useState, useRef } from 'react';
import { convertToWebP, formatBytes } from '@/Utils/imageUtils';

interface FileState {
    id: string;
    originalFile: File;
    processedFile: File | null;
    progress: number;
    processedSize: number;
    previewUrl: string | null;
    status: 'pending' | 'processing' | 'done' | 'error';
}

interface MultiImageUploadProps {
    label: string;
    onChange: (files: File[]) => void;
    error?: string;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ label, onChange, error }) => {
    const [files, setFiles] = useState<FileState[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        if (selectedFiles.length === 0) return;

        const newFileStates: FileState[] = selectedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            originalFile: file,
            processedFile: null,
            progress: 0,
            processedSize: 0,
            previewUrl: URL.createObjectURL(file),
            status: 'pending',
        }));

        setFiles(prev => [...prev, ...newFileStates]);
        
        // Reset input so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const processFile = async (id: string) => {
        const fileState = files.find(f => f.id === id);
        if (!fileState || fileState.status !== 'pending') return;

        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'processing' as const } : f));

        try {
            const totalSize = fileState.originalFile.size;
            let currentProcessed = 0;
            
            const interval = setInterval(() => {
                currentProcessed += totalSize * 0.15;
                if (currentProcessed >= totalSize) {
                    currentProcessed = totalSize;
                    clearInterval(interval);
                }
                setFiles(prev => prev.map(f => f.id === id ? { 
                    ...f, 
                    processedSize: currentProcessed,
                    progress: Math.round((currentProcessed / totalSize) * 100)
                } : f));
            }, 100);

            const webpFile = await convertToWebP(fileState.originalFile);
            
            clearInterval(interval);
            const newPreviewUrl = URL.createObjectURL(webpFile);

            setFiles(prev => {
                const updated = prev.map(f => f.id === id ? { 
                    ...f, 
                    status: 'done' as const, 
                    processedFile: webpFile, 
                    progress: 100,
                    processedSize: totalSize,
                    previewUrl: newPreviewUrl 
                } : f);
                
                // Trigger onChange with all processed files
                const allProcessedFiles = updated.filter(f => f.status === 'done').map(f => f.processedFile as File);
                onChange(allProcessedFiles);
                
                return updated;
            });

        } catch (err) {
            console.error('Image processing failed:', err);
            setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error' as const } : f));
        }
    };

    const removeFile = (id: string) => {
        setFiles(prev => {
            const filtered = prev.filter(f => f.id !== id);
            const allProcessedFiles = filtered.filter(f => f.status === 'done').map(f => f.processedFile as File);
            onChange(allProcessedFiles);
            return filtered;
        });
    };

    const startAll = () => {
        files.filter(f => f.status === 'pending').forEach(f => processFile(f.id));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <label className="block text-sm font-bold text-slate-700">{label}</label>
                    <p className="text-xs text-slate-500">Unggah satu atau beberapa foto sekaligus</p>
                </div>
                {files.some(f => f.status === 'pending') && (
                    <button
                        type="button"
                        onClick={startAll}
                        className="text-xs bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-600 shadow-sm transition-all"
                    >
                        Proses Semua
                    </button>
                )}
            </div>

            <div 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="text-sm text-slate-600 font-bold">Klik untuk menambah foto</p>
                    <p className="text-xs text-slate-400">Gunakan format JPG, PNG, atau WebP</p>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {files.map((file) => (
                        <div key={file.id} className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
                            <div className="flex p-3 gap-4">
                                {/* Thumbnail */}
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                                    {file.previewUrl ? (
                                        <img src={file.previewUrl} className="w-full h-full object-cover" alt="preview" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <p className="text-sm font-bold text-slate-900 truncate pr-6">{file.originalFile.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">{formatBytes(file.originalFile.size)}</p>
                                    
                                    {file.status === 'processing' && (
                                        <div className="mt-2">
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div 
                                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                                    style={{ width: `${file.progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-[10px] text-blue-600 font-mono mt-1">
                                                {formatBytes(file.processedSize)} / {formatBytes(file.originalFile.size)}
                                            </p>
                                        </div>
                                    )}

                                    {file.status === 'done' && (
                                        <div className="mt-1 flex items-center text-emerald-600">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Teroptimasi</span>
                                        </div>
                                    )}

                                    {file.status === 'pending' && (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); processFile(file.id); }}
                                            className="mt-2 text-[10px] text-blue-600 font-bold hover:underline uppercase tracking-wider"
                                        >
                                            Klik untuk optimasi
                                        </button>
                                    )}
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="flex items-center space-x-2 text-red-500 text-xs mt-2 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default MultiImageUpload;
