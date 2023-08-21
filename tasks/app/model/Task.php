<?php
namespace app\model;

use app\model\sql\Sql;
use app\model\sql\Connection;

class Task
{

    private static $table = 'tasks';

    public static function create($data)
    {
         return Sql::create(self::$table, $data); 
    }
    public static function update($data, $userid, $taskid)
    { 
         return Sql::updateTask(self::$table, $data, $userid, $taskid);
    }
    public static function delete($userid, $taskid)
    {
         return Sql::deleteTask(self::$table, $userid, $taskid);
    }

    public static function getByTaskUserId($id)
    {
        $conn = Connection::connect();

        $sql = "SELECT * FROM ".self::$table." WHERE fk_userid = :id ORDER BY conclude DESC";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":id", $id);

        try
        {
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        catch(\Exception $e)
        {
            return ["error" => "error na requisição".$e->getMessage()];
        }

    }

    public static function getByTaskUserIdAndTaskId($userid, $taskid)
    {
        $conn = Connection::connect();

        $sql = "SELECT * FROM ".self::$table." WHERE fk_userid = :userid AND id = :taskid";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(":userid", $userid);
        $stmt->bindValue(":taskid", $taskid);

        try
        {
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }
        catch(\Exception $e)
        {
            return ["error" => "error na requisição".$e->getMessage()];
        }

    }

}


?>
