'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { ImageLightbox } from '@/components/image-lightbox';
import { useAuth } from '@/app/auth-context';
import { db } from '@/firebase';
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, addDoc, query, orderBy, onSnapshot, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';

interface Reply {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: any;
  likes: number;
  likedBy: string[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: any;
  likes: number;
  likedBy: string[];
  replies: Reply[];
  showReplies: boolean;
}

interface MemoryPostCardProps {
  id: number;
  title: string;
  description: string;
  eventName: string;
  date: string;
  location: string;
  images: string[];
  author: string;
  avatar: string;
  role: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export function MemoryPostCard(post: MemoryPostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const postId = post.id.toString();
  const userId = user?.id || 'anonymous';

  const formatCommentDate = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      return 'Just now';
    }
    
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const ensurePostExists = async () => {
    const postRef = doc(db, 'memoryPosts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      await setDoc(postRef, {
        id: post.id,
        title: post.title,
        description: post.description,
        eventName: post.eventName,
        date: post.date,
        location: post.location,
        images: post.images,
        author: post.author,
        avatar: post.avatar,
        role: post.role,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: post.timestamp,
      });
    }
    return postRef;
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!userId || userId === 'anonymous') return;
      const likeRef = doc(db, 'memoryPosts', postId, 'likes', userId);
      const likeDoc = await getDoc(likeRef);
      setIsLiked(likeDoc.exists());
    };
    checkLikeStatus();
  }, [postId, userId]);

  useEffect(() => {
    const postRef = doc(db, 'memoryPosts', postId);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikeCount(data.likes || 0);
        setCommentsCount(data.comments || 0);
      }
    });
    return () => unsubscribe();
  }, [postId]);

  useEffect(() => {
    if (!showComments) return;
    
    const commentsRef = collection(db, 'memoryPosts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const loadedComments: Comment[] = [];
      
      for (const doc of snapshot.docs) {
        const commentData = doc.data();
        
        // Load replies for this comment
        const repliesRef = collection(db, 'memoryPosts', postId, 'comments', doc.id, 'replies');
        const repliesQuery = query(repliesRef, orderBy('createdAt', 'asc'));
        const repliesSnapshot = await getDocs(repliesQuery);
        
        const replies: Reply[] = [];
        repliesSnapshot.forEach((replyDoc) => {
          const replyData = replyDoc.data();
          replies.push({ 
            id: replyDoc.id, 
            ...replyData,
            likes: replyData.likes || 0,
            likedBy: replyData.likedBy || []
          } as Reply);
        });
        
        loadedComments.push({
          id: doc.id,
          userId: commentData.userId,
          userName: commentData.userName,
          text: commentData.text,
          createdAt: commentData.createdAt,
          likes: commentData.likes || 0,
          likedBy: commentData.likedBy || [],
          replies: replies,
          showReplies: false,
        });
      }
      setComments(loadedComments);
    });
    
    return () => unsubscribe();
  }, [postId, showComments]);

  const handleLike = async () => {
    if (!userId || userId === 'anonymous') {
      alert('Please log in to like posts');
      return;
    }
    
    const postRef = await ensurePostExists();
    const likeRef = doc(db, 'memoryPosts', postId, 'likes', userId);
    
    const likeDoc = await getDoc(likeRef);
    const currentlyLiked = likeDoc.exists();
    
    if (currentlyLiked) {
      await deleteDoc(likeRef);
      await updateDoc(postRef, { likes: increment(-1) });
      setIsLiked(false);
    } else {
      await setDoc(likeRef, { userId, likedAt: new Date() });
      await updateDoc(postRef, { likes: increment(1) });
      setIsLiked(true);
    }
  };

  const handleCommentLike = async (commentId: string, currentLikes: number, likedBy: string[]) => {
    if (!userId || userId === 'anonymous') {
      alert('Please log in to like comments');
      return;
    }
    
    const commentRef = doc(db, 'memoryPosts', postId, 'comments', commentId);
    const isAlreadyLiked = likedBy.includes(userId);
    
    if (isAlreadyLiked) {
      await updateDoc(commentRef, {
        likes: currentLikes - 1,
        likedBy: arrayRemove(userId)
      });
    } else {
      await updateDoc(commentRef, {
        likes: currentLikes + 1,
        likedBy: arrayUnion(userId)
      });
    }
  };

  const handleReplyLike = async (commentId: string, replyId: string, currentLikes: number, likedBy: string[]) => {
    if (!userId || userId === 'anonymous') {
      alert('Please log in to like replies');
      return;
    }
    
    const replyRef = doc(db, 'memoryPosts', postId, 'comments', commentId, 'replies', replyId);
    const isAlreadyLiked = likedBy.includes(userId);
    
    if (isAlreadyLiked) {
      await updateDoc(replyRef, {
        likes: currentLikes - 1,
        likedBy: arrayRemove(userId)
      });
    } else {
      await updateDoc(replyRef, {
        likes: currentLikes + 1,
        likedBy: arrayUnion(userId)
      });
    }
  };

  const handleAddComment = async () => {
    if (!userId || userId === 'anonymous') {
      alert('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      const postRef = await ensurePostExists();
      
      const commentsRef = collection(db, 'memoryPosts', postId, 'comments');
      await addDoc(commentsRef, {
        userId,
        userName: user?.name || post.author,
        text: newComment.trim(),
        createdAt: new Date(),
        likes: 0,
        likedBy: []
      });
      
      await updateDoc(postRef, { comments: increment(1) });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!userId || userId === 'anonymous') {
      alert('Please log in to reply');
      return;
    }
    
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const repliesRef = collection(db, 'memoryPosts', postId, 'comments', commentId, 'replies');
      await addDoc(repliesRef, {
        userId,
        userName: user?.name || post.author,
        text: replyText.trim(),
        createdAt: new Date(),
        likes: 0,
        likedBy: []
      });
      
      const postRef = doc(db, 'memoryPosts', postId);
      await updateDoc(postRef, { comments: increment(1) });
      
      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out this ACOSA memory: ${post.title}`;
    
    setIsSharing(true);
    
    const postRef = await ensurePostExists();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ACOSA Memory',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Link copied to clipboard! Share it with your friends.');
    }
    
    await updateDoc(postRef, { shares: increment(1) });
    setIsSharing(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;
    
    const commentRef = doc(db, 'memoryPosts', postId, 'comments', commentId);
    await deleteDoc(commentRef);
    const postRef = doc(db, 'memoryPosts', postId);
    await updateDoc(postRef, { comments: increment(-1) });
  };

  const handleDeleteReply = async (commentId: string, replyId: string) => {
    if (!confirm('Delete this reply?')) return;
    
    const replyRef = doc(db, 'memoryPosts', postId, 'comments', commentId, 'replies', replyId);
    await deleteDoc(replyRef);
    const postRef = doc(db, 'memoryPosts', postId);
    await updateDoc(postRef, { comments: increment(-1) });
  };

  const toggleReplies = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, showReplies: !comment.showReplies }
        : comment
    ));
  };

  const shouldTruncate = post.description.split('\n').length > 3 || post.description.length > 150;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold text-foreground">{post.author}</h3>
              <p className="text-sm text-muted-foreground">{post.role}</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
        </div>
        <h2 className="text-lg font-bold text-foreground mb-2">{post.title}</h2>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.eventName} • {post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <p className={`text-foreground leading-relaxed ${expandedDescription ? '' : 'line-clamp-3'}`}>
          {post.description}
        </p>
        {shouldTruncate && !expandedDescription && (
          <button onClick={() => setExpandedDescription(true)} className="text-primary hover:text-primary/80 font-semibold mt-2">Read More</button>
        )}
        {expandedDescription && shouldTruncate && (
          <button onClick={() => setExpandedDescription(false)} className="text-primary hover:text-primary/80 font-semibold mt-2">Read Less</button>
        )}
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="bg-muted">
          <div className="relative aspect-video overflow-hidden bg-gray-200 cursor-pointer group" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
            <img src={post.images[0]} alt="Memory" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      )}

      {lightboxOpen && <ImageLightbox images={post.images} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{likeCount} Likes</span>
          <span>{commentsCount} Comments • {post.shares} Shares</span>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:bg-secondary'}`}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>Like</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-muted-foreground hover:bg-secondary px-4 py-2 rounded-lg">
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button onClick={handleShare} disabled={isSharing} className="flex items-center gap-2 text-muted-foreground hover:bg-secondary px-4 py-2 rounded-lg disabled:opacity-50">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold mb-3">Comments ({comments.length})</h4>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                      {comment.userName?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-2xl px-3 py-2">
                      <p className="text-sm font-semibold text-foreground">{comment.userName}</p>
                      <p className="text-sm text-foreground mt-0.5">{comment.text}</p>
                    </div>
                    <div className="flex gap-3 mt-1 ml-2">
                      <button 
                        onClick={() => handleCommentLike(comment.id, comment.likes, comment.likedBy)}
                        className={`text-xs transition-colors ${comment.likedBy?.includes(userId) ? 'text-blue-500 font-semibold' : 'text-muted-foreground hover:text-blue-500'}`}
                      >
                        {comment.likes > 0 && <span className="mr-1">{comment.likes}</span>}
                        Like
                      </button>
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Reply
                      </button>
                      <span className="text-xs text-muted-foreground">{formatCommentDate(comment.createdAt)}</span>
                      {comment.userId === userId && (
                        <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                      )}
                    </div>
                    
                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="flex gap-2 mt-2 ml-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-1.5 bg-muted/30 rounded-full text-sm focus:outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddReply(comment.id)}
                          autoFocus
                        />
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          disabled={isSubmitting || !replyText.trim()}
                          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1.5 text-muted-foreground text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    
                    {/* Replies List */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-2 ml-2">
                        <button
                          onClick={() => toggleReplies(comment.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-2"
                        >
                          {comment.showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          {comment.showReplies ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                        </button>
                        
                        {comment.showReplies && (
                          <div className="space-y-3 pl-2 border-l-2 border-border">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-2">
                                <div className="flex-shrink-0">
                                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                                    {reply.userName?.charAt(0) || 'U'}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="bg-muted/30 rounded-2xl px-3 py-1.5">
                                    <p className="text-xs font-semibold text-foreground">{reply.userName}</p>
                                    <p className="text-xs text-foreground mt-0.5">{reply.text}</p>
                                  </div>
                                  <div className="flex gap-2 mt-1 ml-2">
                                    <button 
                                      onClick={() => handleReplyLike(comment.id, reply.id, reply.likes || 0, reply.likedBy || [])}
                                      className={`text-[10px] transition-colors ${reply.likedBy?.includes(userId) ? 'text-blue-500 font-semibold' : 'text-muted-foreground hover:text-blue-500'}`}
                                    >
                                      {(reply.likes > 0) && <span className="mr-1">{reply.likes}</span>}
                                      Like
                                    </button>
                                    <span className="text-[10px] text-muted-foreground">
                                      {formatCommentDate(reply.createdAt)}
                                    </span>
                                    {reply.userId === userId && (
                                      <button 
                                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                                        className="text-[10px] text-red-500 hover:text-red-700"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment Input */}
            <div className="flex gap-3 mt-4 pt-2">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-muted/30 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-transparent text-sm focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                </div>
              </div>
              <button
                onClick={handleAddComment}
                disabled={isSubmitting || !newComment.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}