<?php
namespace App;

class DB{
    static $connection = null;
    static function takeDB(){
        $options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ
        ];
        if(self::$connection === null){
            self::$connection = new \PDO("mysql:host=localhost; dbname=catdog200116; charset=utf8mb4", "root", "", $options);
        }
        return self::$connection;
    }

    static function query($sql, $data = []){
        // SELECT * FROM students WHERE id = ?
        $q = self::takeDB()->prepare($sql); //SQL 인젝션
        $q->execute($data);
        return $q;
    }

    static function fetch($sql, $data = []){
        return self::query($sql, $data)->fetch();
    }

    static function fetchAll($sql, $data = []){
        return self::query($sql, $data)->fetchAll();
    }
}