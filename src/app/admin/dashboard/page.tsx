"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, LogOut, PlusCircle, Trash2, Edit, X, LoaderCircle } from 'lucide-react';
import type { Project } from '@prisma/client';

// Modal Component
const ProjectModal = ({
    project,
    onClose,
    onSave,
  }: {
    project: Partial<Project> | null;
    onClose: () => void;
    onSave: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => void;
  }) => {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        technologies: project?.technologies?.join(', ') || '',
        imageUrl: project?.imageUrl || '',
        projectUrl: project?.projectUrl || '',
        githubUrl: project?.githubUrl || '',
    });
    const [isSaving, setIsSaving] = useState(false);
  
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const projectData = {
          ...formData,
          technologies: formData.technologies.split(',').map(tech => tech.trim()),
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
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form fields */}
                    <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="md:col-span-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
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

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  };
  
  const openModalForNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  }

  const openModalForEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete project');
            }
            setProjects(projects.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    }
  }

  const handleSaveProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => {
    try {
        const isEditing = !!id;
        const url = isEditing ? `/api/admin/projects/${id}` : '/api/admin/projects';
        const method = isEditing ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to save project');
        }
        
        closeModal();
        fetchProjects(); // Refresh the list
    } catch (err: any) {
        alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {isModalOpen && <ProjectModal project={editingProject} onClose={closeModal} onSave={handleSaveProject} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
            </button>
        </header>

        <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold">My Projects</h2>
                <button onClick={openModalForNew} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all">
                    <PlusCircle className="w-5 h-5" />
                    <span>Add New Project</span>
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-16"><LoaderCircle className="animate-spin w-8 h-8 mx-auto text-zinc-500" /></div>
            ) : error ? (
                <div className="text-center py-16 text-red-400">{error}</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-lg">
                    <p className="text-zinc-400">No projects found.</p>
                    <p className="text-sm text-zinc-500">Click "Add New Project" to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-800/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-white">{project.title}</h3>
                                <p className="text-sm text-zinc-400 mb-2">{project.slug}</p>
                                <p className="text-xs text-zinc-500 line-clamp-2">{project.description}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => openModalForEdit(project)} className="p-2 text-zinc-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(project.id)} className="p-2 text-zinc-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
      </motion.div>
    </div>
  );
}
