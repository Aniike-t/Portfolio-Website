import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, BarChart2, Folder, Coffee, MapPin, Settings, 
  Search, Bell, ChevronDown, ArrowUpRight, AlertTriangle, 
  Send, ShieldAlert, Cpu, Sparkles, Check, Info, Phone
} from 'lucide-react';
import BackToPortfolio from '../BackToPortfolio';
import data from './data/dailyGrindData.json';
import './DailyGrindApp.css';

function DailyGrindApp() {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem('dg_selectedLocation') || data.locations[0];
  });
  const [timePeriod, setTimePeriod] = useState(() => {
    return localStorage.getItem('dg_timePeriod') || 'this week';
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('dg_currency') || 'INR, ₹';
  });
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('dg_activeView') || 'overview';
  });
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(() => {
    return localStorage.getItem('dg_activeMobileTab') || 'home';
  });
  
  // Selected location details
  const activeStats = data.stats[selectedLocation] || data.stats[data.locations[0]];

  // AI Chat states
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('dg_chatMessages');
    return saved ? JSON.parse(saved) : [
      { sender: 'ai', text: `Hi Hanna, I've loaded metrics for ${selectedLocation}. Today's gross estimate stands at ₹${(activeStats.grossRevenue * 80).toLocaleString('en-IN', {maximumFractionDigits:0})}. Operating labor stands at ${activeStats.laborCostPercent}%. How can I assist you in streamlining ops?`, time: '10:42 AM' }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Integrations state
  const [integrationsList, setIntegrationsList] = useState(() => {
    const saved = localStorage.getItem('dg_integrations');
    return saved ? JSON.parse(saved) : data.integrations;
  });

  // Capacity location filter
  const [capacityFilters, setCapacityFilters] = useState(() => {
    const saved = localStorage.getItem('dg_capacityFilters');
    return saved ? JSON.parse(saved) : {
      Astoria: true,
      'Long Island City': true,
      'Rego Park': true
    };
  });

  // Projections Page states
  const [ticketIncrease, setTicketIncrease] = useState(() => {
    const saved = localStorage.getItem('dg_ticketIncrease');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [aovBoost, setAovBoost] = useState(() => {
    const saved = localStorage.getItem('dg_aovBoost');
    return saved ? parseInt(saved, 10) : 80;
  });

  // Reports details active view
  const [selectedReportId, setSelectedReportId] = useState(() => {
    return localStorage.getItem('dg_selectedReportId') || '';
  });

  // Capacity Staff count
  const [staffCount, setStaffCount] = useState(() => {
    const saved = localStorage.getItem('dg_staffCount');
    return saved ? parseInt(saved, 10) : 6;
  });

  // Toast credentials state
  const [toastCredentials, setToastCredentials] = useState(() => {
    const saved = localStorage.getItem('dg_toastCredentials');
    return saved ? JSON.parse(saved) : { endpoint: '', clientId: '', apiKey: '' };
  });

  // Manual Sync states
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Track window size for layout switching
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem('dg_selectedLocation', selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    localStorage.setItem('dg_timePeriod', timePeriod);
  }, [timePeriod]);

  useEffect(() => {
    localStorage.setItem('dg_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('dg_activeView', activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('dg_activeMobileTab', activeMobileTab);
  }, [activeMobileTab]);

  useEffect(() => {
    localStorage.setItem('dg_chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('dg_integrations', JSON.stringify(integrationsList));
  }, [integrationsList]);

  useEffect(() => {
    localStorage.setItem('dg_capacityFilters', JSON.stringify(capacityFilters));
  }, [capacityFilters]);

  useEffect(() => {
    localStorage.setItem('dg_ticketIncrease', ticketIncrease);
  }, [ticketIncrease]);

  useEffect(() => {
    localStorage.setItem('dg_aovBoost', aovBoost);
  }, [aovBoost]);

  useEffect(() => {
    localStorage.setItem('dg_selectedReportId', selectedReportId || '');
  }, [selectedReportId]);

  useEffect(() => {
    localStorage.setItem('dg_staffCount', staffCount);
  }, [staffCount]);

  useEffect(() => {
    localStorage.setItem('dg_toastCredentials', JSON.stringify(toastCredentials));
  }, [toastCredentials]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Update welcome message when location changes
  useEffect(() => {
    const welcomeText = `Hi Hanna, I've loaded metrics for ${selectedLocation}. Today's gross estimate stands at ₹${(activeStats.grossRevenue * 80).toLocaleString('en-IN', {maximumFractionDigits:0})}. Operating labor stands at ${activeStats.laborCostPercent}%. How can I assist you in streamlining ops?`;
    // Prevent pushing duplicate greetings repeatedly
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].text === welcomeText) return;
    
    setChatMessages(prev => [
      ...prev,
      { 
        sender: 'ai', 
        text: welcomeText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  }, [selectedLocation]);

  // Handle send message
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text, time: timeStr }]);
    setChatInput('');
    setIsTyping(true);

    // Simulated response logic
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I've analyzed that query. I suggest checking our QuickBooks sync log or adjusting shift allocation timers.";
      
      const suggestionMatch = data.aiDefaultSuggestions.find(s => s.text.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(s.text.toLowerCase()));
      if (suggestionMatch) {
        replyText = suggestionMatch.reply;
      } else if (text.toLowerCase().includes('labor') || text.toLowerCase().includes('cost')) {
        replyText = `Understood. For ${selectedLocation}, labor cost is ${activeStats.laborCostPercent}%. I recommend reducing floor count during the 2 PM - 4 PM lull. Cross-train Astoria baristas to handle delivery logs.`;
      } else if (text.toLowerCase().includes('revenue') || text.toLowerCase().includes('sales')) {
        replyText = `Current gross revenue is ₹${(activeStats.grossRevenue * 80).toLocaleString('en-IN', {maximumFractionDigits:0})}. Order size is hovering around ₹${Math.round(activeStats.avgOrderValue * 80)}. Implementing a dual-cup size prompt could raise AOV by 8%.`;
      } else if (text.toLowerCase().includes('integration') || text.toLowerCase().includes('qb') || text.toLowerCase().includes('connect')) {
        replyText = "QuickBooks, Xero, and Homebase sync endpoints are fully functional. Toast integration requires credential updates.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  const toggleIntegration = (id) => {
    setIntegrationsList(prev => prev.map(int => 
      int.id === id 
        ? { ...int, status: int.status === 'Connected' ? 'Disconnected' : 'Connected' }
        : int
    ));
  };

  // Convert numbers to INR Rupees
  const scaleToRupees = (val) => {
    // Multiplied by 80 to scale from USD-like baseline to realistic INR
    return val * 80;
  };

  // Render function for desktop view pages
  const renderActiveDesktopView = () => {
    switch (activeView) {
      case 'revenue': {
        const baseRevenue = activeStats.revenueData.reduce((a, b) => a + b, 0) * 80;
        const baseTickets = Math.round(baseRevenue / (activeStats.avgOrderValue * 80));
        const projectedTickets = Math.round(baseTickets * (1 + ticketIncrease / 100));
        const projectedAOV = (activeStats.avgOrderValue * 80) + aovBoost;
        const projectedRevenue = projectedTickets * projectedAOV;
        const incrementalLift = projectedRevenue - baseRevenue;

        // SVG Chart coordinates
        const svgHeight = 110;
        const maxVal = Math.max(...activeStats.revenueData);
        const points = activeStats.revenueData.map((val, idx) => {
          const x = 40 + idx * 72;
          const y = svgHeight - (val / maxVal) * 80;
          return { x, y, val };
        });

        const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

        return (
          <div className="dg-revenue-view">
            <div className="dg-view-grid">
              
              {/* Left Column: Line Chart and Daily Transactions Table */}
              <div className="dg-view-left-column">
                <div className="dg-card dg-sales-chart-card">
                  <div className="dg-card-header">
                    <h2>WEEKLY SALES PERFORMANCE & TRENDS</h2>
                    <span className="dg-badge-pill">7-Day Curve</span>
                  </div>
                  <div className="dg-line-chart-container">
                    <svg width="100%" height="160" viewBox="0 0 540 150" className="dg-revenue-line-chart">
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f2644c" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#f2644c" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <line x1="30" y1="10" x2="510" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="30" y1="50" x2="510" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="30" y1="90" x2="510" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="30" y1="110" x2="510" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      
                      {/* Filled Area */}
                      <path d={areaD} fill="url(#revenueGradient)" />
                      {/* Path Line */}
                      <path d={pathD} fill="none" stroke="#f2644c" strokeWidth="3.5" strokeLinecap="round" />
                      
                      {/* Interactive Circles & tooltips */}
                      {points.map((p, idx) => {
                        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                        return (
                          <g key={idx} className="dg-chart-point-group">
                            <circle cx={p.x} cy={p.y} r="5" fill="#0c1015" stroke="#f2644c" strokeWidth="2.5" />
                            <circle cx={p.x} cy={p.y} r="12" fill="transparent" className="dg-chart-hover-trigger" />
                            <g className="dg-chart-tooltip">
                              <rect x={p.x - 45} y={p.y - 32} width="90" height="22" rx="4" fill="#080b0f" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                              <text x={p.x} y={p.y - 18} fill="#fff" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                                ₹{Math.round(scaleToRupees(p.val)).toLocaleString()}
                              </text>
                            </g>
                            <text x={p.x} y="132" fill="#8892b0" fontSize="8.5" textAnchor="middle">{weekdays[idx]}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                <div className="dg-card dg-table-card">
                  <div className="dg-card-header">
                    <h2>DAILY TRANSACTIONS RECORD ({selectedLocation})</h2>
                  </div>
                  <div className="dg-table-wrapper">
                    <table className="dg-transactions-table">
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Tickets Sold</th>
                          <th>AOV</th>
                          <th>Gross Sales</th>
                          <th>Labor</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeStats.revenueData.map((val, i) => {
                          const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                          const gross = scaleToRupees(val);
                          const tickets = Math.round(gross / scaleToRupees(activeStats.avgOrderValue));
                          const laborVal = activeStats.laborCostPercent + (i % 2 === 0 ? 1 : -1);
                          let statusLabel = 'Normal';
                          let statusClass = 'normal';
                          if (val > 20000) {
                            statusLabel = 'Peak';
                            statusClass = 'peak';
                          } else if (val < 10000) {
                            statusLabel = 'Lull';
                            statusClass = 'lull';
                          }
                          return (
                            <tr key={i}>
                              <td className="dg-day-lbl">{daysOfWeek[i]}</td>
                              <td>{tickets}</td>
                              <td>₹{scaleToRupees(activeStats.avgOrderValue).toFixed(2)}</td>
                              <td className="dg-bold-value">₹{Math.round(gross).toLocaleString('en-IN')}</td>
                              <td>{laborVal}%</td>
                              <td><span className={`dg-status-tag ${statusClass}`}>{statusLabel}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Projections Calculator */}
              <div className="dg-view-right-column">
                <div className="dg-card dg-simulator-card">
                  <div className="dg-card-header">
                    <div className="dg-card-title-row">
                      <Sparkles size={18} className="dg-sparkles-icon" />
                      <h2>PROJECTIONS SIMULATOR</h2>
                    </div>
                  </div>
                  <p className="dg-simulator-desc">Drag sliders to forecast weekly revenue and profit gains based on operational optimization targets.</p>
                  
                  <div className="dg-sliders-stack">
                    <div className="dg-slider-group">
                      <div className="dg-slider-lbl-row">
                        <span>Target Ticket Increase</span>
                        <span className="dg-slider-val-readout">+{ticketIncrease}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="25" 
                        value={ticketIncrease}
                        onChange={(e) => setTicketIncrease(parseInt(e.target.value, 10))}
                        className="dg-range-slider"
                      />
                      <span className="dg-slider-sub">Increase guest count through promotions/marketing</span>
                    </div>

                    <div className="dg-slider-group">
                      <div className="dg-slider-lbl-row">
                        <span>Average Order Value (AOV) Boost</span>
                        <span className="dg-slider-val-readout">+₹{aovBoost}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="400" 
                        value={aovBoost}
                        onChange={(e) => setAovBoost(parseInt(e.target.value, 10))}
                        className="dg-range-slider"
                      />
                      <span className="dg-slider-sub">Upsell pastry options or introduce cup-size prompts</span>
                    </div>
                  </div>

                  <div className="dg-projection-outcomes">
                    <div className="dg-outcome-box">
                      <span className="dg-outcome-lbl">PROJECTED WEEKLY REVENUE</span>
                      <div className="dg-outcome-value">₹{Math.round(projectedRevenue).toLocaleString('en-IN')}</div>
                    </div>
                    
                    <div className="dg-outcome-row">
                      <div className="dg-outcome-subbox">
                        <span className="dg-outcome-lbl">WEEKLY SALES LIFT</span>
                        <span className="dg-lift-badge">+₹{Math.round(incrementalLift).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="dg-outcome-subbox">
                        <span className="dg-outcome-lbl">SIMULATED AOV</span>
                        <span className="dg-outcome-subvalue">₹{projectedAOV.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      }

      case 'reports': {
        const report = data.reports.find(r => r.id === selectedReportId) || null;
        const grossRev = scaleToRupees(activeStats.grossRevenue);
        
        return (
          <div className="dg-reports-view">
            <div className="dg-view-grid reports-grid">
              {/* Left Column: Report List */}
              <div className="dg-view-left-column">
                <div className="dg-card dg-reports-list-card">
                  <div className="dg-card-header">
                    <h2>OPERATIONAL ANALYSIS CATALOG</h2>
                  </div>
                  <div className="dg-reports-selection-list">
                    {data.reports.map((rep) => (
                      <div 
                        key={rep.id} 
                        className={`dg-report-select-item ${selectedReportId === rep.id ? 'active' : ''}`}
                        onClick={() => setSelectedReportId(rep.id)}
                      >
                        <span className="dg-rep-emoji">📄</span>
                        <div className="dg-rep-meta">
                          <h3>{rep.name}</h3>
                          <p>{rep.desc.substring(0, 75)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Ledger Panel */}
              <div className="dg-view-right-column">
                <div className="dg-card dg-report-viewer-card">
                  {report ? (
                    <div className="dg-report-detail-panel">
                      <div className="dg-report-detail-header">
                        <div>
                          <span className="dg-report-badge">OPERATIONAL REPORT // {report.id.toUpperCase()}</span>
                          <h2>{report.name}</h2>
                          <p>{report.desc}</p>
                        </div>
                        <button className="dg-export-btn" onClick={() => {
                          alert(`Exporting ${report.name} data to CSV...`);
                        }}>Export CSV</button>
                      </div>

                      {report.id === 'rep1' && (
                        <div className="dg-report-ledger">
                          <div className="dg-ledger-header">
                            <span>Cost Category</span>
                            <span>Target Ratio</span>
                            <span className="right-align">Simulated Cost</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Cost of Goods Sold (Food)</span>
                            <span>32.4%</span>
                            <span className="right-align">₹{Math.round(grossRev * 0.324).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Cost of Goods Sold (Beverage)</span>
                            <span>18.2%</span>
                            <span className="right-align">₹{Math.round(grossRev * 0.182).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Staff Wages & Insurance</span>
                            <span>{activeStats.laborCostPercent}%</span>
                            <span className="right-align">₹{Math.round(grossRev * (activeStats.laborCostPercent / 100)).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="dg-ledger-total">
                            <span>Total Prime Cost Summary</span>
                            <span>{(50.6 + activeStats.laborCostPercent).toFixed(1)}%</span>
                            <span className="right-align">₹{Math.round(grossRev * ((50.6 + activeStats.laborCostPercent) / 100)).toLocaleString('en-IN')}</span>
                          </div>
                          
                          <div className="dg-report-insight">
                            <span className="insight-title"><Cpu size={14} /> AI Recommendation</span>
                            <p>Prime costs are in range. Save up to 2.1% on ingredients by sourcing packaging through our Long Island City hub.</p>
                          </div>
                        </div>
                      )}

                      {report.id === 'rep2' && (
                        <div className="dg-report-ledger">
                          <div className="dg-ledger-header">
                            <span>Labor Metric</span>
                            <span>Current Value</span>
                            <span className="right-align">Ideal Target</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Core Roster Count</span>
                            <span>18 Members</span>
                            <span className="right-align">16-20 members</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Overtime Hours Accrued</span>
                            <span className="warning-text">4.5 hrs</span>
                            <span className="right-align">&lt; 2.0 hrs</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Budget Deviation Ratio</span>
                            <span className="success-text">-1.2%</span>
                            <span className="right-align">0.0% (Ideal)</span>
                          </div>
                          <div className="dg-ledger-total">
                            <span> Roster Efficiency Rating</span>
                            <span>94.5%</span>
                            <span className="right-align">92.0%</span>
                          </div>

                          <div className="dg-report-insight">
                            <span className="insight-title"><Cpu size={14} /> AI Recommendation</span>
                            <p>Overtime leakage detected during Tuesday peak hours. Adjust cashier rosters to avoid overlap with inventory receiving times.</p>
                          </div>
                        </div>
                      )}

                      {report.id === 'rep3' && (
                        <div className="dg-report-ledger">
                          <div className="dg-ledger-header">
                            <span>Inventory Segment</span>
                            <span>Opening Inventory</span>
                            <span className="right-align">Closing Inventory</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Espresso Blends & Roast Beans</span>
                            <span>₹42,000</span>
                            <span className="right-align">₹18,500</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Dairy Supplies & Alternatives</span>
                            <span>₹14,500</span>
                            <span className="right-align">₹3,800</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Artisanal Pastries & Bread</span>
                            <span>₹22,000</span>
                            <span className="right-align">₹4,200</span>
                          </div>
                          <div className="dg-ledger-total">
                            <span>Calculated Weekly COGS</span>
                            <span>₹52,000</span>
                            <span className="right-align">Ratio: 29.8%</span>
                          </div>

                          <div className="dg-report-insight">
                            <span className="insight-title"><Cpu size={14} /> AI Recommendation</span>
                            <p>Dairy spoilage is at a record low (1.1%). Maintain current automated re-ordering margins to guarantee morning availability.</p>
                          </div>
                        </div>
                      )}

                      {report.id === 'rep4' && (
                        <div className="dg-report-ledger">
                          <div className="dg-ledger-header">
                            <span>Menu Configuration</span>
                            <span>Gross Margin</span>
                            <span className="right-align">Popularity Ratios</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Organic Cold Brew</span>
                            <span className="success-text">88.5% (High)</span>
                            <span className="right-align">Star Seller (High)</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Flat White Coffee</span>
                            <span>71.2% (Mid)</span>
                            <span className="right-align">Steady Volume (Mid)</span>
                          </div>
                          <div className="dg-ledger-item">
                            <span>Avocado Croissant Roll</span>
                            <span className="warning-text">44.0% (Low)</span>
                            <span className="right-align">Slow Mover (Low)</span>
                          </div>
                          <div className="dg-ledger-total">
                            <span>Flat White Price Adjust target</span>
                            <span>+₹15 per ticket</span>
                            <span className="right-align">Est. +₹4,500/week</span>
                          </div>

                          <div className="dg-report-insight">
                            <span className="insight-title"><Cpu size={14} /> AI Recommendation</span>
                            <p>Cold Brew generates the most margin. Prompt users to add a flavor syrup (+₹30) during digital checkout paths.</p>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="dg-report-empty-state">
                      <div className="dg-report-illustration">
                        <svg viewBox="0 0 200 120" width="180" height="110">
                          <rect x="20" y="20" width="160" height="80" rx="12" fill="#1b2521" stroke="#34a853" strokeWidth="1.5" />
                          <circle cx="50" cy="60" r="16" fill="#e8c898" />
                          <rect x="42" y="76" width="16" height="20" rx="4" fill="#f2644c" />
                          <path d="M38 48 C38 35, 62 35, 62 48 Z" fill="#fff" />
                          <rect x="42" y="46" width="16" height="4" fill="#0f1115" />
                          <circle cx="46" cy="58" r="2" fill="#000" />
                          <circle cx="54" cy="58" r="2" fill="#000" />
                          <path d="M48 65 Q50 67 52 65" stroke="#000" strokeWidth="1.5" fill="none" />
                          <rect x="90" y="35" width="60" height="45" rx="6" fill="#0f1115" stroke="#beff53" strokeWidth="1.5" />
                          <line x1="100" y1="65" x2="115" y2="50" stroke="#f2644c" strokeWidth="2" />
                          <line x1="115" y1="50" x2="130" y2="58" stroke="#f2644c" strokeWidth="2" />
                          <line x1="130" y1="58" x2="142" y2="44" stroke="#f2644c" strokeWidth="2" />
                          <circle cx="142" cy="44" r="3" fill="#beff53" />
                        </svg>
                      </div>
                      <h3>No Report Selected</h3>
                      <p>Select a ledger from the list on the left to review operational insights, waste margins, and menu performance logs.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'capacity': {
        const serviceSeconds = Math.max(90, Math.round(480 / (staffCount * 0.9)));
        const mins = Math.floor(serviceSeconds / 60);
        const secs = serviceSeconds % 60;
        
        let speedRating = 'Optimal';
        let speedColor = '#beff53';
        if (staffCount < 4) {
          speedRating = 'Critical Slowdown';
          speedColor = '#f2644c';
        } else if (staffCount > 7) {
          speedRating = 'High Speed Ops';
          speedColor = '#6f5ef5';
        }

        const progressPercent = Math.max(20, Math.min(100, (300 - serviceSeconds) / 2.1));

        return (
          <div className="dg-capacity-view">
            <div className="dg-view-grid capacity-grid">
              
              {/* Left Column: Live capacity gauges */}
              <div className="dg-view-left-column">
                <div className="dg-card dg-live-capacity-card">
                  <div className="dg-card-header">
                    <h2>LIVE STORE CAPACITIES</h2>
                    <span className="dg-badge-pill">Real-time</span>
                  </div>
                  
                  <div className="dg-gauges-container-vertical">
                    {Object.entries(activeStats.capacity).map(([locName, value]) => {
                      const radius = 30;
                      const circ = 2 * Math.PI * radius;
                      const offset = circ - (value / 100) * circ;
                      let strokeColor = '#6f5ef5';
                      if (locName === 'Astoria') strokeColor = '#f2644c';
                      if (locName === 'Rego Park') strokeColor = '#beff53';
                      
                      return (
                        <div key={locName} className="dg-capacity-detail-item">
                          <div className="dg-cap-meta">
                            <h3>{locName} Location</h3>
                            <span className="dg-cap-val-indicator" style={{ color: strokeColor }}>{value}% occupied</span>
                          </div>
                          <div className="dg-cap-gauge-wrapper">
                            <svg width="76" height="76" viewBox="0 0 76 76">
                              <circle cx="38" cy="38" r={radius} className="dg-gauge-bg-circle" />
                              <circle 
                                cx="38" 
                                cy="38" 
                                r={radius} 
                                className="dg-gauge-fill-circle"
                                stroke={strokeColor}
                                strokeDasharray={circ}
                                strokeDashoffset={offset}
                                transform="rotate(-90 38 38)"
                              />
                            </svg>
                            <span className="dg-gauge-center-text">{value}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="dg-card dg-service-simulator-card">
                  <div className="dg-card-header">
                    <div className="dg-card-title-row">
                      <Sparkles size={16} className="dg-sparkles-icon" />
                      <h2>SERVICE SPEED SIMULATOR</h2>
                    </div>
                  </div>
                  <p className="dg-simulator-desc">Adjust staff roster count to simulate estimated ticket completion times under peak load.</p>
                  
                  <div className="dg-slider-group">
                    <div className="dg-slider-lbl-row">
                      <span>Active Staff on Roster</span>
                      <span className="dg-slider-val-readout">{staffCount} Baristas</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="10" 
                      value={staffCount}
                      onChange={(e) => setStaffCount(parseInt(e.target.value, 10))}
                      className="dg-range-slider"
                    />
                  </div>

                  <div className="dg-service-readout">
                    <div className="dg-readout-item">
                      <span>EST. TICKET DELIVERY TIME</span>
                      <strong className="dg-readout-time" style={{ color: speedColor }}>{mins}m {secs}s</strong>
                    </div>
                    <div className="dg-readout-item">
                      <span>OPERATIONAL STATE</span>
                      <span className="dg-badge-pill" style={{ color: '#0c1015', backgroundColor: speedColor }}>{speedRating}</span>
                    </div>
                    <div className="dg-speed-bar-track">
                      <div className="dg-speed-bar-fill" style={{ width: `${progressPercent}%`, backgroundColor: speedColor }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Shift Manager scheduler log */}
              <div className="dg-view-right-column">
                <div className="dg-card dg-roster-card">
                  <div className="dg-card-header">
                    <h2>SHIFT SCHEDULE LOG ({selectedLocation})</h2>
                    <span className="dg-badge-pill">Daily Roster</span>
                  </div>
                  
                  <div className="dg-roster-list">
                    {[
                      { name: "Sara Chen", role: "Lead Barista", shift: "07:00 AM - 03:00 PM", rate: "₹180/hr", status: "Active" },
                      { name: "Marcus Miller", role: "Barista", shift: "08:00 AM - 04:00 PM", rate: "₹150/hr", status: "Active" },
                      { name: "Elena Rostova", role: "Cashier", shift: "09:00 AM - 05:00 PM", rate: "₹140/hr", status: "Active" },
                      { name: "Devon Patel", role: "Barista (Part)", shift: "11:00 AM - 03:00 PM", rate: "₹150/hr", status: "Active" },
                      { name: "Chloe Zhao", role: "Cleaning / Support", shift: "12:00 PM - 08:00 PM", rate: "₹130/hr", status: "Scheduled" }
                    ].map((emp, i) => (
                      <div key={i} className="dg-roster-employee-item">
                        <div className="dg-emp-meta">
                          <span className="dg-emp-avatar">👤</span>
                          <div>
                            <h4>{emp.name}</h4>
                            <span className="dg-emp-role">{emp.role}</span>
                          </div>
                        </div>
                        <div className="dg-emp-shift">
                          <span>{emp.shift}</span>
                          <span className="dg-emp-rate">{emp.rate}</span>
                        </div>
                        <span className={`dg-emp-status ${emp.status.toLowerCase()}`}>{emp.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      }

      case 'map': {
        return (
          <div className="dg-map-view">
            <div className="dg-view-grid map-grid">
              
              {/* Left Column: Spatial Vector Map */}
              <div className="dg-view-left-column">
                <div className="dg-card dg-expanded-map-card">
                  <div className="dg-card-header">
                    <h2>GEOGRAPHIC SPATIAL OPERATIONS MAP</h2>
                    <div className="dg-map-legend-dots">
                      <span className="legend-dot coral">Astoria</span>
                      <span className="legend-dot blue">L.I.C.</span>
                      <span className="legend-dot lime">Rego Park</span>
                    </div>
                  </div>
                  
                  <div className="dg-large-map-wrapper">
                    <svg viewBox="0 0 400 220" fill="none" className="dg-large-svg-map">
                      {/* Map background grids */}
                      <path d="M 0 0 L 400 0" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <path d="M 0 55 L 400 55" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <path d="M 0 110 L 400 110" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <path d="M 0 165 L 400 165" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      
                      {/* Stylized island map outlines */}
                      <path d="M20 50 C50 20, 120 10, 180 30 C240 50, 300 40, 360 20 C380 15, 390 30, 390 70 C390 120, 350 150, 300 170 C240 190, 180 150, 120 180 C80 200, 30 190, 15 160 C-5 120, -5 80, 20 50 Z" fill="#131d1a" stroke="#22362f" strokeWidth="2" strokeDasharray="3 3" />
                      <path d="M60 100 C110 80, 170 90, 230 120 C290 150, 330 110, 360 90" stroke="#2c4c3b" strokeWidth="4" strokeLinecap="round" />
                      
                      {/* Astoria Pin */}
                      {capacityFilters['Astoria'] && (
                        <g transform="translate(230, 120)" className="dg-map-pin coral">
                          <circle cx="0" cy="0" r="18" className="dg-pin-radial-pulse" />
                          <circle cx="0" cy="0" r="6" fill="#f2644c" />
                          <rect x="-35" y="-34" width="70" height="22" rx="4" fill="#080b0f" stroke="#f2644c" strokeWidth="1" />
                          <text x="0" y="-20" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">Astoria</text>
                        </g>
                      )}

                      {/* Long Island City Pin */}
                      {capacityFilters['Long Island City'] && (
                        <g transform="translate(80, 95)" className="dg-map-pin blue">
                          <circle cx="0" cy="0" r="18" className="dg-pin-radial-pulse" />
                          <circle cx="0" cy="0" r="6" fill="#6f5ef5" />
                          <rect x="-30" y="-34" width="60" height="22" rx="4" fill="#080b0f" stroke="#6f5ef5" strokeWidth="1" />
                          <text x="0" y="-20" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">L.I.C.</text>
                        </g>
                      )}

                      {/* Rego Park Pin */}
                      {capacityFilters['Rego Park'] && (
                        <g transform="translate(320, 85)" className="dg-map-pin lime">
                          <circle cx="0" cy="0" r="18" className="dg-pin-radial-pulse" />
                          <circle cx="0" cy="0" r="6" fill="#beff53" />
                          <rect x="-40" y="-34" width="80" height="22" rx="4" fill="#080b0f" stroke="#beff53" strokeWidth="1" />
                          <text x="0" y="-20" fill="#000" fontSize="9" textAnchor="middle" fontWeight="bold">Rego Park</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Timelines */}
              <div className="dg-view-right-column">
                <div className="dg-card dg-timeline-logs-card">
                  <div className="dg-card-header">
                    <h2>CHRONOLOGICAL LIVE OPERATIONS FEED</h2>
                  </div>
                  
                  <div className="dg-timeline-logs-list">
                    {[
                      { time: "10:45 AM", loc: "Astoria", text: "Peak capacity warning triggered (95% occupied). Recommend backup barista activation.", type: "warning" },
                      { time: "10:30 AM", loc: "Long Island City", text: "QuickBooks synchronization run completed. 45 invoice items mapped.", type: "success" },
                      { time: "10:12 AM", loc: "Rego Park", text: "Labor scheduling optimization applied. Floor target set to 6 baristas.", type: "info" },
                      { time: "09:55 AM", loc: "NY Headquarters", text: "Average ticket size spiked to ₹1,480. Organic blends leading the shift.", type: "success" },
                      { time: "08:30 AM", loc: "Astoria", text: "Store door opened. All morning checklogs verified and locked.", type: "info" },
                      { time: "08:00 AM", loc: "Rego Park", text: "Homebase check-ins registered. 4 members active on morning schedules.", type: "info" }
                    ].map((log, i) => (
                      <div key={i} className={`dg-timeline-log-row ${log.type}`}>
                        <div className="dg-timeline-left">
                          <span className="log-dot"></span>
                          <span className="log-time">{log.time}</span>
                        </div>
                        <div className="dg-timeline-right">
                          <strong className="log-loc">{log.loc}</strong>
                          <p className="log-desc">{log.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      }

      case 'integrations': {
        return (
          <div className="dg-integrations-view">
            <div className="dg-view-grid integrations-grid">
              
              {/* Left Column: Integrations List Grid */}
              <div className="dg-view-left-column">
                <div className="dg-integrations-cards-grid">
                  {integrationsList.map((int) => {
                    let emoji = "🔌";
                    let desc = "";
                    if (int.name === 'QuickBooks') { emoji = "📊"; desc = "Sales, taxes, and ledgers automatically synced."; }
                    else if (int.name === 'Xero') { emoji = "📈"; desc = "Sync bank statements and cashflows seamlessly."; }
                    else if (int.name === 'Homebase') { emoji = "🗓️"; desc = "Rosters, schedules, and shift times alignment."; }
                    else if (int.name === 'Square') { emoji = "💳"; desc = "Connect physical terminal logs directly."; }
                    else if (int.name === 'Toast') { emoji = "🥪"; desc = "Full menu sync and ticket updates."; }

                    return (
                      <div key={int.id} className={`dg-integration-grid-card ${int.status.toLowerCase()}`}>
                        <div className="int-card-top">
                          <span className="int-emoji">{emoji}</span>
                          <span className={`int-status-badge ${int.status.toLowerCase()}`}>{int.status}</span>
                        </div>
                        <h3>{int.name}</h3>
                        <p>{desc}</p>
                        
                        <div className="int-controls-row">
                          <select className="dg-mini-select">
                            <option>Sync: Hourly</option>
                            <option>Sync: Daily</option>
                            <option>Sync: Manual</option>
                          </select>
                          <button 
                            className={`int-connect-btn ${int.status === 'Connected' ? 'disconnect' : 'connect'}`}
                            onClick={() => toggleIntegration(int.id)}
                          >
                            {int.status === 'Connected' ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Manual Sync Controls and Toast Credentials */}
              <div className="dg-view-right-column">
                <div className="dg-card dg-sync-control-card">
                  <div className="dg-card-header">
                    <h2>GLOBAL INTEGRATIONS CONTROL</h2>
                  </div>
                  
                  <div className="dg-sync-manager-panel">
                    <p className="dg-sync-desc">Manually trigger a complete database synchronization across all connected point-of-sale systems and ledgers.</p>
                    
                    <button 
                      className={`dg-trigger-sync-btn ${isSyncing ? 'syncing' : ''}`}
                      disabled={isSyncing}
                      onClick={() => {
                        setIsSyncing(true);
                        setSyncMessage('Establishing handshake...');
                        setTimeout(() => {
                          setSyncMessage('Parsing transactions...');
                          setTimeout(() => {
                            setSyncMessage('Sync Completed successfully!');
                            setTimeout(() => {
                              setIsSyncing(false);
                              setSyncMessage('');
                            }, 1500);
                          }, 1000);
                        }, 800);
                      }}
                    >
                      {isSyncing ? (
                        <>
                          <span className="dg-spinner"></span>
                          <span>{syncMessage}</span>
                        </>
                      ) : (
                        <span>Trigger Global Data Sync</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Toast Credential Panel showing inline if Toast is selected or disconnected */}
                <div className="dg-card dg-credentials-card">
                  <div className="dg-card-header">
                    <h2>TOAST CONNECTION SCHEMAS</h2>
                  </div>
                  <p className="dg-simulator-desc">Configure client endpoint credentials to bridge the Toast POS database with Hanna AI lead logs.</p>
                  
                  <div className="dg-credential-fields">
                    <div className="dg-input-group">
                      <label>API Endpoint Target</label>
                      <input 
                        type="text" 
                        placeholder="https://api.toasttab.com/v1" 
                        value={toastCredentials.endpoint}
                        onChange={(e) => setToastCredentials({...toastCredentials, endpoint: e.target.value})}
                      />
                    </div>
                    <div className="dg-input-group">
                      <label>Client Identification Hash</label>
                      <input 
                        type="text" 
                        placeholder="client_dg_prod_x940" 
                        value={toastCredentials.clientId}
                        onChange={(e) => setToastCredentials({...toastCredentials, clientId: e.target.value})}
                      />
                    </div>
                    <div className="dg-input-group">
                      <label>Access Secret Key</label>
                      <input 
                        type="password" 
                        placeholder="••••••••••••••••••••••••••••••••" 
                        value={toastCredentials.apiKey}
                        onChange={(e) => setToastCredentials({...toastCredentials, apiKey: e.target.value})}
                      />
                    </div>

                    <button 
                      className="dg-credential-save-btn"
                      onClick={() => {
                        // Mark Toast as Connected if credentials filled
                        if (toastCredentials.endpoint && toastCredentials.clientId) {
                          setIntegrationsList(prev => prev.map(int => 
                            int.name === 'Toast' ? { ...int, status: 'Connected' } : int
                          ));
                          alert("Toast API credentials stored. Handshake verification succeeded!");
                        } else {
                          alert("Please specify API Endpoint Target and Client Identification Hash to verify connection.");
                        }
                      }}
                    >
                      Verify & Save API Credentials
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="dailygrind-theme-container">
      <BackToPortfolio />

      {/* DESKTOP VIEW */}
      {!isMobile ? (
        <div className="dg-desktop-layout">
          {/* SIDEBAR NAVIGATION */}
          <aside className="dg-sidebar">
            <div className="dg-logo-area">
              <span className="dg-logo-icon">Dg</span>
            </div>
            <nav className="dg-sidebar-nav">
              <button className={`dg-nav-item ${activeView === 'overview' ? 'active' : ''}`} onClick={() => setActiveView('overview')} title="Dashboard"><Home size={22} /></button>
              <button className={`dg-nav-item ${activeView === 'revenue' ? 'active' : ''}`} onClick={() => setActiveView('revenue')} title="Revenue & Sales"><BarChart2 size={22} /></button>
              <button className={`dg-nav-item ${activeView === 'reports' ? 'active' : ''}`} onClick={() => setActiveView('reports')} title="Reports"><Folder size={22} /></button>
              <button className={`dg-nav-item ${activeView === 'capacity' ? 'active' : ''}`} onClick={() => setActiveView('capacity')} title="Capacity"><Coffee size={22} /></button>
              <button className={`dg-nav-item ${activeView === 'map' ? 'active' : ''}`} onClick={() => setActiveView('map')} title="Locations Map"><MapPin size={22} /></button>
              <button className={`dg-nav-item ${activeView === 'integrations' ? 'active' : ''}`} onClick={() => setActiveView('integrations')} title="Integrations & Settings"><Settings size={22} /></button>
            </nav>
            <div className="dg-sidebar-footer">
              <div className="dg-user-avatar">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Hanna" />
                <span className="dg-online-dot"></span>
              </div>
            </div>
          </aside>

          {/* MAIN PAGE AREA */}
          <div className="dg-main-content">
            {/* HEADER */}
            <header className="dg-header">
              <div className="dg-header-title">
                <h1>Dashboard</h1>
                <span className="dg-breadcrumb">/ {activeView}</span>
              </div>
              <div className="dg-header-actions">
                <div className="dg-search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Search analytics or logs..." />
                </div>
                
                {/* Location selector */}
                <div className="dg-location-selector">
                  <Coffee size={16} className="dg-coffee-icon" />
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="dg-location-dropdown"
                  >
                    {data.locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="dg-chevron-icon" />
                </div>

                <button className="dg-notification-trigger">
                  <Bell size={18} />
                  <span className="dg-bell-dot"></span>
                </button>
              </div>
            </header>

            {/* DASHBOARD VIEWS */}
            {activeView === 'overview' ? (
              <div className="dg-grid-stage">
                
                {/* ROW 1 LEFT: REVENUE CARD */}
                <div className="dg-card dg-revenue-card">
                  <div className="dg-card-header">
                    <div className="dg-card-title-row">
                      <span className="dg-card-icon-tag">💸</span>
                      <h2>REVENUE</h2>
                    </div>
                    <div className="dg-card-filters">
                      <select 
                        value={timePeriod} 
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="dg-mini-select"
                      >
                        <option value="today">today</option>
                        <option value="this week">this week</option>
                        <option value="this month">this month</option>
                      </select>
                      <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        className="dg-mini-select"
                      >
                        <option value="INR, ₹">INR, ₹</option>
                        <option value="USD, $">USD, $</option>
                      </select>
                    </div>
                  </div>

                  <div className="dg-revenue-metrics">
                    <div className="dg-revenue-graph-col">
                      {/* SVG Bar Chart */}
                      <div className="dg-bar-chart-container">
                        <div className="dg-bar-grid-lines">
                          <div className="dg-grid-line"></div>
                          <div className="dg-grid-line"></div>
                          <div className="dg-grid-line"></div>
                        </div>
                        <div className="dg-bars-wrapper">
                          {activeStats.revenueData.map((val, i) => {
                            const maxVal = Math.max(...activeStats.revenueData);
                            const pct = (val / maxVal) * 100;
                            const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                            return (
                              <div key={i} className="dg-bar-col">
                                <div className="dg-bar-hover-val">
                                  {currency.includes('INR') ? '₹' : '$'}{Math.round(currency.includes('INR') ? scaleToRupees(val) : val).toLocaleString()}
                                </div>
                                <div 
                                  className="dg-bar-fill" 
                                  style={{ height: `${pct}%` }}
                                >
                                  {weekdays[i] === 'Tue' && <span className="dg-bar-indicator-node">₹17L</span>}
                                </div>
                                <span className="dg-bar-label">{weekdays[i]}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="dg-revenue-stats-col">
                      <div className="dg-stat-box">
                        <span className="dg-stat-lbl">GROSS REVENUE</span>
                        <div className="dg-stat-row">
                          <span className="dg-stat-value">
                            {currency.includes('INR') ? '₹' : '$'}
                            {Math.round(currency.includes('INR') ? scaleToRupees(activeStats.grossRevenue) : activeStats.grossRevenue).toLocaleString(currency.includes('INR') ? 'en-IN' : 'en-US')}
                          </span>
                          <span className="dg-badge-positive">+7.5%</span>
                        </div>
                      </div>

                      <div className="dg-stat-box">
                        <span className="dg-stat-lbl">AVG. ORDER VALUE</span>
                        <div className="dg-stat-row">
                          <span className="dg-stat-value">
                            {currency.includes('INR') ? '₹' : '$'}
                            {(currency.includes('INR') ? scaleToRupees(activeStats.avgOrderValue) : activeStats.avgOrderValue).toLocaleString(currency.includes('INR') ? 'en-IN' : 'en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </span>
                          <span className="dg-badge-positive">+2.4%</span>
                        </div>
                        <span className="dg-stat-subtext">Growth vs. last week</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 1 RIGHT STACK */}
                <div className="dg-row-right-stack">
                  {/* LABOR COST WARNING CARD */}
                  <div className="dg-alert-card">
                    <div className="dg-alert-icon-box">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="dg-alert-details">
                      <h3>STABILIZING LABOR COST</h3>
                      <p>Approve critical alerts and check Inventory Risk. Shift ends in <span className="dg-time-accent">2:59:12</span> hours.</p>
                    </div>
                    <button className="dg-alert-action-btn">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  {/* VENUE CAPACITY CARD */}
                  <div className="dg-card dg-capacity-card">
                    <div className="dg-card-header">
                      <h2>VENUE CAPACITY</h2>
                      <span className="dg-badge-pill">{timePeriod}</span>
                    </div>

                    {/* Circular Gauges */}
                    <div className="dg-gauges-row">
                      {Object.entries(activeStats.capacity).map(([locName, value]) => {
                        if (!capacityFilters[locName]) return null;
                        // Calculate SVG dashoffset
                        const radius = 26;
                        const circ = 2 * Math.PI * radius;
                        const offset = circ - (value / 100) * circ;
                        
                        let circleColor = '#6f5ef5'; // blue/purple default
                        if (locName === 'Astoria') circleColor = '#f2644c'; // coral red
                        if (locName === 'Rego Park') circleColor = '#beff53'; // lime green
                        
                        return (
                          <div key={locName} className="dg-gauge-item">
                            <div className="dg-gauge-svg-wrap">
                              <svg width="64" height="64" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r={radius} className="dg-gauge-bg-circle" />
                                <circle 
                                  cx="32" 
                                  cy="32" 
                                  r={radius} 
                                  className="dg-gauge-fill-circle"
                                  stroke={circleColor}
                                  strokeDasharray={circ}
                                  strokeDashoffset={offset}
                                  transform="rotate(-90 32 32)"
                                />
                              </svg>
                              <span className="dg-gauge-val-text">{value}%</span>
                            </div>
                            <span className="dg-gauge-lbl">{locName.split(' ')[0]}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Location Filters Checkboxes */}
                    <div className="dg-capacity-checkboxes">
                      {Object.keys(activeStats.capacity).map(locName => (
                        <label key={locName} className="dg-checkbox-label">
                          <input 
                            type="checkbox" 
                            checked={capacityFilters[locName] || false}
                            onChange={() => setCapacityFilters(prev => ({ ...prev, [locName]: !prev[locName] }))}
                          />
                          <span className="dg-checkbox-custom" style={{ 
                            borderColor: locName === 'Astoria' ? '#f2644c' : locName === 'Rego Park' ? '#beff53' : '#6f5ef5',
                            backgroundColor: capacityFilters[locName] ? (locName === 'Astoria' ? '#f2644c' : locName === 'Rego Park' ? '#beff53' : '#6f5ef5') : 'transparent'
                          }}>
                            {capacityFilters[locName] && <Check size={10} color="#0c1015" strokeWidth={4} />}
                          </span>
                          {locName}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ROW 2 LEFT: POINTS MAP CARD */}
                <div className="dg-card dg-points-card">
                  <div className="dg-card-header">
                    <h2>POINTS MAP</h2>
                    <button className="dg-action-btn"><ArrowUpRight size={18} /></button>
                  </div>
                  <div className="dg-map-container">
                    {/* Styled vector-style CSS/SVG Map */}
                    <div className="dg-svg-map-graphic">
                      <svg viewBox="0 0 300 160" fill="none" className="dg-styled-map-svg">
                        <path d="M10 40 C30 20, 80 10, 120 30 C160 50, 200 40, 240 20 C280 0, 290 30, 290 60 C290 90, 260 110, 220 120 C180 130, 130 110, 100 130 C70 150, 30 150, 10 120 C-10 90, -10 60, 10 40 Z" fill="#1e2d27" opacity="0.3" stroke="#2a3d34" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M50 80 C80 60, 120 70, 160 90 C200 110, 230 80, 250 70" stroke="#375a48" strokeWidth="3" />
                        
                        {/* Astoria Pin */}
                        {capacityFilters['Astoria'] && (
                          <g transform="translate(160, 90)" className="dg-map-pin coral">
                            <circle cx="0" cy="0" r="14" className="dg-pin-radial-pulse" />
                            <circle cx="0" cy="0" r="5" fill="#f2644c" />
                            <rect x="-30" y="-28" width="60" height="18" rx="4" fill="#0f1115" stroke="#f2644c" strokeWidth="1" />
                            <text x="0" y="-16" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Astoria</text>
                          </g>
                        )}

                        {/* Long Island City Pin */}
                        {capacityFilters['Long Island City'] && (
                          <g transform="translate(60, 75)" className="dg-map-pin blue">
                            <circle cx="0" cy="0" r="14" className="dg-pin-radial-pulse" />
                            <circle cx="0" cy="0" r="5" fill="#6f5ef5" />
                            <rect x="-25" y="-28" width="50" height="18" rx="4" fill="#0f1115" stroke="#6f5ef5" strokeWidth="1" />
                            <text x="0" y="-16" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">L.I.C.</text>
                          </g>
                        )}

                        {/* Rego Park Pin */}
                        {capacityFilters['Rego Park'] && (
                          <g transform="translate(240, 65)" className="dg-map-pin lime">
                            <circle cx="0" cy="0" r="14" className="dg-pin-radial-pulse" />
                            <circle cx="0" cy="0" r="5" fill="#beff53" />
                            <rect x="-35" y="-28" width="70" height="18" rx="4" fill="#0f1115" stroke="#beff53" strokeWidth="1" />
                            <text x="0" y="-16" fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">Rego Park</text>
                          </g>
                        )}
                      </svg>
                      <div className="dg-map-floating-indicator">
                        <Sparkles size={12} /> Live Ops Tracking
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 2 MIDDLE: OPERATIONAL TIMING CARD */}
                <div className="dg-card dg-timing-card">
                  <div className="dg-card-header">
                    <h2>OPERATIONAL TIMING</h2>
                    <button className="dg-action-btn"><ArrowUpRight size={18} /></button>
                  </div>
                  <div className="dg-clock-container">
                    {/* SVG Clock Meter */}
                    <div className="dg-radial-clock-meter">
                      <svg width="120" height="120" viewBox="0 0 120 120" className="dg-clock-svg">
                        <circle cx="60" cy="60" r="50" className="dg-clock-dial-bg" />
                        
                        {/* Highlighted Peak Sector: 12 PM - 3 PM (90 deg to 180 deg) */}
                        <path d="M 60,60 L 60,10 A 50,50 0 0,1 110,60 Z" fill="rgba(242, 100, 76, 0.15)" stroke="#f2644c" strokeWidth="1.5" />
                        {/* Completion Sector: 6 PM - 9 PM (270 deg to 360 deg) */}
                        <path d="M 60,60 L 10,60 A 50,50 0 0,1 60,10 Z" fill="rgba(190, 255, 83, 0.1)" stroke="#beff53" strokeWidth="1.5" />
                        
                        {/* Clock ticks */}
                        <text x="60" y="24" fill="#666" fontSize="8" textAnchor="middle">12</text>
                        <text x="96" y="63" fill="#666" fontSize="8">3</text>
                        <text x="60" y="104" fill="#666" fontSize="8" textAnchor="middle">6</text>
                        <text x="20" y="63" fill="#666" fontSize="8">9</text>
                        
                        {/* Clock hands */}
                        <line x1="60" y1="60" x2="60" y2="30" stroke="#f2644c" strokeWidth="2.5" strokeLinecap="round" className="dg-clock-hand-hour" />
                        <line x1="60" y1="60" x2="90" y2="60" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="dg-clock-hand-minute" />
                        <circle cx="60" cy="60" r="3" fill="#fff" />
                      </svg>
                      
                      <div className="dg-clock-legend">
                        <div className="legend-row">
                          <span className="dot peak"></span>
                          <span className="lbl">Peak (12PM-3PM)</span>
                        </div>
                        <div className="legend-row">
                          <span className="dot completion"></span>
                          <span className="lbl">Completion</span>
                        </div>
                      </div>
                    </div>
                    <div className="dg-clock-time-readout">
                      <span>12:47:33</span>
                      <span className="tz">UTC-5</span>
                    </div>
                  </div>
                </div>

                {/* ROW 2 RIGHT: AI LEAD OPERATIONAL CARD */}
                <div className="dg-card dg-ai-lead-card">
                  <div className="dg-card-header">
                    <div className="dg-card-title-row">
                      <Cpu size={16} className="dg-cpu-icon" />
                      <h2>AI OPERATIONS LEAD</h2>
                    </div>
                    <button className="dg-action-btn"><ArrowUpRight size={18} /></button>
                  </div>
                  
                  {/* Chat feed */}
                  <div className="dg-chat-feed-box">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`dg-chat-bubble ${msg.sender}`}>
                        {msg.sender === 'ai' && (
                          <div className="dg-bubble-avatar">
                            <Cpu size={12} />
                          </div>
                        )}
                        <div className="dg-bubble-text-wrap">
                          <div className="dg-bubble-text">{msg.text}</div>
                          <span className="dg-bubble-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="dg-chat-bubble ai typing">
                        <div className="dg-bubble-avatar">
                          <Cpu size={12} />
                        </div>
                        <div className="dg-bubble-text-wrap">
                          <div className="dg-typing-indicator">
                            <span></span><span></span><span></span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Strategy Suggestion Chips */}
                  <div className="dg-chat-suggestions">
                    <span className="dg-sugg-title">Hi Hanna! Choose or type:</span>
                    <div className="dg-chips-row">
                      {data.aiDefaultSuggestions.map((sugg, i) => (
                        <button 
                          key={i} 
                          className="dg-suggestion-chip"
                          onClick={() => handleSendMessage(sugg.text)}
                        >
                          {sugg.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input box */}
                  <div className="dg-chat-input-bar">
                    <button className="dg-plus-icon-btn">+</button>
                    <input 
                      type="text" 
                      placeholder="Ask something or choose a suggestion..." 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
                    />
                    <button 
                      className="dg-send-icon-btn"
                      onClick={() => handleSendMessage(chatInput)}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              renderActiveDesktopView()
            )}
          </div>
        </div>
      ) : (
        /* MOBILE VIEW LAYOUT */
        <div className="dg-mobile-device-wrapper">
          {/* DEVICE STATUS BAR */}
          <div className="dg-mobile-header">
            <div className="dg-mobile-brand">
              <span className="brand-dot">Dg</span>
              <h2>Daily Grind Dashboard</h2>
            </div>
            <div className="dg-mobile-location-row">
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="dg-mobile-location-select"
              >
                {data.locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTIVE TAB STAGE */}
          <div className="dg-mobile-content-screen">
            {activeMobileTab === 'home' && (
              <div className="dg-mobile-screen active-ai-feed">
                <div className="dg-screen-header">
                  <h3>AI Operations Lead</h3>
                  <span className="dg-online-pill">Active</span>
                </div>
                
                {/* Chat feed */}
                <div className="dg-mobile-chat-feed">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`dg-chat-bubble ${msg.sender}`}>
                      <div className="dg-bubble-text-wrap">
                        <div className="dg-bubble-text">{msg.text}</div>
                        <span className="dg-bubble-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="dg-chat-bubble ai typing">
                      <div className="dg-bubble-text-wrap">
                        <div className="dg-typing-indicator">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggestions row */}
                <div className="dg-mobile-suggestions">
                  {data.aiDefaultSuggestions.map((sugg, i) => (
                    <button 
                      key={i} 
                      className="dg-mobile-chip"
                      onClick={() => handleSendMessage(sugg.text)}
                    >
                      {sugg.text}
                    </button>
                  ))}
                </div>

                {/* Input row */}
                <div className="dg-mobile-chat-input-row">
                  <input 
                    type="text" 
                    placeholder="Ask something..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(chatInput)}
                  />
                  <button className="dg-mobile-send" onClick={() => handleSendMessage(chatInput)}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

            {activeMobileTab === 'revenue' && (
              <div className="dg-mobile-screen">
                <div className="dg-screen-header">
                  <h3>Revenue Summary</h3>
                </div>
                
                <div className="dg-mobile-stats-grid">
                  <div className="dg-m-stat-box">
                    <span className="lbl">GROSS ESTIMATE</span>
                    <span className="val">₹{scaleToRupees(activeStats.grossRevenue).toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
                  </div>
                  <div className="dg-m-stat-box">
                    <span className="lbl">ORDER SIZE (AOV)</span>
                    <span className="val">₹{scaleToRupees(activeStats.avgOrderValue).toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
                  </div>
                </div>

                {/* Mobile Bar Graph */}
                <div className="dg-mobile-chart-card">
                  <h4>WEEKLY REVENUE SPREAD</h4>
                  <div className="dg-m-bar-chart">
                    {activeStats.revenueData.map((val, i) => {
                      const maxVal = Math.max(...activeStats.revenueData);
                      const pct = (val / maxVal) * 80;
                      const dayName = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i];
                      return (
                        <div key={i} className="dg-m-chart-bar-row">
                          <span className="day-lbl">{dayName}</span>
                          <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="val-lbl">₹{Math.round(scaleToRupees(val)/1000)}k</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Projections Simulator */}
                <div className="dg-mobile-chart-card dg-mobile-simulator-card">
                  <h4>PROJECTIONS SIMULATOR</h4>
                  <div className="dg-sliders-stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                    <div className="dg-slider-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="dg-slider-lbl-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>Target Ticket Increase</span>
                        <strong style={{ color: '#beff53' }}>+{ticketIncrease}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="25" 
                        value={ticketIncrease}
                        onChange={(e) => setTicketIncrease(parseInt(e.target.value, 10))}
                        className="dg-range-slider"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="dg-slider-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="dg-slider-lbl-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>AOV Boost</span>
                        <strong style={{ color: '#beff53' }}>+₹{aovBoost}</strong>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="400" 
                        value={aovBoost}
                        onChange={(e) => setAovBoost(parseInt(e.target.value, 10))}
                        className="dg-range-slider"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="dg-projection-outcomes" style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                    <div className="dg-outcome-box" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="dg-outcome-lbl" style={{ fontSize: '0.65rem', color: '#8892b0' }}>PROJECTED REVENUE</span>
                      <div className="dg-outcome-value" style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fff' }}>
                        ₹{Math.round(
                          (() => {
                            const baseRev = activeStats.revenueData.reduce((a,b) => a+b, 0) * 80;
                            const baseTix = Math.round(baseRev / (activeStats.avgOrderValue * 80));
                            const projTix = Math.round(baseTix * (1 + ticketIncrease / 100));
                            const projAOV = (activeStats.avgOrderValue * 80) + aovBoost;
                            return projTix * projAOV;
                          })()
                        ).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMobileTab === 'reports' && (
              <div className="dg-mobile-screen">
                {selectedReportId ? (
                  /* Mobile Report Detail View */
                  <div className="dg-mobile-report-detail" style={{ animation: 'mobileFade 0.3s ease forwards' }}>
                    <button 
                      className="dg-m-back-btn" 
                      onClick={() => setSelectedReportId('')}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginBottom: '16px',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      ← Back to Reports
                    </button>
                    
                    {(() => {
                      const report = data.reports.find(r => r.id === selectedReportId) || data.reports[0];
                      const grossRev = scaleToRupees(activeStats.grossRevenue);
                      return (
                        <div className="dg-m-report-content" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <span className="dg-report-badge" style={{ fontSize: '0.65rem', color: '#6f5ef5', fontWeight: 'bold' }}>LIVE LEDGER REPORT</span>
                          <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: '800' }}>{report.name}</h3>
                          <p style={{ color: '#8892b0', fontSize: '0.75rem', lineHeight: '1.45' }}>{report.desc}</p>
                          
                          {report.id === 'rep1' && (
                            <div className="dg-report-ledger" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>COGS Food:</span>
                                <strong style={{ color: '#fff' }}>32.4% (₹{Math.round(grossRev * 0.324).toLocaleString('en-IN')})</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>COGS Bev:</span>
                                <strong style={{ color: '#fff' }}>18.2% (₹{Math.round(grossRev * 0.182).toLocaleString('en-IN')})</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Labor Cost:</span>
                                <strong style={{ color: '#fff' }}>{activeStats.laborCostPercent}% (₹{Math.round(grossRev * (activeStats.laborCostPercent / 100)).toLocaleString('en-IN')})</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                <span style={{ color: '#beff53', fontWeight: 'bold' }}>Total Prime:</span>
                                <strong style={{ color: '#beff53' }}>{(50.6 + activeStats.laborCostPercent).toFixed(1)}% (₹{Math.round(grossRev * ((50.6 + activeStats.laborCostPercent)/100)).toLocaleString('en-IN')})</strong>
                              </div>
                            </div>
                          )}

                          {report.id === 'rep2' && (
                            <div className="dg-report-ledger" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Roster Count:</span>
                                <strong style={{ color: '#fff' }}>18 Members</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Overtime Accrued:</span>
                                <strong style={{ color: '#f2644c' }}>4.5 hrs</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Budget Var:</span>
                                <strong style={{ color: '#34a853' }}>-1.2%</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                <span style={{ color: '#beff53', fontWeight: 'bold' }}>Efficiency:</span>
                                <strong style={{ color: '#beff53' }}>94.5%</strong>
                              </div>
                            </div>
                          )}

                          {report.id === 'rep3' && (
                            <div className="dg-report-ledger" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Espresso Beans:</span>
                                <strong style={{ color: '#fff' }}>₹42,000 (Open) / ₹18,500 (Close)</strong>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', marginTop: '4px' }}>
                                <span style={{ color: '#8892b0' }}>Dairy Supplies:</span>
                                <strong style={{ color: '#fff' }}>₹14,500 (Open) / ₹3,800 (Close)</strong>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', marginTop: '4px' }}>
                                <span style={{ color: '#8892b0' }}>Baked Pastries:</span>
                                <strong style={{ color: '#fff' }}>₹22,000 (Open) / ₹4,200 (Close)</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                <span style={{ color: '#beff53', fontWeight: 'bold' }}>Weekly COGS:</span>
                                <strong style={{ color: '#beff53' }}>₹52,000 (29.8% Ratio)</strong>
                              </div>
                            </div>
                          )}

                          {report.id === 'rep4' && (
                            <div className="dg-report-ledger" style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Cold Brew Margin:</span>
                                <strong style={{ color: '#34a853' }}>88.5% (High)</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Flat White Margin:</span>
                                <strong style={{ color: '#fff' }}>71.2% (Mid)</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: '#8892b0' }}>Avocado Croissant:</span>
                                <strong style={{ color: '#f2644c' }}>44.0% (Low)</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', marginTop: '4px' }}>
                                <span style={{ color: '#beff53', fontWeight: 'bold' }}>Leverage target:</span>
                                <strong style={{ color: '#beff53' }}>+₹15 Flat White (+₹4.5k/wk)</strong>
                              </div>
                            </div>
                          )}

                          <div className="dg-report-insight" style={{ backgroundColor: 'rgba(190, 255, 83, 0.04)', border: '1px solid rgba(190, 255, 83, 0.1)', padding: '12px 14px', borderRadius: '12px' }}>
                            <span className="insight-lbl" style={{ display: 'block', fontSize: '0.65rem', color: '#beff53', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '0.5px' }}>AI RECOMMENDATION</span>
                            <p style={{ color: '#c9d1d9', fontSize: '0.75rem', lineHeight: '1.4' }}>
                              {report.id === 'rep1' && "Prime costs are in target range. Shift paper goods sourcing to the LIC logistics hub to save an extra 2%."}
                              {report.id === 'rep2' && "Adjust cashier rosters during afternoon hours on Tuesday to avoid overlap with deliveries."}
                              {report.id === 'rep3' && "Dairy turnover is consistent. Maintain standard automated re-ordering limits to prevent depletion."}
                              {report.id === 'rep4' && "Organic Cold Brew is a high-margin seller. Introduce pastry bundle promos in checkout screens."}
                            </p>
                          </div>
                          
                          <button 
                            className="dg-export-btn" 
                            onClick={() => alert("CSV Export triggered on mobile device.")}
                            style={{
                              backgroundColor: '#6f5ef5',
                              border: 'none',
                              color: '#fff',
                              padding: '10px',
                              borderRadius: '12px',
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              marginTop: '8px'
                            }}
                          >
                            Export to CSV
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Reports list catalog */
                  <>
                    <div className="dg-screen-header">
                      <h3>Operational Reports</h3>
                    </div>

                    <div className="dg-mobile-cartoon-illustration">
                      <svg viewBox="0 0 200 120" width="100%" height="100">
                        <rect x="20" y="20" width="160" height="80" rx="12" fill="#1b2521" stroke="#34a853" strokeWidth="1.5" />
                        <circle cx="50" cy="60" r="16" fill="#e8c898" />
                        <rect x="42" y="76" width="16" height="20" rx="4" fill="#f2644c" />
                        <path d="M38 48 C38 35, 62 35, 62 48 Z" fill="#fff" />
                        <rect x="42" y="46" width="16" height="4" fill="#0f1115" />
                        <circle cx="46" cy="58" r="2" fill="#000" />
                        <circle cx="54" cy="58" r="2" fill="#000" />
                        <path d="M48 65 Q50 67 52 65" stroke="#000" strokeWidth="1.5" fill="none" />
                        <rect x="90" y="35" width="60" height="45" rx="6" fill="#0f1115" stroke="#beff53" strokeWidth="1.5" />
                        <line x1="100" y1="65" x2="115" y2="50" stroke="#f2644c" strokeWidth="2" />
                        <line x1="115" y1="50" x2="130" y2="58" stroke="#f2644c" strokeWidth="2" />
                        <line x1="130" y1="58" x2="142" y2="44" stroke="#f2644c" strokeWidth="2" />
                        <circle cx="142" cy="44" r="3" fill="#beff53" />
                        <text x="120" y="72" fill="#666" fontSize="6" textAnchor="middle">101 reports found</text>
                      </svg>
                    </div>

                    <div className="dg-mobile-reports-list">
                      {data.reports.map(rep => (
                        <div key={rep.id} className="dg-m-report-item" onClick={() => setSelectedReportId(rep.id)}>
                          <div className="rep-left">
                            <span className="rep-icon">📄</span>
                            <div>
                              <h4>{rep.name}</h4>
                              <p>{rep.desc}</p>
                            </div>
                          </div>
                          <button className="rep-go-btn">→</button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeMobileTab === 'integrations' && (
              <div className="dg-mobile-screen">
                <div className="dg-screen-header">
                  <h3>Integrations</h3>
                </div>

                {/* Mobile Sync Panel */}
                <div className="dg-mobile-chart-card dg-mobile-sync-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4>GLOBAL DATA SYNC</h4>
                  <button 
                    className={`dg-trigger-sync-btn ${isSyncing ? 'syncing' : ''}`}
                    disabled={isSyncing}
                    style={{
                      width: '100%',
                      backgroundColor: isSyncing ? '#161c24' : '#6f5ef5',
                      color: '#fff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onClick={() => {
                      setIsSyncing(true);
                      setSyncMessage('Syncing...');
                      setTimeout(() => {
                        setIsSyncing(false);
                        setSyncMessage('');
                        alert('Database synced successfully!');
                      }, 1200);
                    }}
                  >
                    {isSyncing ? syncMessage : "Trigger Database Sync"}
                  </button>
                </div>
                
                <div className="dg-mobile-integrations-list">
                  {integrationsList.map(int => (
                    <div key={int.id} className="dg-m-integration-row">
                      <div className="int-details">
                        <span className="int-logo-box">
                          {int.name === 'QuickBooks' ? '📊' : int.name === 'Xero' ? '📈' : int.name === 'Homebase' ? '🗓️' : int.name === 'Square' ? '💳' : '🥪'}
                        </span>
                        <div>
                          <h4>{int.name}</h4>
                          <span className={`int-status-tag ${int.status.toLowerCase()}`}>{int.status}</span>
                        </div>
                      </div>
                      <button 
                        className={`int-action-btn ${int.status === 'Connected' ? 'disconnect' : 'connect'}`}
                        onClick={() => toggleIntegration(int.id)}
                      >
                        {int.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Categories classification module */}
                <div className="dg-mobile-categories-block">
                  <h4>STORE CATEGORIES</h4>
                  <div className="categories-stack">
                    {data.categories.map((cat, idx) => (
                      <div key={idx} className="dg-m-cat-card" style={{ borderLeftColor: cat.color }}>
                        <span className="cat-title" style={{ color: cat.color }}>{cat.name}</span>
                        <p className="cat-desc">{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeMobileTab === 'capacity' && (
              <div className="dg-mobile-screen">
                <div className="dg-screen-header">
                  <h3>Capacity & Clock</h3>
                </div>
                
                <div className="dg-mobile-capacity-gauges">
                  {Object.entries(activeStats.capacity).map(([loc, val]) => (
                    <div key={loc} className="dg-m-gauge-row">
                      <span className="lbl">{loc}</span>
                      <div className="bar-track">
                        <div 
                          className="bar-fill" 
                          style={{ 
                            width: `${val}%`,
                            backgroundColor: loc.includes('Astoria') ? '#f2644c' : loc.includes('Rego') ? '#beff53' : '#6f5ef5'
                          }}
                        ></div>
                      </div>
                      <span className="val">{val}%</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Speed of Service Simulator */}
                <div className="dg-mobile-radial-clock-card dg-mobile-speed-card" style={{ marginTop: '10px' }}>
                  <h4>SPEED OF SERVICE SIMULATION</h4>
                  <div className="dg-slider-group" style={{ marginTop: '10px' }}>
                    <div className="dg-slider-lbl-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                      <span style={{ color: '#8892b0' }}>Active Staff</span>
                      <strong style={{ color: '#beff53' }}>{staffCount} Baristas</strong>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="10" 
                      value={staffCount}
                      onChange={(e) => setStaffCount(parseInt(e.target.value, 10))}
                      className="dg-range-slider"
                      style={{ width: '100%', marginBottom: '12px' }}
                    />
                  </div>
                  {(() => {
                    const svcSec = Math.max(90, Math.round(480 / (staffCount * 0.9)));
                    const m = Math.floor(svcSec / 60);
                    const s = svcSec % 60;
                    let rating = 'Optimal';
                    let col = '#beff53';
                    if (staffCount < 4) { rating = 'Critical Slowdown'; col = '#f2644c'; }
                    else if (staffCount > 7) { rating = 'High Speed Ops'; col = '#6f5ef5'; }
                    return (
                      <div className="dg-m-speed-outcome" style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                          <span style={{ color: '#8892b0' }}>Completion Time:</span>
                          <strong style={{ color: col }}>{m}m {s}s</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                          <span style={{ color: '#8892b0' }}>Ops Status:</span>
                          <span style={{ color: col, fontWeight: '700' }}>{rating}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Mobile Roster Schedule */}
                <div className="dg-mobile-radial-clock-card" style={{ marginTop: '10px' }}>
                  <h4>DAILY ROSTER CHECKLOG</h4>
                  <div className="dg-roster-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    {[
                      { name: "Sara Chen", role: "Lead Barista", status: "Active" },
                      { name: "Marcus Miller", role: "Barista", status: "Active" },
                      { name: "Elena Rostova", role: "Cashier", status: "Active" }
                    ].map((emp, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <div>
                          <strong style={{ color: '#fff', fontSize: '0.8rem', display: 'block' }}>{emp.name}</strong>
                          <span style={{ color: '#8892b0', fontSize: '0.7rem' }}>{emp.role}</span>
                        </div>
                        <span style={{ color: '#34a853', backgroundColor: 'rgba(52,168,83,0.1)', padding: '2px 8px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 'bold' }}>{emp.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Circular timing gauge */}
                <div className="dg-mobile-radial-clock-card" style={{ marginTop: '10px' }}>
                  <h4>OPERATIONAL TIMING CLOCK</h4>
                  <div className="clock-radial-wrap" style={{ marginTop: '10px' }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="dg-clock-dial-bg" />
                      <path d="M 50,50 L 50,10 A 40,40 0 0,1 90,50 Z" fill="rgba(242, 100, 76, 0.2)" stroke="#f2644c" strokeWidth="1.5" />
                      <line x1="50" y1="50" x2="50" y2="25" stroke="#f2644c" strokeWidth="2" strokeLinecap="round" />
                      <line x1="50" y1="50" x2="75" y2="50" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="2" fill="#fff" />
                    </svg>
                    <div className="clock-details">
                      <span className="time-val">12:47:33 PM</span>
                      <span className="tz-val">Est. Peak Shift: ASTORIA, NY</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM NAVIGATION DOCK */}
          <nav className="dg-mobile-nav-dock">
            <button className={activeMobileTab === 'home' ? 'active' : ''} onClick={() => setActiveMobileTab('home')}>
              <Cpu size={20} />
              <span>AI Lead</span>
            </button>
            <button className={activeMobileTab === 'revenue' ? 'active' : ''} onClick={() => setActiveMobileTab('revenue')}>
              <BarChart2 size={20} />
              <span>Revenue</span>
            </button>
            <button className={activeMobileTab === 'reports' ? 'active' : ''} onClick={() => setActiveMobileTab('reports')}>
              <Folder size={20} />
              <span>Reports</span>
            </button>
            <button className={activeMobileTab === 'integrations' ? 'active' : ''} onClick={() => setActiveMobileTab('integrations')}>
              <Settings size={20} />
              <span>Connect</span>
            </button>
            <button className={activeMobileTab === 'capacity' ? 'active' : ''} onClick={() => setActiveMobileTab('capacity')}>
              <Coffee size={20} />
              <span>Capacity</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default DailyGrindApp;
