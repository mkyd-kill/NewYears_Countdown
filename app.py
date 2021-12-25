from flask import Flask, render_template, make_response, send_from_directory

app = Flask(__name__)

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


if __name__ == '__main__':
    #from waitress import serve
    app.run(debug=True)
    #serve(app, host="localhost", port=5000)