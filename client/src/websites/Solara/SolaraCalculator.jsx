import React, { useState, useMemo } from 'react';
import { Sun, Leaf, Award, IndianRupee, HelpCircle } from 'lucide-react';
import './SolaraCalculator.css';

const STATE_RATES = {
  "Maharashtra": { rate: 9.0, solarFactor: 4.2 },
  "Delhi": { rate: 7.5, solarFactor: 4.0 },
  "Karnataka": { rate: 8.2, solarFactor: 4.4 },
  "Gujarat": { rate: 7.0, solarFactor: 4.5 },
  "Tamil Nadu": { rate: 8.0, solarFactor: 4.3 }
};

function SolaraCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(4000);
  const [roofArea, setRoofArea] = useState(500);
  const [currentState, setCurrentState] = useState("Maharashtra");

  const calculations = useMemo(() => {
    const { rate, solarFactor } = STATE_RATES[currentState] || STATE_RATES["Maharashtra"];
    
    // Estimate units consumed per month
    const monthlyUnits = monthlyBill / rate;
    
    // 1 kW solar system generates approx 4 units per day (solarFactor)
    // Over a month, 1 kW generates (solarFactor * 30) units
    const monthlyGenPerKW = solarFactor * 30;
    
    // Calculate required system size (kW) rounded to nearest 0.5 kW
    let requiredKW = Math.ceil((monthlyUnits / monthlyGenPerKW) * 2) / 2;
    requiredKW = Math.max(requiredKW, 1.0); // minimum 1 kW
    
    // Max system size based on roof area (approx 1 kW needs 100 sq ft)
    const maxKWByArea = Math.floor(roofArea / 100);
    const finalKW = Math.min(requiredKW, maxKWByArea > 0 ? maxKWByArea : 1.0);

    // Calculate system cost (approx ₹65,000 per kW)
    const baseCost = finalKW * 65000;
    
    // Govt subsidy (30% for systems up to 3kW, 20% for additional capacity up to 10kW)
    let subsidy = 0;
    if (finalKW <= 3) {
      subsidy = baseCost * 0.3;
    } else {
      subsidy = (3 * 65000 * 0.3) + ((finalKW - 3) * 65000 * 0.2);
    }
    
    const finalCost = baseCost - subsidy;

    // Monthly solar units generated
    const solarGenUnits = finalKW * monthlyGenPerKW;
    const monthlySavings = Math.min(monthlyBill, solarGenUnits * rate);
    
    // CO2 offset: 1 unit (kWh) solar offsets ~0.8kg CO2
    const yearlyCO2Tons = ((solarGenUnits * 12) * 0.8) / 1000;

    // 25-Year savings
    const lifetimeSavings = monthlySavings * 12 * 25;
    
    // Payback period (Years)
    const paybackPeriod = finalCost / (monthlySavings * 12);

    return {
      systemSize: finalKW,
      investment: finalCost,
      subsidy,
      savings: monthlySavings,
      co2: yearlyCO2Tons.toFixed(1),
      payback: paybackPeriod.toFixed(1),
      lifetime: lifetimeSavings
    };
  }, [monthlyBill, roofArea, currentState]);

  return (
    <section id="calculator" className="solara-calculator-section">
      <div className="solara-calc-container">
        
        <div className="calc-header-block">
          <span className="solara-section-subtitle">Savings Estimator</span>
          <h2 className="solara-section-title">Calculate Your Solar ROI</h2>
          <p className="solara-section-desc">
            Adjust the parameters below based on your current utility profile to see system sizing, subsidies, and financial returns.
          </p>
        </div>

        <div className="calc-grid-layout">
          {/* INPUT FORM SIDE */}
          <div className="calc-inputs-card">
            <h3>Configure Your Roof</h3>
            
            {/* Input 1: State Selection */}
            <div className="calc-input-group">
              <label>State / Region</label>
              <select 
                value={currentState} 
                onChange={(e) => setCurrentState(e.target.value)}
                className="solara-select"
              >
                {Object.keys(STATE_RATES).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Input 2: Monthly Bill Slider */}
            <div className="calc-input-group">
              <div className="slider-label-row">
                <label>Monthly Power Bill</label>
                <span className="slider-value">₹{monthlyBill.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="25000" 
                step="500"
                value={monthlyBill} 
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="solara-slider"
              />
              <div className="slider-bounds">
                <span>₹1,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Input 3: Available Roof Area */}
            <div className="calc-input-group">
              <div className="slider-label-row">
                <label>Available Roof Area</label>
                <span className="slider-value">{roofArea} Sq. Ft.</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={roofArea} 
                onChange={(e) => setRoofArea(Number(e.target.value))}
                className="solara-slider"
              />
              <div className="slider-bounds">
                <span>100 sq ft</span>
                <span>2,000 sq ft</span>
              </div>
            </div>

            <div className="calculator-tip">
              <HelpCircle size={16} />
              <span>Standard systems require approximately 100 Sq. Ft. of shadow-free rooftop space per 1 kW of solar panels.</span>
            </div>
          </div>

          {/* RESULTS DASHBOARD SIDE */}
          <div className="calc-results-card">
            <h3>Solar Estimate Summary</h3>
            
            <div className="results-hero-grid">
              <div className="hero-stat-block">
                <Sun size={24} className="icon-lime" />
                <div>
                  <span className="stat-num">{calculations.systemSize} kW</span>
                  <span className="stat-lbl">System Size Needed</span>
                </div>
              </div>
              
              <div className="hero-stat-block">
                <IndianRupee size={24} className="icon-green" />
                <div>
                  <span className="stat-num">₹{calculations.investment.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  <span className="stat-lbl">Net Investment (After Subsidy)</span>
                </div>
              </div>
            </div>

            {/* Sub-results rows */}
            <div className="results-detail-list">
              <div className="detail-row">
                <span className="detail-label">Govt. Subsidy Applied</span>
                <span className="detail-val text-green">₹{calculations.subsidy.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Est. Monthly Savings</span>
                <span className="detail-val">₹{calculations.savings.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Payback Period</span>
                <span className="detail-val">{calculations.payback} Years</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Annual Carbon Offset</span>
                <span className="detail-val icon-green-text">
                  <Leaf size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {calculations.co2} Metric Tons CO2
                </span>
              </div>
            </div>

            <div className="lifetime-yield-card">
              <span className="lifetime-label">Estimated 25-Year Lifetime Savings</span>
              <span className="lifetime-amount">₹{calculations.lifetime.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
              <p>Based on stable utility tariff rates and standard solar depreciation metrics.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SolaraCalculator;
