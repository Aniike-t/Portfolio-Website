import React from 'react';
import { Sun, BatteryCharging, Building2 } from 'lucide-react';
import './SolaraServices.css';

const SERVICES = [
  {
    id: "s1",
    title: "Solar Panel Installation",
    description: "High-performance and long-lasting solar panel installation tailored to optimize sun absorption on home or industrial rooftops.",
    icon: <Sun size={32} />
  },
  {
    id: "s2",
    title: "Solar Inverter Solutions",
    description: "Advanced inverter and battery systems for reliable power storage, keeping your backup active during peak blackout periods.",
    icon: <BatteryCharging size={32} />
  },
  {
    id: "s3",
    title: "Residential & Commercial",
    description: "Custom solar grid layouts engineered specifically to match the daily load demands of homes, factories, and offices.",
    icon: <Building2 size={32} />
  }
];

function SolaraServices() {
  return (
    <section id="services" className="solara-services-section">
      <div className="solara-services-container">
        
        <div className="services-header">
          <span className="solara-section-subtitle">Featured Services</span>
          <h2 className="solara-section-title">Our Solutions</h2>
          <p className="services-sub">
            We provide clean, end-to-end solar solutions built to scale for your home or business.
          </p>
        </div>

        <div className="services-grid-layout">
          {SERVICES.map(srv => (
            <div key={srv.id} className="service-card">
              <div className="service-icon-box">
                {srv.icon}
              </div>
              <h3>{srv.title}</h3>
              <p>{srv.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SolaraServices;
