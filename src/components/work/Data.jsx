import Work1 from "../../assets/localhost_5174_(Nest Hub).png";
import Work2 from "../../assets/GoogleClone.png";
import Work3 from "../../assets/weather-appp-rosy.vercel.app_ (1).png";
import Work4 from "../../assets/04anilr.netlify.app_blogs_flashcard_.png";
import Work5 from "../../assets/insta-clone-5cuirgfg3-anil-rajputs-projects.vercel.app_.png";
import Work6 from "../../assets/todolist.png";
import Work7 from "../../assets/number-counter.png";
import Work8 from "../../assets/calculator.png";
import CasePayroll from "../../assets/slideOne.png";
import CaseHrms from "../../assets/slideTwo.png";
import CaseCrm from "../../assets/slideThree.png";


export const projectsData = [

    {
        id: 101,
        image: CasePayroll,
        title: 'Payroll Automation System',
        category: 'business',
        description: 'End-to-end payroll automation built on ERPNext for an HR operations team.',
        problem: 'Manual payroll processing across spreadsheets caused delays, calculation errors, and compliance risk every pay cycle.',
        solution: 'Built a payroll automation module on ERPNext with salary structures, automated tax & deduction rules, and one-click payslip generation.',
        result: 'Cut payroll processing time by ~80% and eliminated manual calculation errors across the monthly cycle.',
        techStack: ['Frappe', 'ERPNext', 'Python', 'MariaDB'],
    },
    {
        id: 102,
        image: CaseHrms,
        title: 'HRMS & Recruitment Platform',
        category: 'business',
        description: 'A complete HRMS with attendance, leave, and an end-to-end recruitment pipeline.',
        problem: 'HR managed employee data, leave, and hiring across disconnected tools with no single source of truth.',
        solution: 'Developed an HRMS on Frappe covering attendance, leave workflows, and a recruitment module with applicant tracking and approval flows.',
        result: 'Centralized HR operations into one system and reduced hiring-pipeline turnaround with automated approvals.',
        techStack: ['Frappe', 'ERPNext', 'HRMS', 'Python'],
    },
    {
        id: 103,
        image: CaseCrm,
        title: 'CRM & Business Automation',
        category: 'business',
        description: 'A custom CRM with automated lead, deal, and workflow management.',
        problem: 'Sales teams lost leads and lacked visibility into the pipeline, with follow-ups tracked manually.',
        solution: 'Implemented a CRM on ERPNext with lead scoring, automated assignment, and workflow-driven follow-up reminders integrated via REST APIs.',
        result: 'Improved lead response time and gave the team real-time pipeline visibility through automated dashboards.',
        techStack: ['ERPNext', 'CRM', 'REST API', 'Python'],
    },
    {
        id: 1,
        image: Work1,
        title: 'GitHub User Finder',
        category: 'app',
        demoLink: 'https://git-hub-user-search-app-git-main-anil-rajputs-projects.vercel.app/',
        description: 'An interactive React application that searches the GitHub API to retrieve and present detailed user profiles, repositories, followers, and user statistics in a clean interface.',
        techStack: ['React', 'CSS', 'GitHub API', 'Vercel'],
        githubLink: 'https://github.com/04anilr/git-hub-user-search-app'
    },
    {
        id: 2,
        image: Work2,
        title: 'Google Clone',
        category: 'web',
        demoLink: 'https://google-clone-puce-theta.vercel.app/',
        description: 'A recreation of the Google Search home page and results interface, integrated with Google Custom Search API to perform and show real searches.',
        techStack: ['React', 'CSS', 'Google API', 'Vercel'],
        githubLink: 'https://github.com/04anilr/google-clone'
    },
    {
        id: 3,
        image: Work3,
        title: 'Weather App',
        category: 'app',
        demoLink: 'https://weather-appp-rosy.vercel.app/',
        description: 'A responsive weather forecast web app using the OpenWeather API to display current conditions and local forecasts based on location searches.',
        techStack: ['React', 'CSS', 'OpenWeather API', 'Vercel'],
        githubLink: 'https://github.com/04anilr/weather-app'
    },
    {
        id: 4,
        image: Work4,
        title: 'Flashcard App',
        category: 'app',
        demoLink: 'https://04anilr.netlify.app/blogs/flashcard/',
        description: 'A learning utility application that lets users construct decks of study flashcards for active recall revision, with persistent local state.',
        techStack: ['React', 'CSS', 'LocalStorage', 'Netlify'],
        githubLink: 'https://github.com/04anilr/flashcard-app'
    },
    {
        id: 5,
        image: Work5,
        title: 'Instagram Clone',
        category: 'web',
        demoLink: 'https://insta-clone-5cuirgfg3-anil-rajputs-projects.vercel.app/',
        description: 'A fully functional front-end clone of Instagram displaying feeds, stories, dynamic post creation, and responsive layout styling.',
        techStack: ['React', 'CSS', 'Tailwind', 'Vercel'],
        githubLink: 'https://github.com/04anilr/insta-clone'
    },
    {
        id: 6,
        image: Work6,
        title: 'To-Do List',
        category: 'app',
        demoLink: 'https://todolist0402.netlify.app/',
        description: 'A modern, clean productivity application enabling task creation, completion toggles, filters, and offline storage synchronization.',
        techStack: ['React', 'CSS', 'LocalStorage', 'Netlify'],
        githubLink: 'https://github.com/04anilr/todo-list'
    },
    {
        id: 7,
        image: Work7,
        title: 'Number Counter',
        category: 'app',
        demoLink: 'https://number-counter12.netlify.app/',
        description: 'A counter utility implementing dynamic increments, decrements, custom range bounds, and simple interface styling.',
        techStack: ['React', 'CSS', 'Netlify'],
        githubLink: 'https://github.com/04anilr/number-counter'
    },
    {
        id: 8,
        image: Work8,
        title: 'Calculator',
        category: 'app',
        demoLink: 'https://calculator0402.netlify.app/',
        description: 'A browser calculator with grid alignment that handles formula syntax evaluation, negative bounds, and float calculations.',
        techStack: ['React', 'CSS', 'Netlify'],
        githubLink: 'https://github.com/04anilr/calculator'
    }
];

export const projectsNav = [
    {
        name: 'all',

    },
    {
        name: 'business',

    },
    {
        name: 'web',

    },
    {
        name: 'app',

    },
    {
        name: 'design',

    },
];
