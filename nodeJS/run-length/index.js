const express = require('express');
const bodyParser = require('body-parser');

const api = express();
api.use(express.static(__dirname));
api.use(bodyParser.json());

api.listen(3000, () => {
  console.log('API up and running!');
});

api.post('/run-length', (req , res) => {
    console.log(req.body);
    var str = req.body.set1
    var str1=[];
    var index = 0;    
    var n = str.length;
    // Traverse through all characters 
    for (var i=0; i<n; i++) {    
    // Check if str[i] is present before it   
      var j;   
      for (j=0; j<i; j++)  
        if (str[i] == str[j]) 
          break;           
        // If not present, then add it to 
        // result. 
        if (j == i) 
          str1[index++] = str[i]; 
    } 
    console.log(str1);
    var arr="";
    var count=0;
    for(var j=0;str1[j]!=undefined;j++){
        for(var i=0;str[i]!=undefined;i++){
            if(str1[j] == str[i])
            ++count;
        }
        arr=arr.concat(str1[j],count);
        count=0;
    }
    res.send(arr);
})