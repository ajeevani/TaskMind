import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommentsSection = ({ task, onTaskUpdate }) => {
  const [comments, setComments] = useState(task?.comments || [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      content: "I've reviewed the initial wireframes and they look great! Just a few minor adjustments needed on the navigation structure.",
      timestamp: new Date('2025-08-15T10:30:00'),
      isEdited: false
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content: "The development environment is set up and ready. I've also added the necessary dependencies for the project.",
      timestamp: new Date('2025-08-15T14:15:00'),
      isEdited: false
    },
    {
      id: 3,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "Thanks for the feedback! I'll incorporate the navigation changes and push an update by tomorrow.",
      timestamp: new Date('2025-08-16T09:45:00'),
      isEdited: true
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment?.trim()) return;

    setIsSubmitting(true);
    
    const comment = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: newComment?.trim(),
      timestamp: new Date(),
      isEdited: false
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    onTaskUpdate({ ...task, comments: updatedComments });
    setNewComment('');
    setIsSubmitting(false);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date?.toLocaleDateString();
  };

  const aiSuggestions = [
    "Great progress on this task!",
    "Consider adding a deadline reminder",
    "This looks ready for review"
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} />
          <span>Comments</span>
          <span className="text-sm text-muted-foreground">({comments?.length})</span>
        </h3>
      </div>
      {/* AI Comment Suggestions */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Sparkles" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Quick Comment Suggestions</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {aiSuggestions?.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setNewComment(suggestion)}
              className="text-xs anticipatory-hover"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      {/* Comments List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {comments?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No comments yet. Start the conversation!</p>
          </div>
        ) : (
          comments?.map((comment, index) => (
            <div 
              key={comment?.id} 
              className="flex space-x-3 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="shrink-0">
                <Image
                  src={comment?.avatar}
                  alt={comment?.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground text-sm">
                      {comment?.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment?.timestamp)}
                    </span>
                    {comment?.isEdited && (
                      <span className="text-xs text-muted-foreground italic">
                        (edited)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {comment?.content}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="ThumbsUp" size={14} className="mr-1" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="MessageSquare" size={14} className="mr-1" />
                    Reply
                  </Button>
                  {comment?.author === "You" && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Icon name="Edit2" size={14} className="mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Add Comment */}
      <div className="border-t border-border pt-4">
        <div className="flex space-x-3">
          <div className="shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-foreground bg-background"
              onKeyDown={(e) => {
                if (e?.key === 'Enter' && (e?.metaKey || e?.ctrlKey)) {
                  handleSubmitComment();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Press Cmd+Enter to submit
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNewComment('')}
                  disabled={!newComment?.trim()}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSubmitComment}
                  loading={isSubmitting}
                  disabled={!newComment?.trim()}
                  className="micro-feedback"
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;