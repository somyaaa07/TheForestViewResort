import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Eye,
  MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------
   Forest View Resort — Journal / Blog Detail
   Palette:  forest #004225 · cream #FBF8F2 · brass #B8935F · sage #E9EEE8 · ink #1F2A22
   Type:     Marcellus (display serif) + Jost (body sans)
------------------------------------------------------------------- */

const HairlineDivider = () => (
  <div className="flex items-center justify-center gap-4 my-2" aria-hidden="true">
    <span className="h-px w-16 bg-[#B8935F]/50" />
    <span className="w-1.5 h-1.5 rotate-45 bg-[#B8935F]" />
    <span className="h-px w-16 bg-[#B8935F]/50" />
  </div>
);

// Turns plain (non-HTML) text into proper <p> paragraphs so long-form
// content never renders as one unbroken block. If the string already
// contains HTML tags, it's left untouched.
const formatToHtml = (text) => {
  if (!text) return "";
  const trimmed = text.trim();
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  if (looksLikeHtml) return trimmed;

  let paragraphs;
  if (trimmed.includes("\n")) {
    paragraphs = trimmed.split(/\n+/);
  } else {
    // No line breaks at all — fall back to splitting before numbered
    // list markers ("1. ", "2. " ...) so lists don't run together.
    paragraphs = trimmed.split(/(?=\s\d+\.\s)/);
  }

  return paragraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${p}</p>`)
    .join("");
};

// A short quote (a real excerpt/deck) gets the centered italic pull-quote
// treatment. Anything longer is treated as the actual article body.
const EXCERPT_WORD_LIMIT = 55;

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`https://theforestviewresort.com/api/post_detail.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog details");
        return res.json();
      })
      .then((data) => {
        setBlog(data.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Unable to load this story.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (blog?.title) document.title = `${blog.title} | Forest View Journal`;
  }, [blog]);

  const fonts = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600;700&display=swap');
      .ffv-display { font-family: 'Marcellus', serif; }
      .ffv-body { font-family: 'Jost', sans-serif; }
      .ffv-dropcap::first-letter {
        font-family: 'Marcellus', serif;
        float: left;
        font-size: 4.5rem;
        line-height: 0.85;
        padding-right: 0.5rem;
        padding-top: 0.25rem;
        color: #004225;
      }
    `}</style>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] ffv-body">
        {fonts}
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-2 border-[#B8935F]/30 border-t-[#004225] mb-6"></div>
          <p className="text-lg tracking-wide text-[#004225]">Preparing your story…</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] p-4 ffv-body">
        {fonts}
        <div className="text-center bg-white p-12 border border-[#B8935F]/30 max-w-md">
          <p className="ffv-display text-3xl text-[#004225] mb-3">Page not found</p>
          <p className="text-[#1F2A22]/70 mb-8">{error}</p>
          <Link
            to="/blog"
            className="inline-block px-8 py-3 border border-[#004225] text-[#004225] tracking-wide hover:bg-[#004225] hover:text-white transition-colors duration-300"
          >
            Return to the Journal
          </Link>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F2] ffv-body">
        {fonts}
        <p className="text-[#1F2A22]/60 text-xl">Story not found.</p>
      </div>
    );

  // Decide what "body" actually is: a genuine short excerpt, or the
  // full article text (in which case it should NOT get quote styling).
  const bodyWordCount = blog.body ? blog.body.trim().split(/\s+/).length : 0;
  const bodyIsExcerpt = blog.body && bodyWordCount <= EXCERPT_WORD_LIMIT;

  const hasSeparateContent = blog.content && blog.content.trim().length > 0;

  // Prefer a real `content` field for the main article; if there isn't
  // one, fall back to `body` — but only when body isn't the short excerpt.
  const articleSource = hasSeparateContent
    ? blog.content
    : bodyIsExcerpt
    ? ""
    : blog.body;

  const articleHtml = formatToHtml(articleSource);

  // Rough reading time based on actual word count instead of a fixed number.
  const wordCount = articleSource ? articleSource.trim().split(/\s+/).length : 0;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="min-h-screen bg-[#FBF8F2] ffv-body">
      {fonts}

      {/* Top bar */}
  

      {/* Hero — full-bleed image with title overlaid directly on it */}
      <div className="relative w-full h-[62vh] min-h-[380px] max-h-[600px] overflow-hidden">
        <img
          src={blog.image_path}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A22]/95 via-[#1F2A22]/25 to-[#1F2A22]/10" />

        {blog.category_name && (
          <span className="absolute top-6 left-6 sm:left-10 text-[11px] tracking-[0.25em] uppercase text-white/90 border border-white/40 px-4 py-2">
            {blog.category_name}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 sm:pb-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="ffv-display text-[2rem] sm:text-5xl leading-[1.2] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta bar — sits directly under the image, full width */}
      <div className="bg-[#FBF8F2] border-b border-[#B8935F]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] tracking-wide text-[#1F2A22]/60 uppercase">
          <span className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#B8935F]" />
            {blog.published_at}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B8935F]" />
            {readingMinutes} min read
          </span>
          <span className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#B8935F]" />
            2.4k views
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5 text-[#B8935F]" />
            34 comments
          </span>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10">
        <article className="pt-10 max-w-6xl mx-auto">
          {/* Excerpt — only shown when body is genuinely a short pull-quote */}
          {bodyIsExcerpt && (
            <>
              <p className="ffv-display text-xl sm:text-2xl text-center leading-relaxed text-[#004225] italic mt-10 mb-4 px-2 sm:px-8">
                “{blog.body}”
              </p>
              <HairlineDivider />
            </>
          )}

          {/* Body content — left-aligned, proper paragraphs */}
          {articleHtml && (
            <div
              className="ffv-dropcap mt-10 text-left text-[1.05rem] leading-[1.85] text-[#1F2A22]/90
                         [&_p]:mb-5 [&_p]:not-italic [&_p]:text-left
                         [&_h2]:ffv-display [&_h2]:text-[#004225] [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
                         [&_h3]:ffv-display [&_h3]:text-[#004225] [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3
                         [&_a]:text-[#004225] [&_a]:underline [&_a]:decoration-[#B8935F] [&_a]:underline-offset-4
                         [&_strong]:text-[#004225] [&_img]:my-8 [&_img]:border [&_img]:border-[#B8935F]/30
                         [&_blockquote]:border-l-2 [&_blockquote]:border-[#B8935F] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[#004225]"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          )}

          {/* Engagement row */}
          <div className="mt-16 pt-8 border-t border-[#B8935F]/25 flex flex-wrap items-center justify-between gap-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 text-sm tracking-[0.1em] uppercase transition-colors duration-300 ${
                isLiked ? "text-[#B8935F]" : "text-[#004225]/60 hover:text-[#004225]"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like this story"}
            </button>

            <div className="flex items-center gap-5">
              <button className="text-[#004225]/60 hover:text-[#004225] transition-colors duration-300">
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`transition-colors duration-300 ${
                  isBookmarked ? "text-[#B8935F]" : "text-[#004225]/60 hover:text-[#004225]"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Author */}
          <div className="mt-10 mb-16 flex items-center gap-5 py-6 px-6 bg-[#E9EEE8]">
            <div className="w-14 h-14 flex items-center justify-center bg-[#004225] text-[#FBF8F2] ffv-display text-2xl">
              A
            </div>
            <div>
              <p className="ffv-display text-lg text-[#004225]">Admin</p>
              <p className="text-sm text-[#1F2A22]/60">Storyteller, Forest View Resort</p>
            </div>
          </div>
        </article>

        {/* Back link */}
        <div className="text-center pb-20">
          <HairlineDivider />
          <Link
            to="/blog"
            className="inline-block mt-8 px-10 py-3.5 border border-[#004225] text-[#004225] text-sm tracking-[0.15em] uppercase hover:bg-[#004225] hover:text-white transition-colors duration-300"
          >
            More from the Journal
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;