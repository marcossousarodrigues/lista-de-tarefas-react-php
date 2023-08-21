<?php
namespace app\controller;
use app\model\Task;

class TaskController
{
    public function get($userid = '', $taskid = '')
    {
        if (empty($userid) && empty($taskid))
        {
            return;
        }
        else if(!empty($userid) && empty($taskid))
        {
            return Task::getByTaskUserId($userid);
        }
        else if(!empty($userid) && !empty($taskid))
        {
            return Task::getByTaskUserIdAndTaskId($userid, $taskid);
        }
            
        
    }

    public function post()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        return Task::create($data);

    }

    public function patch($userid, $taskid)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        return Task::update($data, $userid, $taskid);
    }

    public function delete($userid, $taskid)
    {
        return Task::delete($userid, $taskid);
    }

}

?>