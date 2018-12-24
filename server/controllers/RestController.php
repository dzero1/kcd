<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\rest\Controller;
use yii\filters\auth\HttpBasicAuth;
use app\models\KcdUserToken;
use yii\filters\auth\HttpBearerAuth;
use app\models\KcdUsers;

class RestController extends Controller
{

    public $request;

    public $enableCsrfValidation = false;

    public $headers;


    public function behaviors()
    {
        $behaviors = parent::behaviors();

        //$behaviors['user'] = 'app\models\KcdUsers';

        $behaviors['rateLimiter']['enableRateLimitHeaders'] = true;

        // $behaviors['authenticator'] = [
        //     'class' => HttpBearerAuth::className(),
        //     'except' => ['options'],
        // ];

        /* $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
            'except' => ['OPTIONS'],
            'auth' => function ($username, $password) {
                $password = md5("kcd.dzero@$username".$password);
                //$user = KcdUsers::findOne(['token' => base64_encode("$username:$password")]);
                $user = KcdUsers::findOne(['username' => $username, 'password' => $password]);
                if ($user->verifyPassword($password)) {
                    return $user;
                }
                return null;
            },
        ]; */

        /* $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
            'except' => ['OPTIONS'],
            'auth' => function ($username, $password) {
                $password = md5("kcd.dzero@$username".$password);
                $user = KcdUserToken::findOne(['token' => base64_encode("$username:$password")]);
                if ($user->verifyPassword($password)) {
                    return $user;
                }
                return null;
            },
        ]; */
        
        /* $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
            'except' => ['OPTIONS', 'signin', 'signup'],
            //'user' => KcdUsers::className()
        ]; */

        $behaviors['corsFilter'] = [
            'class' => Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Allow-Origin' => ['*'],
                'Access-Control-Request-Method' => ['POST', 'HEAD', 'OPTIONS'], //['GET', , 'PUT', 'PATCH', 'DELETE'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => null,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => []
            ]
        ];

        //        $behaviors['corsFilter'] = [
        //            'class' => CorsCustom::className(),
        //        ];

        $behaviors['contentNegotiator'] = [
            'class' => 'yii\filters\ContentNegotiator',
            'formats' => [
                'application/json' => \yii\web\Response::FORMAT_JSON,
            ]
        ];

        return $behaviors;
    }

    public function createResponse($code, $data){
        return [
            'status' => $code,
            'data'   => $data,
        ];
    }

    public function init()
    {
        $this->request = json_decode(file_get_contents('php://input'), true);

        if($this->request && !is_array($this->request)){
            Yii::$app->api->sendFailedResponse(['Invalid Json']);

        }

    }

    public function permission_required($permission){
        if(!Yii::$app->user->can($permission)){
            throw new \Exception('Access Denied');
        }
    }

    public function beforeAction($action)
    {
        //your code
        Yii::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Origin', '*');

        if (Yii::$app->getRequest()->getMethod() === 'OPTIONS') {
            parent::beforeAction($action);
            Yii::$app->getResponse()->getHeaders()->set('Access-Control-Allow-Credentials', 'true');
            Yii::$app->end();
        }

        return parent::beforeAction($action);
    }

}
