import React from 'react';
import './testimonials.css';
import { FaStar, FaQuoteRight } from 'react-icons/fa6';

const TESTIMONIALS = [
    {
        name: 'Project Manager',
        role: 'Hybrowlabs Technologies',
        rating: 5,
        text: 'Anil delivered our ERPNext HRMS and Payroll modules ahead of schedule. His grasp of the Frappe framework and attention to edge cases made the rollout remarkably smooth.',
    },
    {
        name: 'Freelance Client',
        role: 'Operations Lead',
        rating: 5,
        text: 'He automated our manual recruitment and CRM workflows end-to-end. What used to take days now runs in minutes. Clear communication throughout the engagement.',
    },
    {
        name: 'Engineering Peer',
        role: 'Full Stack Developer',
        rating: 5,
        text: 'Strong React and Next.js skills paired with solid backend instincts. Anil writes clean, maintainable code and is genuinely reliable on tight deadlines.',
    },
];

export const Testimonials = () => {
    return (
        <section className="testimonials section" id="testimonials" aria-label="Testimonials">
            <h2 className="section_title">Testimonials</h2>
            <span className="section_subtitle">What people I work with say</span>

            <div className="testimonials_container container">
                {TESTIMONIALS.map((t) => (
                    <article className="testimonials_card" key={t.name + t.role}>
                        <FaQuoteRight className="testimonials_quote" aria-hidden="true" />
                        <div className="testimonials_stars" aria-label={`${t.rating} out of 5 stars`}>
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <p className="testimonials_text">"{t.text}"</p>
                        <div className="testimonials_author">
                            <span className="testimonials_avatar">{t.name.charAt(0)}</span>
                            <div>
                                <h3 className="testimonials_name">{t.name}</h3>
                                <span className="testimonials_role">{t.role}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
