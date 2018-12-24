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

            /* $utoken = new KcdUserToken();
            $oldtoken = KcdUserToken::findOne(['user_id' => $user->id]);
            if ($oldtoken){
                $utoken->user_id = $user->id;
            }
            $utoken->token = $ret->token;
            $utoken->created_at = date('Y-m-d H:i:s');
            $utoken->save(); */
        }

        return $ret;
    }

    public function actionSignup()
    {
        $ret = new \stdClass;
        $ret->error = false;

        $request = \Yii::$app->request;
        $firstname = $request->post('firstname');
        $lastname = $request->post('lastname');
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
            $user->firstname    = $firstname;
            $user->lastname     = $lastname;
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
            $dob = $request->post('dob');
            $language = $request->post('language');
            $phone1 = $request->post('phone1');
            $phone2 = $request->post('phone2');
            $email = $request->post('email');
            $looking_for = $request->post('looking_for');
            $country = $request->post('country');
            $city = $request->post('city');
            //$profile = $request->post('profile');
            $location = $request->post('location');

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
            $details->dob = $dob;
            $details->language = $language;
            $details->phone1 = $phone1;
            $details->phone2 = $phone2;
            $details->email = $email;
            $details->looking_for = $looking_for;
            $details->country = $country;
            $details->city = $city;
            $details->location = $location;
            if ($details->save(false)){
                $ret->details = $details;
            }
        } else {
            $ret->error = true;
            $ret->message = 'User not found.';
        }

        return $ret;
    }

}
