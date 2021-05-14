
        <?php

            //function huffman($val){
              header("Access-Control-Allow-Origin: *");
              header("Access-Control-Allow-Headers: *");
              header("Access-Control-Allow-Methods: GET");
              header("Access-Control-Allow-Credentials: true");
              header('Content-Type: application/json');
              
              $val = $_GET['str'] ?? 'default';  
              $n=strlen($val);
              $dist = array();
              $in = 0 ;
              $count=0;
              $arr = array();
              for($i = 0; $i < $n; $i++) 
              { 
              $j; 
              for($j = 0; $j < $i; $j++) 
              if ($val[$i] == $val[$j]) 
                break; 
              if ($i == $j) 
                $dist[$in++] = $val[$i]; 
              }

              for($j=0;$j<$in;$j++){
                for($i=0;$i!=$n;$i++){
                    if($dist[$j] == $val[$i])
                    $count++;
                }
                $arr[$dist[$j]]=$count;
                $count=0;
            }
            $heap = new SplPriorityQueue;
            $heap->setExtractFlags(SplPriorityQueue::EXTR_BOTH);
            foreach ($arr as $sym => $wt){
              $heap->insert(array($sym => ''), -$wt);
          }

          while ($heap->count() > 1) {
            $lo = $heap->extract();
            $hi = $heap->extract();
            foreach ($lo['data'] as &$x)
                $x = '0'.$x;
            foreach ($hi['data'] as &$x)
                $x = '1'.$x;
            $heap->insert($lo['data'] + $hi['data'],
                          $lo['priority'] + $hi['priority']);
        }
        $huff = array();
        $huff = $heap->extract();
        $huff = $huff['data'];
        $res = (object)["result"=>$huff];

        //$huff = join(",",$huff);
        echo json_encode($res);
        // foreach ($huff as $sym => $code)
        //     echo $sym . " " . $code . "<br>";
          
           // }
            // echo"<h1>Result</h1>";
            // extract($_POST);
            // if(isset($log))
            // {
            //     huffman("$val");
            // }
        ?>
    