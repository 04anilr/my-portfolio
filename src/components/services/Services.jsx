import React from 'react';
import "./services.css";

const SERVICES = [
    {
        icon: 'uil uil-cog',
        title: 'ERPNext Customization',
        desc: 'Tailored ERPNext modules, doctypes, and workflows mapped to your exact business processes.',
    },
    {
        icon: 'uil uil-brackets-curly',
        title: 'Frappe Development',
        desc: 'Custom apps, server scripts, and APIs built natively on the Frappe Framework.',
    },
    {
        icon: 'uil uil-money-bill',
        title: 'Payroll Systems',
        desc: 'Automated salary structures, tax rules, and one-click payslip generation.',
    },
    {
        icon: 'uil uil-users-alt',
        title: 'HRMS Development',
        desc: 'Attendance, leave, and employee lifecycle management in a single platform.',
    },
    {
        icon: 'uil uil-user-check',
        title: 'Recruitment Systems',
        desc: 'Applicant tracking, interview workflows, and automated approval pipelines.',
    },
    {
        icon: 'uil uil-chart-line',
        title: 'CRM Development',
        desc: 'Lead scoring, deal pipelines, and automated follow-ups for sales teams.',
    },
    {
        icon: 'uil uil-react',
        title: 'React Applications',
        desc: 'Fast, interactive, component-driven UIs with clean, maintainable code.',
    },
    {
        icon: 'uil uil-server-network',
        title: 'Next.js Applications',
        desc: 'SEO-friendly, server-rendered web apps with great performance.',
    },
    {
        icon: 'uil uil-link',
        title: 'API Integration',
        desc: 'Reliable REST integrations connecting ERPNext with third-party services.',
    },
    {
        icon: 'uil uil-process',
        title: 'Business Automation',
        desc: 'Workflow automation that removes manual work and reduces errors.',
    },
];

export const Services = () => {
    return (
        <section className="services section" id="services">
            <h2 className="section_title">Services</h2>
            <span className="section_subtitle">What I can build for your business</span>

            <div className="services_grid container">
                {SERVICES.map((service) => (
                    <article className="services_card" key={service.title}>
                        <span className="services_card-icon">
                            <i className={service.icon}></i>
                        </span>
                        <h3 className="services_card-title">{service.title}</h3>
                        <p className="services_card-desc">{service.desc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};
