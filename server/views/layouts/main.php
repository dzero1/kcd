<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

use webvimark\modules\UserManagement\models\User;
use webvimark\modules\UserManagement\components\GhostMenu;
use webvimark\modules\UserManagement\UserManagementModule;
use webvimark\modules\UserManagement\components\GhostNav;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => Yii::$app->name,
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    echo GhostNav::widget([
        'encodeLabels'=>false,
        'activateParents'=>true,
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            [
                'label' => 'Side-dish',
                'items'=>[
                    ['label' => 'Registerd Users', 'url' => ['/kcd-users/index']],
                    //['label'=>'Login', 'url'=>['/user-management/auth/login']],
                ],
            ],
            [
                'label' => 'Management',
                'items'=>UserManagementModule::menuItems()
            ],
            [
                'label' => 'Me',
                'items'=>[
                    //['label'=>'Login', 'url'=>['/user-management/auth/login']],
                    ['label'=>'Logout', 'url'=>['/user-management/auth/logout']],
                    ['label'=>'Change my password', 'url'=>['/user-management/auth/change-own-password']],
                    //['label'=>'Registration', 'url'=>['/user-management/auth/registration']],
                    //['label'=>'Password recovery', 'url'=>['/user-management/auth/password-recovery']],
                    //['label'=>'E-mail confirmation', 'url'=>['/user-management/auth/confirm-email']],
                ],
            ],
        ],
    ]);

    /* echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            ['label' => 'Home', 'url' => ['/site/index']],
            ['label' => 'Users', 'url' => ['/kcd-users/index']],
            //['label' => 'Contact', 'url' => ['/site/contact']],
            Yii::$app->user->isGuest ? (
                ['label' => 'Login', 'url' => ['/site/login']]
            ) : (
                '<li>'
                . Html::beginForm(['/site/logout'], 'post')
                . Html::submitButton(
                    'Logout (' . Yii::$app->user->identity->username . ')',
                    ['class' => 'btn btn-link logout']
                )
                . Html::endForm()
                . '</li>'
            )
        ],
    ]); */
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
