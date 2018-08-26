from flask import (Flask,
                   render_template,
                   request,
                   jsonify)
import datetime
import sqlite3

app = Flask(__name__)


@app.route('/')
def hello_world():

    # 정치면을 디폴트로 만들도록 여기서 보내주기
    keyword = ['버튼1','버튼2']
    now = datetime.datetime.now()
    now = str(now)[:11]
    past = datetime.datetime.now() - datetime.timedelta(days=1)
    past = str(past)[:11]
    #keyword.query.all()   <table> <tr > {% for i in keyword %} {{ i }} </tr>
    return render_template('index.html', keyword=keyword, past=past, now=now)

@app.route('/selectData')
def selectData():
    sectionTitle = request.args.get('sectionTitle', 0, type=str);
    date = request.args.get('date',1,type=str);
    pastdate = request.args.get('pastdate',2,type=str);
    conn = sqlite3.connect('dumpData.db')
    cur = conn.cursor()
    res=cur.execute("select * from "+sectionTitle+" where date = '"+date+"' order by rank_i asc limit 5")
    current=res.fetchall()
    res=cur.execute("select * from "+sectionTitle+" where date = '"+pastdate+"' order by rank_i asc limit 5")
    past = res.fetchall()
    return jsonify(current,past)

@app.route('/recommendArticle')
def recommendArticle():
    selectedKeyword = request.args.get('selectedKeyword',0,type=str);
    conn = sqlite3.connect('dumpData.db')
    cur = conn.cursor()
    res=cur.execute("select a_id from Noun where noun = '"+selectedKeyword+"' order by tf_idf desc limit 4")
    res=res.fetchall()
    resList=[]
    for r in res:
        r = str(r)[2:len(r)-4]
        arti = cur.execute("select title, a_id from Article where a_id = '"+r+"'")
        arti = arti.fetchone()
        resList.append(arti)
    return jsonify(resList)

@app.route('/showContents')
def showContents():
    a_id = request.args.get('a_id',0,type=str)
    conn = sqlite3.connect('dumpData.db')
    cur = conn.cursor()
    res = cur.execute("select title, content, url from Article where a_id = '"+a_id+"'")
    res = res.fetchone()
    return jsonify(res)

@app.route('/searchKeyword')
def searchKey():
    print("SearchKey")

if __name__ == '__main__':
    app.run()
