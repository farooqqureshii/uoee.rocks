import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Filter, Search, ArrowRight, Calendar, Users, Grid, GitBranch } from 'lucide-react';
import CourseCard from './components/CourseCard.tsx';
import CourseModal from './components/CourseModal.tsx';
import Flowchart from './components/Flowchart.tsx';
import Logo from './components/Logo.tsx';
import { courses, getCoursesByYearAndSemester, Course } from './data/courses.ts';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'flowchart' | 'browser'>('flowchart');

  const handleCourseClick = (course: Course) => {
    setModalCourse(course);
    setIsModalOpen(true);
  };

  const handleFlowchartCourseClick = (course: Course) => {
    setSelectedCourse(course);
    handleCourseClick(course);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCourse(null);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || course.year === selectedYear;
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 (course.specializations && course.specializations.includes(selectedSpecialization));
    return matchesSearch && matchesYear && matchesSpecialization;
  });

  const years = [1, 2, 3, 4];
  const specializations = ['T', 'S', 'E', 'M', 'P'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b-4 border-black shadow-brutal">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex-1">
              <Logo />
            </div>
            
            {/* Center: Contact Info */}
            <div className="flex-1 flex justify-center">
              <div className="bg-white border-2 border-black shadow-brutal px-4 py-2">
                <div className="text-xs font-bold text-black space-x-4 text-center">
                  <span>Star us on <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">GitHub</a></span>
                  <span>•</span>
                  <span>Spot a mistake? <a href="mailto:farooq.qureshi@outlook.com" className="text-blue-600 hover:text-blue-800 underline">Email me here</a></span>
                </div>
              </div>
            </div>
            
            {/* Right: View Toggle */}
            <div className="flex-1 flex justify-end">
              <div className="flex bg-gray-100 rounded-none border-2 border-black p-1 shadow-brutal">
                <button
                  onClick={() => setCurrentView('flowchart')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-none font-black transition-all ${
                    currentView === 'flowchart'
                      ? 'bg-white text-black shadow-brutal'
                      : 'text-black hover:text-black'
                  }`}
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Timeline</span>
                </button>
                <button
                  onClick={() => setCurrentView('browser')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-none font-black transition-all ${
                    currentView === 'browser'
                      ? 'bg-white text-black shadow-brutal'
                      : 'text-black hover:text-black'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Browser</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {currentView === 'flowchart' ? (
        /* Full-Page Flowchart Canvas */
        <div className="h-[calc(100vh-88px)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Flowchart 
            selectedCourse={selectedCourse} 
            onCourseClick={handleFlowchartCourseClick}
          />
        </div>
      ) : (
        /* Course Browser View */
        <main className="h-[calc(100vh-88px)] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          style={{
            backgroundImage: `
              radial-gradient(circle, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        >
          {/* Browser Header with Instructions */}
          <div className="sticky top-0 z-10 bg-white border-b-4 border-black shadow-brutal">
            <div className="max-w-7xl mx-auto px-6 py-4">
                             <div className="flex items-center justify-between space-x-8">
                 <div className="flex-1">
                   <div className="bg-purple-200 border-2 border-black shadow-brutal px-3 py-2 transform -rotate-1 text-center">
                     <h2 className="text-base font-black text-black">Course Browser</h2>
                   </div>
                 </div>
                 
                 <div className="flex-1 text-center">
                   <div className="bg-pink-200 border-2 border-black shadow-brutal px-3 py-2 transform rotate-1">
                     <div className="text-xs font-bold text-black space-y-1 text-left">
                       <div>Search and filter through all courses</div>
                       <div>Click on courses to view details</div>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-8">
              {/* Search and Filters */}
              <div className="bg-white rounded-none border-4 border-black shadow-brutal-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-none focus:border-black focus:outline-none shadow-brutal font-bold"
                  />
                </div>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value as number | 'all')}
                  className="px-4 py-3 border-2 border-black rounded-none focus:border-black focus:outline-none shadow-brutal font-bold"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>

                {/* Specialization Filter */}
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="px-4 py-3 border-2 border-black rounded-none focus:border-black focus:outline-none shadow-brutal font-bold"
                >
                  <option value="all">All Specializations</option>
                  <option value="T">Communications [T]</option>
                  <option value="S">Systems [S]</option>
                  <option value="E">Electronics [E]</option>
                  <option value="M">Microwave & Photonic [M]</option>
                  <option value="P">Power & Sustainable Energy [P]</option>
                </select>

                {/* Results Count */}
                <div className="flex items-center justify-center px-4 py-3 bg-white border-2 border-black rounded-none shadow-brutal">
                  <span className="text-black font-black">
                    {filteredCourses.length} courses
                  </span>
                </div>
              </div>
            </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-black mx-auto mb-4" />
                  <h3 className="text-xl font-black text-black mb-2">No courses found</h3>
                  <p className="text-sm font-bold text-black">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* Course Modal */}
      {isModalOpen && modalCourse && (
        <CourseModal
          course={modalCourse}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
