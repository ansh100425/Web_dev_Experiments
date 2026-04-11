Event Management System A lightweight, web-based Event Management System built using the Flask framework. This application allows users to view upcoming events, register for them, and provides an administrative view to manage event listings.

🚀 Features Home Page: Simple and welcoming landing page.

Event Listings: View a list of scheduled events with details like date and venue.

RSVP/Registration: A dedicated registration system with flash message feedback.

Admin Dashboard: A restricted view for managing and overseeing all events.

🛠️ Tech Stack Backend: Python (Flask)

Frontend: HTML5, CSS3 (Jinja2 Templates)

Storage: In-memory Python dictionaries (Scalable to SQL/MongoDB)

📋 Prerequisites Ensure you have Python installed on your system. You will also need pip to install Flask.

Bash python --version 🔧 Installation & Setup Clone the Repository

Bash git clone https://github.com/your-username/event-management-flask.git cd event-management-flask Create a Virtual Environment (Optional but Recommended)

Bash python -m venv venv

Activate on Windows:
venv\Scripts\activate

Activate on Mac/Linux:
source venv/bin/activate Install Dependencies

Bash pip install flask Run the Application

Bash python app.py Access the App Open your browser and go to: http://127.0.0.1:5000

📂 Project Structure Plaintext ├── app.py # Main Flask application logic ├── templates/ # HTML files (Jinja2) │ ├── index.html # Landing Page │ ├── events.html # Event list │ ├── register.html # Registration form │ └── admin.html # Admin dashboard └── static/ # CSS and Image files (if any) 📝 Future Enhancements [ ] Connect to a database (MySQL or MongoDB).

[ ] Add User Authentication (Login/Signup).

[ ] Implement a dynamic RSVP counter.

[ ] Add the ability for Admins to add/delete events via the UI.
