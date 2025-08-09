// app/dashboard/page.tsx
export default function page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
      {/* Sidebar */}
      {/* <aside className="bg-white w-full md:w-64 p-4 border-r">
        <div className="flex items-center space-x-2 mb-8">
          <div className="text-blue-600 font-bold text-xl">📘 BookWise</div>
        </div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center px-3 py-2 rounded bg-blue-100 text-blue-700 font-medium">
            Home
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-100">
            All Users
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-100">
            All Books
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-100">
            Borrow Records
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-100">
            Account Requests
          </a>
        </nav>
      </aside> */}

      {/* Main */}
      <main className="flex-1 p-4 space-y-6">
        {/* Header */}
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"> */}
          {/* <div>
            <h1 className="text-xl font-semibold">Faizan</h1>
            <p className="text-gray-500">Monitor all of your projects and tasks here</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search users, books..."
              className="border rounded px-3 py-2 w-full md:w-64"
            />
          </div>
        </div> */}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Borrowed Books</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">05</div>
              <div className="text-green-500 text-sm">+5</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">20</div>
              <div className="text-green-500 text-sm">+16</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total Books</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">17</div>
              <div className="text-red-500 text-sm">-17</div>
            </div>
          </div>
        </div>

        {/* Borrow Requests & Recently Added */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Borrow Requests */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Borrow Requests</h2>
              <a href="#" className="text-blue-500 text-sm">View All</a>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "CSS in Depth",
                  author: "Keith J. Grant",
                  category: "Web Development",
                  user: "Sujata Gunle",
                  date: "Jan 02, 2025",
                },
                {
                  title: "Computer Science Distilled",
                  author: "Wladston Ferreira Filho",
                  category: "Computer Science",
                  user: "Sujata Gunle",
                  date: "Jan 02, 2025",
                },
                {
                  title: "Algorithms",
                  author: "Robert Sedgewick",
                  category: "Computer Science",
                  user: "Sujata Gunle",
                  date: "Jan 02, 2025",
                },
              ].map((book, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-10 h-14 bg-gray-200 rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{book.title}</div>
                    <div className="text-xs text-gray-500">
                      {book.author} • {book.category}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {book.user} • {book.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recently Added Books</h2>
              <a href="#" className="text-blue-500 text-sm">View All</a>
            </div>
            <button className="w-full flex items-center justify-center border border-dashed border-gray-300 py-2 rounded text-gray-500 hover:bg-gray-50 mb-4">
              + Add New Book
            </button>
            <div className="space-y-4">
              {[
                {
                  title: "CSS in Depth",
                  author: "Keith J. Grant",
                  category: "Web Development",
                  date: "Jan 02, 2025",
                },
                {
                  title: "HTML and CSS: Design and Build Websites",
                  author: "Jon Duckett",
                  category: "Web Development",
                  date: "Jan 02, 2025",
                },
                {
                  title: "System Design Interview",
                  author: "Various",
                  category: "Computer Science",
                  date: "Jan 02, 2025",
                },
              ].map((book, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-10 h-14 bg-gray-200 rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{book.title}</div>
                    <div className="text-xs text-gray-500">
                      {book.author} • {book.category}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{book.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
