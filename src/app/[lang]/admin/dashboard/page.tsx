"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, LogOut, PlusCircle, Trash2, Edit, LoaderCircle } from 'lucide-react';
import type { Project } from '@prisma/client';
import toast from 'react-hot-toast';
import ProjectModal from '@/components/admin/ProjectModal';
import type { Locale } from '@/i18n.config';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';

type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams<{ lang: Locale }>();
  const lang = params?.lang ?? 'en';
  const dictionary = (lang === 'fr' ? fr : en).admin;
  const dashboardDictionary = dictionary.dashboard;
  const modalDictionary = dictionary.projectModal;
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    technologies: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error(dashboardDictionary.loadingError);
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeRepo = async () => {
    if (!repoUrl) {
      toast.error(dashboardDictionary.analyzeMissingRepo);
      return;
    }
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/admin/projects/analyze-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || dashboardDictionary.analyzeFallbackError);
      }
      const data = await res.json();
      setFormData({
        title: data.title,
        slug: data.slug,
        description: data.description,
        technologies: data.technologies,
        imageUrl: data.imageUrl,
        projectUrl: data.projectUrl,
        githubUrl: data.githubUrl,
      });
      toast.success(dashboardDictionary.analyzeSuccess);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push(`/${lang}/auth/login`);
  };
  
  const openModalForNew = () => {
    setEditingProject(null);
    setFormData({
        title: '',
        slug: '',
        description: '',
        technologies: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
      });
    setIsModalOpen(true);
  }

  const openModalForEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        technologies: project.technologies.join(', '),
        imageUrl: project.imageUrl || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
      });
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  }

  const handleDelete = async (id: string) => {
    toast((t) => (
      <span>
        {dashboardDictionary.deleteConfirm}
        <button
          onClick={() => {
            toast.dismiss(t.id);
            deleteProject(id);
          }}
          className="ml-2 px-3 py-1 rounded-md bg-red-500 text-white"
        >
          {dashboardDictionary.deleteAction}
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-2 px-3 py-1 rounded-md bg-gray-200 text-black"
        >
          {dashboardDictionary.cancelAction}
        </button>
      </span>
    ));
  };

  const deleteProject = async (id: string) => {
    try {
        const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || dashboardDictionary.deleteFallbackError);
        }
        setProjects(projects.filter(p => p.id !== id));
        toast.success(dashboardDictionary.deleteSuccess);
    } catch (err: any) {
        toast.error(err.message);
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
            body: JSON.stringify(projectData),
            credentials: 'include',
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || dashboardDictionary.saveFallbackError);
        }
        
        closeModal();
        fetchProjects(); // Refresh the list
        toast.success(isEditing ? dashboardDictionary.saveUpdatedSuccess : dashboardDictionary.saveCreatedSuccess);
    } catch (err: any) {
        toast.error(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {isModalOpen && <ProjectModal 
            project={editingProject} 
            onClose={closeModal} 
            onSave={handleSaveProject} 
            repoUrl={repoUrl}
            setRepoUrl={setRepoUrl}
            handleAnalyzeRepo={handleAnalyzeRepo}
            isAnalyzing={isAnalyzing}
            formData={formData}
            setFormData={setFormData}
            dictionary={modalDictionary}
            />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">{dashboardDictionary.title}</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all">
                <LogOut className="w-4 h-4" />
                <span>{dashboardDictionary.logout}</span>
            </button>
        </header>

        <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold">{dashboardDictionary.projectsTitle}</h2>
                <button onClick={openModalForNew} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all">
                    <PlusCircle className="w-5 h-5" />
                    <span>{dashboardDictionary.addNewProject}</span>
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-16"><LoaderCircle className="animate-spin w-8 h-8 mx-auto text-zinc-500" /></div>
            ) : error ? (
                <div className="text-center py-16 text-red-400">{error}</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-lg">
                    <p className="text-zinc-400">{dashboardDictionary.emptyTitle}</p>
                    <p className="text-sm text-zinc-500">{dashboardDictionary.emptyBody}</p>
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
