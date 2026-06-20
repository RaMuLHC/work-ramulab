import { WorkExperience, SkillCategory } from './types';

export const RESUME_INFO = {
  name: 'Ram Liu',
  fullName: 'Hau-Choi Liu',
  title: 'IT Support Specialist / Global Technology Specialist',
  avatar: 'RL',
  contact: {
    address: '6480 No.4 Road, Richmond, BC V6Y2S9',
    email: 'liuhauchoi@gmail.com',
    phone: '+1 236 513 6243',
    linkedin: 'linkedin.com/in/hauchoiliu',
    languages: [
      { name: 'Cantonese', proficiency: 'Fluent' },
      { name: 'Mandarin', proficiency: 'Fluent' },
      { name: 'English', proficiency: 'Fluent' }
    ]
  },
  summary: "Dedicated IT Support Specialist serving as the sole technology contact for Broadcom's Canada region. Proven track record of optimizing ticket workflows, significantly reducing resolution times, and bridging communication between technical and non-technical teams. Recognized for delivering empathetic, solution-driven support that enhances end-user satisfaction and enterprise IT operations."
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Global Technology Specialist',
    company: 'Broadcom',
    location: 'Richmond, BC',
    period: 'January 2022 – Present',
    highlights: [
      'Served as the sole Global Technology Specialist, managing all end-user support across the Canada region.',
      'Provided L2 deskside support, handling all escalated tickets from L1 support, and coordinating with vendors and clients.',
      'Managed all day-to-day internal support, including Active Directory (AD) account management, network maintenance, and video conferencing support.',
      'Increased user satisfaction and product adoption by conducting root cause analysis and ensuring seamless cross-team handoffs for complex cases.',
      'Spearheaded asset management and system enrollment across Canada and the U.S. utilizing Workspace ONE.',
      'Authored comprehensive Knowledge Base (KB) documentation to streamline the equipment return and new system enrollment processes for Canadian users.',
      'Key involvement in the VMware acquisition project, successfully migrating approximately 100 users and their systems into the Broadcom environment.'
    ],
    skillsAssociated: ['Workspace ONE', 'Active Directory', 'macOS', 'Microsoft Office', 'Google Workspace', 'Wolken']
  },
  {
    id: 'exp-2',
    role: 'IT Support (IT Service Engineer)',
    company: 'Sino Group',
    location: 'Hong Kong',
    period: 'September 2019 – November 2021',
    highlights: [
      'Provided comprehensive in-house and onsite IT support, including managing AD and MS Exchange accounts and server maintenance.',
      'Ensured system reliability through server backup, anti-virus maintenance, and handling daily event logs.',
      'Executed hardware installation and replacement, including PCs, Servers, Network Switches, Routers, and NAS devices.',
      'Established network and VPN tunnels for new site setups and updated official documentation (Specification, Procedure, etc.).',
      'Key Projects: Server Relocation (2019), PC Windows 10 Upgrade (2020), Office 365 Implementation (2020), and Octopus Payment System Upgrade (2021).'
    ],
    skillsAssociated: ['Active Directory', 'Microsoft Exchange', 'Microsoft Windows Server', 'DNS', 'DHCP', 'VPN']
  },
  {
    id: 'exp-3',
    role: 'Technician',
    company: 'ASL',
    location: 'Hong Kong',
    period: 'August 2018 – September 2019',
    highlights: [
      'Provided in-house IT support for Henderson Real Estate Agency and onsite support for shopping malls and properties back offices.'
    ],
    skillsAssociated: ['Microsoft Windows', 'Microsoft Office', 'Ethernet']
  }
];

export const EDUCATION = {
  institution: 'Hong Kong Institute of Vocational Education',
  degree: 'Game Software Development (Higher Diploma)',
  period: 'September 2016 – July 2018',
  description: 'Comprehensive program focused on technical and theoretical skills needed for game creation: Programming, Game Engines, 3D Modeling, and Game Flow Design.',
  curriculum: ['Programming', 'Game Engines', '3D Modeling', 'Game Flow Design']
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Networking & Cloud Infrastructure',
    skills: [
      { name: 'Active Directory', isKey: true },
      { name: 'Microsoft Exchange', isKey: true },
      { name: 'Microsoft Windows Server', isKey: true },
      { name: 'DNS', isKey: true },
      { name: 'DHCP', isKey: true },
      { name: 'VPN', isKey: true },
      { name: 'LAN/WAN', isKey: true },
      { name: 'Ethernet', isKey: false },
      { name: 'Cloudflare', isKey: false },
      { name: 'Web Hosting', isKey: false }
    ]
  },
  {
    title: 'Operating Systems & Software',
    skills: [
      { name: 'Microsoft Windows', isKey: true },
      { name: 'macOS', isKey: true },
      { name: 'Microsoft Office', isKey: true },
      { name: 'Google Workspace', isKey: true },
      { name: 'Wolken', isKey: true },
      { name: 'Workspace ONE', isKey: true },
      { name: 'OBS Studio', isKey: false }
    ]
  },
  {
    title: 'Development & Tools',
    skills: [
      { name: 'Git', isKey: true },
      { name: 'GitHub Pages', isKey: false },
      { name: 'Docsify', isKey: false },
      { name: 'Antigravity', isKey: true },
      { name: 'AIStudio', isKey: true },
      { name: 'A/V Routing', isKey: false },
      { name: '3D Printing', isKey: false }
    ]
  }
];


