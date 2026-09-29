import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Doudy Store - Admin",
    description: "Doudy Store - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
