import React, { useState, useEffect, useRef } from 'react';
import { convertToWebP, formatBytes } from '@/Utils/imageUtils';

interface ImageUploadProps {
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    initialPreview?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange, error, initialPreview }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
        if (!initialPreview) return null;
        if (initialPreview.startsWith('http') || initialPreview.startsWith('data:')) return initialPreview;
        return `/storage/${initialPreview}`;
    });
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processedSize, setProcessedSize] = useState<number>(0);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialPreview && !selectedFile) {
            const url = (initialPreview.startsWith('http') || initialPreview.startsWith('data:')) 
                ? initialPreview 
                : `/storage/${initialPreview}`;
            setPreviewUrl(url);
        }
    }, [initialPreview]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            // Simulate progress for UI feedback while converting
            const totalSize = selectedFile.size;
            let currentProcessed = 0;
            
            const interval = setInterval(() => {
                currentProcessed += totalSize * 0.1;
                if (currentProcessed >= totalSize) {
                    currentProcessed = totalSize;
                    clearInterval(interval);
                }
                setProcessedSize(currentProcessed);
                setProgress(Math.round((currentProcessed / totalSize) * 100));
            }, 100);

            // Actual conversion
            const webpFile = await convertToWebP(selectedFile);
            
            clearInterval(interval);
            setProgress(100);
            setProcessedSize(totalSize);
            
            setTimeout(() => {
                setUploading(false);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                    onChange(webpFile);
                };
                reader.readAsDataURL(webpFile);
            }, 500);

        } catch (err) {
            console.error('Image processing failed:', err);
            setUploading(false);
            alert('Gagal memproses gambar. Pastikan file yang diunggah adalah gambar yang valid.');
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
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            
            <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${
                previewUrl ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300'
            }`}>
                {!previewUrl && !uploading && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-600 font-semibold uppercase tracking-wider">Pilih Thumbnail</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP • Max 10MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5"
                        >
                            Cari File
                        </button>
                    </div>
                )}

                {selectedFile && !previewUrl && !uploading && (
                    <div className="flex flex-col items-center space-y-4 py-2">
                        <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-slate-500 font-medium">{fileSize}</p>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={processImage}
                            className="w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-100 hover:-translate-y-0.5"
                        >
                            Unggah & Konversi
                        </button>
                    </div>
                )}

                {uploading && (
                    <div className="flex flex-col items-center justify-center space-y-6 py-8">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-slate-100"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    strokeDasharray={2 * Math.PI * 40}
                                    strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    className="text-blue-600 transition-all duration-300"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-slate-800">{progress}%</span>
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-sm font-bold text-slate-800">Sedang Mengoptimalkan...</p>
                            <p className="text-xs text-slate-500 font-medium tracking-wide font-mono">
                                {formatBytes(processedSize)} / {fileSize}
                            </p>
                        </div>
                    </div>
                )}

                {previewUrl && !uploading && (
                    <div className="relative group">
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-full h-64 object-cover rounded-2xl border border-slate-200" 
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center text-white">
                                <div className="text-xs">
                                    <p className="font-bold truncate max-w-[200px]">{selectedFile?.name || 'Gambar Terpilih'}</p>
                                    <p className="opacity-80">Converted to WebP • {fileSize}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white/20 backdrop-blur-md p-2 rounded-xl hover:bg-white/30 transition-colors"
                                        title="Ganti Gambar"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="bg-red-500/80 p-2 rounded-xl hover:bg-red-500 transition-colors shadow-lg"
                                        title="Hapus Gambar"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

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

export default ImageUpload;
