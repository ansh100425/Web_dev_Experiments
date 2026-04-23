from flask import Flask, render_template, request

app = Flask(__name__)

# Quiz Questions (Minimum 5)
questions = [
    {
        "question": "What does HTML stand for?",
        "options": [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "Hyper Text Marketing Language",
            "Hyper Tool Multi Language",
        ],
        "answer": "Hyper Text Markup Language",
    },
    {
        "question": "Which language is used for styling web pages?",
        "options": ["HTML", "JQuery", "CSS", "XML"],
        "answer": "CSS",
    },
    {
        "question": "Which is not a programming language?",
        "options": ["Python", "Java", "HTML", "C++"],
        "answer": "HTML",
    },
    {
        "question": "Which framework is used in this project?",
        "options": ["Django", "Flask", "React", "Angular"],
        "answer": "Flask",
    },
    {
        "question": "Which method is used to send form data?",
        "options": ["GET", "POST", "PUT", "DELETE"],
        "answer": "POST",
    },
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/quiz")
def quiz():
    return render_template("quiz.html", questions=questions)


@app.route("/result", methods=["POST"])
def result():
    score = 0
    results = []

    for i, q in enumerate(questions):
        selected = request.form.get(f"q{i}")
        correct = q["answer"]

        is_correct = selected == correct
        if is_correct:
            score += 1

        results.append(
            {
                "question": q["question"],
                "selected": selected,
                "correct": correct,
                "is_correct": is_correct,
            }
        )

    if score == len(questions):
        feedback = "Excellent! Perfect score!"
    elif score >= 3:
        feedback = "Good job!"
    else:
        feedback = "Keep practicing!"

    return render_template(
        "result.html",
        score=score,
        total=len(questions),
        feedback=feedback,
        results=results,
    )


if __name__ == "__main__":
    app.run(debug=True)
