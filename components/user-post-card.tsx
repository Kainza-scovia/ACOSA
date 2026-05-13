'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ChevronDown, ChevronUp, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAuth } from '@/app/auth-context';
import { db } from '@/firebase';
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, addDoc, query, orderBy, onSnapshot, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ImageLightbox } from '@/components/image-lightbox';

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

interface UserPostCardProps {
  id: string;
  userId: string;
  userName: string;
  caption: string;
  images: string[];
  likes: number;
  createdAt: any;
  onPostDeleted: () => void;
}

export function UserPostCard({ id, userId, userName, caption, images, likes: initialLikes, createdAt, onPostDeleted }: UserPostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentsCount, setCommentsCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandedCaption, setExpandedCaption] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const postId = id;
  const userId_user = user?.id || 'anonymous';

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

  useEffect(() => {
    const ensurePostExists = async () => {
      const postRef = doc(db, 'userPosts', postId);
      const postDoc = await getDoc(postRef);
      
      if (!postDoc.exists()) {
        await setDoc(postRef, {
          id: postId,
          userId,
          userName,
          caption,
          images,
          likes: 0,
          likedBy: [],
          commentsCount: 0,
          createdAt,
        });
      }
    };

    const loadComments = async () => {
      const commentsRef = collection(db, 'userPosts', postId, 'comments');
      const commentsQuery = query(commentsRef, orderBy('createdAt', 'desc'));
      
      const snapshot = await getDocs(commentsQuery);
      const commentsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const repliesSnapshot = await getDocs(
            collection(db, 'userPosts', postId, 'comments', doc.id, 'replies')
          );
          const replies = repliesSnapshot.docs.map((replyDoc) => ({
            id: replyDoc.id,
            ...replyDoc.data(),
          } as Reply));

          return {
            id: doc.id,
            ...doc.data(),
            replies,
            showReplies: false,
          } as Comment;
        })
      );

      setComments(commentsData);
      setCommentsCount(commentsData.length);
    };

    const checkIfLiked = async () => {
      const postRef = doc(db, 'userPosts', postId);
      const postDoc = await getDoc(postRef);
      
      if (postDoc.exists()) {
        const likedBy = postDoc.data().likedBy || [];
        setIsLiked(likedBy.includes(userId_user));
        setLikeCount(postDoc.data().likes || 0);
      }
    };

    ensurePostExists();
    checkIfLiked();
    loadComments();
  }, [postId, userId, userName, caption, images, createdAt, userId_user]);

  const handleLike = async () => {
    const postRef = doc(db, 'userPosts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) return;

    const currentLikedBy = postDoc.data().likedBy || [];
    const alreadyLiked = currentLikedBy.includes(userId_user);

    if (alreadyLiked) {
      await updateDoc(postRef, {
        likes: increment(-1),
        likedBy: arrayRemove(userId_user),
      });
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId_user),
      });
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const commentsRef = collection(db, 'userPosts', postId, 'comments');
      const docRef = await addDoc(commentsRef, {
        userId: user.id,
        userName: user.name,
        text: newComment,
        createdAt: new Date(),
        likes: 0,
        likedBy: [],
      });

      setComments((prev) => [
        {
          id: docRef.id,
          userId: user.id,
          userName: user.name,
          text: newComment,
          createdAt: new Date(),
          likes: 0,
          likedBy: [],
          replies: [],
          showReplies: false,
        },
        ...prev,
      ]);

      setNewComment('');
      
      const postRef = doc(db, 'userPosts', postId);
      await updateDoc(postRef, {
        commentsCount: increment(1),
      });
      
      setCommentsCount((prev) => prev + 1);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddReply = async (commentId: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!replyText.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const repliesRef = collection(db, 'userPosts', postId, 'comments', commentId, 'replies');
      const docRef = await addDoc(repliesRef, {
        userId: user.id,
        userName: user.name,
        text: replyText,
        createdAt: new Date(),
        likes: 0,
        likedBy: [],
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  {
                    id: docRef.id,
                    userId: user.id,
                    userName: user.name,
                    text: replyText,
                    createdAt: new Date(),
                    likes: 0,
                    likedBy: [],
                  },
                  ...comment.replies,
                ],
              }
            : comment
        )
      );

      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      // Delete comments and replies
      const commentsRef = collection(db, 'userPosts', postId, 'comments');
      const commentsSnapshot = await getDocs(commentsRef);
      
      for (const commentDoc of commentsSnapshot.docs) {
        const repliesRef = collection(db, 'userPosts', postId, 'comments', commentDoc.id, 'replies');
        const repliesSnapshot = await getDocs(repliesRef);
        
        for (const replyDoc of repliesSnapshot.docs) {
          await deleteDoc(replyDoc.ref);
        }
        
        await deleteDoc(commentDoc.ref);
      }

      // Delete the post
      await deleteDoc(doc(db, 'userPosts', postId));
      onPostDeleted();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm mb-4">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            👤
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{formatCommentDate(createdAt)}</p>
          </div>
        </div>

        {userId_user === userId && (
          <button
            onClick={handleDeletePost}
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-red-500"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 border-b border-border">
        <p className={`text-sm text-foreground ${!expandedCaption && caption.length > 150 ? 'line-clamp-3' : ''}`}>
          {caption}
        </p>
        {caption.length > 150 && (
          <button
            onClick={() => setExpandedCaption(!expandedCaption)}
            className="text-xs text-primary hover:underline mt-1"
          >
            {expandedCaption ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="border-b border-border">
          {images.length === 1 ? (
            <img
              src={images[0]}
              alt="Post image"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="w-full cursor-pointer hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="w-full aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-border">
        <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
        <span>{commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm font-medium ${
            isLiked
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-secondary"
        >
          <MessageCircle className="w-4 h-4" />
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-secondary">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 border-t border-border space-y-4">
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs flex-shrink-0">
              👤
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-secondary border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                {/* Comment */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <div className="bg-secondary rounded-lg p-2">
                      <p className="text-xs font-semibold text-foreground">{comment.userName}</p>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <button className="hover:font-semibold">Like</button>
                      <button onClick={() => setReplyingTo(comment.id)} className="hover:font-semibold">
                        Reply
                      </button>
                      <span>{formatCommentDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleAddReply(comment.id, e)} className="ml-11 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Reply..."
                      className="flex-1 bg-secondary border border-border rounded-full px-3 py-1 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !replyText.trim()}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-1 text-muted-foreground hover:bg-secondary rounded-full text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-11 space-y-2">
                    <button
                      onClick={() =>
                        setComments((prev) =>
                          prev.map((c) =>
                            c.id === comment.id
                              ? { ...c, showReplies: !c.showReplies }
                              : c
                          )
                        )
                      }
                      className="text-xs text-primary hover:underline"
                    >
                      {comment.showReplies ? 'Hide' : 'Show'} {comment.replies.length}{' '}
                      {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </button>

                    {comment.showReplies && (
                      <div className="space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center font-bold text-xs flex-shrink-0">
                              👤
                            </div>
                            <div className="flex-1">
                              <div className="bg-secondary rounded-lg p-2">
                                <p className="text-xs font-semibold text-foreground">{reply.userName}</p>
                                <p className="text-xs text-foreground">{reply.text}</p>
                              </div>
                              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                <button className="hover:font-semibold">Like</button>
                                <span>{formatCommentDate(reply.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <p className="text-center text-xs text-muted-foreground py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
