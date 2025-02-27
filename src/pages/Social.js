import React, { useState } from 'react';
import { FaUser, FaComment, FaHeart, FaShare, FaLightbulb, FaBookmark, FaCalendar, FaFileAlt, FaTimes } from 'react-icons/fa';
import '../styles/Social.css';

const Social = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson, CPA",
        avatar: "https://via.placeholder.com/40",
        role: "Tax Expert",
        verified: true
      },
      content: "📢 Important Tax Update: New deduction limits for 2024!\n\nKey changes:\n- Standard deduction increased to $13,850 for single filers\n- 401(k) contribution limit raised to $23,000\n- HSA contribution limit up to $4,150\n\nStart planning your deductions early! #TaxPlanning2024 #DeductionUpdates",
      likes: 245,
      comments: 52,
      timestamp: "2h ago",
      tags: ["TaxUpdate", "Deductions2024", "TaxPlanning"]
    },
    {
      id: 2,
      user: {
        name: "David Chen, MBA",
        avatar: "https://via.placeholder.com/40",
        role: "Small Business Tax Advisor",
        verified: true
      },
      content: "🔍 Self-employed? Don't miss these deductions:\n\n✅ Home office expenses\n✅ Health insurance premiums\n✅ Retirement contributions\n✅ Professional development\n✅ Business equipment\n\nUse TaxBuddy's deduction finder tool to identify more savings opportunities! #SelfEmployed #BusinessTax",
      likes: 189,
      comments: 34,
      timestamp: "4h ago",
      tags: ["SelfEmployed", "TaxDeductions", "BusinessTax"]
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://via.placeholder.com/40",
        role: "Tax Law Specialist",
        verified: true
      },
      content: "🚨 Tax Deadline Alert 🚨\n\nQ1 2024 estimated tax payments due soon!\n\nReminder: Set up your payment through:\n1. IRS Direct Pay\n2. EFTPS\n3. Credit/Debit Card\n\nAvoid penalties by paying on time. Need help calculating? Use our estimator tool! #TaxDeadlines #EstimatedTax",
      likes: 156,
      comments: 28,
      timestamp: "6h ago",
      tags: ["TaxDeadlines", "EstimatedTax", "TaxPrepTips"]
    }
  ]);

  const trendingTopics = [
    { tag: "#TaxSeason2024", count: "2.3K posts" },
    { tag: "#TaxDeductions", count: "1.8K posts" },
    { tag: "#SmallBizTax", count: "956 posts" },
    { tag: "#TaxCredits", count: "845 posts" },
    { tag: "#1040Updates", count: "732 posts" }
  ];

  const upcomingDeadlines = [
    { date: "Jan 15, 2024", event: "Q4 2023 Estimated Tax Due" },
    { date: "Jan 31, 2024", event: "W-2 and 1099 Forms Due" },
    { date: "Apr 15, 2024", event: "Federal Tax Return Due" },
    { date: "Jun 15, 2024", event: "Q2 2024 Estimated Tax Due" }
  ];

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    username: '',
    title: '',
    description: '',
    hashtags: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPost = () => {
    if (!newPost.username.trim() || !newPost.description.trim()) return;

    const hashtags = newPost.hashtags
      .split(' ')
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.slice(1));

    const newPostObj = {
      id: Date.now(),
      user: {
        name: newPost.username,
        avatar: "https://via.placeholder.com/40",
        role: "Community Member",
        verified: false
      },
      content: `${newPost.title ? newPost.title + '\n\n' : ''}${newPost.description}`,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      tags: hashtags
    };

    setPosts([newPostObj, ...posts]);
    setNewPost({
      username: '',
      title: '',
      description: '',
      hashtags: ''
    });
    setShowCreatePost(false);
  };

  return (
    <div className="social-container fade-in">
      <div className="social-content">
        {!showCreatePost ? (
          <div className="create-post" onClick={() => setShowCreatePost(true)}>
            <FaLightbulb className="post-icon" />
            <input 
              type="text" 
              placeholder="Share your tax knowledge or ask a question..." 
              readOnly
            />
            <button className="post-button">Share</button>
          </div>
        ) : (
          <div className="create-post-expanded">
            <div className="create-post-header">
              <FaLightbulb className="post-icon" />
              <h3>Create a Post</h3>
              <button 
                className="close-button"
                onClick={() => setShowCreatePost(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="create-post-form">
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={newPost.username}
                onChange={handleInputChange}
                className="post-input"
              />
              <input
                type="text"
                name="title"
                placeholder="Post Title (optional)"
                value={newPost.title}
                onChange={handleInputChange}
                className="post-input"
              />
              <textarea
                name="description"
                placeholder="Share your thoughts..."
                value={newPost.description}
                onChange={handleInputChange}
                className="post-textarea"
                rows={4}
              />
              <input
                type="text"
                name="hashtags"
                placeholder="Add hashtags (e.g., #TaxTips #Finance)"
                value={newPost.hashtags}
                onChange={handleInputChange}
                className="post-input"
              />
              <div className="post-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowCreatePost(false)}
                >
                  Cancel
                </button>
                <button 
                  className="post-button"
                  onClick={handleSubmitPost}
                  disabled={!newPost.username.trim() || !newPost.description.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="posts-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card slide-up">
              <div className="post-header">
                <div className="user-info">
                  <img src={post.user.avatar} alt={post.user.name} className="user-avatar" />
                  <div>
                    <h3>{post.user.name} {post.user.verified && <span className="verified-badge">✓</span>}</h3>
                    <span className="user-role">{post.user.role}</span>
                  </div>
                </div>
                <span className="post-time">{post.timestamp}</span>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="post-actions">
                <button><FaHeart /> {post.likes}</button>
                <button><FaComment /> {post.comments}</button>
                <button><FaBookmark /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="social-sidebar">
        <div className="sidebar-card trending-topics">
          <h3><FaLightbulb /> Trending in Tax</h3>
          <div className="trending-list">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="trending-item">
                <span className="trend-tag">{topic.tag}</span>
                <span className="trend-count">{topic.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-card tax-deadlines">
          <h3><FaCalendar /> Upcoming Deadlines</h3>
          <div className="deadline-list">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="deadline-item">
                <div className="deadline-date">{deadline.date}</div>
                <div className="deadline-event">{deadline.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
