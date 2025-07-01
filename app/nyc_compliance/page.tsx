'use client';
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, FileText, Users, Shield, Calendar, Download, ExternalLink } from 'lucide-react';

const NYC144ComplianceTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    {
      id: 'assessment',
      title: 'AEDT Assessment',
      icon: Shield,
      description: 'Determine if your tools qualify as Automated Employment Decision Tools'
    },
    {
      id: 'scope',
      title: 'Usage Scope',
      icon: Users,
      description: 'Define how and where you use employment tools'
    },
    {
      id: 'audit',
      title: 'Bias Audit Planning',
      icon: FileText,
      description: 'Plan your required bias audit process'
    },
    {
      id: 'notification',
      title: 'Candidate Notification',
      icon: AlertCircle,
      description: 'Set up proper candidate notification system'
    },
    {
      id: 'publication',
      title: 'Publication Requirements',
      icon: ExternalLink,
      description: 'Meet public disclosure requirements'
    },
    {
      id: 'timeline',
      title: 'Compliance Timeline',
      icon: Calendar,
      description: 'Manage ongoing compliance obligations'
    },
    {
      id: 'results',
      title: 'Compliance Summary',
      icon: Download,
      description: 'Review your compliance status and next steps'
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (stepIndex) => {
    const stepId = steps[stepIndex].id;
    switch (stepId) {
      case 'assessment':
        return answers.usesAutomatedTools && answers.toolType && answers.decisionMaking;
      case 'scope':
        return answers.location && answers.hiringType && answers.candidateVolume;
      case 'audit':
        return answers.auditStatus && (answers.auditStatus !== 'needed' || answers.auditorSelection);
      case 'notification':
        return answers.notificationMethod && answers.notificationTiming;
      case 'publication':
        return answers.publicationPlan && answers.websiteLocation;
      case 'timeline':
        return answers.complianceDate && answers.auditSchedule;
      default:
        return completedSteps.has(stepIndex);
    }
  };

  const renderQuestion = (question) => {
    const { id, type, title, options, description, required } = question;
    const value = answers[id];

    return (
      <div key={id} className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          {title} {required && <span className="text-red-500">*</span>}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        
        {type === 'radio' && (
          <div className="space-y-2">
            {options.map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleAnswer(id, e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        )}
        
        {type === 'checkbox' && (
          <div className="space-y-2">
            {options.map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={value?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    handleAnswer(id, newValues);
                  }}
                  className="text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        )}
        
        {type === 'text' && (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleAnswer(id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter your response..."
          />
        )}
        
        {type === 'textarea' && (
          <textarea
            value={value || ''}
            onChange={(e) => handleAnswer(id, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm h-20"
            placeholder="Enter your response..."
          />
        )}
        
        {type === 'date' && (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleAnswer(id, e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-sm"
          />
        )}
      </div>
    );
  };

  const stepContent = {
    0: { // Assessment
      title: "AEDT Assessment",
      subtitle: "Let's determine if your tools qualify as Automated Employment Decision Tools under NYC Local Law 144",
      questions: [
        {
          id: 'usesAutomatedTools',
          type: 'radio',
          title: 'Does your organization use any automated tools, software, or algorithms in your hiring or promotion process?',
          description: 'This includes applicant tracking systems, resume screening tools, video interviewing platforms with automated scoring, or any AI-powered hiring tools.',
          required: true,
          options: [
            { value: 'yes', label: 'Yes, we use automated tools in hiring/promotion' },
            { value: 'no', label: 'No, our process is entirely manual' },
            { value: 'unsure', label: 'I\'m not sure what qualifies as automated' }
          ]
        },
        {
          id: 'toolType',
          type: 'checkbox',
          title: 'Which types of automated tools do you use? (Select all that apply)',
          description: 'Select all tools that your organization currently uses or plans to use.',
          required: true,
          options: [
            { value: 'ats', label: 'Applicant Tracking System (ATS) with automated screening' },
            { value: 'resume_screening', label: 'Resume screening/parsing software' },
            { value: 'video_analysis', label: 'Video interview analysis tools' },
            { value: 'assessment_tools', label: 'Automated skills/personality assessments' },
            { value: 'ai_chatbots', label: 'AI chatbots for initial candidate screening' },
            { value: 'predictive_analytics', label: 'Predictive analytics for hiring decisions' },
            { value: 'background_check', label: 'Automated background check systems' },
            { value: 'other', label: 'Other automated hiring tools' }
          ]
        },
        {
          id: 'decisionMaking',
          type: 'radio',
          title: 'Do these tools substantially assist or replace human decision-making in hiring or promotion?',
          description: 'An AEDT "substantially assists" if it provides recommendations that are routinely relied upon, or "replaces" if it makes decisions automatically.',
          required: true,
          options: [
            { value: 'substantially_assists', label: 'Yes, we routinely rely on the tool\'s recommendations' },
            { value: 'replaces', label: 'Yes, the tool makes decisions automatically' },
            { value: 'minimal_use', label: 'We use it but don\'t rely heavily on its output' },
            { value: 'data_only', label: 'We only use it for data storage/organization' }
          ]
        }
      ]
    },
    1: { // Scope
      title: "Usage Scope",
      subtitle: "Help us understand how and where you use employment decision tools",
      questions: [
        {
          id: 'location',
          type: 'radio',
          title: 'Where do you use these automated employment tools?',
          description: 'NYC Local Law 144 applies to positions that can or will be performed in NYC.',
          required: true,
          options: [
            { value: 'nyc_only', label: 'Only for positions in New York City' },
            { value: 'nyc_included', label: 'For positions including NYC (and other locations)' },
            { value: 'remote_nyc', label: 'For remote positions that could be performed from NYC' },
            { value: 'no_nyc', label: 'Not for any NYC-based positions' }
          ]
        },
        {
          id: 'hiringType',
          type: 'checkbox',
          title: 'What types of employment decisions do you use automated tools for?',
          required: true,
          options: [
            { value: 'initial_screening', label: 'Initial resume/application screening' },
            { value: 'candidate_ranking', label: 'Candidate ranking and shortlisting' },
            { value: 'interview_selection', label: 'Interview invitation decisions' },
            { value: 'final_hiring', label: 'Final hiring decisions' },
            { value: 'promotion', label: 'Internal promotion decisions' },
            { value: 'performance', label: 'Performance evaluation for advancement' }
          ]
        },
        {
          id: 'candidateVolume',
          type: 'radio',
          title: 'Approximately how many candidates do you process monthly through these tools?',
          description: 'This helps determine the scale of your compliance obligations.',
          required: true,
          options: [
            { value: 'low', label: 'Less than 50 candidates per month' },
            { value: 'medium', label: '50-200 candidates per month' },
            { value: 'high', label: '200-1000 candidates per month' },
            { value: 'very_high', label: 'More than 1000 candidates per month' }
          ]
        }
      ]
    },
    2: { // Audit
      title: "Bias Audit Planning",
      subtitle: "Plan your required bias audit to ensure compliance with NYC Local Law 144",
      questions: [
        {
          id: 'auditStatus',
          type: 'radio',
          title: 'What is the current status of your bias audit?',
          description: 'A bias audit must be completed within one year before using an AEDT and updated annually.',
          required: true,
          options: [
            { value: 'completed', label: 'Completed within the last 12 months' },
            { value: 'in_progress', label: 'Currently in progress' },
            { value: 'needed', label: 'Not started - we need to begin the audit process' },
            { value: 'unsure', label: 'Unsure what a bias audit involves' }
          ]
        },
        {
          id: 'auditorSelection',
          type: 'radio',
          title: 'Who will conduct or has conducted your bias audit?',
          description: 'The audit must be conducted by an independent third party with relevant expertise.',
          required: answers.auditStatus === 'needed',
          options: [
            { value: 'external_firm', label: 'External consulting firm specializing in AI bias audits' },
            { value: 'academic', label: 'Academic institution or researcher' },
            { value: 'vendor', label: 'The tool vendor will provide audit services' },
            { value: 'need_help', label: 'We need help selecting an appropriate auditor' }
          ]
        },
        {
          id: 'auditScope',
          type: 'checkbox',
          title: 'Which aspects will your bias audit cover? (Select all that apply)',
          description: 'The audit must test for bias based on race, ethnicity, and sex, with additional categories recommended.',
          options: [
            { value: 'race', label: 'Race/ethnicity (required by law)' },
            { value: 'sex', label: 'Sex/gender (required by law)' },
            { value: 'age', label: 'Age' },
            { value: 'disability', label: 'Disability status' },
            { value: 'other_protected', label: 'Other protected characteristics' }
          ]
        },
        {
          id: 'auditBudget',
          type: 'radio',
          title: 'What is your estimated budget range for the bias audit?',
          description: 'Costs vary based on tool complexity and auditor selection.',
          options: [
            { value: 'under_10k', label: 'Under $10,000' },
            { value: '10k_25k', label: '$10,000 - $25,000' },
            { value: '25k_50k', label: '$25,000 - $50,000' },
            { value: 'over_50k', label: 'Over $50,000' },
            { value: 'unknown', label: 'Need cost estimates' }
          ]
        }
      ]
    },
    3: { // Notification
      title: "Candidate Notification",
      subtitle: "Set up proper notification system for candidates about AEDT usage",
      questions: [
        {
          id: 'notificationMethod',
          type: 'radio',
          title: 'How will you notify candidates about AEDT usage?',
          description: 'Candidates must be notified at least 10 business days before the AEDT is used.',
          required: true,
          options: [
            { value: 'job_posting', label: 'Include in job postings' },
            { value: 'application_form', label: 'Notification during application process' },
            { value: 'separate_email', label: 'Separate email notification' },
            { value: 'website_notice', label: 'General notice on career website' }
          ]
        },
        {
          id: 'notificationTiming',
          type: 'radio',
          title: 'When will you provide AEDT notifications?',
          description: 'The law requires at least 10 business days advance notice.',
          required: true,
          options: [
            { value: 'job_posting', label: 'In the initial job posting' },
            { value: 'application_start', label: 'At the start of the application process' },
            { value: 'before_screening', label: '10+ business days before screening begins' },
            { value: 'need_system', label: 'Need to develop a notification system' }
          ]
        },
        {
          id: 'notificationContent',
          type: 'checkbox',
          title: 'What information will you include in your AEDT notifications?',
          description: 'Required elements that must be included in candidate notifications.',
          options: [
            { value: 'aedt_use', label: 'That an AEDT will be used' },
            { value: 'job_qualifications', label: 'Job qualifications/characteristics the AEDT will assess' },
            { value: 'data_source', label: 'Data source and inputs the AEDT will use' },
            { value: 'request_accommodation', label: 'How to request reasonable accommodation or alternative process' },
            { value: 'audit_results', label: 'How to access bias audit results' }
          ]
        },
        {
          id: 'accommodationProcess',
          type: 'textarea',
          title: 'Describe your process for handling accommodation requests',
          description: 'How will candidates request alternatives to the AEDT process?'
        }
      ]
    },
    4: { // Publication
      title: "Publication Requirements",
      subtitle: "Meet the public disclosure requirements for bias audit results",
      questions: [
        {
          id: 'publicationPlan',
          type: 'radio',
          title: 'Where will you publish your bias audit results?',
          description: 'Audit results must be publicly available on your website.',
          required: true,
          options: [
            { value: 'main_website', label: 'Main company website' },
            { value: 'careers_page', label: 'Careers/jobs section of website' },
            { value: 'compliance_page', label: 'Dedicated compliance page' },
            { value: 'need_setup', label: 'Need to set up publication location' }
          ]
        },
        {
          id: 'websiteLocation',
          type: 'text',
          title: 'What will be the URL for your bias audit results?',
          description: 'Provide the planned URL where audit results will be published.',
          required: true
        },
        {
          id: 'publicationFormat',
          type: 'radio',
          title: 'In what format will you publish the audit results?',
          description: 'Results must include specific statistical information about the audit.',
          options: [
            { value: 'pdf_report', label: 'PDF report with full audit details' },
            { value: 'web_page', label: 'Dedicated web page with audit summary' },
            { value: 'both', label: 'Both PDF report and web page summary' },
            { value: 'need_guidance', label: 'Need guidance on required format' }
          ]
        },
        {
          id: 'updateSchedule',
          type: 'radio',
          title: 'How will you manage annual audit result updates?',
          description: 'Audit results must be updated annually.',
          options: [
            { value: 'calendar_reminder', label: 'Calendar reminders for annual updates' },
            { value: 'vendor_managed', label: 'Audit vendor will manage updates' },
            { value: 'compliance_team', label: 'Dedicated compliance team will handle' },
            { value: 'need_system', label: 'Need to establish update process' }
          ]
        }
      ]
    },
    5: { // Timeline
      title: "Compliance Timeline",
      subtitle: "Manage your ongoing compliance obligations and deadlines",
      questions: [
        {
          id: 'complianceDate',
          type: 'date',
          title: 'When do you plan to achieve full NYC Local Law 144 compliance?',
          description: 'Set a target date for completing all compliance requirements.',
          required: true
        },
        {
          id: 'auditSchedule',
          type: 'radio',
          title: 'How will you schedule your annual bias audits?',
          description: 'Audits must be completed annually to maintain compliance.',
          required: true,
          options: [
            { value: 'calendar_year', label: 'Calendar year basis (January annually)' },
            { value: 'fiscal_year', label: 'Fiscal year basis' },
            { value: 'rolling', label: 'Rolling 12-month schedule from first audit' },
            { value: 'vendor_scheduled', label: 'Vendor will manage scheduling' }
          ]
        },
        {
          id: 'complianceOwner',
          type: 'radio',
          title: 'Who will be responsible for ongoing compliance management?',
          description: 'Assign ownership for monitoring and maintaining compliance.',
          options: [
            { value: 'hr_team', label: 'HR/Talent Acquisition team' },
            { value: 'legal_team', label: 'Legal/Compliance team' },
            { value: 'it_team', label: 'IT/Technology team' },
            { value: 'external_consultant', label: 'External compliance consultant' },
            { value: 'need_assignment', label: 'Need to assign responsibility' }
          ]
        },
        {
          id: 'monitoringPlan',
          type: 'checkbox',
          title: 'What ongoing monitoring activities will you implement?',
          description: 'Select activities to maintain compliance over time.',
          options: [
            { value: 'quarterly_review', label: 'Quarterly compliance reviews' },
            { value: 'tool_changes', label: 'Monitor for changes to AEDT tools' },
            { value: 'legal_updates', label: 'Track legal/regulatory updates' },
            { value: 'audit_quality', label: 'Review audit quality and methodology' },
            { value: 'candidate_feedback', label: 'Monitor candidate feedback and complaints' }
          ]
        }
      ]
    },
    6: { // Results
      title: "Compliance Summary",
      subtitle: "Review your compliance status and download your action plan",
      questions: []
    }
  };

  const getComplianceStatus = () => {
    const requiredAnswers = ['usesAutomatedTools', 'location', 'auditStatus', 'notificationMethod'];
    const hasRequiredAnswers = requiredAnswers.every(key => answers[key]);
    
    if (!hasRequiredAnswers) return 'incomplete';
    
    if (answers.location === 'no_nyc') return 'not_applicable';
    if (answers.usesAutomatedTools === 'no') return 'not_applicable';
    
    const needsCompliance = answers.usesAutomatedTools === 'yes' && 
                           ['nyc_only', 'nyc_included', 'remote_nyc'].includes(answers.location);
    
    if (!needsCompliance) return 'not_applicable';
    
    const hasAudit = answers.auditStatus === 'completed';
    const hasNotification = answers.notificationMethod && answers.notificationTiming;
    const hasPublication = answers.publicationPlan && answers.websiteLocation;
    
    if (hasAudit && hasNotification && hasPublication) return 'compliant';
    if (answers.auditStatus === 'in_progress') return 'in_progress';
    return 'needs_action';
  };

  const generateActionPlan = () => {
    const status = getComplianceStatus();
    const actions = [];
    
    if (status === 'needs_action' || status === 'in_progress') {
      if (answers.auditStatus === 'needed') {
        actions.push({
          priority: 'High',
          task: 'Commission Bias Audit',
          deadline: '90 days',
          description: 'Engage qualified third-party auditor to conduct bias audit of your AEDT tools'
        });
      }
      
      if (!answers.notificationMethod || !answers.notificationTiming) {
        actions.push({
          priority: 'High',
          task: 'Implement Candidate Notification System',
          deadline: '30 days',
          description: 'Develop and implement system to notify candidates 10+ business days before AEDT use'
        });
      }
      
      if (!answers.publicationPlan || !answers.websiteLocation) {
        actions.push({
          priority: 'Medium',
          task: 'Set Up Public Disclosure',
          deadline: '60 days',
          description: 'Create webpage to publish bias audit results and make publicly accessible'
        });
      }
      
      actions.push({
        priority: 'Medium',
        task: 'Establish Compliance Monitoring',
        deadline: '45 days',
        description: 'Set up annual audit schedule and compliance review process'
      });
    }
    
    return actions;
  };

  const currentStepData = stepContent[currentStep];
  const canProceed = isStepComplete(currentStep);
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NYC Local Law 144 Compliance Tool</h1>
        <p className="text-gray-600">Interactive workflow to ensure your Automated Employment Decision Tools comply with NYC regulations</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = isStepComplete(index);
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isActive ? 'bg-blue-600 text-white' :
                  isCompleted ? 'bg-green-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-xs text-center max-w-20 ${
                  isActive ? 'text-blue-600 font-medium' :
                  isCompleted ? 'text-green-600' :
                  'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600">{currentStepData.subtitle}</p>
        </div>

        {currentStep === 6 ? (
          // Results/Summary Step
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Compliance Status</h3>
              <div className="flex items-center space-x-2">
                {getComplianceStatus() === 'compliant' && (
                  <>
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-700 font-medium">Compliant with NYC Local Law 144</span>
                  </>
                )}
                {getComplianceStatus() === 'needs_action' && (
                  <>
                    <AlertCircle className="text-orange-600" size={20} />
                    <span className="text-orange-700 font-medium">Action Required for Compliance</span>
                  </>
                )}
                {getComplianceStatus() === 'in_progress' && (
                  <>
                    <AlertCircle className="text-blue-600" size={20} />
                    <span className="text-blue-700 font-medium">Compliance in Progress</span>
                  </>
                )}
                {getComplianceStatus() === 'not_applicable' && (
                  <>
                    <CheckCircle className="text-gray-600" size={20} />
                    <span className="text-gray-700 font-medium">NYC Local Law 144 Not Applicable</span>
                  </>
                )}
              </div>
            </div>

            {generateActionPlan().length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Action Plan</h3>
                <div className="space-y-3">
                  {generateActionPlan().map((action, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{action.task}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          action.priority === 'High' ? 'bg-red-100 text-red-800' :
                          action.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {action.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                      <p className="text-xs text-gray-500">Target Deadline: {action.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Key Resources</h3>
              <div className="space-y-2 text-sm">
                <a href="https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page" 
                   className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={14} className="mr-2" />
                  Official NYC AEDT Guidance
                </a>
                <a href="https://rules.cityofnewyork.us/rule/automated-employment-decision-tools-updated/" 
                   className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={14} className="mr-2" />
                  NYC AEDT Rules and Regulations
                </a>
                <a href="https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf" 
                   className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={14} className="mr-2" />
                  NYC AEDT FAQ Document
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Regular question steps
          <div className="space-y-4">
            {currentStepData.questions.map(question => renderQuestion(question))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!canProceed || isLastStep}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            !canProceed || isLastStep
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>{isLastStep ? 'Complete' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default NYC144ComplianceTool;