from flask import Flask, render_template, url_for, redirect
import datetime

app = Flask(__name__)

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/alert')
def success():
    return render_template('alert.html')
if __name__ == '__main__':
    #from waitress import serve
    app.run(debug=True)
    #serve(app, host="localhost", port=5000)