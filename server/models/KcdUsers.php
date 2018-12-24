<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "kcd_users".
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $firstname
 * @property string $lastname
 * @property string $created_at
 */
class KcdUsers extends ActiveRecord // implements IdentityInterface
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
            [['created_at'], 'safe'],
            [['username', 'password', 'firstname', 'lastname'], 'string', 'max' => 255],
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
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'created_at' => 'Created At',
        ];
    }
    

   /*  public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function loginByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public function generateAccessToken()
    {
        $this->access_token = Yii::$app->security->generateRandomString($length = 16);
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    } */
}
