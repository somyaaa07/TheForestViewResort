import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

const BlogFrontend = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://theforestviewresort.com/api/categories.php");
      const data = await res.json();
      setCategories([{ id: "all", name: "All Categories" }, ...data.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let url = "https://theforestviewresort.com/api/posts.php";
      const params = [];

      if (selectedCategory !== "all") params.push(`category_id=${selectedCategory}`);
      if (searchQuery.trim()) params.push(`q=${encodeURIComponent(searchQuery.trim())}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();

      setBlogs(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    fetchBlogs();
    setShowMobileFilter(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setTimeout(fetchBlogs, 100);
    setShowMobileFilter(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFAFA", fontFamily: "'Jost', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Marcellus', serif; }
        .font-body { font-family: 'Jost', sans-serif; }
      `}</style>

      {/* Hero Header - With Background Image */}
      <header className="relative text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/19.jpeg"
            alt="Blog header background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 backdrop-blur-lg opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
          <div className="text-center">
            <p className="font-body uppercase tracking-[0.3em] text-xs sm:text-sm text-emerald-100 mb-3 sm:mb-4">
              Journal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-5 drop-shadow-lg tracking-wide">
              Discover Our Blog
            </h1>
            <p className="font-body font-light text-base sm:text-lg lg:text-xl text-emerald-50 max-w-2xl mx-auto drop-shadow-md">
              Explore insights, trends, and expert articles curated just for you
            </p>
          </div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div
          className="rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-emerald-900/5"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="font-body w-full pl-4 pr-12 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-opacity-20 transition-all"
                  style={{ backgroundColor: "#FFFAFA" }}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-800 hover:bg-emerald-900 text-white p-2 sm:p-2.5 rounded-lg transition-colors"
                >
                  <Search size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Category Dropdown */}
            <div className="hidden lg:block">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="font-body w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-opacity-20 cursor-pointer font-medium text-emerald-800 transition-all appearance-none pr-10"
                style={{
                  backgroundColor: "#FFFAFA",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23065f46'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="font-body lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium transition-colors"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>

          {/* Mobile Category Filter */}
          {showMobileFilter && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-gray-800 text-lg">Categories</h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`font-body px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-emerald-800 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-14 h-14 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-body text-gray-600 text-lg">Loading amazing content...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📝</div>
            <p className="font-display text-2xl text-gray-700 mb-2">No articles found</p>
            <p className="font-body text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-900/5"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={blog.image_path}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm font-body">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                      {blog.category_name}
                    </span>
                    <span className="text-gray-500">{blog.created_at}</span>
                  </div>

                  <h2 className="font-display text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900 line-clamp-2 group-hover:text-emerald-800 transition-colors tracking-wide">
                    {blog.title}
                  </h2>

                  <p className="font-body font-light text-sm sm:text-base text-gray-600 line-clamp-3 mb-4">
                    {blog.content}
                  </p>

                  <a
                    href={`/blog/${blog.id}`}
                    className="font-body inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-900 font-medium text-sm sm:text-base group/link transition-colors"
                  >
                    <span>Read More</span>
                    <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer Wave */}
      <div className="mt-12 sm:mt-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path fill="#065f46" fillOpacity="0.1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default BlogFrontend;