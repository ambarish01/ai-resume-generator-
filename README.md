# 🚀 AI Resume Generator

A professional AI-powered resume generator that creates ATS-optimized resumes using Claude AI. This tool helps job seekers create perfectly formatted, keyword-optimized resumes that pass through Applicant Tracking Systems (ATS).

![AI Resume Generator](https://img.shields.io/badge/AI-Powered-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet%204-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Resume Generation
- **One-Page Optimization**: Ensures your resume fits perfectly on one page
- **ATS Keyword Optimization**: Automatically incorporates relevant keywords for ATS compatibility
- **Job Description Matching**: Tailors your resume to specific job postings
- **Professional Formatting**: Clean, ATS-friendly format without complex tables or graphics
- **Smart Content Organization**: Uses action verbs and quantifiable achievements

### 📊 Resume Analysis
- **Comprehensive ATS Scoring**: Get a detailed score (0-100) for your resume
- **Multi-factor Analysis**:
  - Overall Score
  - ATS Compatibility
  - Content Quality
  - Formatting
  - Keyword Optimization
- **Actionable Insights**: Receive specific strengths and improvement suggestions
- **Missing Keywords Detection**: Identifies keywords you should add
- **Support for PDF & DOCX**: Upload existing resumes in multiple formats

### 💾 Export Options
- **Text Download**: Immediate download as .txt file
- **Copy-Ready Format**: Easy to copy/paste into Word or Google Docs
- **PDF/DOCX Compatible**: Ready for conversion to professional formats

## 🎨 Screenshots

### Generate Resume
Create professional, ATS-optimized resumes with AI assistance.

### Analyze Resume
Upload and analyze your existing resume with detailed ATS scoring.

## 🛠️ Technologies Used

- **React 18**: Modern UI framework
- **Claude AI (Sonnet 4)**: Advanced AI for resume generation and analysis
- **Lucide React**: Beautiful icon library
- **JavaScript/ES6+**: Modern JavaScript features

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn package manager
- Basic knowledge of React

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-generator.git
   cd ai-resume-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Generating a Resume

1. **Fill in Personal Information**
   - Enter your full name, email, phone, and location

2. **Add Target Job Description (Optional)**
   - Paste the job description to optimize your resume for that specific role
   - The AI will incorporate relevant keywords automatically

3. **Enter Your Information**
   - Professional Summary
   - Work Experience (company, role, dates, achievements)
   - Education (degree, institution, year)
   - Skills (comma-separated)

4. **Generate Resume**
   - Click "Generate ATS-Optimized Resume"
   - Review the generated resume
   - Download as TXT or copy to your preferred format

### Analyzing a Resume

1. **Upload Your Resume**
   - Click "Choose File" and select your PDF or DOCX resume

2. **Review Analysis**
   - Check your overall ATS score
   - Review detailed scoring metrics
   - Read strengths and improvement suggestions
   - Note missing keywords to add

## 🏗️ Project Structure

```
ai-resume-generator/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── resume-generator.jsx    # Main application component
│   ├── index.js                # Entry point
│   └── index.css              # Global styles
├── package.json
├── README.md
└── .gitignore
```

## 🔑 API Configuration

This application uses the Anthropic Claude API. The API key is handled client-side through the Anthropic SDK.

**Note**: For production use, you should:
1. Implement a backend server to handle API calls
2. Store API keys securely in environment variables
3. Add rate limiting and authentication

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Future Features Roadmap

- [ ] Direct PDF export functionality
- [ ] Direct DOCX export functionality
- [ ] Multiple resume templates
- [ ] Resume version history
- [ ] LinkedIn profile import
- [ ] Cover letter generation
- [ ] Industry-specific templates
- [ ] Multi-language support
- [ ] Resume comparison tool
- [ ] Browser extension

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for providing the Claude AI API
- **Lucide** for the beautiful icon set
- **React** team for the amazing framework

## 📞 Contact & Support

- **Issues**: Please report bugs via [GitHub Issues](https://github.com/ambarish01/ai-resume-generator-/issues)
- **Email**: ambarishsa10@gmail.com
- **LinkedIn**: [Ambarish S A](www.linkedin.com/in/ambarish-s-a-5b52ba247)

## ⭐ Star This Repository

If you find this project helpful, please give it a star! It helps others discover the tool.

---

**Built with AI**

*Empowering job seekers with AI-powered resume optimization*
