from flask import Flask, render_template, request, redirect, url_for
# Initialize the Flask application
app = Flask(__name__)

# In-memory storage for blog posts (No database required for this project)
posts = [
    {'id': 1, 'title': 'Welcome to Simple Blog!', 'content': 'This is your first post. Feel free to edit or delete it.'}
]

# Helper function to generate a unique ID for new posts
def get_next_id():
    if not posts:
        return 1
    return max(post['id'] for post in posts) + 1

# --- TASK 4: Read & Display Blog Posts ---
@app.route('/')
def index():
    """Home route to display all blog posts."""
    # We pass the 'posts' list to our HTML template
    return render_template('index.html', posts=posts)

# --- TASK 3: Create Blog Posts ---
@app.route('/create', methods=['GET', 'POST'])
def create():
    """Route to handle the creation of new blog posts."""
    if request.method == 'POST':
        # Accept Post title and content from the HTML form
        title = request.form.get('title')
        content = request.form.get('content')
        
        if title and content:
            # Append new post to the storage structure
            new_post = {'id': get_next_id(), 'title': title, 'content': content}
            posts.append(new_post)
            return redirect(url_for('index'))
            
    return render_template('create.html')

# --- TASK 5: Update Blog Posts ---
@app.route('/edit/<int:post_id>', methods=['GET', 'POST'])
def edit(post_id):
    """Route to update an existing blog post."""
    # Find the post by its ID
    post = next((p for p in posts if p['id'] == post_id), None)
    
    if not post:
        return "Post not found", 404

    if request.method == 'POST':
        # Update existing data with new form data
        post['title'] = request.form.get('title')
        post['content'] = request.form.get('content')
        return redirect(url_for('index'))

    # Pre-fill form fields by passing the existing post to the template
    return render_template('edit.html', post=post)

# --- TASK 6: Delete Blog Posts ---
@app.route('/delete/<int:post_id>', methods=['POST'])
def delete(post_id):
    """Route to remove a selected post from storage."""
    global posts
    # Keep only the posts that DO NOT match the post_id we want to delete
    posts = [p for p in posts if p['id'] != post_id]
    
    # Redirect user back to home page after deletion
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
