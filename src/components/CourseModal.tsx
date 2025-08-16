import React from 'react';
import { X } from 'lucide-react';
import { Course, getPrerequisites, courses } from '../data/courses.ts';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onCourseClick?: (course: Course) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose, onCourseClick }) => {
  if (!course || !isOpen) return null;

  const prerequisites = getPrerequisites(course.id);
  
  // Get indirect prerequisites (prerequisites of prerequisites)
  const indirectPrerequisites = prerequisites.flatMap(prereq => {
    const prereqPrerequisites = getPrerequisites(prereq.id);
    return prereqPrerequisites.filter(indirectPrereq => 
      !prerequisites.some(directPrereq => directPrereq.id === indirectPrereq.id)
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black shadow-brutal-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-4 border-black p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-black">{course.code}</h2>
              <p className="text-sm font-bold text-black">{course.name}</p>
              {course.specializations && course.specializations.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {course.specializations.map((spec, index) => (
                    <span key={index} className="px-1 py-0.5 text-xs font-black bg-black text-white border border-black">
                      [{spec}]
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Course Description */}
          <div className="bg-white border-2 border-black p-4 shadow-brutal mb-6">
            <h3 className="text-lg font-black text-black mb-2">Description</h3>
            <p className="text-sm font-bold text-black leading-relaxed">{course.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prerequisites */}
            <div className="bg-yellow-50 border-2 border-yellow-300 p-4 shadow-brutal">
              <h3 className="text-lg font-black text-black mb-3">Prerequisites</h3>
              {prerequisites.length > 0 ? (
                <div className="space-y-2">
                  {prerequisites.map(prereq => (
                    <div 
                      key={prereq.id} 
                      className="bg-white border border-yellow-300 p-3 shadow-brutal cursor-pointer hover:shadow-brutal-lg transition-all"
                      onClick={() => onCourseClick && onCourseClick(prereq)}
                    >
                      <div className="font-bold text-black">{prereq.code}</div>
                      <div className="text-sm text-black">{prereq.name}</div>
                      <div className="text-xs text-gray-600 mt-1">Year {prereq.year} {prereq.semester}</div>
                      {onCourseClick && (
                        <div className="text-xs text-yellow-600 mt-1 font-bold">Click to view details</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">No prerequisites required</div>
              )}
            </div>

            {/* Indirect Prerequisites */}
            <div className="bg-orange-50 border-2 border-orange-300 p-4 shadow-brutal">
              <h3 className="text-lg font-black text-black mb-3">Indirect Prerequisites</h3>
              {indirectPrerequisites.length > 0 ? (
                <div className="space-y-2">
                  {indirectPrerequisites.map(indirectPrereq => (
                    <div 
                      key={indirectPrereq.id} 
                      className="bg-white border border-orange-300 p-3 shadow-brutal cursor-pointer hover:shadow-brutal-lg transition-all"
                      onClick={() => onCourseClick && onCourseClick(indirectPrereq)}
                    >
                      <div className="font-bold text-black">{indirectPrereq.code}</div>
                      <div className="text-sm text-black">{indirectPrereq.name}</div>
                      <div className="text-xs text-gray-600 mt-1">Year {indirectPrereq.year} {indirectPrereq.semester}</div>
                      {onCourseClick && (
                        <div className="text-xs text-orange-600 mt-1 font-bold">Click to view details</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">No indirect prerequisites</div>
              )}
            </div>

            {/* Following Courses */}
            <div className="bg-pink-50 border-2 border-pink-300 p-4 shadow-brutal">
              <h3 className="text-lg font-black text-black mb-3">Following Courses</h3>
              {(() => {
                const followingCourses = courses.filter(c => getPrerequisites(c.id).some(prereq => prereq.id === course.id));
                return followingCourses.length > 0 ? (
                  <div className="space-y-2">
                    {followingCourses.map(following => (
                      <div 
                        key={following.id} 
                        className="bg-white border border-pink-300 p-3 shadow-brutal cursor-pointer hover:shadow-brutal-lg transition-all"
                        onClick={() => onCourseClick && onCourseClick(following)}
                      >
                        <div className="font-bold text-black">{following.code}</div>
                        <div className="text-sm text-black">{following.name}</div>
                        <div className="text-xs text-gray-600 mt-1">Year {following.year} {following.semester}</div>
                        {onCourseClick && (
                          <div className="text-xs text-pink-600 mt-1 font-bold">Click to view details</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No following courses</div>
                );
              })()}
            </div>
          </div>

          {/* Course Details */}
          <div className="mt-6 bg-gray-50 border-2 border-black p-4 shadow-brutal">
            <h3 className="text-lg font-black text-black mb-3">Course Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-bold text-black">Units</div>
                <div className="text-black">{course.units}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-black">Year</div>
                <div className="text-black">{course.year}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-black">Semester</div>
                <div className="text-black">{course.semester}</div>
              </div>

            </div>
            {course.tags.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-bold text-black mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-black text-white text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
