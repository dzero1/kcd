<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "kcd_users".
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $access_token
 * @property string $created
 * @property string $lastlogin
 */
class KcdUsers extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'kcd_users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['created', 'lastlogin'], 'safe'],
            [['username', 'password', 'access_token'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'password' => 'Password',
            'access_token' => 'Access Token',
            'created' => 'Created',
            'lastlogin' => 'Lastlogin',
        ];
    }
}
