from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage
tasks = []
task_id_counter = 1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200

@app.route('/api/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    new_task = {
        'id': task_id_counter,
        'title': data['title'],
        'completed': False
    }
    tasks.append(new_task)
    task_id_counter += 1
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT', 'PATCH'])
def update_task(task_id):
    data = request.get_json()
    for task in tasks:
        if task['id'] == task_id:
            if 'title' in data:
                task['title'] = data['title']
            if 'completed' in data:
                task['completed'] = data['completed']
            return jsonify(task), 200
    return jsonify({'error': 'Task not found'}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    for i, task in enumerate(tasks):
        if task['id'] == task_id:
            del tasks[i]
            return '', 204
    return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
