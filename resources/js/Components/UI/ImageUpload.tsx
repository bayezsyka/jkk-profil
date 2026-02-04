import React, { useState, useEffect, useRef } from 'react';

interface ImageUploadProps {
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    initialPreview?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange, error, initialPreview }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreview || null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
            // Format file size
            const bytes = file.size;
            if (bytes >= 1048576) {
                setFileSize(`${(bytes / 1048576).toFixed(2)} MB`);
            } else {
                setFileSize(`${(bytes / 1024).toFixed(2)} KB`);
            }
            // Reset preview and progress when new file is selected
            setPreviewUrl(null);
            setProgress(0);
        }
    };

    const simulateUpload = () => {
        if (!selectedFile) return;

        setUploading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    // Show preview after "upload"
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                        onChange(selectedFile);
                    };
                    reader.readAsDataURL(selectedFile);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileSize(null);
        setProgress(0);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                {!previewUrl && !uploading && (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600 font-medium">Klik untuk memilih atau tarik dan lepas</p>
                            <p className="text-xs text-gray-400">PNG, JPG, WEBP hingga 2MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                            id="thumbnail-upload"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm bg-white border border-gray-300 rounded-md px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                        >
                            Pilih Gambar
                        </button>
                    </div>
                )}

                {selectedFile && !previewUrl && !uploading && (
                    <div className="flex flex-col items-center space-y-4 py-2">
                        <div className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-sm border border-gray-200 w-full max-w-sm">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">{fileSize}</p>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={simulateUpload}
                            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all shadow-sm"
                        >
                            Unggah Foto
                        </button>
                    </div>
                )}

                {uploading && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-6">
                        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-medium">Memproses... {progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500">Mengoptimalkan ukuran gambar: {fileSize}</p>
                    </div>
                )}

                {previewUrl && !uploading && (
                    <div className="relative group">
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-md border border-gray-200" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-white p-2 rounded-full text-gray-700 hover:text-blue-600 shadow-lg"
                                    title="Ganti Gambar"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="bg-white p-2 rounded-full text-red-500 hover:text-red-700 shadow-lg"
                                    title="Hapus Gambar"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center px-1">
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                {selectedFile?.name || 'Gambar Saat Ini'}
                            </p>
                            {fileSize && <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{fileSize}</p>}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default ImageUpload;
