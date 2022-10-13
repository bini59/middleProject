from flask import Flask, Response, render_template, request, json
app = Flask(__name__)

def get_data():
    f = open('log.txt', 'r')
    data = f.read()
    f.close()
    return data


def append_data(data):
    f = open('log.txt', 'a')
    f.write(data)
    f.close()


@app.route("/")
def index():
    return render_template('index.html', data=get_data())


@app.route("/water", methods=['POST'])
def water():
    req = request.get_json()
    if req['water']:
        print("watering")
    return Response(status=200)

@app.route("/reload", methods=['POST'])
def reload():
    req = request.get_json()
    res = {'reload': False,}

    if req['length'] != len(get_data().split("\n")):
        res['reload'] = True

    
    return Response(status=200, response=json.dumps(res))


# video implements
# https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00


if __name__ == "__main__":
    app.run(debug=True, port="8000")