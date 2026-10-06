export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-sm px-6 py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <a href="/admin/blogs" className="text-blue-600 hover:underline">Blogs</a>
            <a href="/" className="text-gray-600 hover:underline">Back to Site</a>
          </div>
        </div>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
