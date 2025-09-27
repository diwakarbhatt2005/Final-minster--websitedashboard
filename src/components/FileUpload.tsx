import React, { useCallback, useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload = ({ 
  accept = "image/*", 
  maxSize = 10, 
  multiple = false, 
  onFileSelect, 
  className = "",
  children 
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, []);

  const processFiles = (files: File[]) => {
    setError('');
    const validFiles: File[] = [];
    
    files.forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
      
      // Check file type if accept is specified
      if (accept !== "*" && !file.type.match(accept.replace(/\*/g, ''))) {
        setError(`File ${file.name} is not a valid file type.`);
        return;
      }
      
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setUploadedFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);
        onFileSelect(validFiles);
        setUploading(false);
      }, 1500);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive ? 'border-primary bg-primary/5' : 'border-primary/30 bg-primary/5'
        } ${uploading ? 'opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        
        {uploading ? (
          <div className="animate-pulse">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
            <p className="text-primary font-medium">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              {children || "Drag and drop your files here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Maximum file size: {maxSize}MB
            </p>
            <Button asChild className="btn-outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </label>
            </Button>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center">
          <AlertCircle className="w-4 h-4 text-destructive mr-2" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-foreground">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-card border border-card-border rounded-lg">
              <div className="flex items-center">
                {file.type.startsWith('image/') ? (
                  <Image className="w-5 h-5 text-primary mr-3" />
                ) : (
                  <FileText className="w-5 h-5 text-primary mr-3" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;