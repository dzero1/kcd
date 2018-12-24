<?php

namespace app\modules\v1\controllers;

use app\controllers\RestController;
use app\models\KcdUsers;
use app\models\KcdUserDetails;

class UserController extends RestController
{
    public function actionIndex()
    {
        echo "Just a index!";
        exit;
    }

    public function actionSignin()
    {
        $ret = new \stdClass;
        $ret->error = false;

        $request = \Yii::$app->request;
        $username = $request->post('username');
        $password = md5("kcd.dzero@$username".$request->post('password'));

        $have_user = KcdUsers::findOne(['username'=>$username, 'password'=>$password]);
        if (!$have_user){
            $ret->error = true;
            $ret->message = 'Username not found or password incorrect.';
        } else {
            $user = $have_user;
            $user->lastlogin = date('Y-m-d H:i:s');
            $user->access_token = base64_encode(md5("$username:$password:".time()));
            $user->save(false);

            unset($user->password);
            $ret->token = $user->access_token;
            $ret->user = $user;
        }

        return $ret;
    }

    public function actionSignup()
    {
        $ret = new \stdClass;
        $ret->error = false;

        $request = \Yii::$app->request;
        $username = $request->post('username');
        $password = $request->post('password');

        $have_username = KcdUsers::findOne(['username'=>$username]);
        if (empty($username) || $have_username){
            $ret->error = true;
            $ret->message = 'User not found or user already exist.';
        }

        if (!$ret->error){
            $user = new KcdUsers();
            $user->username     = $username;
            $user->password     = md5("kcd.dzero@$username".$password);
            $user->access_token = base64_encode(md5("$username:$password:".time()));
            $user->lastlogin    = date('Y-m-d H:i:s');

            if ($user->save(false)){
                unset($user->password);
                $ret->user = $user;
            }
        }

        return $ret;
    }

    public function actionUpdateProfile()
    {
        $ret = new \stdClass;
        $ret->error = false;

        $request = \Yii::$app->request;
        $token = $request->post('token');

        $user = KcdUsers::findOne(['access_token'=>$token]);
        if ($user){
            $firstname = $request->post('firstname');
            $lastname = $request->post('lastname');
            $phone = $request->post('phone');
            $dob = $request->post('dob');
            $country = $request->post('country');
            $city = $request->post('city');
            $district = $request->post('district');
            $gender = $request->post('gender');
            $looking_for = $request->post('looking_for');
            //$image = $request->post('profile');
            //$location = $request->post('location');

            $details = new KcdUserDetails();
            $have_details = KcdUserDetails::findOne(['user_id'=>$user->id]);
            if ($have_details){
                $details = $have_details;
                $details->updated_at = date('Y-m-d H:i:s');
            } else {
                $details->created_at = date('Y-m-d H:i:s');
                $details->updated_at = date('Y-m-d H:i:s');
            }

            $details->user_id = $user->id;
            $details->firstname = $firstname;
            $details->lastname = $lastname;
            $details->phone = $phone;
            $details->dob = $dob;
            $details->country = $country;
            $details->city = $city;
            $details->district = $district;
            /* $details->profile_image = $image;
            $details->map_location = $location */;
            $details->gender = $gender;
            $details->looking_for = $looking_for;


            if ($details->save(false)){
                $ret->details = $details;
            }
        } else {
            $ret->error = true;
            $ret->message = 'User not found.';
        }

        return $ret;
    }

    public function actionPeople(){
        $ret = new \stdClass;
        $ret->error = false;

        $request = \Yii::$app->request;
        $district = $request->post('district');
        $city = $request->post('homearea');
        $gender = $request->post('gender');

        $query_data = [];
        if (isset($district) && !empty($district)) $query_data['district'] = $district;
        if (isset($city) && !empty($city)) $query_data['city'] = $city;
        if (isset($gender) && !empty($gender)) $query_data['gender'] = $gender;
        
        $ret->people = count($query_data) == 0 ? KcdUserDetails::find()->all() : KcdUserDetails::findAll($query_data);

        return $ret;
    }


}
