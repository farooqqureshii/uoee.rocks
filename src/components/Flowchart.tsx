import React, { useState, useEffect } from 'react';
import { Course, getPrerequisites, getCorequisites, courses } from '../data/courses.ts';
import CourseRelationshipModal from './CourseRelationshipModal.tsx';

interface FlowchartProps {
  selectedCourse: Course | null;
  onCourseClick: (course: Course) => void;
  isFocusMode?: boolean;
}

const Flowchart: React.FC<FlowchartProps> = ({ selectedCourse, onCourseClick, isFocusMode = false }) => {
  const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
  const [lockedCourse, setLockedCourse] = useState<Course | null>(null);
  const [relationshipModalOpen, setRelationshipModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [specializationModalOpen, setSpecializationModalOpen] = useState(false);
  const [complementaryElectivesModalOpen, setComplementaryElectivesModalOpen] = useState(false);
  const [year1ModalOpen, setYear1ModalOpen] = useState(false);
  const [year3ModalOpen, setYear3ModalOpen] = useState(false);

  // Get courses organized by year and semester
  const getCoursesByYearAndSemester = () => {
    const organized: { [key: string]: Course[] } = {};
    
    courses.forEach(course => {
      const semesterKey = `Year ${course.year} ${course.semester}`;
      if (!organized[semesterKey]) {
        organized[semesterKey] = [];
      }
      organized[semesterKey].push(course);
    });

    // Sort semesters in chronological order
    const sortedKeys = Object.keys(organized).sort((a, b) => {
      const yearA = parseInt(a.split(' ')[1]);
      const yearB = parseInt(b.split(' ')[1]);
      if (yearA !== yearB) return yearA - yearB;
      return a.includes('Fall') ? -1 : 1;
    });

    return sortedKeys.map(key => ({ semester: key, courses: organized[key] }));
  };

  // Get courses organized by year
  const getCoursesByYear = () => {
    const organized: { [key: number]: { [key: string]: Course[] } } = {};
    
    courses.forEach(course => {
      if (!organized[course.year]) {
        organized[course.year] = {};
      }
      const semesterKey = course.semester;
      if (!organized[course.year][semesterKey]) {
        organized[course.year][semesterKey] = [];
      }
      organized[course.year][semesterKey].push(course);
    });

    return Object.keys(organized).map(year => ({
      year: parseInt(year),
      semesters: organized[parseInt(year)]
    })).sort((a, b) => a.year - b.year);
  };

  const semesterData = getCoursesByYearAndSemester();
  const yearData = getCoursesByYear();

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'a' || event.key === 'A') {
        if (hoveredCourse) {
          setSelectedCourseForModal(hoveredCourse);
          setRelationshipModalOpen(true);
        }
      }
      if (event.key === 'b' || event.key === 'B') {
        if (lockedCourse) {
          setLockedCourse(null);
        } else if (hoveredCourse) {
          setLockedCourse(hoveredCourse);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [hoveredCourse, lockedCourse]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourseForModal(course);
    setRelationshipModalOpen(true);
  };

  const getCourseHighlightColor = (course: Course) => {
    const activeCourse = lockedCourse || hoveredCourse;
    if (!activeCourse) return 'bg-white border-2 border-black shadow-brutal';
    
    // Check if this course is a prerequisite of the active course
    const prerequisites = getPrerequisites(activeCourse.id);
    const isPrerequisite = prerequisites.some(prereq => prereq.id === course.id);
    
    // Check if this course is a corequisite of the active course
    const corequisites = getCorequisites(activeCourse.id);
    const isCorequisite = corequisites.some(coreq => coreq.id === course.id);
    
    // Check if this course has the active course as a prerequisite
    const hasActiveAsPrerequisite = getPrerequisites(course.id).some(prereq => prereq.id === activeCourse.id);
    
    // Check if this course is a prerequisite of a prerequisite (indirect prerequisite)
    const isIndirectPrerequisite = prerequisites.some(prereq => {
      const prereqPrerequisites = getPrerequisites(prereq.id);
      return prereqPrerequisites.some(indirectPrereq => indirectPrereq.id === course.id);
    });
    
    if (isPrerequisite) return 'bg-yellow-200 border-2 border-orange-600 shadow-brutal';
    if (isCorequisite) return 'bg-blue-200 border-2 border-blue-600 shadow-brutal';
    if (hasActiveAsPrerequisite) return 'bg-pink-200 border-2 border-pink-600 shadow-brutal';
    if (isIndirectPrerequisite) return 'bg-orange-200 border-2 border-red-600 shadow-brutal';
    if (course.id === activeCourse.id) return 'bg-green-200 border-2 border-green-600 shadow-brutal-lg';
    
    return 'bg-white border-2 border-black shadow-brutal';
  };

  return (
    <div 
      className="w-full h-full overflow-auto bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100"
      style={{
        backgroundImage: `
          radial-gradient(circle, #000 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
                    {/* Header with Legend */}
       {!isFocusMode && (
         <div className="sticky top-0 left-0 z-10 bg-white border-b-4 border-black shadow-brutal min-w-max">
           <div className="max-w-7xl mx-auto px-6 py-4">
                                     <div className="flex items-center justify-between space-x-8">
               <div className="flex-1">
                 <div className="bg-yellow-200 border-2 border-black shadow-brutal px-3 py-2 transform -rotate-1 text-center">
                   <h2 className="text-base font-black text-black">Course Timeline</h2>
                 </div>
               </div>
               
               <div className="flex-1 text-center">
                 <div className="bg-blue-200 border-2 border-black shadow-brutal px-3 py-2 transform rotate-1">
                   <div className="text-xs font-bold text-black space-y-1 text-left">
                     <div>Hover over courses to see relationships</div>
                     <div>Click or press A to see in-depth relationships</div>
                     <div>{lockedCourse ? 'Press B to unlock the current selection' : 'Press B to lock your selection'}</div>
                     {lockedCourse && <div className="text-orange-600">Locked on: {lockedCourse.code}</div>}
                   </div>
                 </div>
               </div>
               
               {/* Legend */}
               <div className="flex-1">
                 <div className="bg-green-200 border-2 border-black shadow-brutal px-3 py-2 transform -rotate-1">
                   <div className="grid grid-cols-3 gap-2 justify-end">
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-yellow-200 border border-orange-600"></div>
                       <span className="text-xs font-bold text-black">Prerequisites</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-orange-200 border border-red-600"></div>
                       <span className="text-xs font-bold text-black">Indirect Prerequisites</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-blue-200 border border-blue-600"></div>
                       <span className="text-xs font-bold text-black">Corequisites</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-pink-200 border border-pink-600"></div>
                       <span className="text-xs font-bold text-black">Following Courses</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-green-200 border border-green-600"></div>
                       <span className="text-xs font-bold text-black">Selected Course</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}

      {/* Flowchart Content */}
      <div className="p-8">


                <div className="flex gap-12 min-w-max">
          {yearData.map((yearInfo) => {
            const totalUnits = Object.values(yearInfo.semesters).flat().reduce((sum, course) => sum + course.units, 0);
            
            return (
              <div key={yearInfo.year} className="flex-shrink-0">
                {/* Year Header */}
                <div className="text-center mb-4">
                  <div 
                    className="inline-flex items-center px-6 py-3 bg-white rounded-none border-4 border-black shadow-brutal cursor-pointer hover:shadow-brutal-lg transition-all"
                    onClick={() => {
                      if (yearInfo.year === 1) {
                        setYear1ModalOpen(true);
                      } else if (yearInfo.year === 2) {
                        setComplementaryElectivesModalOpen(true);
                      } else if (yearInfo.year === 3) {
                        setYear3ModalOpen(true);
                      } else if (yearInfo.year === 4) {
                        setSpecializationModalOpen(true);
                      }
                    }}
                  >
                    <h2 className="text-xl font-black text-black">Year {yearInfo.year} | {totalUnits} units</h2>
                    <div className="ml-3 text-sm font-bold text-black">Click to read important info</div>
                  </div>
                </div>

                {/* Semesters */}
                <div className="flex gap-8 min-w-max">
                  {Object.entries(yearInfo.semesters)
                    .sort(([a], [b]) => a === 'Fall' ? -1 : 1)
                    .map(([semester, courses]) => (
                    <div key={semester} className="flex-shrink-0">
                      {/* Semester Subheader */}
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-none border-2 border-black shadow-brutal">
                          <h3 className="text-base font-black text-black">{semester}</h3>
                        </div>
                      </div>
                      
                      {/* Course Cards */}
                      <div className="space-y-4">
                        {courses.map((course) => {
                          const highlightClass = getCourseHighlightColor(course);
                          
                          return (
                            <div
                              key={course.id}
                              className={`w-64 p-4 rounded-none border-2 cursor-pointer transition-all duration-200 hover:shadow-brutal-lg hover:scale-[1.02] ${highlightClass}`}
                              onMouseEnter={() => setHoveredCourse(course)}
                              onMouseLeave={() => setHoveredCourse(null)}
                              onClick={() => handleCourseClick(course)}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <div className="font-bold text-black text-lg">{course.code}</div>
                                    {course.specializations && course.specializations.length > 0 && (
                                      <div className="flex gap-1 flex-wrap">
                                        {course.specializations.map((spec, index) => (
                                          <span key={index} className="px-1 py-0.5 text-xs font-black bg-black text-white border border-black">
                                            [{spec}]
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-xs font-bold text-black bg-gray-200 px-2 py-1 border border-black flex-shrink-0 ml-2">
                                  {course.units} UNITS
                                </div>
                              </div>
                              <div className="text-sm text-gray-800 leading-relaxed">{course.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Relationship Modal */}
      <CourseRelationshipModal
        course={selectedCourseForModal}
        isOpen={relationshipModalOpen}
        onClose={() => setRelationshipModalOpen(false)}
        onCourseClick={(course) => {
          setSelectedCourseForModal(course);
          setRelationshipModalOpen(true);
        }}
      />

      {/* Specialization Info Modal */}
      {specializationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-brutal-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-4 border-black p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-black">Year 4 Important Info</h2>
                  <p className="text-sm font-bold text-black">Choose one specialization for your degree</p>
                </div>
                <button
                  onClick={() => setSpecializationModalOpen(false)}
                  className="p-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="grid grid-cols-1 gap-4">
                {/* Communications [T] */}
                <div className="bg-blue-50 border-2 border-black p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-blue-100 text-black border border-black">[T]</span>
                    <h3 className="text-lg font-black text-black">Communications</h3>
                  </div>
                  <p className="text-sm font-bold text-black">Focus on communication systems, signal processing, and wireless technologies.</p>
                </div>

                {/* Systems [S] */}
                <div className="bg-green-50 border-2 border-black p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-green-100 text-black border border-black">[S]</span>
                    <h3 className="text-lg font-black text-black">Systems</h3>
                  </div>
                  <p className="text-sm font-bold text-black">Focus on control systems, robotics, and system integration.</p>
                </div>

                {/* Electronics [E] */}
                <div className="bg-purple-50 border-2 border-black p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-purple-100 text-black border border-black">[E]</span>
                    <h3 className="text-lg font-black text-black">Electronics</h3>
                  </div>
                  <p className="text-sm font-bold text-black">Focus on electronic devices, circuits, and semiconductor technologies.</p>
                </div>

                {/* Microwave & Photonic [M] */}
                <div className="bg-pink-50 border-2 border-black p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-pink-100 text-black border border-black">[M]</span>
                    <h3 className="text-lg font-black text-black">Microwave & Photonic</h3>
                  </div>
                  <p className="text-sm font-bold text-black">Focus on microwave circuits, optics, and photonic systems.</p>
                </div>

                {/* Power & Sustainable Energy [P] */}
                <div className="bg-orange-50 border-2 border-black p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-orange-100 text-black border border-black">[P]</span>
                    <h3 className="text-lg font-black text-black">Power & Sustainable Energy</h3>
                  </div>
                  <p className="text-sm font-bold text-black">Focus on power systems, renewable energy, and sustainable technologies.</p>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 border-2 border-black p-4 shadow-brutal">
                <h4 className="font-black text-black mb-2">How to Choose:</h4>
                <ul className="text-sm font-bold text-black space-y-1">
                  <li>• Look for courses with your chosen specialization letter [T], [S], [E], [M], or [P]</li>
                  <li>• You need to complete courses from your chosen specialization</li>
                  <li>• Click on any Year 4 course to see its specialization requirements</li>
                  <li>• Some courses count for multiple specializations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complementary Electives Modal */}
      {complementaryElectivesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-brutal-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b-4 border-black p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-black">Year 2 Important Info</h2>
                  <p className="text-sm font-bold text-black">Complete two complementary electives in Year 2</p>
                </div>
                <button
                  onClick={() => setComplementaryElectivesModalOpen(false)}
                  className="p-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* HIS 2129 */}
                <div className="bg-yellow-50 border-2 border-yellow-300 p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-yellow-100 text-black border border-black">HIS</span>
                    <h3 className="text-lg font-black text-black">HIS 2129</h3>
                  </div>
                  <h4 className="text-sm font-bold text-black mb-2">Technology, Society and Environment since 1800</h4>
                  <p className="text-xs font-bold text-black text-gray-700">Historical analysis of the relationship between technology, society, and environmental change.</p>
                  <div className="mt-3">
                    <span className="px-2 py-1 text-xs font-black bg-black text-white border border-black">3 UNITS</span>
                  </div>
                </div>

                {/* PHI 2394 */}
                <div className="bg-purple-50 border-2 border-purple-300 p-4 shadow-brutal">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-black bg-purple-100 text-black border border-black">PHI</span>
                    <h3 className="text-lg font-black text-black">PHI 2394</h3>
                  </div>
                  <h4 className="text-sm font-bold text-black mb-2">Scientific Thought and Social Values</h4>
                  <p className="text-xs font-bold text-black text-gray-700">Philosophical examination of scientific methodology and its relationship to social values.</p>
                  <div className="mt-3">
                    <span className="px-2 py-1 text-xs font-black bg-black text-white border border-black">3 UNITS</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-black p-4 shadow-brutal mb-6">
                <h4 className="font-black text-black mb-2">Important Notes:</h4>
                <ul className="text-sm font-bold text-black space-y-1">
                  <li>• You must complete TWO complementary electives in Year 2</li>
                  <li>• Choose ONE of: HIS 2129 OR PHI 2394</li>
                  <li>• Choose ONE additional complementary elective from the full list</li>
                  <li>• Both courses shown above are 3 units each</li>
                  <li>• No prerequisites required for either course</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 p-4 shadow-brutal">
                <h4 className="font-black text-black mb-2">More Complementary Elective Options:</h4>
                <p className="text-sm font-bold text-black mb-3">
                  Engineering students can choose from a wide variety of complementary electives across different disciplines.
                </p>
                <a 
                  href="https://www.uottawa.ca/faculty-engineering/undergraduate-studies/courses-course-sequences/complementary-electives" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm font-black text-black"
                >
                  <span>View Full List</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Year 1 Modal */}
      {year1ModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-brutal-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b-4 border-black p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-black">Year 1 Important Info</h2>
                  <p className="text-sm font-bold text-black">Introduction to engineering fundamentals</p>
                </div>
                <button
                  onClick={() => setYear1ModalOpen(false)}
                  className="p-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="bg-yellow-50 border-2 border-yellow-300 p-4 shadow-brutal mb-4">
                <h4 className="font-black text-black mb-2">Course Substitution:</h4>
                <p className="text-sm font-bold text-black">
                  <strong>ITI 1120 (Introduction to Computing I)</strong> can replace <strong>GNG 1106</strong> if you want.
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 p-4 shadow-brutal">
                <h4 className="font-black text-black mb-2">Introduction to Engineering Fundamentals</h4>
                <p className="text-sm font-bold text-black">
                  Math, physics, chemistry, computing, and design basics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Year 3 Modal */}
      {year3ModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-brutal-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-4 border-black p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-black">Year 3 Important Info</h2>
                  <p className="text-sm font-bold text-black">Diving deep into foundational EE courses</p>
                </div>
                <button
                  onClick={() => setYear3ModalOpen(false)}
                  className="p-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="bg-purple-50 border-2 border-purple-300 p-4 shadow-brutal">
                <h4 className="font-black text-black mb-2">Not Much Important Info Here...</h4>
                <p className="text-sm font-bold text-black">
                  But you really get into some foundational EE courses!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flowchart;
