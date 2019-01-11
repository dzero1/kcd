<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "kcd_user_details".
 *
 * @property int $id
 * @property int $user_id
 * @property string $firstname
 * @property string $lastname
 * @property string $phone
 * @property string $dob
 * @property string $country
 * @property string $city
 * @property string $district
 * @property string $profile_image
 * @property string $map_location
 * @property string $gender
 * @property string $looking_for
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
            [['gender', 'looking_for'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['firstname', 'lastname', 'phone', 'dob', 'country', 'city', 'district', 'profile_image', 'map_location'], 'string', 'max' => 255],
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
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'phone' => 'Phone',
            'dob' => 'Dob',
            'country' => 'Country',
            'city' => 'City',
            'district' => 'District',
            'profile_image' => 'Profile Image',
            'map_location' => 'Map Location',
            'gender' => 'Gender',
            'looking_for' => 'Looking For',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
