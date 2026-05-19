import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css";
import { LuSend } from "react-icons/lu";

export const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
      e.preventDefault();
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
        <h2 className="section_title">Get in touch</h2>
        <span className="section_subtitle">Contact me</span>

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
                        <a href="https://api.whatsapp.com/send?phone=6396326342&text=Hello, more information!" className="contact_button">Write me <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>

                    <div className="contact_card">
                        <i className="uil uil-facebook-messenger contact_card-icon"></i>

                        <h3 className="contact_card-title">Messenger</h3>
                        <span className="contact_card-data">user.fb14</span>
                        <a href="https://m.me/cryticalcoder" className="contact_button">Write me <i
                         className="bx bx-right-arrow-alt contact_button-icon"></i></a>

                    </div>
                </div>
            </div>

            <div className="contact_content">
                <h3 className="contact_title">Write me your project</h3>

                <form  ref={form} onSubmit={sendEmail} className="contact_form">
                    <div className="contact_form-div">
                        <label htmlFor="" className="contact_form-tag">Name</label>
                        <input type="text" name='name'className='contact_form-input' placeholder='Insert your name' required />
                    </div>

                    <div className="contact_form-div">
                        <label htmlFor="" className="contact_form-tag">Mail</label>
                        <input type="email" name='email'className='contact_form-input' placeholder='Insert your email' required />
                    </div>

                    <div className="contact_form-div contact_form-area">
                        <label htmlFor="" className="contact_form-tag">Message</label>
                        <textarea name="project"  cols="30" rows="10" className='contact_form-input'
                        placeholder='Describe your project' required></textarea>
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
