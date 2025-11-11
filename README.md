# 🚀 CI/CD Monitoring Dashboard  
A **real-time Jenkins CI/CD monitoring dashboard** that visualizes build results, pipeline health, and deployment status
  — built using **HTML, CSS, JavaScript, and Chart.js**. 
  This project was developed to understand how automation, integration, and monitoring work together in real-world CI/CD systems. 
---  The dashboard connects to a Jenkins server via its REST API and displays:
  - Current build status (`SUCCESS`, `FAILURE`, or `RUNNING`)
  - Live updates every 10 seconds
  - Simple bar chart visualization for build results
  - Timestamp and build info cards  All data is fetched dynamically and updated in real time — no page refresh needed.
---  ## 🧩 Tech Stack  
  - **Frontend:** HTML5, CSS3, Vanilla JavaScript
  - **Visualization:** [Chart.js](https://www.chartjs.org/)
  - **Backend Integration:** Jenkins REST API
  - **Automation Tools Used:** Jenkins, Docker (optional for deployment)
---  ## ⚙️ How It Works
  1. Jenkins pipeline runs and generates a `build_info.json` file (contains build number, status, timestamp).
  2. The dashboard fetches Jenkins data from:
