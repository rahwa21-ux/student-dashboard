import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaQuestionCircle } from "react-icons/fa";
import "./Support.css";

const supportCards = [
  {
    icon: <FaEnvelope />,
    title: "Email Support",
    description: "Send your issues and we will reply within 24 hours.",
    info: "support@studentdash.com",
  },
  {
    icon: <FaPhone />,
    title: "Call Support",
    description: "Get instant help for urgent issues.",
    info: "+251 9XX XXX XXX",
  },
  {
    icon: <FaQuestionCircle />,
    title: "FAQs",
    description: "Find answers to common questions quickly.",
    info: "Browse FAQs",
  },
];

const faqData = [
  {
    question: "How can I reset my password?",
    answer: "Go to Settings → Reset Password and follow the steps.",
  },
  {
    question: "How can I view my assignments?",
    answer: "Go to the Assignments page and filter by subject or due date.",
  },
  {
    question: "How can I contact my instructor?",
    answer:
      "Use the Email Support option or message your instructor directly from the subject page.",
  },
];

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="support-page">
      <div className="support-header">
        <h2>Support</h2>
        <p>We’re here to help. Contact us anytime.</p>
      </div>

      <div className="support-grid">
        <div className="support-cards">
          {supportCards.map((card, index) => (
            <div className="support-card" key={index}>
              <div className="support-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="support-info">{card.info}</span>
            </div>
          ))}
        </div>

        <div className="support-form">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>

          <div className="support-faq">
            <h3>FAQs</h3>
            {faqData.map((faq, idx) => (
              <div className="faq-item" key={idx}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
