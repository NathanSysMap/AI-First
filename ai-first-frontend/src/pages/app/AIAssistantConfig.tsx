import React, { useState } from 'react';
import { Trash2, Upload, File, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface KnowledgeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

const AIAssistantConfig: React.FC = () => {
  const [assistantName, setAssistantName] = useState('VendeAI Assistant');
  const [promptConfig, setPromptConfig] = useState(
    'You are a helpful AI assistant for our company. Your goal is to help customers find the right products and answer their questions.'
  );
  const [files, setFiles] = useState<KnowledgeFile[]>([
    {
      id: '1',
      name: 'product_catalog.pdf',
      size: 1024000,
      type: 'application/pdf',
      uploadDate: new Date('2025-03-10'),
    },
    {
      id: '2',
      name: 'company_faqs.docx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      uploadDate: new Date('2025-03-12'),
    },
    {
      id: '3',
      name: 'sales_procedures.pdf',
      size: 768000,
      type: 'application/pdf',
      uploadDate: new Date('2025-03-14'),
    },
  ]);

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Assistant Configuration</h1>
        <Button variant="primary">Save Configuration</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Assistant Name"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="Enter a name for your AI assistant"
              />

              <div className="space-y-2">
                <label className="form-label" htmlFor="promptConfig">
                  Assistant Prompt Configuration
                </label>
                <textarea
                  id="promptConfig"
                  className="form-input min-h-32"
                  value={promptConfig}
                  onChange={(e) => setPromptConfig(e.target.value)}
                  placeholder="Enter the base prompt for your AI assistant"
                />
                <p className="text-xs text-slate-400">
                  This is the base instruction for your AI assistant. It will
                  guide how the assistant responds to customer inquiries.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                <p className="text-sm text-slate-400 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  Supported file types: PDF, DOCX, TXT, CSV (Max 10MB per file)
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Files
                </Button>
              </div>

              {files.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Uploaded Files</h3>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <File size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-slate-400">
                              {formatFileSize(file.size)} • Uploaded on{' '}
                              {file.uploadDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-danger hover:text-danger hover:bg-danger/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-slate-950 p-4">
                <div className="mb-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <File size={16} className="text-primary" />
                  </div>
                  <p className="ml-2 font-medium">{assistantName}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-sm">
                      How can I help you today with our products?
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <p className="text-sm">
                      I'm looking for a wireless speaker with good battery life.
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-sm">
                      I'd recommend our Bluetooth Speaker with a 20-hour battery
                      life. It's portable, has excellent sound quality, and is
                      currently in stock. Would you like more details about this
                      product?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                <p>
                  This is a preview of how your AI assistant might interact with
                  customers. The actual responses will be generated based on your
                  configuration and knowledge base.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantConfig;