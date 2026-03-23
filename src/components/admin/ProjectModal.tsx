"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { X, LoaderCircle } from 'lucide-react';
import type { Project } from '@prisma/client';
import toast from 'react-hot-toast';

const ProjectModal = ({
    project,
    onClose,
    onSave,
    repoUrl,
    setRepoUrl,
    handleAnalyzeRepo,
    isAnalyzing,
    formData,
    setFormData,
  }: {
    project: Partial<Project> | null;
    onClose: () => void;
    onSave: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => void;
    repoUrl: string;
    setRepoUrl: (url: string) => void;
    handleAnalyzeRepo: () => void;
    isAnalyzing: boolean;
    formData: any;
    setFormData: (data: any) => void;
  }) => {
    const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Image upload failed');
      }

      const data = await res.json();
      setFormData({ ...formData, imageUrl: data.imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const projectData = {
          ...formData,
          technologies: formData.technologies.split(',').map((tech: string) => tech.trim()),
      };
      await onSave(projectData, project?.id);
      setIsSaving(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {project?.id ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">
                        <X />
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="repoUrl" className="block text-sm font-medium text-zinc-400 mb-2">GitHub Repository URL</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="repoUrl"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            placeholder="https://github.com/user/repo"
                            className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="button"
                            onClick={handleAnalyzeRepo}
                            disabled={isAnalyzing}
                            className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all disabled:opacity-60 flex items-center gap-2"
                        >
                            {isAnalyzing && <LoaderCircle className="animate-spin w-4 h-4" />}
                            Analyze
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form fields */}
                    <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="md:col-span-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <div className="w-full relative">
                        <label htmlFor="imageUpload" className="block text-sm font-medium text-zinc-400 mb-2">Or Upload an Image</label>
                        <input
                            type="file"
                            id="imageUpload"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 disabled:opacity-50"
                        />
                        {isUploading && <LoaderCircle className="animate-spin w-5 h-5 text-white absolute right-3 top-9" />}
                    </div>
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="md:col-span-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" rows={4} required></textarea>
                    <input type="text" placeholder="Technologies (comma-separated)" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="md:col-span-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    <input type="text" placeholder="Project URL" value={formData.projectUrl} onChange={e => setFormData({...formData, projectUrl: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <input type="text" placeholder="GitHub URL" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-white font-semibold hover:bg-white/5 transition-all">Cancel</button>
                        <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all disabled:opacity-60">
                            {isSaving && <LoaderCircle className="animate-spin w-4 h-4" />}
                            {project?.id ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
