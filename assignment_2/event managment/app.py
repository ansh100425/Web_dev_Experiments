from flask import Flask, render_template, request, redirect, flash, session

app = Flask(__name__)
app.secret_key = "eventsecret"

events = [
    {"id": 1, "name": "Tech Conference", "date": "10 May 2026", "venue": "Auditorium", "rsvp": 0},
    {"id": 2, "name": "Music Fest", "date": "15 May 2026", "venue": "Open Ground", "rsvp": 0},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/events')
def events_page():
    return render_template('events.html', events=events)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        flash("Registered Successfully!")
        return redirect('/events')
    return render_template('register.html', events=events)

@app.route('/admin')
def admin():
    return render_template('admin.html', events=events)

if __name__ == '__main__':
    app.run(debug=True)
