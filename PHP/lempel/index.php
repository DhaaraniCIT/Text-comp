
        <?php

            $val=$_GET['str'] ?? 'default'; 
                $str = $val;
                $dic = array();
                $out = array();
                $w="";
                $index = 256;
                $c=0;
                $k="";
                $n=strlen($str);
                for($k=0;$k<$n;$k++){
                  if($w==""){
                    $w=$str[$k];
                    continue;
                  }
                  $wk = $w.$str[$k];
                  if(array_search($wk,$dic)){
                    $w=$wk;   
                  }
                  else{
                    $dic[$index++] = $wk;
                    $out[$c++] = $w;
                    if(array_search($w,$dic)){
                      $c--;
                      $out[$c++] = array_search($w,$dic);
                    }
                    $w=$str[$k];
                  }
                }
                $out[$c++]=$w;
                $index = 256;
                $ddic = array();
                $decode;
                $decode= $out[0];
                $w=$out[0];
                for($i=1;$i<$c;$i++){
                  $k=$out[$i];
                  if(gettype($out[$i]) === "integer"){
                    $k=$ddic[$out[$i]];
                  }
                  $decode=$decode.$k;
                  $ddic[$index++]= $w.$k[0];
                  $w=$k;
                }
                // echo "Encode : ";
                // for($i=0;$i<$c;$i++){
                //   echo $out[$i] . " ";
                // }
                // echo "<br>Decode : " . $decode;
            $res=(object)["encode"=>$out,"decode"=>$decode];
            echo json_encode($res);
            
        ?>
    