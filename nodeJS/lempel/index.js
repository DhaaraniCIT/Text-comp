const express = require('express');
const bodyParser = require('body-parser');

const api = express();
api.use(express.static(__dirname));
api.use(bodyParser.json());

api.listen(3000, () => {
  console.log('API up and running!');
});

api.post('/lempel', (req , res) => {
    console.log(req.body);
    var str = req.body.set1;
    var dic = Array();
    var out = Array();
    var w="";
    var index = 256;
    var c=0
    var k="";
    console.log("ssqqs",str);
    for (k of str){
      console.log("wk",w,k);
      if(w==""){
        w=k
        continue
      }
      var wk = w.concat(k);
      console.log("wk,dic",wk,dic.indexOf(wk));
      if(dic.indexOf(wk) != -1){
        console.log("pppp");
        w=wk;   
      }
      else{
        dic[index++] = wk;
        out[c++] = w;
        if(dic.indexOf(w)!=-1){
          c--;
          out[c++] = dic.indexOf(w);
        }
        w=k;
      }
    }
    out[c++]=w;
    for(let x of out){
      console.log("dd",x)
    }
    index = 256;
    var ddic = Array();
    var decode;
    decode= out[0]
    w=out[0]
    for(var i=1;i<c;i++){
      k=out[i];
      if(typeof out[i] === "number"){
        k=ddic[out[i]]
      }
      decode=decode.concat(k)
      ddic[index++]= w+k[0]
      w=k;
    }
    
      console.log("dd",decode)
    res.send({encode:out,decode:decode});
})