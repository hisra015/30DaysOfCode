from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_docker():
    return '<h1>Hello, Docker!</h1><p>This Flask app is running inside a Docker container.</p>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)