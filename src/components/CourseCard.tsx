import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Tag } from 'lucide-react';
import { Course } from '../data/courses';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  isSelected?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isSelected = false }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core':
        return 'bg-primary-500 text-white';
      case 'Technical':
        return 'bg-secondary-500 text-white';
      case 'Complementary':
        return 'bg-accent-500 text-white';
      case 'Elective':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Physics': 'bg-purple-100 text-purple-800',
      'Electronics': 'bg-green-100 text-green-800',
      'Circuits': 'bg-orange-100 text-orange-800',
      'Communications': 'bg-pink-100 text-pink-800',
      'Control Systems': 'bg-indigo-100 text-indigo-800',
      'Power Systems': 'bg-red-100 text-red-800',
      'Computer Architecture': 'bg-teal-100 text-teal-800',
      'Signal Processing': 'bg-cyan-100 text-cyan-800',
      'Design Project': 'bg-amber-100 text-amber-800',
      'Capstone': 'bg-amber-100 text-amber-800',
      'Programming': 'bg-emerald-100 text-emerald-800',
      'Chemistry': 'bg-lime-100 text-lime-800',
      'Communication': 'bg-sky-100 text-sky-800',
      'Writing': 'bg-sky-100 text-sky-800',
      'Mechanics': 'bg-violet-100 text-violet-800',
      'Computation': 'bg-emerald-100 text-emerald-800',
      'Calculus': 'bg-blue-100 text-blue-800',
      'Design': 'bg-rose-100 text-rose-800',
      'Problem Solving': 'bg-rose-100 text-rose-800',
      'Digital Logic': 'bg-indigo-100 text-indigo-800',
      'Linear Algebra': 'bg-blue-100 text-blue-800',
      'Science': 'bg-purple-100 text-purple-800',
      'Hardware': 'bg-slate-100 text-slate-800',
      'Product Development': 'bg-fuchsia-100 text-fuchsia-800',
      'Management': 'bg-fuchsia-100 text-fuchsia-800',
      'Differential Equations': 'bg-blue-100 text-blue-800',
      'History': 'bg-amber-100 text-amber-800',
      'Society': 'bg-amber-100 text-amber-800',
      'Philosophy': 'bg-stone-100 text-stone-800',
      'Ethics': 'bg-stone-100 text-stone-800',
      'Professional Practice': 'bg-slate-100 text-slate-800',
      'Semiconductors': 'bg-green-100 text-green-800',
      'Electromagnetics': 'bg-purple-100 text-purple-800',
      'Microprocessors': 'bg-indigo-100 text-indigo-800',
      'Antennas': 'bg-purple-100 text-purple-800',
      'Signals': 'bg-cyan-100 text-cyan-800',
      'Systems': 'bg-cyan-100 text-cyan-800',
      'Amplifiers': 'bg-green-100 text-green-800',
      'Probability': 'bg-pink-100 text-pink-800',
      'Statistics': 'bg-pink-100 text-pink-800',
      'Devices': 'bg-green-100 text-green-800',
      'Feedback': 'bg-indigo-100 text-indigo-800',
      'Modulation': 'bg-pink-100 text-pink-800',
      'Machines': 'bg-red-100 text-red-800',
      'Robotics': 'bg-indigo-100 text-indigo-800',
      'Control': 'bg-indigo-100 text-indigo-800',
      'Optics': 'bg-violet-100 text-violet-800',
      'Photonics': 'bg-violet-100 text-violet-800',
      'Transmission': 'bg-red-100 text-red-800',
      'Power Electronics': 'bg-red-100 text-red-800',
      'Wireless': 'bg-pink-100 text-pink-800',
      'Digital': 'bg-indigo-100 text-indigo-800',
      'Microwave': 'bg-purple-100 text-purple-800',
      'Propagation': 'bg-purple-100 text-purple-800',
      'Renewable Energy': 'bg-green-100 text-green-800',
      'VLSI': 'bg-indigo-100 text-indigo-800',
      'Integrated Circuits': 'bg-indigo-100 text-indigo-800',
      'Optimal Control': 'bg-indigo-100 text-indigo-800',
      'Microcontrollers': 'bg-indigo-100 text-indigo-800',
      'Optical Communications': 'bg-violet-100 text-violet-800',
      'Networking': 'bg-cyan-100 text-cyan-800',
    };
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      className={`bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-200 transform hover:-translate-y-1 hover:-translate-x-1 cursor-pointer p-4 ${isSelected ? 'ring-4 ring-primary-500' : ''}`}
      onClick={() => onClick(course)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-black text-lg text-black">{course.code}</h3>
            {course.specializations && course.specializations.length > 0 && (
              <div className="flex gap-1">
                {course.specializations.map((spec, index) => (
                  <span key={index} className="px-1 py-0.5 text-xs font-black bg-black text-white border border-black">
                    [{spec}]
                  </span>
                ))}
              </div>
            )}
          </div>
          <h4 className="font-bold text-sm text-black mb-2 leading-tight">{course.name}</h4>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm text-black">
        <div className="flex items-center gap-1">
          <BookOpen size={14} />
          <span className="font-bold">{course.units} units</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span className="font-bold">{course.year}Y</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {course.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-bold border border-black ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
        {course.tags.length > 3 && (
          <span className="px-2 py-1 text-xs font-bold border border-black bg-white text-black">
            +{course.tags.length - 3}
          </span>
        )}
      </div>

      {course.prerequisites.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-black mb-2">
          <Users size={12} />
          <span className="font-bold">Prereqs: {course.prerequisites.length}</span>
        </div>
      )}

      <div className="text-xs text-black font-bold line-clamp-2">
        {course.description}
      </div>
    </motion.div>
  );
};

export default CourseCard;
