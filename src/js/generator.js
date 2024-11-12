// Real-time preview update
document.getElementById("name").addEventListener("input", () => {
    document.getElementById("previewName").textContent = document.getElementById("name").value || "Your Name";
  });
  document.getElementById("profession").addEventListener("input", () => {
    document.getElementById("previewProfession").textContent = document.getElementById("profession").value || "Your Profession";
  });
  document.getElementById("bio").addEventListener("input", () => {
    document.getElementById("previewBio").textContent = document.getElementById("bio").value || "Your bio will appear here.";
  });
  document.getElementById("skills").addEventListener("input", () => {
    const skills = document.getElementById("skills").value.split(',').map(skill => skill.trim()).filter(skill => skill);
    const previewSkills = document.getElementById("previewSkills");
    previewSkills.innerHTML = '';
    skills.forEach(skill => {
      const skillItem = document.createElement("span");
      skillItem.textContent = skill;
      skillItem.classList.add("skill-item");
      previewSkills.appendChild(skillItem);
    });
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("previewEmail").textContent = document.getElementById("email").value;
  });
  document.getElementById("phone").addEventListener("input", () => {
    document.getElementById("previewPhone").textContent = document.getElementById("phone").value;
  });

  document.getElementById("linkedin").addEventListener("input", () => {
    const linkedinValue = document.getElementById("linkedin").value;
    const previewLinkedin = document.getElementById("previewLinkedin");
    previewLinkedin.href = linkedinValue || "#";
    previewLinkedin.style.display = linkedinValue ? "inline-block" : "none";
  });
  document.getElementById("github").addEventListener("input", () => {
    const githubValue = document.getElementById("github").value;
    const previewGithub = document.getElementById("previewGithub");
    previewGithub.href = githubValue || "#";
    previewGithub.style.display = githubValue ? "inline-block" : "none";
  });
  document.getElementById("twitter").addEventListener("input", () => {
    const twitterValue = document.getElementById("twitter").value;
    const previewTwitter = document.getElementById("previewTwitter");
    previewTwitter.href = twitterValue || "#";
    previewTwitter.style.display = twitterValue ? "inline-block" : "none";
  });

  // Profile image preview
  document.getElementById("profileImage").addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("previewImage").src = reader.result;
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  });

  // Update Projects Preview
  function addProject() {
    const projectsSection = document.getElementById("projects-section");
    const newProject = document.createElement("div");
    newProject.classList.add("project");
    newProject.innerHTML = `
      <label>Title: <input type="text" class="project-title" placeholder="Project Title"></label>
      <label>Description: <textarea class="project-description" placeholder="Brief description of the project"></textarea></label>
      <label>Link: <input type="url" class="project-link" placeholder="Project URL"></label>
    `;
    projectsSection.appendChild(newProject);
    updateProjectsPreview();
  }

  function updateProjectsPreview() {
    const previewProjects = document.getElementById("previewProjects");
    previewProjects.innerHTML = ""; // Clear existing content
    const projects = document.querySelectorAll("#projects-section .project");
    projects.forEach(project => {
      const title = project.querySelector(".project-title").value;
      const description = project.querySelector(".project-description").value;
      const link = project.querySelector(".project-link").value;

      if (title || description || link) {
        const projectHTML = `<div class="project">
          <h4>${title || "Project Title"}</h4>
          <p>${description || "Project Description"}</p>
          ${link ? `<a href="${link}" target="_blank">View Project</a>` : ""}
        </div>`;
        previewProjects.innerHTML += projectHTML;
      }
    });
  }

  // Work Experience and Education/Certification
  document.getElementById("workExperience").addEventListener("input", () => {
    document.getElementById("previewExperience").textContent = document.getElementById("workExperience").value || "";
  });
  document.getElementById("education").addEventListener("input", () => {
    document.getElementById("previewEducation").textContent = document.getElementById("education").value || "";
  });

  // Download Portfolio as HTML and CSS
  function downloadPortfolio() {
    const zip = new JSZip();

    // Generate HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${document.getElementById("previewName").textContent}'s Portfolio</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <section class="preview-section">
      <img id="previewImage" src="${document.getElementById("previewImage").src}" alt="Profile Image">
      <h1 id="previewName">${document.getElementById("previewName").textContent}</h1>
      <h2 id="previewProfession">${document.getElementById("previewProfession").textContent}</h2>
      <p id="previewBio">${document.getElementById("previewBio").textContent}</p>

      <h3>Skills</h3>
      <div id="previewSkills" class="skills">
        ${document.getElementById("previewSkills").innerHTML}
      </div>

      <h3>Contact</h3>
      <div class="contact-info">
        <p>Email: ${document.getElementById("previewEmail").textContent}</p>
        <p>Phone: ${document.getElementById("previewPhone").textContent}</p>
      </div>

      <h3>Social Media</h3>
      <div class="social-media-icons">
        ${document.getElementById("previewLinkedin").href !== "#" ? `<a href="${document.getElementById("previewLinkedin").href}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ""}
        ${document.getElementById("previewGithub").href !== "#" ? `<a href="${document.getElementById("previewGithub").href}" target="_blank"><i class="fab fa-github"></i></a>` : ""}
        ${document.getElementById("previewTwitter").href !== "#" ? `<a href="${document.getElementById("previewTwitter").href}" target="_blank"><i class="fab fa-twitter"></i></a>` : ""}
      </div>

      <h3>Projects</h3>
      <div id="previewProjects" class="projects">
        ${document.getElementById("previewProjects").innerHTML}
      </div>

      <h3>Work Experience</h3>
      <div id="previewExperience" class="experience">
        ${document.getElementById("previewExperience").textContent}
      </div>

      <h3>Education and Certifications</h3>
      <div id="previewEducation" class="education">
        ${document.getElementById("previewEducation").textContent}
      </div>
    </section>
  </div>
</body>
</html>
    `;

    // Add HTML file to ZIP
    zip.file("index.html", htmlContent);

    // Get CSS content
    const cssContent = `
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Poppins', Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f9;
    color: #333;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
    padding: 20px;
    gap: 20px;
}

.input-section, .preview-section {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.input-section h1 {
    margin-bottom: 15px;
    font-weight: 600;
}
.preview-section h2, #previewName {
    background: linear-gradient(to right, #3498db, #8e44ad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    margin-bottom: 15px;
    font-weight: 600;
}

.input-section p {
    margin-bottom: 20px;
    color: #555;
}

label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

input[type="text"], input[type="email"], input[type="url"], textarea, input[type="file"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    background-color: #0073e6;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    transition: background 0.3s;
    margin-top: 10px;
}

button:hover {
    background-color: #005bb5;
}

/* Preview Section */
#preview {
    text-align: center;
}

#preview img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
}

#previewName {
    font-size: 24px;
    font-weight: bold;
}

#previewProfession {
    font-size: 18px;
    color: #0073e6;
}

.contact-info p, .social-media-icons a {
    background: linear-gradient(to right, #3498db, #8e44ad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
}

.social-media-icons a {
    font-size: 1.5em;
    margin: 0 5px;
    text-decoration: none;
    transition: color 0.3s;
    background: linear-gradient(to right, #3498db, #8e44ad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
}

.social-media-icons a:hover {
    color: #005bb5;
}

/* Skills, Projects, Work Experience, and Education Sections */
.skills, .projects, .experience, .education {
    margin: 15px 0;
    font-size: 14px;
    color: #555;
}

.skill-item {
    display: inline-block;
    background-color: #e0e0e0;
    color: #333;
    padding: 5px 10px;
    border-radius: 20px;
    margin: 5px 5px 0 0;
    font-size: 12px;
}

.project-title {
    font-weight: bold;
    font-size: 16px;
}

.project-description, .project-link {
    display: block;
    margin-top: 5px;
    color: #333;
}

.project a {
    color: #0073e6;
    text-decoration: none;
}

.project a:hover {
    text-decoration: underline;
}

/* Responsive Layout */
@media (min-width: 768px) {
    .container {
        flex-direction: row;
        gap: 20px;
    }
    .input-section, .preview-section {
        width: 48%;
    }
}
    `;

    // Add CSS file to ZIP
    zip.file("style.css", cssContent);

    // Generate ZIP and trigger download
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
          saveAs(content, "portfolio.zip");
      });
  }

  // Portfolio Image Download
  function downloadPortfolioImage() {
    html2canvas(document.getElementById("preview")).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, "portfolio.png");
      });
    });
  }

  // Update project previews on change
  document.getElementById("projects-section").addEventListener("input", updateProjectsPreview);