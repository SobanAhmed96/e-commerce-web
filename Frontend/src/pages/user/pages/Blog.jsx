import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Summer Fashion Trends 2025",
      excerpt:
        "Discover the hottest summer fashion trends for 2025 and upgrade your wardrobe with these must-have styles.",
      image: "https://source.unsplash.com/400x250/?fashion",
      date: "Nov 11, 2025",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Sneakers",
      excerpt:
        "A complete guide to choosing comfortable and stylish sneakers for every occasion.",
      image: "https://source.unsplash.com/400x250/?sneakers",
      date: "Nov 5, 2025",
    },
    {
      id: 3,
      title: "10 Tips for Smart Online Shopping",
      excerpt:
        "Learn how to shop smart online, save money, and avoid common mistakes while buying products online.",
      image: "https://source.unsplash.com/400x250/?shopping",
      date: "Oct 28, 2025",
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">MyShop Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
