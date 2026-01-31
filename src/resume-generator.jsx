import React, { useState } from 'react';
import { FileText, Download, Upload, Sparkles, CheckCircle, AlertCircle, Loader2, Target, Briefcase, Award, TrendingUp } from 'lucide-react';

export default function AIResumeGenerator() {
  const [activeTab, setActiveTab] = useState('generate');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    jobDescription: ''
  });
  const [uploadedResume, setUploadedResume] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [analysisScore, setAnalysisScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];
      setUploadedResume({ name: file.name, data: base64Data, type: file.type });
      
      if (activeTab === 'analyze') {
        await analyzeResume(base64Data, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeResume = async (base64Data, fileType) => {
    setLoading(true);
    setError(null);
    
    try {
      const mediaType = fileType === 'application/pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "base64", media_type: mediaType, data: base64Data }
              },
              {
                type: "text",
                text: `Analyze this resume and provide a detailed ATS (Applicant Tracking System) score and feedback. 

Return ONLY a JSON object (no markdown, no preamble) with this exact structure:
{
  "overallScore": <number 0-100>,
  "atsCompatibility": <number 0-100>,
  "contentQuality": <number 0-100>,
  "formatting": <number 0-100>,
  "keywordOptimization": <number 0-100>,
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "missingKeywords": ["keyword1", "keyword2"],
  "summary": "Brief 2-3 sentence summary of the analysis"
}`
              }
            ]
          }]
        })
      });

      const data = await response.json();
      const analysisText = data.content.find(c => c.type === 'text')?.text || '';
      const cleanedText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      const analysis = JSON.parse(cleanedText);
      setAnalysisScore(analysis);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateResume = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const prompt = `You are an expert resume writer and ATS optimization specialist. Create a professional, ATS-optimized resume that fits on ONE PAGE.

User Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Location: ${formData.location}
- Professional Summary: ${formData.summary}
- Work Experience: ${formData.experience}
- Education: ${formData.education}
- Skills: ${formData.skills}

${formData.jobDescription ? `Target Job Description:\n${formData.jobDescription}\n\nIMPORTANT: Optimize the resume specifically for this job description by:
1. Incorporating relevant keywords naturally
2. Highlighting matching experience and skills
3. Tailoring the professional summary to align with the role
4. Prioritizing relevant achievements` : 'Create a general professional resume'}

Requirements:
1. Must fit on ONE PAGE only
2. Use a clean, ATS-friendly format (no tables, columns, or graphics)
3. Include ALL relevant keywords from the job description (if provided)
4. Use strong action verbs and quantifiable achievements
5. Professional formatting with clear sections
6. Optimize for ATS parsing while maintaining readability

Return ONLY a JSON object (no markdown, no preamble) with this structure:
{
  "resumeText": "Complete resume in clean text format with proper sections and formatting",
  "atsKeywords": ["keyword1", "keyword2", ...],
  "optimizationNotes": "Brief notes on how this resume is optimized"
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const resumeText = data.content.find(c => c.type === 'text')?.text || '';
      console.log('Resume Text:', resumeText);
      
      // Try to extract JSON from the response
      let cleanedText = resumeText.trim();
      
      // Remove markdown code blocks if present
      cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      console.log('Cleaned Text:', cleanedText);
      
      const resume = JSON.parse(cleanedText);
      setGeneratedResume(resume);
    } catch (err) {
      console.error('Full error:', err);
      setError(`Failed to generate resume: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (format) => {
    if (!generatedResume) return;
    
    setLoading(true);
    try {
      if (format === 'txt') {
        const blob = new Blob([generatedResume.resumeText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.txt`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // For PDF/DOCX, show instructions
        alert(`To download as ${format.toUpperCase()}:\n\n1. Copy the resume text below\n2. Paste into a document editor\n3. Save as ${format.toUpperCase()}\n\nNote: Direct ${format.toUpperCase()} export requires backend processing.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <Sparkles size={40} />
            <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '700' }}>AI Resume Generator</h1>
          </div>
          <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>
            Create ATS-optimized resumes powered by Claude AI
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #f0f0f0',
          background: '#fafafa'
        }}>
          {[
            { id: 'generate', label: 'Generate Resume', icon: FileText },
            { id: 'analyze', label: 'Analyze Resume', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '20px',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                color: activeTab === tab.id ? '#667eea' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '40px' }}>
          {activeTab === 'generate' && (
            <div>
              <h2 style={{ marginTop: 0, color: '#333', fontSize: '24px', marginBottom: '24px' }}>
                Create Your Professional Resume
              </h2>

              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Personal Information */}
                <div style={{
                  background: '#f8f9ff',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid #e8eaff'
                }}>
                  <h3 style={{ margin: '0 0 16px 0', color: '#667eea', fontSize: '18px' }}>
                    Personal Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      style={{
                        padding: '12px 16px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>

                {/* Job Description (Optional) */}
                <div style={{
                  background: '#fff8f0',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid #ffe8cc'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#ff8c42', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={20} />
                    Target Job Description (Optional)
                  </h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
                    Paste the job description to optimize your resume with relevant keywords
                  </p>
                  <textarea
                    placeholder="Paste the job description here to tailor your resume..."
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      minHeight: '100px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff8c42'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                {/* Resume Content */}
                <textarea
                  placeholder="Professional Summary *"
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />

                <textarea
                  placeholder="Work Experience * (Include company, role, dates, and achievements)"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    minHeight: '120px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />

                <textarea
                  placeholder="Education * (Degree, Institution, Year)"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />

                <textarea
                  placeholder="Skills * (Separate with commas)"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />

                <button
                  onClick={generateResume}
                  disabled={loading || !formData.fullName || !formData.email}
                  style={{
                    padding: '16px 32px',
                    background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'transform 0.2s',
                    transform: loading ? 'scale(1)' : 'scale(1)',
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  {loading ? 'Generating...' : 'Generate ATS-Optimized Resume'}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  background: '#fee',
                  border: '2px solid #fcc',
                  borderRadius: '8px',
                  color: '#c33',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              {/* Generated Resume */}
              {generatedResume && (
                <div style={{
                  marginTop: '32px',
                  background: '#f8f9ff',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid #e8eaff'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h3 style={{ margin: 0, color: '#667eea', fontSize: '20px' }}>
                      Your ATS-Optimized Resume
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => downloadResume('txt')}
                        style={{
                          padding: '8px 16px',
                          background: 'white',
                          border: '2px solid #667eea',
                          borderRadius: '8px',
                          color: '#667eea',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Download size={16} />
                        Download TXT
                      </button>
                      <button
                        onClick={() => downloadResume('pdf')}
                        style={{
                          padding: '8px 16px',
                          background: '#667eea',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Download size={16} />
                        Export PDF
                      </button>
                    </div>
                  </div>

                  <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    maxHeight: '500px',
                    overflowY: 'auto'
                  }}>
                    {generatedResume.resumeText}
                  </div>

                  {generatedResume.atsKeywords && (
                    <div style={{ marginTop: '16px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#333' }}>
                        ATS Keywords Included:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {generatedResume.atsKeywords.map((keyword, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '6px 12px',
                              background: '#667eea',
                              color: 'white',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {generatedResume.optimizationNotes && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: '#e8f5e9',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#2e7d32'
                    }}>
                      <strong>Optimization Notes:</strong> {generatedResume.optimizationNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analyze' && (
            <div>
              <h2 style={{ marginTop: 0, color: '#333', fontSize: '24px', marginBottom: '24px' }}>
                Analyze Your Resume
              </h2>

              <div style={{
                border: '2px dashed #667eea',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                background: '#f8f9ff',
                marginBottom: '24px'
              }}>
                <Upload size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '18px' }}>
                  Upload Your Resume
                </h3>
                <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
                  Upload PDF or DOCX file for ATS analysis
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600'
                  }}
                >
                  Choose File
                </label>
                {uploadedResume && (
                  <p style={{ marginTop: '12px', color: '#667eea', fontSize: '14px' }}>
                    ✓ {uploadedResume.name}
                  </p>
                )}
              </div>

              {loading && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#667eea'
                }}>
                  <Loader2 className="animate-spin" size={48} style={{ margin: '0 auto 16px' }} />
                  <p style={{ margin: 0, fontSize: '16px' }}>Analyzing your resume...</p>
                </div>
              )}

              {error && (
                <div style={{
                  padding: '16px',
                  background: '#fee',
                  border: '2px solid #fcc',
                  borderRadius: '8px',
                  color: '#c33',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              {analysisScore && (
                <div>
                  {/* Overall Score */}
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '32px',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Overall ATS Score</h3>
                    <div style={{
                      fontSize: '72px',
                      fontWeight: '700',
                      textAlign: 'center',
                      margin: '16px 0'
                    }}>
                      {analysisScore.overallScore}
                      <span style={{ fontSize: '36px', opacity: 0.8 }}>/100</span>
                    </div>
                    <p style={{ margin: 0, textAlign: 'center', fontSize: '16px', opacity: 0.9 }}>
                      {analysisScore.summary}
                    </p>
                  </div>

                  {/* Detailed Scores */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    {[
                      { label: 'ATS Compatibility', score: analysisScore.atsCompatibility, icon: CheckCircle },
                      { label: 'Content Quality', score: analysisScore.contentQuality, icon: Award },
                      { label: 'Formatting', score: analysisScore.formatting, icon: FileText },
                      { label: 'Keyword Optimization', score: analysisScore.keywordOptimization, icon: TrendingUp }
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: '#f8f9ff',
                          padding: '20px',
                          borderRadius: '12px',
                          border: '2px solid #e8eaff'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '12px'
                        }}>
                          <item.icon size={20} style={{ color: '#667eea' }} />
                          <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>
                            {item.label}
                          </span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#667eea' }}>
                          {item.score}
                          <span style={{ fontSize: '18px', opacity: 0.6 }}>/100</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strengths */}
                  <div style={{
                    background: '#e8f5e9',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      color: '#2e7d32',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircle size={20} />
                      Strengths
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#1b5e20' }}>
                      {analysisScore.strengths.map((strength, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div style={{
                    background: '#fff3e0',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0 0 12px 0',
                      color: '#e65100',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <AlertCircle size={20} />
                      Areas for Improvement
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#bf360c' }}>
                      {analysisScore.improvements.map((improvement, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{improvement}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Keywords */}
                  {analysisScore.missingKeywords && analysisScore.missingKeywords.length > 0 && (
                    <div style={{
                      background: '#f3e5f5',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <h4 style={{
                        margin: '0 0 12px 0',
                        color: '#6a1b9a',
                        fontSize: '16px'
                      }}>
                        Consider Adding These Keywords
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {analysisScore.missingKeywords.map((keyword, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '6px 12px',
                              background: '#9c27b0',
                              color: 'white',
                              borderRadius: '20px',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
