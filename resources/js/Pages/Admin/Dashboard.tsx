import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                <div className="text-gray-600">
                    Welcome to the admin panel.
                </div>
            </div>
        </AdminLayout>
    );
}
