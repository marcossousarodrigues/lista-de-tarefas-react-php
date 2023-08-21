<?php
namespace app\model\sql;

use Exception;

class Sql extends Connection
{

    public static function create($table ,$data)
    {
        $conn = Connection::connect();

        $params = self::keysValues($data);

        $sql = "INSERT INTO $table (".$params["keys"].") VALUES (".$params["param"].")";
        
        $stmt = $conn->prepare($sql);
        
        foreach($data as $key => $value)
        {
            $stmt->bindValue(":$key", $value);
        }
        
        try
        {
            $stmt->execute();
            return [
                'message' => 'Insert successs',
                'user' => $data
            ];
        }
        catch(\PDOException $e)
        {
            return ['message' => 'Insert error'];
        }
    }

    public static function update($table, $data, $id)
    {

        $conn = Connection::connect();
        
        $params =  self::keysValuesUpdate($data);

        $sql = "UPDATE $table SET ".$params['params']." WHERE id = :id";

        $stmt = $conn->prepare($sql);
        
        $stmt->bindValue(":id", $id);
        foreach($data as $key => $value)
        {
            $stmt->bindValue(":$key", $value);
        }
        
        try
        {
            $stmt->execute();
            return [
                'message' => 'Update realizado com sucesso!'
            ];
        }
        catch(\PDOException $e)
        {
            return ['message' => 'Update error'.$e->getMessage()];
        }

    } 


    public static function updateTask($table, $data, $userid, $taskid)
    {

        $conn = Connection::connect();
        
        $params =  self::keysValuesUpdate($data);

        $sql = "UPDATE $table SET ".$params['params']." WHERE fk_userid = :userid AND id = :taskid";

        $stmt = $conn->prepare($sql);
        
        $stmt->bindValue(":userid", $userid);
        $stmt->bindValue(":taskid", $taskid);
        foreach($data as $key => $value)
        {
            $stmt->bindValue(":$key", $value);
        }
        
        try
        {
            $stmt->execute();
            return [
                'message' => 'Update realizado com sucesso!'
            ];
        }
        catch(\PDOException $e)
        {
            return ['message' => 'Update error'.$e->getMessage()];
        }

    } 

    public static function delete($table, $id)
    {

        if(count(self::selectById($table, $id)) < 1)
        {
            return [
                'message' => 'Registro não encontrado!',
            ];
        }

        $conn = Connection::connect();
        $sql = "DELETE FROM $table WHERE fk_userid = :userid AND id = :taskid";

        $stmt = $conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        try
        {
            $stmt->execute();
            return ["message" => "Exclusão realizada com sucesso"];
        }
        catch(Exception $e)
        {
            return ["message" => "erro ao tentar excluir".$e->getMessage()];
        }
       

    }

    public static function deleteTask($table, $userid, $taskid)
    {

        $conn = Connection::connect();
        $sql = "DELETE FROM $table WHERE fk_userid = :userid AND id = :taskid";

        $stmt = $conn->prepare($sql);

        $stmt->bindValue(":userid", $userid);
        $stmt->bindValue(":taskid", $taskid);

        try
        {
            $stmt->execute();
            return ["message" => "Exclusão realizada com sucesso"];
        }
        catch(Exception $e)
        {
            return ["message" => "erro ao tentar excluir".$e->getMessage()];
        }
       

    }

    // select

    public static function selectAll($table)
    {
        $conn = Connection::connect();
        $sql = "SELECT * FROM $table";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

    public static function selectById($table, $id)
    {
        $conn = Connection::connect();
        $sql = "SELECT * FROM $table WHERE id = $id";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

    public static function selectByIdTask($table, $userid, $taskid)
    {
        $conn = Connection::connect();
        $sql = "SELECT * FROM $table WHERE fk_userid = $userid AND id = $taskid";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }
    
    
    public static function keysValues ($data)
    {
        $keys = '';
        $param = '';
        $values = '';

        foreach($data as $key => $value)
        {
            $keys .= $key.'|';
            $param .= ":$key|";
            $values .= $value.'|';
        }    

        $formatKeys = str_replace('|',',', rtrim($keys, '|'));
        $formatParam = str_replace('|',',', rtrim($param, '|'));
        $formatValues = str_replace('|',',', rtrim($values, '|'));

        return [
            'keys' => $formatKeys, 
            'values' => $formatValues,
            'param' => $formatParam,
        ];
    }

    public static function keysValuesUpdate ($data)
    {
        $params = '';

        foreach($data as $key => $value)
        {
            $params .= $key.'=:'.$key.'|';
        }    

        $formatKeys = str_replace('|',',', rtrim($params, '|'));
    

        return [
            'params' => $formatKeys, 
        ];
    }
}


?>