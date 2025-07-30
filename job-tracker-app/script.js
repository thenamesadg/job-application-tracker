// script.js

const form = document.getElementById('job-form');
const jobList = document.getElementById('job-list');
const filterDropdown = document.getElementById('filter-status');

// Load existing jobs and set up filter listener
document.addEventListener('DOMContentLoaded', () => {
  renderJobs();
  filterDropdown.addEventListener('change', renderJobs);
});

// Form submit handler
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const company = document.getElementById('company').value;
  const position = document.getElementById('position').value;
  const status = document.getElementById('status').value;
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;

  const job = { company, position, status, date, notes };

  saveJob(job);
  form.reset();
});

// Create and display job card
function createJobCard(job) {
  const card = document.createElement('div');
  card.classList.add('job-card');

  card.innerHTML = `
    <h3>${job.position} @ ${job.company}</h3>
    <p><strong>Status:</strong> ${job.status}</p>
    <p><strong>Date:</strong> ${job.date}</p>
    ${job.notes ? `<p><strong>Notes:</strong> ${job.notes}</p>` : ""}
    <button class="delete-btn">🗑 Delete</button>
  `;

  jobList.appendChild(card);

  // Delete job when button is clicked
  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteJob(job);
  });
}

// Save job to localStorage and refresh UI
function saveJob(job) {
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  jobs.push(job);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  renderJobs();
}

// Delete job from localStorage and refresh UI
function deleteJob(jobToDelete) {
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const updatedJobs = jobs.filter(job =>
    !(job.company === jobToDelete.company &&
      job.position === jobToDelete.position &&
      job.date === jobToDelete.date)
  );
  localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  renderJobs();
}

// Render filtered jobs based on selected status
function renderJobs() {
  const filter = filterDropdown.value;
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

  jobList.innerHTML = '';

  const filteredJobs = filter === 'All'
    ? jobs
    : jobs.filter(job => job.status === filter);

  if (filteredJobs.length === 0) {
    jobList.innerHTML = '<p>No jobs found for this status.</p>';
  } else {
    filteredJobs.forEach(createJobCard);
  }
}
// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');

document.addEventListener('DOMContentLoaded', () => {
  const darkPref = localStorage.getItem('darkMode');
  if (darkPref === 'enabled') {
    document.body.classList.add('dark');
  }

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
});