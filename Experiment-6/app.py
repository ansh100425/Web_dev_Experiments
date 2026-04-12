from flask import Flask, render_template, request, redirect, url_for

# Initialize the Flask application
app = Flask(__name__)

# In-memory storage for contacts
contacts = [
    {'id': 1, 'name': 'Alice Smith', 'phone': '555-0101', 'email': 'alice@example.com'},
    {'id': 2, 'name': 'Bob Jones', 'phone': '555-0202', 'email': 'bob@example.com'}
]

def get_next_id():
    """Helper function to assign unique IDs to new contacts."""
    if not contacts:
        return 1
    return max(contact['id'] for contact in contacts) + 1

# --- TASK 2 & 4 & 7: View Contacts & Search ---
@app.route('/')
def index():
    """Home route to display contacts, with optional search filtering."""
    search_query = request.args.get('search', '').lower()
    
    if search_query:
        # Filter contacts by name or phone number
        filtered_contacts = [
            c for c in contacts 
            if search_query in c['name'].lower() or search_query in c['phone']
        ]
        return render_template('index.html', contacts=filtered_contacts, search_query=search_query)
    
    return render_template('index.html', contacts=contacts)

# --- TASK 3: Add New Contacts ---
@app.route('/add', methods=['GET', 'POST'])
def add_contact():
    """Route to add a new contact."""
    error = None
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        
        # Validate inputs to avoid empty fields
        if not name or not phone or not email:
            error = "All fields (Name, Phone, Email) are required."
        else:
            new_contact = {
                'id': get_next_id(),
                'name': name,
                'phone': phone,
                'email': email
            }
            contacts.append(new_contact)
            return redirect(url_for('index'))
            
    return render_template('add_contact.html', error=error)

# --- TASK 5: Update Contact Details ---
@app.route('/edit/<int:contact_id>', methods=['GET', 'POST'])
def edit_contact(contact_id):
    """Route to update an existing contact."""
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    
    if not contact:
        return "Contact not found", 404
        
    error = None
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        
        if not name or not phone or not email:
            error = "All fields are required."
        else:
            contact['name'] = name
            contact['phone'] = phone
            contact['email'] = email
            return redirect(url_for('index'))

    return render_template('edit_contact.html', contact=contact, error=error)

# --- TASK 6: Delete Contacts ---
@app.route('/delete/<int:contact_id>', methods=['POST'])
def delete_contact(contact_id):
    """Route to remove a selected contact."""
    global contacts
    contacts = [c for c in contacts if c['id'] != contact_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
