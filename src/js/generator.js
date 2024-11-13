// Style Customization Functions
function updateStyles() {
  const root = document.documentElement;
  
  // Update CSS variables
  root.style.setProperty('--primary-color', document.getElementById('primaryColor').value);
  root.style.setProperty('--secondary-color', document.getElementById('secondaryColor').value);
  root.style.setProperty('--background-color', document.getElementById('backgroundColor').value);
  root.style.setProperty('--text-color', document.getElementById('textColor').value);
  root.style.setProperty('--image-border-color', document.getElementById('imageBorderColor').value);
  root.style.setProperty('--image-border-width', document.getElementById('imageBorderWidth').value);
  root.style.setProperty('--font-primary', document.getElementById('fontSelector').value);
  
  // Convert colors to RGB for gradient calculations
  const primaryRGB = hexToRGB(document.getElementById('primaryColor').value);
  const secondaryRGB = hexToRGB(document.getElementById('secondaryColor').value);
  root.style.setProperty('--primary-color-rgb', primaryRGB);
  root.style.setProperty('--secondary-color-rgb', secondaryRGB);
}

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Function to download portfolio
function downloadPortfolio() {
  const zip = new JSZip();
  
  // Get current styles
  const styles = getComputedStyle(document.documentElement);
  const customStyles = {
    primaryColor: styles.getPropertyValue('--primary-color'),
    secondaryColor: styles.getPropertyValue('--secondary-color'),
    backgroundColor: styles.getPropertyValue('--background-color'),
    textColor: styles.getPropertyValue('--text-color'),
    imageBorderColor: styles.getPropertyValue('--image-border-color'),
    imageBorderWidth: styles.getPropertyValue('--image-border-width'),
    fontPrimary: styles.getPropertyValue('--font-primary')
  };

  // Generate HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${document.getElementById("previewName").textContent}'s Portfolio</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=${customStyles.fontPrimary.replace(/ /g, '+')}:wght@400;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary-color: ${customStyles.primaryColor};
                --secondary-color: ${customStyles.secondaryColor};
                --background-color: ${customStyles.backgroundColor};
                --text-color: ${customStyles.textColor};
                --image-border-color: ${customStyles.imageBorderColor};
                --image-border-width: ${customStyles.imageBorderWidth};
                --font-primary: ${customStyles.fontPrimary};
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: var(--font-primary), sans-serif;
                background-color: var(--background-color);
                color: var(--text-color);
                line-height: 1.6;
                display: flex;
                justify-content: center;
                min-height: 100vh;
                padding: 2rem;
            }

            .container {
                max-width: 800px;
                width: 100%;
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            #preview {
                  text-align: center;
            }
            
            #previewImage {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                object-fit: cover;
                border: var(--image-border-width) solid var(--image-border-color);
                margin: 0 auto 2rem;
                display: block;
            }

            h1, h2, h3 {
                color: var(--primary-color);
                margin: 1.5rem 0;
            }

            .skills {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 0.5rem;
                margin: 1rem 0;
            }

            .skill-item {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-size: 0.9rem;
            }

            .contact-info {
                margin: 1.5rem 0;
            }

            .social-media-icons {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                margin: 1.5rem 0;
            }

            .social-media-icons a {
                color: var(--primary-color);
                font-size: 1.8rem;
                transition: transform 0.3s ease;
            }

            .social-media-icons a:hover {
                transform: scale(1.2);
            }

            .projects {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin: 1.5rem 0;
            }

            .project {
                background: linear-gradient(135deg, 
                    rgba(var(--primary-color-rgb), 0.1), 
                    rgba(var(--secondary-color-rgb), 0.1));
                padding: 1.5rem;
                border-radius: 10px;
                text-align: center;
            }

            .project h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }

            .project a {
                color: var(--primary-color);
                text-decoration: none;
                display: inline-block;
                margin-top: 1rem;
            }

            .project a:hover {
                text-decoration: underline;
            }

            .experience, .education {
                text-align: left;
                margin: 1.5rem 0;
                white-space: pre-line;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img id="previewImage" src="${document.getElementById("previewImage").src}" alt="Profile Image">
            <h1>${document.getElementById("previewName").textContent}</h1>
            <h2>${document.getElementById("previewProfession").textContent}</h2>
            <p>${document.getElementById("previewBio").textContent}</p>

            <h3>Skills</h3>
            <div class="skills">
                ${document.getElementById("previewSkills").innerHTML}
            </div>

            <h3>Contact</h3>
            <div class="contact-info">
                <p>Email: ${document.getElementById("email").value}</p>
                <p>Phone: ${document.getElementById("phone").value}</p>
            </div>

            <h3>Social Media</h3>
            <div class="social-media-icons">
                ${document.getElementById("linkedin").value ? `<a href="${document.getElementById("linkedin").value}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                ${document.getElementById("github").value ? `<a href="${document.getElementById("github").value}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                ${document.getElementById("twitter").value ? `<a href="${document.getElementById("twitter").value}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
            </div>

            <h3>Projects</h3>
            <div class="projects">
                ${document.getElementById("previewProjects").innerHTML}
            </div>

            <h3>Work Experience</h3>
            <div class="experience">
                ${document.getElementById("workExperience").value}
            </div>

            <h3>Education and Certifications</h3>
            <div class="education">
                ${document.getElementById("education").value}
            </div>
        </div>
    </body>
    </html>
  `;

  // Add files to ZIP
  zip.file("index.html", htmlContent);

  // Generate and download ZIP
  zip.generateAsync({ type: "blob" })
    .then(function(content) {
      saveAs(content, "portfolio.zip");
    });
}

// Add event listeners for style customization
document.querySelectorAll('input[type="color"], select').forEach(input => {
  input.addEventListener('change', updateStyles);
});

// Function to handle profile image upload
document.getElementById('profileImage').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('previewImage').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Function to add new project
function addProject() {
  const projectsSection = document.getElementById('projects-section');
  const newProject = document.createElement('div');
  newProject.className = 'project';
  newProject.innerHTML = `
    <label>Title: <input type="text" class="project-title" placeholder="Project Title"></label>
    <label>Description: <textarea class="project-description" placeholder="Brief description of the project"></textarea></label>
    <label>Link: <input type="url" class="project-link" placeholder="Project URL"></label>
  `;
  projectsSection.appendChild(newProject);
}

// Function to update preview
function updatePreview() {
  // Update basic info
  document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
  document.getElementById('previewProfession').textContent = document.getElementById('profession').value || 'Your Profession';
  document.getElementById('previewBio').textContent = document.getElementById('bio').value || 'Your bio will appear here.';
  document.getElementById('previewEmail').textContent = document.getElementById('email').value;
  document.getElementById('previewPhone').textContent = document.getElementById('phone').value;

  // Update skills
  const skillsContainer = document.getElementById('previewSkills');
  skillsContainer.innerHTML = '';
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  skills.forEach(skill => {
    if (skill) {
      const skillItem = document.createElement('span');
      skillItem.className = 'skill-item';
      skillItem.textContent = skill;
      skillsContainer.appendChild(skillItem);
    }
  });

  // Update social media links
  document.getElementById('previewLinkedin').href = document.getElementById('linkedin').value || '#';
  document.getElementById('previewGithub').href = document.getElementById('github').value || '#';
  document.getElementById('previewTwitter').href = document.getElementById('twitter').value || '#';

  // Update projects
  const projectsContainer = document.getElementById('previewProjects');
  projectsContainer.innerHTML = '';
  document.querySelectorAll('#projects-section .project').forEach(project => {
    const title = project.querySelector('.project-title').value;
    const description = project.querySelector('.project-description').value;
    const link = project.querySelector('.project-link').value;
    
    if (title || description) {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `
        <h4>${title}</h4>
        <p>${description}</p>
        ${link ? `<a href="${link}" target="_blank">View Project</a>` : ''}
      `;
      projectsContainer.appendChild(projectElement);
    }
  });

  // Update work experience and education
  document.getElementById('previewExperience').textContent = document.getElementById('workExperience').value;
  document.getElementById('previewEducation').textContent = document.getElementById('education').value;
}

// Function to download portfolio as image
async function downloadPortfolioImage() {
  const preview = document.getElementById('preview');
  try {
    const canvas = await html2canvas(preview);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'portfolio.png';
    link.href = image;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Error generating image. Please try again.');
  }
}

// Add event listeners for real-time preview updates
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', updatePreview);
});

// Initialize preview and styles
updatePreview();
updateStyles();