# coding:utf-8

from flask import Flask,render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("templates/index.html")


if __name__ == '__main__':
    app.run(host="localhost",port=5000,debug=True)