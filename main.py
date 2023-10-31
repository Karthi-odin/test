from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/get_bot_response', methods=['POST'])
def get_bot_response():
    user_message = request.json['user_message']

    # Process user message and generate bot response (replace this with your bot logic)
    bot_response = generate_bot_response(user_message)

    return jsonify({'bot_response': bot_response})

def generate_bot_response(user_message):

    # Here, we'll use a simple echo response for demonstration purposes
    return user_message

app.run(debug=True)