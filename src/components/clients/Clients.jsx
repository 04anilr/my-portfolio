import React from "react";
import "./clients.css";

const CLIENTS = [
  { name: "HRMS", full: "Recruitment", initials: "HR", accent: "210" },
  {
    name: "Traval ",
    full: "Traval Management System",
    initials: "TMS",
    accent: "160",
  },
  { name: "CRM", full: "CRM", initials: "CRM", accent: "30" },
];

export const Clients = () => {
  return (
    <section className="clients section" aria-label="Clients">
      <h2 className="section_title">Worked With</h2>
      <span className="section_subtitle">
        Trusted to deliver business-critical solutions
      </span>

      <div className="clients_container container">
        {CLIENTS.map((client) => (
          <div className="clients_card" key={client.name}>
            <span
              className="clients_logo"
              style={{ "--client-accent": client.accent }}
            >
              {client.initials}
            </span>
            <span
              className="clients_name"
              style={{
                textAlign: "center",

                display: "block",

                wordBreak: "break-word",
              }}
            >
              {client.full}
            </span>{" "}
          </div>
        ))}
      </div>
    </section>
  );
};
