<?php

namespace app\model\sql;

class Connection
{

    public static function connect()
    {
        $connPdo = new \PDO(DBDRIVE.':host='.DBHOST.'; dbname='.DBNAME, DBUSER, DBPASS);
        return $connPdo;
    }
}