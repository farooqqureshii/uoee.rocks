export interface Course {
  id: string;
  code: string;
  name: string;
  units: number;
  description: string;
  prerequisites: string[];
  corequisites: string[];
  year: number;
  semester: 'Fall' | 'Winter';
  category: 'Core' | 'Elective' | 'Complementary' | 'Technical';
  tags: string[];
  specializations?: string[]; // [T], [S], [E], [M], [P]
}

export const courses: Course[] = [
  // Year 1 Fall
  {
    id: 'CHM1311',
    code: 'CHM 1311',
    name: 'Principles of Chemistry',
    units: 3,
    description: 'Fundamental principles of chemistry including atomic structure, chemical bonding, thermodynamics, and kinetics.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Fall',
    category: 'Core',
    tags: ['Chemistry', 'Science']
  },
  {
    id: 'ENG1112',
    code: 'ENG 1112',
    name: 'Technical Report Writing',
    units: 3,
    description: 'Technical writing skills for engineering students including report structure, documentation, and communication.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Fall',
    category: 'Core',
    tags: ['Communication', 'Writing']
  },
  {
    id: 'GNG1105',
    code: 'GNG 1105',
    name: 'Engineering Mechanics',
    units: 3,
    description: 'Fundamental principles of statics and dynamics applied to engineering problems.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Fall',
    category: 'Core',
    tags: ['Mechanics', 'Physics']
  },
  {
    id: 'GNG1106',
    code: 'GNG 1106',
    name: 'Fundamentals of Engineering Computation',
    units: 3,
    description: 'Introduction to computational methods and programming for engineering applications.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Fall',
    category: 'Core',
    tags: ['Programming', 'Computation']
  },
  {
    id: 'MAT1320',
    code: 'MAT 1320',
    name: 'Calculus I',
    units: 3,
    description: 'Differential calculus including limits, derivatives, and applications to engineering problems.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Fall',
    category: 'Core',
    tags: ['Mathematics', 'Calculus']
  },

  // Year 1 Winter
  {
    id: 'GNG1103',
    code: 'GNG 1103',
    name: 'Introduction to Engineering Design',
    units: 3,
    description: 'Introduction to engineering design process, creativity, and problem-solving methodologies.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Winter',
    category: 'Core',
    tags: ['Design', 'Problem Solving']
  },
  {
    id: 'ITI1100',
    code: 'ITI 1100',
    name: 'Digital Systems I',
    units: 3,
    description: 'Introduction to digital logic design, Boolean algebra, and combinational circuits.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Winter',
    category: 'Core',
    tags: ['Digital Logic', 'Electronics']
  },
  {
    id: 'MAT1322',
    code: 'MAT 1322',
    name: 'Calculus II',
    units: 3,
    description: 'Integral calculus including techniques of integration and applications.',
    prerequisites: ['MAT1320'],
    corequisites: [],
    year: 1,
    semester: 'Winter',
    category: 'Core',
    tags: ['Mathematics', 'Calculus']
  },
  {
    id: 'MAT1341',
    code: 'MAT 1341',
    name: 'Introduction to Linear Algebra',
    units: 3,
    description: 'Fundamentals of linear algebra including matrices, vectors, and systems of equations.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Winter',
    category: 'Core',
    tags: ['Mathematics', 'Linear Algebra']
  },
  {
    id: 'PHY1124',
    code: 'PHY 1124',
    name: 'Fundamentals of Physics for Engineers',
    units: 3,
    description: 'Physics fundamentals including mechanics, electricity, and magnetism for engineering applications.',
    prerequisites: [],
    corequisites: [],
    year: 1,
    semester: 'Winter',
    category: 'Core',
    tags: ['Physics', 'Science']
  },

  // Year 2 Fall
  {
    id: 'CEG2136',
    code: 'CEG 2136',
    name: 'Computer Architecture I',
    units: 3,
    description: 'Design of digital computers, instruction sets, CPU design, and memory systems.',
    prerequisites: ['ITI1100'],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Core',
    tags: ['Computer Architecture', 'Hardware']
  },
  {
    id: 'ELG2138',
    code: 'ELG 2138',
    name: 'Circuit Theory I',
    units: 3,
    description: 'DC and AC circuit analysis, Kirchhoff laws, circuit theorems, and phasor analysis.',
    prerequisites: ['ITI1100', 'MAT1341', 'MAT1322'],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Core',
    tags: ['Circuits', 'Electronics']
  },
  {
    id: 'GNG2101',
    code: 'GNG 2101',
    name: 'Introduction to Product Development for Engineers and Computer Scientists',
    units: 3,
    description: 'Product development methodologies, team dynamics, and project management for engineers.',
    prerequisites: ['GNG1103'],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Core',
    tags: ['Product Development', 'Management']
  },
  {
    id: 'MAT2322',
    code: 'MAT 2322',
    name: 'Calculus III for Engineers',
    units: 3,
    description: 'Multivariable calculus including partial derivatives, multiple integrals, and vector calculus.',
    prerequisites: ['MAT1322'],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Core',
    tags: ['Mathematics', 'Calculus']
  },
  {
    id: 'MAT2384',
    code: 'MAT 2384',
    name: 'Ordinary Differential Equations and Numerical Methods',
    units: 3,
    description: 'Solution methods for ordinary differential equations and numerical analysis techniques.',
    prerequisites: ['MAT1322', 'MAT1341'],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Core',
    tags: ['Mathematics', 'Differential Equations']
  },
  {
    id: 'HIS2129',
    code: 'HIS 2129',
    name: 'Technology, Society and Environment since 1800',
    units: 3,
    description: 'Historical analysis of the relationship between technology, society, and environmental change.',
    prerequisites: [],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Complementary',
    tags: ['History', 'Society']
  },
  {
    id: 'PHI2394',
    code: 'PHI 2394',
    name: 'Scientific Thought and Social Values',
    units: 3,
    description: 'Philosophical examination of scientific methodology and its relationship to social values.',
    prerequisites: [],
    corequisites: [],
    year: 2,
    semester: 'Fall',
    category: 'Complementary',
    tags: ['Philosophy', 'Ethics']
  },

  // Year 2 Winter
  {
    id: 'ELG2911',
    code: 'ELG 2911',
    name: 'Professional Practice in Information Technology and Engineering',
    units: 3,
    description: 'Professional ethics, legal obligations, and communication skills for engineering practice.',
    prerequisites: [],
    corequisites: [],
    year: 2,
    semester: 'Winter',
    category: 'Core',
    tags: ['Professional Practice', 'Ethics']
  },
  {
    id: 'ELG2136',
    code: 'ELG 2136',
    name: 'Electronics I',
    units: 3,
    description: 'Semiconductor physics, diodes, transistors, and basic amplifier circuits.',
    prerequisites: ['ELG2138'],
    corequisites: [],
    year: 2,
    semester: 'Winter',
    category: 'Core',
    tags: ['Electronics', 'Semiconductors']
  },
  {
    id: 'ELG2137',
    code: 'ELG 2137',
    name: 'Circuit Theory II',
    units: 3,
    description: 'Operational amplifiers, RLC circuits, Laplace transforms, and two-port networks.',
    prerequisites: ['ELG2138', 'MAT2384'],
    corequisites: [],
    year: 2,
    semester: 'Winter',
    category: 'Core',
    tags: ['Circuits', 'Electronics']
  },
  {
    id: 'PHY2323',
    code: 'PHY 2323',
    name: 'Electricity and Magnetism',
    units: 3,
    description: 'Electromagnetic theory including Maxwell\'s equations and electromagnetic wave propagation.',
    prerequisites: ['MAT2322', 'PHY1124'],
    corequisites: [],
    year: 2,
    semester: 'Winter',
    category: 'Core',
    tags: ['Physics', 'Electromagnetics']
  },

  // Year 3 Fall
  {
    id: 'CEG3136',
    code: 'CEG 3136',
    name: 'Computer Architecture II',
    units: 3,
    description: 'Microprocessors, CISC/RISC architectures, microcontrollers, and embedded systems.',
    prerequisites: ['CEG2136'],
    corequisites: [],
    year: 3,
    semester: 'Fall',
    category: 'Core',
    tags: ['Computer Architecture', 'Microprocessors']
  },
  {
    id: 'ELG3106',
    code: 'ELG 3106',
    name: 'Electromagnetic Engineering',
    units: 3,
    description: 'Transmission lines, waveguides, impedance matching, and antenna fundamentals.',
    prerequisites: ['MAT2322', 'MAT2384', 'PHY2323'],
    corequisites: [],
    year: 3,
    semester: 'Fall',
    category: 'Core',
    tags: ['Electromagnetics', 'Antennas']
  },
  {
    id: 'ELG3125',
    code: 'ELG 3125',
    name: 'Signal and System Analysis',
    units: 3,
    description: 'Continuous and discrete-time signals, Fourier analysis, and linear time-invariant systems.',
    prerequisites: ['ELG2138'],
    corequisites: [],
    year: 3,
    semester: 'Fall',
    category: 'Core',
    tags: ['Signals', 'Systems']
  },
  {
    id: 'ELG3136',
    code: 'ELG 3136',
    name: 'Electronics II',
    units: 3,
    description: 'Differential amplifiers, frequency response, feedback, and power amplifiers.',
    prerequisites: ['ELG2136'],
    corequisites: [],
    year: 3,
    semester: 'Fall',
    category: 'Core',
    tags: ['Electronics', 'Amplifiers']
  },

  // Year 3 Winter
  {
    id: 'ELG3126',
    code: 'ELG 3126',
    name: 'Random Signals and Systems',
    units: 3,
    description: 'Probability theory, random processes, and statistical signal processing.',
    prerequisites: ['ELG3125'],
    corequisites: [],
    year: 3,
    semester: 'Winter',
    category: 'Core',
    tags: ['Probability', 'Statistics']
  },
  {
    id: 'ELG3137',
    code: 'ELG 3137',
    name: 'Fundamentals of Semiconductor Devices',
    units: 3,
    description: 'Solid-state physics, semiconductor device operation, and modern device fabrication.',
    prerequisites: ['ELG2136', 'MAT2384', 'PHY1124'],
    corequisites: [],
    year: 3,
    semester: 'Winter',
    category: 'Core',
    tags: ['Semiconductors', 'Devices']
  },
  {
    id: 'ELG3155',
    code: 'ELG 3155',
    name: 'Introduction to Control Systems',
    units: 3,
    description: 'Control system analysis, stability criteria, and controller design methods.',
    prerequisites: ['ELG3125'],
    corequisites: [],
    year: 3,
    semester: 'Winter',
    category: 'Core',
    tags: ['Control Systems', 'Feedback']
  },
  {
    id: 'ELG3175',
    code: 'ELG 3175',
    name: 'Introduction to Communication Systems',
    units: 3,
    description: 'Analog and digital modulation techniques, communication system analysis.',
    prerequisites: ['ELG3125'],
    corequisites: ['ELG3126'],
    year: 3,
    semester: 'Winter',
    category: 'Core',
    tags: ['Communications', 'Modulation']
  },
  {
    id: 'ELG3316',
    code: 'ELG 3316',
    name: 'Electric Machines and Power Systems',
    units: 3,
    description: 'AC/DC machines, transformers, and power system fundamentals.',
    prerequisites: ['ELG2138'],
    corequisites: [],
    year: 3,
    semester: 'Winter',
    category: 'Core',
    tags: ['Power Systems', 'Machines']
  },

  // Year 4 Fall - Technical Electives
  {
    id: 'CEG4158',
    code: 'CEG 4158',
    name: 'Computer Control in Robotics',
    units: 3,
    description: 'Robotic systems, kinematics, control algorithms, and computer vision for robotics.',
    prerequisites: ['CEG2136', 'ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Robotics', 'Control', 'Specialization'],
    specializations: ['S']
  },
  {
    id: 'ELG4117',
    code: 'ELG 4117',
    name: 'Optoelectronics and Optical Components',
    units: 3,
    description: 'Optical devices, lasers, photodetectors, and optoelectronic system design.',
    prerequisites: ['ELG3106', 'ELG3136'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Optics', 'Photonics', 'Specialization'],
    specializations: ['E', 'M']
  },
  {
    id: 'ELG4125',
    code: 'ELG 4125',
    name: 'Electric Power Transmission, Distribution & Utilization',
    units: 3,
    description: 'Power system analysis, transmission lines, distribution systems, and power quality.',
    prerequisites: ['ELG2137', 'ELG3316'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Power Systems', 'Transmission', 'Specialization'],
    specializations: ['P']
  },
  {
    id: 'ELG4139',
    code: 'ELG 4139',
    name: 'Electronics III',
    units: 3,
    description: 'Advanced operational amplifier applications, power electronics, and MEMS devices.',
    prerequisites: ['ELG3136', 'ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Electronics', 'Power Electronics', 'Specialization'],
    specializations: ['T', 'E', 'M', 'P']
  },
  {
    id: 'ELG4156',
    code: 'ELG 4156',
    name: 'Linear Systems',
    units: 3,
    description: 'State-space analysis, controllability, observability, and system identification.',
    prerequisites: ['ELG3125', 'ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Systems', 'Control', 'Specialization'],
    specializations: ['T', 'S']
  },
  {
    id: 'ELG4176',
    code: 'ELG 4176',
    name: 'Communication Systems',
    units: 3,
    description: 'Digital communication systems, modulation, detection, and error control coding.',
    prerequisites: ['ELG3175', 'ELG3126'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Communications', 'Digital', 'Specialization'],
    specializations: ['T', 'E']
  },
  {
    id: 'ELG4179',
    code: 'ELG 4179',
    name: 'Wireless Communication Fundamentals',
    units: 3,
    description: 'Wireless propagation, cellular systems, and modern wireless communication standards.',
    prerequisites: ['ELG3175'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Technical',
    tags: ['Wireless', 'Communications', 'Specialization'],
    specializations: ['T', 'M', 'P']
  },
  {
    id: 'ELG4912',
    code: 'ELG 4912',
    name: 'Electrical Engineering Design Project: Part I',
    units: 3,
    description: 'Capstone design project integrating electrical engineering knowledge and skills.',
    prerequisites: ['ELG3106', 'ELG3136', 'ELG3175', 'ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Fall',
    category: 'Core',
    tags: ['Design Project', 'Capstone', 'Specialization'],
    specializations: ['T', 'S', 'E', 'M', 'P']
  },

  // Year 4 Winter - Technical Electives
  {
    id: 'ELG4115',
    code: 'ELG 4115',
    name: 'Microwave Circuits',
    units: 3,
    description: 'Microwave circuit design, network parameters, and microwave amplifier design.',
    prerequisites: ['ELG3106', 'ELG3136'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Microwave', 'Circuits', 'Specialization'],
    specializations: ['E', 'M']
  },
  {
    id: 'ELG4118',
    code: 'ELG 4118',
    name: 'Wave Propagation and Antennas',
    units: 3,
    description: 'Antenna theory, array antennas, and electromagnetic wave propagation.',
    prerequisites: ['ELG3106'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Antennas', 'Propagation', 'Specialization'],
    specializations: ['T', 'M']
  },
  {
    id: 'ELG4126',
    code: 'ELG 4126',
    name: 'Sustainable Electrical Power Systems',
    units: 3,
    description: 'Renewable energy integration, smart grids, and sustainable power system design.',
    prerequisites: ['ELG2137', 'ELG3316', 'ELG3136', 'ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Power Systems', 'Renewable Energy', 'Specialization'],
    specializations: ['P']
  },
  {
    id: 'ELG4137',
    code: 'ELG 4137',
    name: 'Principles and Applications of VLSI Design',
    units: 3,
    description: 'VLSI design methodologies, CMOS circuits, and integrated circuit design.',
    prerequisites: ['ELG2136'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['VLSI', 'Integrated Circuits', 'Specialization'],
    specializations: ['S', 'E']
  },
  {
    id: 'ELG4157',
    code: 'ELG 4157',
    name: 'Modern Control Engineering',
    units: 3,
    description: 'Advanced control techniques, optimal control, and modern control system design.',
    prerequisites: ['ELG3155'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Control Systems', 'Optimal Control', 'Specialization'],
    specializations: ['S', 'P']
  },
  {
    id: 'ELG4159',
    code: 'ELG 4159',
    name: 'Integrated Control Systems',
    units: 3,
    description: 'Microcontroller-based control systems, digital control, and system integration.',
    prerequisites: ['CEG3136', 'ELG3125', 'ELG3155', 'ELG3316'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Control Systems', 'Microcontrollers', 'Specialization'],
    specializations: ['S', 'P']
  },
  {
    id: 'ELG4177',
    code: 'ELG 4177',
    name: 'Digital Signal Processing',
    units: 3,
    description: 'Digital signal processing algorithms, filter design, and DSP applications.',
    prerequisites: ['ELG3125'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Signal Processing', 'Digital', 'Specialization'],
    specializations: ['T', 'S', 'E']
  },
  {
    id: 'ELG4178',
    code: 'ELG 4178',
    name: 'Optical Communications and Networking',
    units: 3,
    description: 'Optical fiber communications, WDM systems, and optical networking.',
    prerequisites: ['ELG3106'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Technical',
    tags: ['Optical Communications', 'Networking', 'Specialization'],
    specializations: ['M']
  },
  {
    id: 'ELG4913',
    code: 'ELG 4913',
    name: 'Electrical Engineering Design Project: Part II',
    units: 3,
    description: 'Completion of the capstone design project with final implementation and presentation.',
    prerequisites: ['ELG4912'],
    corequisites: [],
    year: 4,
    semester: 'Winter',
    category: 'Core',
    tags: ['Design Project', 'Capstone', 'Specialization'],
    specializations: ['T', 'S', 'E', 'M', 'P']
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getPrerequisites = (courseId: string): Course[] => {
  const course = getCourseById(courseId);
  if (!course) return [];
  return course.prerequisites.map(prereqId => getCourseById(prereqId)).filter(Boolean) as Course[];
};

export const getCorequisites = (courseId: string): Course[] => {
  const course = getCourseById(courseId);
  if (!course) return [];
  return course.corequisites.map(coreqId => getCourseById(coreqId)).filter(Boolean) as Course[];
};

export const getCoursesByYearAndSemester = (year: number, semester: 'Fall' | 'Winter'): Course[] => {
  return courses.filter(course => course.year === year && course.semester === semester);
};
