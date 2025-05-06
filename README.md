# GenAI Training Website

## Overview

This repository contains a comprehensive 3-day training website for developers to learn about Generative AI, from foundational concepts to practical applications. The training covers:

1. **GenAI Evolution & LLM Basics**
2. **LLM Frameworks, Tools & MCP Integration**
3. **Practical Applications (RAG, Chatbots, Streamlit UIs)**

The website is designed to be hosted on GitHub Pages and includes interactive examples, code samples, and Jupyter notebooks.

## Website Structure

```
website/
├── index.html            # Landing page
├── css/                 # Styling
│   └── styles.css
├── js/                  # JavaScript
│   └── main.js
├── day1/                # Day 1 content
│   ├── genai-evolution.html
│   └── llm-basics.html
├── day2/                # Day 2 content
│   ├── frameworks.html
│   ├── tools-mcp.html
│   └── agents-vs-tools.html
├── day3/                # Day 3 content
│   ├── rag.html
│   ├── chatbots.html
│   └── streamlit.html
├── notebooks/           # Jupyter notebooks
│   ├── index.html
│   ├── rag-system-implementation.ipynb
│   └── [...other notebooks...]
└── resources/           # Additional resources
    ├── glossary.html
    └── slides/          # Presentation slides
```

## Deployment Instructions

### Option 1: GitHub Pages

1. **Create a new GitHub repository**
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/genai-training.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select "main" branch as the source
   - Click "Save"

3. **Access your website**
   - Your site will be available at `https://YOUR_USERNAME.github.io/genai-training/`
   - It may take a few minutes for the site to build and deploy

### Option 2: Local Development

1. **Clone the repository**
   ```
   git clone https://github.com/YOUR_USERNAME/genai-training.git
   cd genai-training
   ```

2. **Run a local server**
   
   Using Python:
   ```
   python -m http.server 8000
   ```
   
   Or using Node.js:
   ```
   npm install -g http-server
   http-server -p 8000
   ```

3. **Access the website**
   - Open your browser and go to `http://localhost:8000`

## Customization Guide

### Adding New Content

1. **Create new HTML pages** following the templates in existing pages

2. **Add new notebooks** in the `notebooks/` directory

3. **Update navigation** in the header section of your HTML files

### Styling Changes

- Modify `css/styles.css` to update the website appearance
- The site uses CSS variables at the top of the stylesheet for consistent theming

### JavaScript Functionality

- Core interactive features are in `js/main.js`
- Progress tracking uses local storage to remember completed sections

## Requirements for Notebooks

The Jupyter notebooks require various dependencies. To install them:

```
pip install -r requirements.txt
```

## License

This training material is provided for educational purposes.

## Contact

For questions or feedback about this training, please reach out to [your-email@example.com](mailto:your-email@example.com).