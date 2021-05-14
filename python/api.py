import flask
import sys
from flask import Flask,request,render_template,jsonify,json
from flask_cors import CORS
from heapq import heappush, heappop, heapify
from collections import defaultdict

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/fast',methods=['GET'])
def fast():
    return jsonify({"content" : 'dddd'})

@app.route('/huffman',methods=['GET'])
def huffman():
    sett = request.args.get('str')
    set1 = set(sett)
    count = 0
    arr = {}
    for i in set1:
        for j in range(len(sett)):
            if i == sett[j]:
                count +=1
        arr[i] = count
        count=0 
    heap = [[wt, [sym, ""]] for sym, wt in arr.items()]
    heapify(heap)
    while len(heap) > 1:
        lo = heappop(heap)
        hi = heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    huff=sorted(heappop(heap)[1:], key=lambda p: (len(p[-1]), p))
    # print "Symbol\tHuffman Code"
    for p in huff:
        print (p[0], p[1])
    return jsonify({"content" : huff})

@app.route('/lempel',methods=['GET'])
def lempel():
    st = request.args.get('set1')
    dic=[];
    out=[]
    w="";
    index = 256;
    c=0
    k="";
    for k in st:
      if w=="":
        w=k
        continue
      wk = w+k;
      if (wk in dic):
        w=wk;   
      else:
        dic.insert(index, wk);
        index+=1
        out.insert(c,w);
        c+=1
        if (w in dic):
          c=c-1;
          out.insert(c,dic.index(w));
          c+=1
        w=k;
    out.insert(c,w);
    c+=1
    i=0
    for i in range(c):
        print(out[i]) 
    index = 256;
    ddic = [];
    decode= out[0]
    w=out[0]
    for i in range(1,c):
      k=out[i];
    #   print(isinstance(out[i], int) )
      if isinstance(out[i], int):
        k=ddic[out[i]]
      decode=decode+str(k)
      ddic.insert(index,w+str(k[0]))
      index+=1
      w=k;
    
    out = out[0:c]
    print(decode,out)
    return jsonify({"encode" : out,"decode" : decode})

@app.route('/lossless',methods=['GET'])
def lossless():
    return jsonify({"content" : 'dddd'})

@app.route('/run',methods=['GET'])
def run():
    st = request.args.get('set1')
    set1 = set(st)
    arr = str()
    count = 0
    for i in set1:
        for j in range(len(st)):
            if i == st[j]:
                count +=1
        arr += i+str(count)
        count=0 
    print(arr)
    return jsonify({"content" : arr})


if __name__=='__main__':
	 app.run(debug=True) 