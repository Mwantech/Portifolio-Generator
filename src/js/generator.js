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
    document.getElementById("previewSkills").textContent = document.getElementById("skills").value || "";
  });
  
  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("previewEmail").textContent = document.getElementById("email").value;
  });
  document.getElementById("phone").addEventListener("input", () => {
    document.getElementById("previewPhone").textContent = document.getElementById("phone").value;
  });
  
  document.getElementById("linkedin").addEventListener("input", () => {
    document.getElementById("previewLinkedin").href = document.getElementById("linkedin").value;
  });
  document.getElementById("github").addEventListener("input", () => {
    document.getElementById("previewGithub").href = document.getElementById("github").value;
  });
  document.getElementById("twitter").addEventListener("input", () => {
    document.getElementById("previewTwitter").href = document.getElementById("twitter").value;
  });
  
  // Profile image preview
  document.getElementById("profileImage").addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("previewImage").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
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
  
      const projectHTML = `<div class="project">
        <h4>${title}</h4>
        <p>${description}</p>
        <a href="${link}" target="_blank">View Project</a>
      </div>`;
      previewProjects.innerHTML += projectHTML;
    });
  }
  
  // Work Experience and Education/Certification
  document.getElementById("workExperience").addEventListener("input", () => {
    document.getElementById("previewExperience").textContent = document.getElementById("workExperience").value || "";
  });
  document.getElementById("education").addEventListener("input", () => {
    document.getElementById("previewEducation").textContent = document.getElementById("education").value || "";
  });
  