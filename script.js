const JENKINS_URL = "jenkins host";  // NOT localhost
const JOB_NAME = "Monitoring_Dashboard_part.co";
const USERNAME = "your username";
const API_TOKEN = "api_token";  // from your Jenkins user settings


async function fetchBuildData() {
  const url = `${JENKINS_URL}/job/${JOB_NAME}/lastBuild/api/json`;
  const statusBox = document.getElementById("buildStatus");
  const info = document.getElementById("buildInfo");

  try {
    const res = await fetch(url, {
      headers: { "Authorization": "Basic " + btoa(`${USERNAME}:${API_TOKEN}`) }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const buildNum = data.number;
    const result = data.result || "RUNNING";
    const timestamp = new Date(data.timestamp).toLocaleString();

    updateStatus(result);
    updateChart(buildNum, result);
    info.innerHTML = `
      <p><b>Build #${buildNum}</b></p>
      <p>Status: <span class="${result === "SUCCESS" ? "success" : "failure"}">${result}</span></p>
      <p>Last Updated: ${timestamp}</p>
    `;
  } catch (err) {
    console.error(err);
    statusBox.className = "status-box failure";
    statusBox.innerHTML = `<span class="dot"></span><p>Failed to connect to Jenkins</p>`;
  }
}

function updateStatus(result) {
  const box = document.getElementById("buildStatus");
  box.className = `status-box ${result.toLowerCase()}`;
  box.innerHTML = `<span class="dot"></span><p>Build Status: <b>${result}</b></p>`;
}

function updateChart(buildNum, result) {
  const color = result === "SUCCESS" ? "#22c55e" :
                result === "FAILURE" ? "#ef4444" : "#facc15";

  const ctx = document.getElementById("buildChart").getContext("2d");
  if (window.buildChart) window.buildChart.destroy();

  window.buildChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [`Build #${buildNum}`],
      datasets: [{
        label: "Build Status",
        data: [1],
        backgroundColor: [color],
        borderRadius: 8
      }]
    },
    options: {
      scales: { y: { display: false } },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

// Run every 10s
fetchBuildData();
setInterval(fetchBuildData, 10000);
