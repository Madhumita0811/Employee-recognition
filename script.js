document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const skillMatrix = document.getElementById('skill-matrix');

    // Load profiles from local storage
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Function to save profiles to local storage
    function saveProfiles() {
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }

    // Function to render skill matrix
    function renderSkillMatrix() {
        if (skillMatrix) {
            skillMatrix.innerHTML = ''; // Clear existing content

            profiles.forEach((profile, index) => {
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';

                profileCard.innerHTML = `
                    <h3>${profile.name}</h3>
                    <p>Department: ${profile.department}</p>
                    <p>Job Title: ${profile.jobTitle}</p>
                    <p>Skills:</p>
                    <div class="skills">${profile.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}</div>
                    <button onclick="removeProfile(${index})">Remove</button>
                `;

                skillMatrix.appendChild(profileCard);
            });
        }
    }

    // Add event listener to form submission
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const department = document.getElementById('department').value;
            const jobTitle = document.getElementById('job-title').value;
            const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());

            profiles.push({ name, department, jobTitle, skills });
            saveProfiles();

            alert('Profile saved!');
            profileForm.reset(); // Clear form
        });
    }

    // Expose removeProfile function globally
    window.removeProfile = function(index) {
        profiles.splice(index, 1);
        saveProfiles();
        renderSkillMatrix();
    };

    renderSkillMatrix(); // Initial render
});
