import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css";
import { LuSend } from "react-icons/lu";

const validate = ({ name, email, project }) => {
    const errors = {};
    if (!name || name.trim().length < 2) {
        errors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!project || project.trim().length < 10) {
        errors.project = 'Please describe your project (at least 10 characters).';
    }
    return errors;
};

export const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});

    const sendEmail = (e) => {
      e.preventDefault();

      const data = {
        name: form.current.name.value,
        email: form.current.email.value,
        project: form.current.project.value,
      };
      const validationErrors = validate(data);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setStatus('');
        return;
      }

      setStatus('sending');

      emailjs.sendForm('service_5ur1tpa', 'template_813t9by', form.current, {
          publicKey: '6tG0A8q_yla_sNCi4',
        })
        .then(() => {
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus(''), 5000);
        })
        .catch((error) => {
          console.error(error);
          setStatus('error');
          setTimeout(() => setStatus(''), 5000);
        });
    };

  return (
    <section className="contact section" id="contact">
        <h2 className="section_title">Let's Build Something Amazing Together</h2>
        <span className="section_subtitle">Get in touch</span>

        <div className="contact_container container grid">
            <div className="contact_content">
                <h3 className="contact_title">Talk to me</h3>

                <div className="contact_info">
                    <div className="contact_card">
                        <i className="bx bx-mail-send contact_card-icon"></i>

                        <h3 className="contact_card-title">Email</h3>
                        <span className="contact_card-data">anilr5364@gmail.com</span>
                        <a href="mailto:anilr5364@gmail.com" className="contact_button">Write me{" "} <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>

                    <div className="contact_card">
                        <i className="uil uil-whatsapp contact_card-icon"></i>

                        <h3 className="contact_card-title">WhatsApp</h3>
                        <span className="contact_card-data">+91-639632-6342</span>
                        <a href="https://api.whatsapp.com/send?phone=6396326342&text=Hello, I'd like to discuss a project!" target="_blank" rel="noreferrer" className="contact_button">Message me <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>

                    <div className="contact_card">
                        <i className="bx bxl-linkedin contact_card-icon"></i>

                        <h3 className="contact_card-title">LinkedIn</h3>
                        <span className="contact_card-data">in/anil-rajput</span>
                        <a href="https://www.linkedin.com/in/anil-rajput-6411a4233/" target="_blank" rel="noreferrer" className="contact_button">Connect <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>

                    <div className="contact_card">
                        <i className="bx bxl-github contact_card-icon"></i>

                        <h3 className="contact_card-title">GitHub</h3>
                        <span className="contact_card-data">@04anilr</span>
                        <a href="https://github.com/04anilr" target="_blank" rel="noreferrer" className="contact_button">View code <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>
                </div>
            </div>

            <div className="contact_content">
                <h3 className="contact_title">Write me your project</h3>

                <form ref={form} onSubmit={sendEmail} className="contact_form" noValidate>
                    <div className="contact_form-div">
                        <label htmlFor="" className="contact_form-tag">Name</label>
                        <input type="text" name='name' className='contact_form-input' placeholder='Insert your name' />
                        {errors.name && <span className="contact_form-error">{errors.name}</span>}
                    </div>

                    <div className="contact_form-div">
                        <label htmlFor="" className="contact_form-tag">Mail</label>
                        <input type="email" name='email' className='contact_form-input' placeholder='Insert your email' />
                        {errors.email && <span className="contact_form-error">{errors.email}</span>}
                    </div>

                    <div className="contact_form-div contact_form-area">
                        <label htmlFor="" className="contact_form-tag">Message</label>
                        <textarea name="project" cols="30" rows="10" className='contact_form-input'
                        placeholder='Describe your project'></textarea>
                        {errors.project && <span className="contact_form-error">{errors.project}</span>}
                    </div>

                    <button className="button button--flex" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                      <LuSend className='send-icon'/>
                    </button>

                    {status === 'success' && (
                      <p className="contact_status success">Your message has been sent successfully!</p>
                    )}
                    {status === 'error' && (
                      <p className="contact_status error">Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    </section>
  )
}
