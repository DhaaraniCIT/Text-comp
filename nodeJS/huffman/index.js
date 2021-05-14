const express = require('express');
const bodyParser = require('body-parser');

const api = express();
api.use(express.static(__dirname));
api.use(bodyParser.json());

api.listen(3000, () => {
  console.log('API up and running!');
});
var codes = {};
api.post('/huffman', (req , res) => {
    console.log(req.body);
    var str = req.body.set1
    var str1 = req.body.set2
    var count=0;
    var countarr=[];
    for(var j=0;str1[j]!=undefined;j++){
        for(var i=0;str[i]!=undefined;i++){
            if(str1[j] == str[i])
            ++count;
        }
        countarr[j]=count;
        count=0;
    }
    len = countarr.length;
    var tuples = [];
        for (var i=0;i<len;i++)
            tuples.push([countarr[i],str1[i]]);
        tuples.sort();
    console.log("kkk",tuples)
        while (tuples.length > 1)
        { 
            var leastTwo = tuples.slice(0,2);
            var theRest  = tuples.slice(2);
            console.log("tup",leastTwo);
            var combFreq = leastTwo[0][0] + leastTwo[1][0];
            var comb     =[[combFreq].concat([leastTwo])];
            tuples=theRest.concat(comb);
            tuples.sort();
         }
         console.log("luulll",tuples);
        var node = (trimTree(tuples[0]));
        var pat;
        codes={};
        assigncodes(node,pat)
        var output = "";
        for (var i=0;i<str.length;i++){
            output = output+codes[str[i]];
        }
    console.log("llll",codes);
    var output2 = decode(node,output);
    console.log(typeof(codes));
    res.send({Codes : codes ,Encode : output, Decode : output2});
})
function trimTree (tree)
{ 
    var p = tree[1];
    if(typeof p == 'string')
        return p;
    else
        return [trimTree(p[0]), trimTree(p[1])];
}
function assigncodes(node,pat){
    pat = pat || "";
    if(typeof(node) == typeof("")){
        codes[node] = pat;
    }
    else{
        assigncodes(node[0],pat+"0");
        assigncodes(node[1],pat+"1");
    }
    return codes;
}
function decode(tree,str){
    var output="";
    var p=tree;
    for (var i=0;i<str.length;i++){
        if(str[i] == '0'){
            p=p[0];
            }
        else{
            p=p[1];
        }
        if (typeof p === 'string'){
            output = output +p;
            p=tree;
            }
    }
    return  output;
    }