import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { usePage, useForm } from '@inertiajs/react'; // Tambahkan useForm
import { PageProps } from '@/types';

// PageProps sudah menyertakan definisi Company yang benar (dari types/index.d.ts)
interface ContactPageProps extends PageProps {}

const Contact: React.FC = () => {
    const { t } = useLanguage();
    // Gunakan generic yang sudah diperbaiki
    const { company } = usePage<ContactPageProps>().props;

    // Gunakan useForm dari Inertia untuk handling form yang lebih powerful
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ganti route('contact.send') dengan nama route yang sesuai di backend Anda
        // preserveScroll: true agar halaman tidak loncat ke atas saat ada error
        post('/contact-submit', { // Atau gunakan route('...')
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert('Pesan berhasil dikirim!'); // Bisa diganti dengan Flash Message/Toast
            },
        });
    };

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: t('nav.contact') }
    ];

    // Fallback URL peta jika di database kosong (Contoh: Monas Jakarta)
    // Ganti src ini dengan Embed Link dari Google Maps lokasi kantor asli Anda
    const defaultMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08660317371!2d106.729707!3d-6.284027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Special%20Capital%20Region%20of%20Jakarta!5e0!3m2!1sen!2sid!4v1611646278912!5m2!1sen!2sid";
    
    // Gunakan URL dari database jika ada, jika tidak gunakan default
    const mapSrc = company?.maps_embed_url || defaultMapUrl;

    return (
        <PublicLayout
            title={`${t('contact.title')} - JKK`}
            headerTitle={t('contact.title')}
            breadcrumbs={breadcrumbs}
        >
            <div className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        
                        {/* LEFT COLUMN: CONTACT DETAILS + MAP */}
                        <div className="w-full lg:w-5/12 space-y-8">
                            {/* Map Section */}
                            <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200 relative z-0">
                                <iframe 
                                    src={mapSrc}
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi Kantor"
                                ></iframe>
                            </div>

                            {/* Details Card */}
                            <div className="bg-blue-50/50 p-8 rounded-xl border border-blue-100">
                                <h3 className="text-xl font-bold text-[#1e3a8a] mb-6 border-b border-blue-100 pb-4">
                                    Kantor Pusat PT Jaya Karya Kontruksi
                                </h3>
                                
                                <div className="space-y-6">
                                    {/* Alamat */}
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.office')}</p>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {company?.address || 'Alamat Perusahaan belum diatur.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Telepon */}
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.phone')}</p>
                                            <p className="text-gray-600 text-sm">{company?.phone || '(021) 1234-5678'}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">{t('contact.email')}</p>
                                            <a href={`mailto:${company?.email_1}`} className="text-blue-600 hover:text-blue-700 transition-colors text-sm">
                                                {company?.email_1 || 'info@jkk.co.id'}
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Website */}
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 mb-1">Website</p>
                                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors text-sm">
                                                www.jkk.co.id
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FORM */}
                        <div className="w-full lg:w-7/12">
                            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-gray-700">
                                            {t('contact.form.name')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 ${
                                                errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder={t('contact.form.name')}
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                         <label htmlFor="email" className="text-sm font-bold text-gray-700">
                                            {t('contact.form.email')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 ${
                                                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder={t('contact.form.email')}
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-2">
                                         <label htmlFor="subject" className="text-sm font-bold text-gray-700">
                                            {t('contact.form.subject')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 ${
                                                errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder={t('contact.form.subject')}
                                        />
                                        {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                         <label htmlFor="message" className="text-sm font-bold text-gray-700">
                                            {/* Konsistensi penggunaan t() atau hardcode bahasa Indonesia */}
                                            {t('contact.form.message') || 'Pesan / Pertanyaan'} <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={5}
                                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 resize-none ${
                                                errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                                            }`}
                                            placeholder={t('contact.form.message_placeholder') || 'Tulis pesan Anda disini...'}
                                        />
                                        {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                                    </div>

                                    {/* ReCAPTCHA Placeholder - Dibuat sedikit lebih rapi */}
                                    <div className="p-1 bg-gray-50 rounded-md inline-block">
                                        <div className="border border-gray-300 bg-white rounded p-3 flex items-center gap-3 shadow-sm min-w-[240px]">
                                            <div className="w-6 h-6 border-2 border-gray-300 rounded-sm bg-gray-50"></div>
                                            <span className="text-sm text-gray-600 font-medium">I'm not a robot</span>
                                            <div className="ml-auto flex flex-col items-center">
                                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="w-5 opacity-50"/>
                                                <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button - Diaktifkan */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center ${
                                            processing 
                                            ? 'bg-blue-300 text-white cursor-wait' 
                                            : 'bg-blue-900 hover:bg-blue-800 text-white shadow-lg hover:shadow-blue-900/30'
                                        }`}
                                    >
                                        {processing ? 'Mengirim...' : (t('contact.form.submit') || 'Kirim Pesan')}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Contact;