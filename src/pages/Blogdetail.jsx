import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  Heart,
  Eye,
  MessageCircle,
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`https://theforestviewresort.com/api/post_detail.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog details");
        return res.json();
      })
      .then((data) => {
        setBlog(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Unable to load blog details.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-[#004225] mb-6"></div>
          <p className="text-xl font-semibold text-[#004225] animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border-2 border-red-100 max-w-md">
          <div className="text-red-500 text-7xl mb-6">⚠️</div>
          <p className="text-red-600 text-2xl font-bold mb-6">{error}</p>
          <Link
            to="/blog"
            className="inline-block px-8 py-4 bg-[#004225] text-white rounded-full font-semibold hover:bg-[#003319] transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Return to Blogs
          </Link>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-2xl">Blog not found.</p>
      </div>
    );


  return (
    
    <div className="min-h-screen bg-white">
         <Helmet>
        <title>{blog.title} | Safar Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      {/* Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/98 border-b-2 border-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="flex items-center gap-3 text-[#004225] hover:text-[#003319] font-semibold transition-all duration-300 group"
            >
              <div className="p-2 rounded-full bg-[#004225]/5 group-hover:bg-[#004225]/10 transition-all">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <span className="text-lg">Back to Blogs</span>
            </Link>
         
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isBookmarked
                    ? "bg-[#004225] text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all duration-300 transform hover:scale-110">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-gray-100 bg-white">
          <img
            src={blog.image_path}
            alt={blog.title}
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Floating Category Badge */}
          <div className="absolute top-8 left-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#004225] text-white font-bold text-base shadow-2xl border-2 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <Tag className="w-5 h-5" />
              {blog.category_name || "General"}
            </span>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
              <Eye className="w-4 h-4 text-[#004225]" />
              <span className="font-semibold text-[#004225]">2.4k</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
              <MessageCircle className="w-4 h-4 text-[#004225]" />
              <span className="font-semibold text-[#004225]">34</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article className="bg-white rounded-3xl shadow-2xl p-8 md:p-14 border-4 border-gray-50">
          {/* Title with Decorative Element */}
          <div className="relative mb-8">
            <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-[#004225] rounded-full"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#004225] leading-tight tracking-tight">
              {blog.title}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 pb-8 mb-10 border-b-2 border-gray-100">
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-2.5 rounded-full">
              <div className="p-2 bg-[#004225] rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Admin</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-2.5 rounded-full">
              <div className="p-2 bg-[#004225] rounded-full">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{blog.published_at}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-2.5 rounded-full">
              <div className="p-2 bg-[#004225] rounded-full">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">5 min read</span>
            </div>
          </div>

          {/* Excerpt with Enhanced Design */}
          {blog.body && (
            <div className="mb-10 p-8 bg-[#004225]/5 rounded-2xl border-l-8 border-[#004225] shadow-inner">
              <p className="text-xl text-gray-800 leading-relaxed italic font-medium">
                "{blog.body}"
              </p>
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose prose-xl max-w-none prose-headings:text-[#004225] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#004225] prose-a:font-semibold hover:prose-a:text-[#003319] prose-strong:text-[#004225] prose-strong:font-bold prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border-4 prose-img:border-gray-100"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Engagement Section */}
          <div className="mt-14 pt-10 border-t-2 border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isLiked
                    ? "bg-red-500 text-white shadow-2xl"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-lg"
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-current animate-pulse" : ""}`} />
                <span>{isLiked ? "Liked ❤️" : "Like this post"}</span>
              </button>
              <div className="flex gap-4">
                <button className="p-4 rounded-full bg-[#004225]/10 text-[#004225] hover:bg-[#004225]/20 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Share2 className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    isBookmarked
                      ? "bg-[#004225] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Bookmark
                    className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl border-2 border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#004225] flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                A
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#004225] mb-1">Admin</h3>
                <p className="text-gray-600 text-base">Content Creator & Storyteller</p>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#004225] text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:bg-[#003319] transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
            Explore More Articles
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;