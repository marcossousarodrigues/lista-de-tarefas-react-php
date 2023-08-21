<?php
namespace app\controller;

use app\model\User;

class UserController
{
    public function get($id = '')
    {
        return User::find($id);
    }
    
    public function post() 
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if($data["action"] == "login")
        {
            return  User::login($data);
        }
        
        if($data["action"] == "register")
        {
            return User::create($data);
        }
        return $data; 

        
    }
    public function patch($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        return User::update($data, $id);
    }
    public function delete($id)
    {
        return User::delete($id);
    }
}

?>