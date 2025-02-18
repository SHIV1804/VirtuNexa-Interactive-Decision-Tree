// Decision tree structure
const nodes = {
    start: {
      question: "Do you need help with troubleshooting your device? 🤔",
      answers: [
        { text: "Yes", next: "deviceIssue" },
        { text: "No", next: "learnMore" }
      ]
    },
    deviceIssue: {
      question: "Is your device turning on? ⚡",
      answers: [
        { text: "Yes", next: "softwareIssue" },
        { text: "No", next: "powerIssue" }
      ]
    },
    powerIssue: {
      question: "🔌 Check the power connection. If still not working, contact support.",
      answers: []
    },
    softwareIssue: {
      question: "Is your software up-to-date? 🔄",
      answers: [
        { text: "Yes", next: "otherIssue" },
        { text: "No", next: "updateSoftware" }
      ]
    },
    updateSoftware: {
      question: "💾 Please update your software and try again.",
      answers: []
    },
    otherIssue: {
      question: "🔧 For further assistance, check our help center.",
      answers: []
    },
    learnMore: {
      question: "Would you like to learn more about our services? 🌍",
      answers: [
        { text: "Yes", next: "services" },
        { text: "No", next: "end" }
      ]
    },
    services: {
      question: "🚀 We offer various services. Visit our website for details.",
      answers: []
    },
    end: {
      question: "✅ Thank you for using our tool!",
      answers: []
    }
  };
  
  // DOM references
  const treeContainer = document.getElementById("decision-tree");
  const restartBtn = document.getElementById("restart-btn");
  const progressBar = document.getElementById("progress");
  
  let stepCount = 0;
  const totalSteps = 5;
  
  // Function to render decision tree content
  function renderNode(nodeId) {
    const node = nodes[nodeId];
    if (!node) {
      treeContainer.innerHTML = `<p class="text-red-400">Error: Node not found.</p>`;
      return;
    }
  
    // Fade-in animation for smooth transition
    treeContainer.classList.remove("fade-in");
    void treeContainer.offsetWidth;
    treeContainer.classList.add("fade-in");
  
    // Update progress bar
    stepCount++;
    progressBar.style.width = `${(stepCount / totalSteps) * 100}%`;
  
    // Render question
    let html = `<div class="text-xl font-semibold">${node.question}</div>`;
  
    // Render answer buttons
    if (node.answers.length > 0) {
      html += `<div class="mt-4">`;
      node.answers.forEach((answer) => {
        html += `
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md m-2 transition-all" 
            data-next="${answer.next}">
            ${answer.text}
          </button>
        `;
      });
      html += `</div>`;
    } else {
      html += `<div class="mt-3 text-gray-300">This is the end of this path. Click "Restart" to begin again.</div>`;
    }
  
    treeContainer.innerHTML = html;
  
    // Add event listeners to buttons
    document.querySelectorAll("#decision-tree button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const nextNodeId = e.target.getAttribute("data-next");
        renderNode(nextNodeId);
      });
    });
  }
  
  // Restart functionality
  restartBtn.addEventListener("click", () => {
    stepCount = 0;
    progressBar.style.width = "0%";
    renderNode("start");
  });
  
  // Initialize the app
  renderNode("start");
  