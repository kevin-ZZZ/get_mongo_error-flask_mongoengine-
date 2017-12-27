# coding:utf-8

from flask import Flask, render_template,request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("html/index.html")


@app.route("/index2", methods=["POST", ])
def index2():
    skd = request.args.get("skd")
    field = request.args.get("field")
    print skd,field


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
