from flask import (Flask,
                   render_template,
                   request,
                   jsonify)
import datetime
import sqlite3
import os

app = Flask(__name__)
projectPath = 'C:/Users/hanki/Desktop/빅데이터/흡연구역/News_Web/'
cwd = os.getcwd()

@app.route('/')
def hello_world():
    # 정치면을 디폴트로 만들도록 여기서 보내주기
    #print(app.instance_path)
    #print(app.instance_path.replace('instance','').replace('\\','/'))
    now = datetime.datetime.now() - datetime.timedelta(days=1)
    now = str(now)[:11]
    past = datetime.datetime.now() - datetime.timedelta(days=2)
    past = str(past)[:11]
    #keyword.query.all()   <table> <tr > {% for i in keyword %} {{ i }} </tr>
    return render_template('index.html', past=past, now=now)

@app.route('/selectData')
def selectData():
    sectionTitle = request.args.get('sectionTitle', 0, type=str);
    sectionTitle = sectionTitle.lower();
    date = request.args.get('date',1,type=str);
    pastdate = request.args.get('pastdate',2,type=str);
    conn = sqlite3.connect(cwd + '/news_db.db')
    # conn = sqlite3.connect(projectPath+'news_db.db')
    cur = conn.cursor()
    res=cur.execute("select docsNum, term from I_value_"+sectionTitle+" where idate like '%"+date+"%' order by rank_i asc limit 5")
    current=res.fetchall()
    res=cur.execute("select docsNum, term from I_value_"+sectionTitle+" where idate like '%"+pastdate+"%' order by rank_i asc limit 5")
    past = res.fetchall()
    return jsonify(current,past)

@app.route('/recommendArticle')
def recommendArticle():
    selectedKeyword = request.args.get('selectedKeyword',0,type=str);
    keywordDate = request.args.get('keywordDate',1,type=str);
    conn = sqlite3.connect(cwd + '/news_db.db')
    cur = conn.cursor()
    res = cur.execute("select a_id from Term where term = '" + selectedKeyword + "' order by tfidf desc limit 4")
    # res=cur.execute("select a_id from Noun where noun = '"+selectedKeyword+"' and date = '"+keywordDate+"' order by tf_idf desc limit 4") #날짜별로
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
    conn = sqlite3.connect(cwd + '/news_db.db')
    cur = conn.cursor()
    res = cur.execute("select title, content, url from Article where a_id = '"+a_id+"'")
    res = res.fetchone()
    return jsonify(res)

@app.route('/selectKeyword')
def searchKey():
    selectedKeyword = request.args.get('selectedKeyword', 0, type=str);
    section = request.args.get('section',1,type=str);
    section = section.lower()
    conn = sqlite3.connect(cwd + '/news_db.db')
    cur = conn.cursor()
    res = cur.execute("select df_sec, docsNum, i_value, idate from I_value_"+section+" where term = '" + selectedKeyword + "' order by idate")
    res = res.fetchall()
    print(res)
    return jsonify(res)


if __name__ == '__main__':
    app.run()
