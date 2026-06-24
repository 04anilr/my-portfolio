import React from 'react';
import "./skills.css";

const CATEGORIES = [
    {
        title: 'Frontend',
        icon: 'uil uil-brackets-curly',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript', 'HTML / CSS'],
    },
    {
        title: 'Backend',
        icon: 'uil uil-server-network',
        items: ['Frappe', 'ERPNext', 'Python', 'REST APIs'],
    },
    {
        title: 'Database',
        icon: 'uil uil-database',
        items: ['MariaDB', 'MySQL'],
    },
    {
        title: 'Tools',
        icon: 'uil uil-wrench',
        items: ['Git', 'GitHub', 'Docker', 'VS Code'],
    },
];

export const Skills = () => {
    return (
        <section className="skills section" id="skills">
            <h2 className="section_title">Skills</h2>
            <span className="section_subtitle">Technologies I work with</span>

            <div className="skills_container container grid">
                {CATEGORIES.map((cat) => (
                    <div className="skills_content" key={cat.title}>
                        <div className="skills_header">
                            <span className="skills_cat-icon">
                                <i className={cat.icon}></i>
                            </span>
                            <h3 className="skills_title">{cat.title}</h3>
                        </div>
                        <div className="skills_badges">
                            {cat.items.map((item) => (
                                <span className="skills_badge" key={item}>
                                    <i className="bx bx-badge-check"></i>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
