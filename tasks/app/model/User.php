<?php
namespace app\model;
use app\model\sql\Sql;
use app\model\sql\Connection;
use Firebase\JWT\JWT;

class User
{   
    private static $table = 'users';


    public static function create($user)
    {
        if(count(self::findUserEmail($user["email"])) <= 0 )
        {
            $userFilter = [
                "name" => $user["name"],
                "email" => $user["email"],
                "password" => $user["password"]
            
            ];

            return Sql::create(self::$table, $userFilter);
        }
        else
        {
            return [
                "message" => "Email já cadastrado",
                "user" => null
            ];
        }
       
    } 

    public static function login($user)
    {   
        $findUser = self::findUserEmail($user["email"]);
        if(count($findUser) > 0)
        {
            if($user["password"] === $findUser[0]["password"])
            {
                return [
                    "message" => "Login realizado com sucesso",
                    "user" => $findUser,
                    "token" => self::authJwtEncode($user['email']),
                    // "token_decode" => self::authJwtDecode(self::authJwtEncode($user['email'])),
                ];
            }
            else
            {
                return [
                    "message" => "Senha invalida",
                    "user" => null
                ];
            }
        }
        else
        {
            return [
                "message" => "Usuário não autenticado",
                "user" => null
            ];
        }
    }

    public static function authJwtEncode($email)
    {
        $key = 'example_key';
            $payload = [
                'iat' => 1356999524,
                'nbf' => 1357000000,
                'email' => $email
            ];

            $headers = [
                'email' => $email
            ];

            // Encode headers in the JWT string
            $jwt = JWT::encode($payload, $key, 'HS256', null, $headers);

            return $jwt;
         
    }

    public static function authJwtDecode($jwt)
    {
        list($headersB64, $payloadB64, $sig) = explode('.', $jwt);
        $decoded = json_decode(base64_decode($headersB64), true);
        return $decoded;
    }

    public static function findUserEmail($email)
    {
        $conn = Connection::connect();
        $sql = "SELECT * FROM ".self::$table." WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function update($data, $id)
    {
        return Sql::update(self::$table, $data, $id);
    }

    public static function delete($id)
    {
        return Sql::delete(self::$table, $id);
    }

    public static function find($id)
    {
        if(empty($id))
        {
           if(count(Sql::selectAll(self::$table)) > 0 ){
                return Sql::selectAll(self::$table);
           }
           else
           {
                return ["message" => "nenhum registro encontrado"];
           }
        }
        else
        {
            if(count(Sql::selectById(self::$table, $id)) > 0 )
            {
                return Sql::selectById(self::$table, $id);
            }
            else
            {
                return ["message" => "nenhum registro encontrado"];
            }
        }
    }

}

?>