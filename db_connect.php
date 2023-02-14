<?php

    class Database{
        var $host = "";
        var $user = "";
        var $pass = "";
        var $db = "";

        public $link;

        public function Database($host, $user, $pass, $db){
            $this->host = $host;
            $this->user = $user;
            $this->pass = $pass;
            $this->db = $db;
        }

        public function connect(){
            $this->link = new mysqli($this->host, $this->user, $this->pass, $this->db);
            if(mysqli_connect_error()){
                echo mysqli_connect_error();
                exit();
            }
            else{
                return $this->link;
            }
        }
    }

?>