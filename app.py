from flask import Flask, render_template, make_response, send_from_directory, redirect, url_for
import datetime
import threading
import concurrent.futures

app = Flask(__name__)

@app.route('/')
def go_home():
    return redirect(url_for('home'))

def new_year():
    currentYear = datetime.datetime.now().year
    now = datetime.datetime.now()
    new_year = datetime.datetime(currentYear + 1, 1, 1)
    delta = datetime.timedelta(microseconds=-0.000000001)
    time_until_newyear = new_year - now
    while True:
        if time_until_newyear < delta:
            return redirect(url_for("alert"))
        return render_template('home.html')

@app.route('/home')
def home():
    try:
        process = threading.Thread(target=new_year)
        process.start()
        process.join()
    except Exception as error:
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            executor.map(new_year, range(3))
            print(f"Error Detected: \n{error}")
    return render_template('home.html')

@app.route('/alert')
def success():
    return render_template('alert.html')

@app.route('/worker.js')
def service_worker():
    response = make_response(send_from_directory('static', 'service_worker.js'))
    response.headers['Cache-Control'] = 'no-cache'
    return response

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


if __name__ == '__main__':
    #from waitress import serve
    app.run(use_reloader = True, debug=False)
    #serve(app, host="localhost", port=5000)