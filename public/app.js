document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home-link').addEventListener('click', () => showSection('home-section'));
    document.getElementById('login-link').addEventListener('click', () => showSection('login-section'));
    document.getElementById('dashboard-link').addEventListener('click', () => showSection('dashboard-section'));

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('create-incident-form').addEventListener('submit', createIncident);

    document.getElementById('category-filter').addEventListener('change', filterIncidents);
    document.getElementById('priority-filter').addEventListener('change', filterIncidents);

    loadPredefinedIncidents(); // Load predefined incidents on page load
});

let loggedIn = false;

const predefinedIncidents = [
    {
        id: 1,
        title: 'Network Outage',
        description: 'There is a network outage affecting multiple departments.',
        category: 'Network',
        priority: 'Critical'
    },
    {
        id: 2,
        title: 'Patient Complaint',
        description: 'A patient has complained about long wait times.',
        category: 'Patient Complaint',
        priority: 'High'
    },
    {
        id: 3,
        title: 'Server Downtime',
        description: 'The main server is down causing service disruption.',
        category: 'Server Issue',
        priority: 'Critical'
    }
];

const showSection = (sectionId) => {
    if (sectionId === 'dashboard-section' && !loggedIn) {
        document.getElementById('login-message').textContent = 'You must be logged in to access the dashboard.';
        document.getElementById('login-message').classList.remove('hidden');
        showSection('login-section');
        return;
    }

    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('login-message').classList.add('hidden');
};

const createIncident = (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    const incidentId = Date.now();

    const incidentHtml = `
        <div class="incident-card" id="incident-${incidentId}">
            <h3>${title}</h3>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Priority:</strong> ${priority}</p>
            <button class="btn-details" onclick="resolveIncident(${incidentId})">Resolve</button>
        </div>
    `;
    
    document.getElementById('incidents').insertAdjacentHTML('beforeend', incidentHtml);
    updateStats();
    document.getElementById('create-incident-form').reset();
};

const filterIncidents = () => {
    const categoryFilter = document.getElementById('category-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;

    document.querySelectorAll('#incidents .incident-card').forEach(card => {
        const category = card.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const priority = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];

        card.style.display = (categoryFilter === '' || category === categoryFilter) &&
                             (priorityFilter === '' || priority === priorityFilter) ? 'block' : 'none';
    });
};

const resolveIncident = (incidentId) => {
    document.getElementById(`incident-${incidentId}`).remove();
    updateStats();
};

const updateStats = () => {
    const incidents = document.querySelectorAll('#incidents .incident-card');
    const reported = incidents.length;
    const resolved = document.querySelectorAll('#incidents .incident-card[data-status="resolved"]').length;
    const pending = reported - resolved;

    document.getElementById('reported-incidents').textContent = reported;
    document.getElementById('resolved-incidents').textContent = resolved;
    document.getElementById('pending-incidents').textContent = pending;
};

const handleLogin = (event) => {
    event.preventDefault();
    // Simulate successful login
    loggedIn = true;
    showSection('dashboard-section');
};

const handleSignup = (event) => {
    event.preventDefault();
    // Simulate successful signup
    document.getElementById('signup-message').textContent = 'Signup successful! Please log in.';
    document.getElementById('signup-message').classList.remove('hidden');
};

const loadPredefinedIncidents = () => {
    predefinedIncidents.forEach(incident => {
        const incidentHtml = `
            <div class="incident-card" id="incident-${incident.id}">
                <h3>${incident.title}</h3>
                <p><strong>Description:</strong> ${incident.description}</p>
                <p><strong>Category:</strong> ${incident.category}</p>
                <p><strong>Priority:</strong> ${incident.priority}</p>
                <button class="btn-details" onclick="resolveIncident(${incident.id})">Resolve</button>
            </div>
        `;
        
        document.getElementById('incidents').insertAdjacentHTML('beforeend', incidentHtml);
    });

    updateStats();
};
