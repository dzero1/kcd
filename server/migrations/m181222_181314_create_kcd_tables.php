<?php

use yii\db\Migration;

/**
 * Class m181222_181314_create_kcd_tables
 */
class m181222_181314_create_kcd_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('kcd_users', [
            'id' => $this->primaryKey(),
            'username' => $this->string(),
            'password' => $this->string(),
            'access_token' => $this->string(),
            'created' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'lastlogin' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
        
        $this->createTable('kcd_user_details', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'firstname' => $this->string(),
            'lastname' => $this->string(),
            'phone' => $this->string(),
            'dob' => $this->string(),
            'country' => $this->string(),
            'district' => $this->string(),
            'city' => $this->string(),
            'profile_image' => $this->string(),
            'map_location' => $this->string(),
            'gender' => "ENUM('Male', 'Female')",
            'looking_for' => "ENUM('MARRIAGE', 'SERIOUS_RELATIONSHIP', 'RELATIONSHIP')",

            'created_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);



        /* inserting demo data */
        $users = json_decode('[
            {"username":"user1", "firstname":"user", "lastname": "last", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kampala", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Male", "looking_for":"MARRIAGE" },
            
            {"username":"user2", "firstname":"user2", "lastname": "last2", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kamuli", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Female", "looking_for":"MARRIAGE" },
            
            {"username":"angalena", "firstname":"Angalena", "lastname": "Jole", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kampala", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Female", "looking_for":"MARRIAGE" },
            
            {"username":"ariana", "firstname":"Ariana", "lastname": "Grande", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kampala", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Female", "looking_for":"MARRIAGE" },
            
            {"username":"emma", "firstname":"Emma", "lastname": "Wotsan", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Abim", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Female", "looking_for":"MARRIAGE" },
            
            {"username":"mila", "firstname":"Mila", "lastname": "Kunis", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Abim", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Female", "looking_for":"MARRIAGE" },
            
            {"username":"jhony", "firstname":"Jhony", "lastname": "Depp", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kampala", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Male", "looking_for":"MARRIAGE" },
            
            {"username":"matt", "firstname":"Matt", "lastname": "Demon", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Kampala", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Male", "looking_for":"MARRIAGE" },
            
            {"username":"morgan", "firstname":"Morgan", "lastname": "Freeman", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Agago", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Male", "looking_for":"MARRIAGE" },
            
            {"username":"tom", "firstname":"Tom", "lastname": "Cruse", "phone": "0719398202", "dob": "1987-10-02", "country": "Uganda", "district": "Agago", "city": "Mengo", "profile_image":"", "map_location":"", "gender":"Male", "looking_for":"MARRIAGE" }
        ]');
        $i = 1;
        foreach ($users as $user) {
            $username = $user->username;
            $this->insert('kcd_users',array('username' => $username, 'password' => md5("kcd.dzero@$username".$username), 'access_token'=>"" ));
            unset($user->username);
            $user->user_id = $i;
            $ar = json_decode(json_encode($user), true);
            $this->insert('kcd_user_details', $ar);
            $i++;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m181222_181314_create_kcd_tables cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m181222_181314_create_kcd_tables cannot be reverted.\n";

        return false;
    }
    */
}
