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
            'firstname' => $this->string(),
            'lastname' => $this->string(),
            'access_token' => $this->string(),
            'created' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'lastlogin' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
        
        $this->createTable('kcd_user_details', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'dob' => $this->string(),
            'language' => $this->string(),
            'phone1' => $this->string(),
            'phone2' => $this->string(),
            'email' => $this->string(),
            'looking_for' => "ENUM('none', 'Mens', 'Womens')",
            'country' => $this->string(),
            'city' => $this->string(),
            'profile' => $this->string(),
            'location' => $this->string(),
            'created_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
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
