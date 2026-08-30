'use client';

import React, { useState } from 'react';
import { DUMMY_COURSES, Course } from '@/data/trainingData';
import { Modal } from '@/components/ui/Modal';
import { GraduationCap, PlayCircle, Award, CheckCircle2, Star, BookOpen } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>(DUMMY_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const { addToast } = useToast();

  const handleCompleteQuiz = () => {
    if (selectedAnswer === activeQuiz.answerIndex) {
      setQuizScore(100);
      addToast({ type: 'success', title: 'Quiz Passed!', message: 'Congratulations! You scored 100% on the lesson quiz.' });
    } else {
      setQuizScore(0);
      addToast({ type: 'error', title: 'Incorrect Answer', message: 'Review lesson notes and try again.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-sky-400" /> Enterprise E-Learning & Training Center
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Political leadership courses, party constitution certification, and cyber security e-learning.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
          <Award className="w-4 h-4" /> 10,000+ Certificates Issued
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl space-y-4 p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative h-40 rounded-xl overflow-hidden">
                <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-sky-300 text-[10px] font-bold">
                  {c.difficulty}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-sky-500 uppercase">{c.category}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{c.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Instructor: {c.instructor} • {c.duration}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Course Progress</span>
                  <span className="text-sky-500">{c.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full" style={{ width: `${c.progressPercent}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCourse(c)}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Continue E-Learning Lesson
            </button>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <Modal isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)} title={selectedCourse.title} maxWidth="lg">
          <div className="space-y-4 text-xs">
            <p className="font-bold text-slate-800 dark:text-white">Curriculum Lessons:</p>
            <div className="space-y-2">
              {selectedCourse.lessons.map((l) => (
                <div key={l.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${l.completed ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="font-bold">{l.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{l.duration}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
              <p className="font-bold text-sky-400">Lesson Knowledge Quiz</p>
              <p className="text-slate-300">{selectedCourse.quiz[0].question}</p>
              <div className="space-y-1 pt-1">
                {selectedCourse.quiz[0].options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-800/80 cursor-pointer">
                    <input
                      type="radio"
                      name="quiz"
                      onChange={() => {
                        setActiveQuiz(selectedCourse.quiz[0]);
                        setSelectedAnswer(idx);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleCompleteQuiz}
                className="w-full py-2 mt-2 rounded-xl bg-sky-600 text-white font-bold"
              >
                Submit Quiz Answer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
