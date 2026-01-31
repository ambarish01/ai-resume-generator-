# 📤 GitHub Upload Guide

Follow these simple steps to upload your AI Resume Generator to GitHub.

## Prerequisites

1. **Git installed** - Download from [git-scm.com](https://git-scm.com/)
2. **GitHub account** - Sign up at [github.com](https://github.com/)

## Step-by-Step Instructions

### 1️⃣ Create a New Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `ai-resume-generator`
   - **Description**: `AI-powered resume generator with ATS optimization using Claude AI`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### 2️⃣ Prepare Your Local Project

Open your terminal/command prompt and navigate to your project folder:

```bash
cd path/to/ai-resume-generator
```

### 3️⃣ Initialize Git Repository

```bash
# Initialize git in your project
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: AI Resume Generator with ATS optimization"
```

### 4️⃣ Connect to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/ai-resume-generator.git

# Verify remote was added
git remote -v
```

### 5️⃣ Push to GitHub

```bash
# Push your code to GitHub
git push -u origin main
```

If you get an error about `main` vs `master`, use:
```bash
git branch -M main
git push -u origin main
```

### 6️⃣ Verify Upload

1. Go to your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed automatically

## 🎉 Success!

Your AI Resume Generator is now on GitHub! 

## Next Steps

### Update Repository Information

Before sharing, update these files with your information:

1. **README.md**
   - Replace `yourusername` with your GitHub username
   - Replace `your.email@example.com` with your email
   - Add your LinkedIn profile link

2. **package.json**
   - Update `author` field with your name
   - Update repository URLs

3. **LICENSE**
   - Replace `[Your Name]` with your actual name

4. **public/index.html**
   - Update meta author tag

### Making Changes Later

When you make changes to your project:

```bash
# Check status of changes
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

### Common Git Commands

```bash
# Check current status
git status

# See commit history
git log

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# Pull latest changes
git pull

# View all branches
git branch -a
```

## 🚨 Troubleshooting

### Authentication Issues

If you're asked for username/password but it doesn't work:

1. Generate a Personal Access Token (PAT):
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select scopes: `repo` (all)
   - Copy the token

2. Use the token as your password when prompted

### Or use SSH instead:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add SSH key to GitHub
# Copy the public key and add it in GitHub Settings → SSH Keys
```

Then change your remote URL:
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/ai-resume-generator.git
```

## 📝 Best Practices

1. **Commit Often**: Make small, frequent commits with clear messages
2. **Write Descriptive Commit Messages**: Explain what and why
3. **Use Branches**: Create branches for new features
4. **Pull Before Push**: Always pull latest changes before pushing
5. **Review Changes**: Use `git diff` to review changes before committing

## 🔗 Useful Links

- [GitHub Documentation](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Need Help?**

If you encounter any issues, feel free to:
- Open an issue on GitHub
- Check GitHub's documentation
- Search on Stack Overflow

Good luck with your project! 🚀
