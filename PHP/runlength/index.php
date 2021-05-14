       <?php
         header("Access-Control-Allow-Origin: *");
         header("Access-Control-Allow-Headers: *");
         header("Access-Control-Allow-Methods: GET");
         header("Access-Control-Allow-Credentials: true");
         header('Content-Type: application/json');
         
         $val = $_GET['set1'] ?? 'default';
              $n=strlen($val);
              $dist = array();
              $in = 0;
              $count=0;
              $arr="";
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
                $arr=$arr.$dist[$j].$count;
                $count=0;
            }
            echo json_encode($arr);
        ?>