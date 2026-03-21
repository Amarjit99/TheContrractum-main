import React, { useState } from 'react';
import { Cloud, Zap, Globe, Database, Shield, Bell, Activity, CheckCircle, TrendingUp, Award, FileCheck, ArrowRight, Sparkles, Users, Server, Lock, AlertCircle } from 'lucide-react';
import ReliabilityBg from '../../assets/commitment.webp';
export default function Reliability() {
  const [selectedMetric, setSelectedMetric] = useState(1);

  const uptemeSLA = [
    {
      id: 1,
      service: "Cloud Infrastructure",
      sla: "99.99%",
      description: "Mission-critical cloud services with redundant systems",
      uptime: 99.99,
      response: "5 minutes",
      color: "from-blue-500 to-cyan-600",
      icon: "cloud"
    },
    {
      id: 2,
      service: "API Services",
      sla: "99.95%",
      description: "REST and GraphQL APIs with failover protection",
      uptime: 99.95,
      response: "10 minutes",
      color: "from-cyan-500 to-teal-600",
      icon: "zap"
    },
    {
      id: 3,
      service: "Web Applications",
      sla: "99.90%",
      description: "High-availability web platforms across multiple regions",
      uptime: 99.90,
      response: "15 minutes",
      color: "from-teal-500 to-green-600",
      icon: "globe"
    },
    {
      id: 4,
      service: "Database Services",
      sla: "99.99%",
      description: "Enterprise database with automatic replication",
      uptime: 99.99,
      response: "5 minutes",
      color: "from-green-500 to-emerald-600",
      icon: "database"
    },
    {
      id: 5,
      service: "Support Services",
      sla: "99.95%",
      description: "24/7 customer support with guaranteed response times",
      uptime: 99.95,
      response: "30 minutes",
      color: "from-emerald-500 to-blue-600",
      icon: "users"
    },
    {
      id: 6,
      service: "Security Infrastructure",
      sla: "99.99%",
      description: "Advanced threat detection and prevention systems",
      uptime: 99.99,
      response: "1 minute",
      color: "from-indigo-500 to-purple-600",
      icon: "shield"
    }
  ];

  const reliabilityMetrics = [
    {
      id: 1,
      metric: "System Uptime",
      value: "99.99%",
      description: "Average system availability per month",
      target: "Target: 99.99%",
      achieved: "99.99%",
      trend: "↑ Improving",
      icon: "trendingUp",
      color: "from-blue-100 to-blue-50"
    },
    {
      id: 2,
      metric: "Mean Time to Resolution",
      value: "< 30 min",
      description: "Average time to fix critical issues",
      target: "Target: < 1 hour",
      achieved: "< 30 minutes",
      trend: "↓ Decreasing",
      icon: "activity",
      color: "from-cyan-100 to-cyan-50"
    },
    {
      id: 3,
      metric: "Data Integrity",
      value: "100%",
      description: "Percentage of data backup consistency",
      target: "Target: 100%",
      achieved: "100%",
      trend: "→ Stable",
      icon: "checkCircle",
      color: "from-teal-100 to-teal-50"
    },
    {
      id: 4,
      metric: "Disaster Recovery",
      value: "15 min RTO",
      description: "Recovery Time Objective for critical systems",
      target: "Target: < 20 min",
      achieved: "15 minutes",
      trend: "✓ Exceeded",
      icon: "shield",
      color: "from-green-100 to-green-50"
    }
  ];

  const redundancySystems = [
    {
      id: 1,
      system: "Multi-Region Hosting",
      icon: "globe",
      description: "Applications deployed across 5+ geographic locations",
      features: [
        "Automatic failover between regions",
        "Load balancing across data centers",
        "Real-time data synchronization",
        "Geographic redundancy for 99.99% uptime"
      ],
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500"
    },
    {
      id: 2,
      system: "Database Replication",
      icon: "activity",
      description: "Master-slave and multi-master database replication",
      features: [
        "Real-time synchronous replication",
        "Automatic failover mechanisms",
        "Point-in-time recovery capabilities",
        "Backup to 3 separate locations"
      ],
      color: "from-cyan-500 to-teal-600",
      borderColor: "border-cyan-500"
    },
    {
      id: 3,
      system: "Load Balancing",
      icon: "zap",
      description: "Advanced traffic distribution and health checking",
      features: [
        "Intelligent request routing",
        "Session persistence",
        "Health monitoring every 5 seconds",
        "Automatic server exclusion on failure"
      ],
      color: "from-teal-500 to-green-600",
      borderColor: "border-teal-500"
    },
    {
      id: 4,
      system: "Backup & Recovery",
      icon: "database",
      description: "Comprehensive backup strategy with multiple copies",
      features: [
        "Hourly incremental backups",
        "Daily full backups",
        "Offsite backup storage",
        "Monthly archive to cold storage"
      ],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500"
    }
  ];

  const monitoringTools = [
    {
      id: 1,
      tool: "Real-time Monitoring",
      icon: "trendingUp",
      description: "24/7 system performance and health monitoring",
      capabilities: [
        "Metrics collected every 10 seconds",
        "Real-time alerting for anomalies",
        "Custom threshold configurations",
        "Historical data retention for 2 years"
      ]
    },
    {
      id: 2,
      tool: "Log Aggregation",
      icon: "fileCheck",
      description: "Centralized logging from all system components",
      capabilities: [
        "Log collection from 500+ servers",
        "Full-text searchable logs",
        "Automated log analysis",
        "Pattern detection and alerting"
      ]
    },
    {
      id: 3,
      tool: "Health Checks",
      icon: "activity",
      description: "Automated system health verification",
      capabilities: [
        "API endpoint health checks every 30 seconds",
        "Database connection verification",
        "Dependency status monitoring",
        "Synthetic transaction monitoring"
      ]
    },
    {
      id: 4,
      tool: "Alert Management",
      icon: "bell",
      description: "Intelligent alerting and incident management",
      capabilities: [
        "Smart alert routing",
        "Escalation workflows",
        "On-call team management",
        "Automated incident creation"
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      cert: "ISO 27001",
      icon: "lock",
      description: "Information Security Management",
      validTill: "Valid Till: 2026",
      color: "from-blue-500 to-cyan-600",
      benefits: [
        "Information security best practices",
        "Risk management framework",
        "Data protection compliance",
        "Regular security audits"
      ]
    },
    {
      id: 2,
      cert: "ISO 9001",
      icon: "checkCircle",
      description: "Quality Management System",
      validTill: "Valid Till: 2025",
      color: "from-cyan-500 to-teal-600",
      benefits: [
        "Process quality assurance",
        "Continuous improvement",
        "Customer satisfaction focus",
        "Operational excellence"
      ]
    },
    {
      id: 3,
      cert: "SOC 2 Type II",
      icon: "shield",
      description: "Service Organization Control",
      validTill: "Valid Till: 2027",
      color: "from-teal-500 to-green-600",
      benefits: [
        "Security monitoring controls",
        "Availability assurance",
        "Processing integrity",
        "Confidentiality compliance"
      ]
    },
    {
      id: 4,
      cert: "GDPR Compliant",
      icon: "users",
      description: "General Data Protection Regulation",
      validTill: "Ongoing Compliance",
      color: "from-green-500 to-emerald-600",
      benefits: [
        "Personal data protection",
        "User privacy rights",
        "Data breach notification",
        "Privacy by design"
      ]
    }
  ];

  const disasterRecoveryPlan = [
    {
      id: 1,
      phase: "Detection",
      time: "< 5 minutes",
      icon: "alertCircle",
      description: "Automated detection of critical failures",
      steps: [
        "24/7 automated monitoring systems active",
        "Real-time alert generation and notification",
        "Incident severity classification",
        "Automated escalation procedure initiated"
      ]
    },
    {
      id: 2,
      phase: "Response",
      time: "5-10 minutes",
      icon: "zap",
      description: "Immediate response and stabilization",
      steps: [
        "On-call team automatically paged",
        "Incident command system activated",
        "Root cause analysis initiated",
        "Failover systems engaged automatically"
      ]
    },
    {
      id: 3,
      phase: "Recovery",
      time: "10-30 minutes",
      icon: "activity",
      description: "Service restoration and recovery",
      steps: [
        "Primary system repair initiated",
        "Data synchronization verified",
        "Service health checks performed",
        "Gradual traffic shifting to recovered system"
      ]
    },
    {
      id: 4,
      phase: "Restoration",
      time: "30-60 minutes",
      icon: "checkCircle",
      description: "Full system restoration",
      steps: [
        "All systems operating at full capacity",
        "Data integrity verification completed",
        "Performance baselines confirmed",
        "Post-incident review scheduled"
      ]
    }
  ];

  const complianceStandards = [
    {
      standard: "PCI DSS",
      level: "Level 1",
      description: "Payment Card Industry Data Security Standard"
    },
    {
      standard: "HIPAA",
      level: "Compliant",
      description: "Health Insurance Portability and Accountability Act"
    },
    {
      standard: "NIST",
      level: "CSF Aligned",
      description: "National Institute of Standards and Technology"
    },
    {
      standard: "ISO 22301",
      level: "Certified",
      description: "Business Continuity Management System"
    }
  ];

  const reliabilityStats = [
    { label: "Uptime Guarantee", value: "99.99%", icon: "trendingUp" },
    { label: "Data Centers", value: "5+", icon: "server" },
    { label: "Backup Locations", value: "3+", icon: "database" },
    { label: "Response Time", value: "< 5 min", icon: "zap" },
    { label: "Recovery Time", value: "< 15 min", icon: "activity" },
    { label: "Certifications", value: "10+", icon: "award" }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden mb-16 md:mb-20" style={{ backgroundImage: `url(${ReliabilityBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Reliability</span> */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl tracking-wide">
            Enterprise-Grade Reliability
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-lg tracking-wide">
            Built on decades of experience and cutting-edge infrastructure, our systems deliver 99.99% uptime with enterprise-grade security and compliance
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span>View SLA Details</span>
              <FileCheck className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <span>Contact Support</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Uptime SLA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">SLA Commitments</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Service Level Agreements</h2>
            <p className="text-gray-600 text-lg">Guaranteed uptime across all critical services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uptemeSLA.map((sla) => {
              const IconComponent = sla.icon === 'cloud' ? Cloud : sla.icon === 'zap' ? Zap : sla.icon === 'globe' ? Globe : sla.icon === 'database' ? Database : sla.icon === 'users' ? Users : Shield;
              return (
              <div
                key={sla.id}
                className={`group bg-gradient-to-br ${sla.color} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
              >
                <div className="p-8 text-white">
                  <div className="w-16 h-16 mb-4 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{sla.service}</h3>
                  <p className="text-white text-opacity-90 mb-6">{sla.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-opacity-80">SLA:</span>
                      <span className="text-3xl font-bold">{sla.sla}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-opacity-80">Response:</span>
                      <span className="font-semibold">{sla.response}</span>
                    </div>
                  </div>

                  {/* Uptime Progress */}
                  <div className="bg-black bg-opacity-20 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-semibold uppercase">Uptime</span>
                      <span className="font-bold">{sla.uptime}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${sla.uptime}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redundancy Systems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">Infrastructure</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Redundancy & Failover Systems</h2>
            <p className="text-gray-600 text-lg">Multi-layered infrastructure for maximum reliability</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {redundancySystems.map((system) => {
              const IconComponent = system.icon === 'globe' ? Globe : system.icon === 'activity' ? Activity : system.icon === 'zap' ? Zap : Database;
              return (
              <div
                key={system.id}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 overflow-hidden border-t-4 border-blue-500"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{system.system}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{system.description}</p>

                  <div className="space-y-3">
                    {system.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <span className="text-blue-500 font-bold mt-1">✓</span>
                        <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>  
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monitoring & Alerting Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Monitoring</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">24/7 Monitoring & Alerting</h2>
            <p className="text-gray-600 text-lg">Always watching, always ready to respond</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {monitoringTools.map((tool) => {
              const IconComponent = tool.icon === 'trendingUp' ? TrendingUp : tool.icon === 'fileCheck' ? FileCheck : tool.icon === 'activity' ? Activity : Bell;
              return (
              <div
                key={tool.id}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{tool.tool}</h3>
                </div>

                <p className="text-gray-700 mb-6">{tool.description}</p>

                <ul className="space-y-2">
                  {tool.capabilities.map((capability, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700 group/item"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full group-hover/item:scale-150 transition-transform"></span>
                      <span className="group-hover/item:text-blue-600 transition-colors">
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">Standards</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Security & Compliance Certifications</h2>
            <p className="text-gray-600 text-lg">Trusted by enterprise clients worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert) => {
              const IconComponent = cert.icon === 'lock' ? Lock : cert.icon === 'checkCircle' ? CheckCircle : cert.icon === 'shield' ? Shield : Users;
              return (
              <div
                key={cert.id}
                className={`group bg-gradient-to-br ${cert.color} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
              >
                <div className="p-8 text-black">
                  <div className="w-16 h-16 mb-4 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{cert.cert}</h3>
                  <p className="text-white text-opacity-90 mb-4">{cert.description}</p>

                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold">{cert.validTill}</p>
                  </div>

                  <div className="space-y-2">
                    {cert.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-lg">→</span>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disaster Recovery Plan Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">Emergency Response</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Disaster Recovery & Business Continuity</h2>
            <p className="text-gray-600 text-lg">Comprehensive plans for every scenario</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {disasterRecoveryPlan.map((phase, index) => {
              const IconComponent = phase.icon === 'alertCircle' ? AlertCircle : phase.icon === 'zap' ? Zap : phase.icon === 'activity' ? Activity : CheckCircle;
              return (
              <div
                key={phase.id}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 overflow-hidden border-t-4 border-blue-500"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-blue-600 font-semibold">{phase.time}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{phase.description}</p>

                  <div className="space-y-3">
                    {phase.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-blue-500 font-bold">0{i + 1}</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Recovery Timeline */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Complete Recovery Timeline</h3>
            <div className="grid sm:grid-cols-4 gap-4">
              {disasterRecoveryPlan.map((phase) => {
                const IconComponent = phase.icon === 'alertCircle' ? AlertCircle : phase.icon === 'zap' ? Zap : phase.icon === 'activity' ? Activity : CheckCircle;
                return (
                <div key={phase.id} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold mb-1">{phase.phase}</p>
                  <p className="text-blue-100">{phase.time}</p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Metrics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">Performance</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Key Reliability Metrics</h2>
            <p className="text-gray-600 text-lg">Measured and monitored continuously</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reliabilityMetrics.map((metric) => {
              const IconComponent = metric.icon === 'trendingUp' ? TrendingUp : metric.icon === 'activity' ? Activity : metric.icon === 'checkCircle' ? CheckCircle : Shield;
              return (
              <div
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`group bg-gradient-to-br ${metric.color} rounded-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 ${
                  selectedMetric === metric.id
                    ? "border-blue-600 shadow-xl"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                      {metric.metric}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{metric.description}</p>

                <div className="space-y-2 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{metric.target}</span>
                    <span className="font-semibold text-green-600">✓ {metric.achieved}</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-600">{metric.trend}</div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Standards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">Compliance</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Compliance Standards</h2>
            <p className="text-gray-600 text-lg">Meeting and exceeding industry requirements</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{standard.standard}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {standard.level}
                  </span>
                </div>
                <p className="text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">Impact by Numbers</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 drop-shadow-lg">Reliability by Numbers</h2>
            <p className="text-gray-600 text-lg">Proven track record of consistent performance</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reliabilityStats.map((stat, index) => {
              const IconComponent = stat.icon === 'trendingUp' ? TrendingUp : stat.icon === 'server' ? Server : stat.icon === 'database' ? Database : stat.icon === 'zap' ? Zap : stat.icon === 'activity' ? Activity : Award;
              return (
              <div
                key={index}
                className="group text-center p-8 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-t-4 border-blue-500"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trust in Our Reliability
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            With 99.99% uptime guarantee, enterprise-grade security, and 24/7 monitoring, your business is always protected
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <FileCheck className="w-5 h-5" />
              Download SLA
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 hover:scale-105 transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}