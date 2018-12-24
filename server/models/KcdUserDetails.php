<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "kcd_user_details".
 *
 * @property int $id
 * @property int $user_id
 * @property string $dob
 * @property string $language
 * @property string $phone1
 * @property string $phone2
 * @property string $email
 * @property string $looking_for
 * @property string $country
 * @property string $city
 * @property string $profile
 * @property string $location
 * @property string $created_at
 * @property string $updated_at
 */
class KcdUserDetails extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'kcd_user_details';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id'], 'integer'],
            [['looking_for'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['dob', 'language', 'phone1', 'phone2', 'email', 'country', 'city', 'profile', 'location'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'dob' => 'Dob',
            'language' => 'Language',
            'phone1' => 'Phone1',
            'phone2' => 'Phone2',
            'email' => 'Email',
            'looking_for' => 'Looking For',
            'country' => 'Country',
            'city' => 'City',
            'profile' => 'Profile',
            'location' => 'Location',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
