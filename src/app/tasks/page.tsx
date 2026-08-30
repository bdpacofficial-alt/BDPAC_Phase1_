'use client';

import React, { useState } from 'react';
import { DUMMY_TASKS, TaskItem } from '@/data/tasksData';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { CheckSquare, Plus, Clock, AlertTriangle, Users, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(DUMMY_TASKS);
  const [activeTab, setActiveTab] = useState<'Kanban' | 'List'>('Kanban');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addToast } = useToast();

  const handleCreateTask = (e: any) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `TSK-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTaskTitle,
      description: 'Newly created grassroots assignment.',
      priority: 'High',
      status: 'Assigned',
      category: 'General Assignment',
      division: 'Dhaka Division',
      district: 'Dhaka District',
      thana: 'Keraniganj',
      assigneeName: 'Abdur Rahman',
      assigneePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      assignedBy: 'Central Steering Secretariat',
      dueDate: '2026-08-20',
      completionPercent: 0,
      checklist: [{ id: '1', text: 'Initial Task Kickoff', done: false }],
      comments: [],
      attachments: []
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsCreateOpen(false);
    addToast({ type: 'success', title: 'Task Created', message: `Task "${newTask.title}" assigned successfully.` });
  };

  const handleToggleChecklist = (taskId: string, checkId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = t.checklist.map(c => c.id === checkId ? { ...c, done: !c.done } : c);
        const doneCount = updated.filter(c => c.done).length;
        const percent = Math.round((doneCount / updated.length) * 100);
        return { ...t, checklist: updated, completionPercent: percent };
      }
      return t;
    }));
  };

  const columns = ['Assigned', 'In Progress', 'Waiting Review', 'Completed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-sky-400" /> Enterprise Task & Workflow Management
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Asana / Jira inspired task tracker with grassroots hierarchy assignments & AI subtask breakdown.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Task
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('Kanban')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'Kanban' ? 'bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Kanban Board
        </button>
        <button
          onClick={() => setActiveTab('List')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'List' ? 'bg-sky-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          List View
        </button>
      </div>

      {/* Kanban Board View */}
      {activeTab === 'Kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter(t => t.status === col);
            return (
              <div key={col} className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{col}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 text-[10px] font-bold">{colTasks.length}</span>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-sky-500/50 hover:shadow-lg transition cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-sky-500 font-bold">{task.id}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          task.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{task.title}</h4>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full" style={{ width: `${task.completionPercent}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {task.dueDate}</span>
                        <img src={task.assigneePhoto} alt="" className="w-5 h-5 rounded-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {activeTab === 'List' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer flex items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-sky-500" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{task.title}</h4>
                    <p className="text-[10px] text-slate-400">{task.id} • Assigned to {task.assigneeName} • Due {task.dueDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-500">{task.completionPercent}% Done</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title={`Task: ${selectedTask.id}`} maxWidth="lg">
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedTask.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{selectedTask.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 space-y-1">
              <p className="font-bold text-sky-500">Checklist & Progress ({selectedTask.completionPercent}%)</p>
              {selectedTask.checklist.map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleChecklist(selectedTask.id, item.id)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className={item.done ? 'line-through text-slate-400' : ''}>{item.text}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: 'Completed', completionPercent: 100 } : t));
                  setSelectedTask(null);
                  addToast({ type: 'success', title: 'Task Completed', message: 'Task marked as 100% completed.' });
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                Mark Task as 100% Completed
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Task Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Enterprise Task" maxWidth="md">
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Conduct Ward Level Security Audit"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold">Publish Task</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
