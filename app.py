from flask import Flask, render_template, make_response, send_from_directory, redirect, url_for

app = Flask(__name__)

@app.route('/')
def go_home():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/alert')
def success():
    return render_template('alert.html')

@app.route('/worker.js')
def sw():
    response = make_response(send_from_directory(directory='static', path='service_worker.js'))
    #change the content header file. Can also omit; flask will handle correctly.
    response.headers['Content-Type'] = 'application/javascript'
    return response

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


if __name__ == '__main__':
    #from waitress import serve
    app.run(use_reloader = True, debug=True)
    #serve(app, host="localhost", port=5000)