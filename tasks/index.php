<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");

require 'vendor/autoload.php';


if(isset($_GET['url']))
{
    $url = explode('/',$_GET['url']);

    if($url[0] === 'api')
    {

        array_shift($url);

        $controller = 'app\\controller\\'.ucfirst($url[0])."Controller";
        $method = strtolower($_SERVER['REQUEST_METHOD']);

        array_shift($url);

        try{
           $response = call_user_func_array(array(new $controller, $method), $url);

           http_response_code(200);
           echo json_encode(array('status' => 'success', 'data' => $response), JSON_UNESCAPED_UNICODE);
        }
        catch(\Exception $e)
        {   
            http_response_code(404);
            echo json_encode(array('status' => 'success', 'data' => $e->getMessage()), JSON_UNESCAPED_UNICODE);
        }


    }
   
}


?>