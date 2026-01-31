# Contributing to AI Resume Generator

First off, thank you for considering contributing to AI Resume Generator! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React style guide
* Include thoughtful comments in your code
* End all files with a newline
* Write clear, descriptive commit messages

## Development Process

1. Fork the repo
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
6. Push to the branch:
   ```bash
   git push origin feature/my-new-feature
   ```
7. Submit a pull request

## Style Guide

### JavaScript/React Style Guide

* Use functional components with hooks
* Use meaningful variable and function names
* Add comments for complex logic
* Keep components focused and single-purpose
* Use ES6+ features
* Follow React best practices

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## Project Structure

```
ai-resume-generator/
├── public/           # Public assets
├── src/             # Source files
│   ├── resume-generator.jsx  # Main component
│   ├── index.js     # Entry point
│   └── index.css    # Global styles
├── package.json     # Dependencies
└── README.md        # Documentation
```

## Testing

Before submitting a pull request, please ensure:

* The app builds without errors: `npm run build`
* The app runs correctly: `npm start`
* All existing features still work
* Your new feature works as expected

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
