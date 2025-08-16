import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AttachmentsSection = ({ task, onTaskUpdate }) => {
  const [attachments, setAttachments] = useState(task?.attachments || [
    {
      id: 1,
      name: "wireframes_v1.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Johnson",
      uploadedAt: new Date('2025-08-15T10:30:00'),
      url: "#"
    },
    {
      id: 2,
      name: "design_mockup.png",
      type: "image",
      size: "1.8 MB",
      uploadedBy: "Mike Chen",
      uploadedAt: new Date('2025-08-15T14:15:00'),
      url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"
    },
    {
      id: 3,
      name: "project_requirements.docx",
      type: "document",
      size: "856 KB",
      uploadedBy: "You",
      uploadedAt: new Date('2025-08-16T09:45:00'),
      url: "#"
    }
  ]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newAttachments = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      type: file?.type?.includes('image') ? 'image' : file?.type?.includes('pdf') ? 'pdf' : 'document',
      size: formatFileSize(file?.size),
      uploadedBy: "You",
      uploadedAt: new Date(),
      url: file?.type?.includes('image') ? URL.createObjectURL(file) : "#"
    }));

    const updatedAttachments = [...attachments, ...newAttachments];
    setAttachments(updatedAttachments);
    onTaskUpdate({ ...task, attachments: updatedAttachments });
    setIsUploading(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDeleteAttachment = (attachmentId) => {
    const updatedAttachments = attachments?.filter(att => att?.id !== attachmentId);
    setAttachments(updatedAttachments);
    onTaskUpdate({ ...task, attachments: updatedAttachments });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'image': return 'Image';
      case 'document': return 'FileText';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-50 border-red-200';
      case 'image': return 'text-green-600 bg-green-50 border-green-200';
      case 'document': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
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

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Paperclip" size={20} />
          <span>Attachments</span>
          <span className="text-sm text-muted-foreground">({attachments?.length})</span>
        </h3>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 mb-6 transition-all duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e?.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="text-center">
          {isUploading ? (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary animate-pulse" />
              </div>
              <p className="text-sm text-foreground font-medium">Uploading files...</p>
              <div className="w-32 h-2 bg-muted rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium mb-1">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, images, documents up to 10MB
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.txt"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="micro-feedback"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Choose Files
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Attachments List */}
      <div className="space-y-3">
        {attachments?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Paperclip" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No attachments yet. Upload files to get started.</p>
          </div>
        ) : (
          attachments?.map((attachment, index) => (
            <div 
              key={attachment?.id} 
              className="flex items-center space-x-4 p-4 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* File Preview/Icon */}
              <div className="shrink-0">
                {attachment?.type === 'image' ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={attachment?.url}
                      alt={attachment?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getFileTypeColor(attachment?.type)}`}>
                    <Icon name={getFileIcon(attachment?.type)} size={20} />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {attachment?.name}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{attachment?.size}</span>
                  <span>•</span>
                  <span>by {attachment?.uploadedBy}</span>
                  <span>•</span>
                  <span>{formatTimestamp(attachment?.uploadedAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="micro-feedback"
                  title="Download"
                >
                  <Icon name="Download" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="micro-feedback"
                  title="Share"
                >
                  <Icon name="Share2" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteAttachment(attachment?.id)}
                  className="micro-feedback text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Cloud Storage Integration */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">Or import from:</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="micro-feedback">
            <Icon name="Cloud" size={16} className="mr-2" />
            Google Drive
          </Button>
          <Button variant="outline" size="sm" className="micro-feedback">
            <Icon name="HardDrive" size={16} className="mr-2" />
            Dropbox
          </Button>
          <Button variant="outline" size="sm" className="micro-feedback">
            <Icon name="Folder" size={16} className="mr-2" />
            OneDrive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttachmentsSection;