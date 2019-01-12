<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel app\models\KcdUsersSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Kcd Users';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="kcd-users-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php Pjax::begin(); ?>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Kcd Users', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'username',
            'firstname',
            'lastname',
            'phone',
            'phone2',
            //'password',
            //'access_token',
            [
                'attribute' => 'blocked',
                'value' => function ($model) {
                    return $model->blocked == 1 ? 'Yes' : 'No';
                },
                'format' => 'html'
            ],
            'created',
            'lastlogin',

            //['class' => 'yii\grid\ActionColumn'],

            ['class' => 'yii\grid\ActionColumn',
                'header' => 'Actions',
                //'context' => $this->context,
                'template' => '{view} {block} {unblock} {delete}',
                'buttons' => [
                    'view' => function ($url, $model) {
                        return Html::a('<span class="fa fa-search"></span><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>', $url, [
                            'title' => 'View',
                            'class' => 'btn btn-primary btn-sm',
                            'data-method' => 'post',
                            'style' => ' text-decoration: none; }',
                        ]);
                    },
                    'block' => function ($url, $model) {
                        if ($model->blocked == 0 ) {
                            return Html::a('<span class="fa fa-search"></span><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>', $url, [
                                'title' => 'Block',
                                'class' => 'btn btn-warning btn-sm',
                                'data-confirm' => Yii::t('yii', 'Are you sure you want to block this user ?'),
                                'data-method' => 'post',
                                'style' => ' text-decoration: none; }',
                            ]);
                        }
                    },
                    'unblock' => function ($url, $model) {
                        if ($model->blocked == 1 ) {
                            return Html::a('<span class="fa fa-search"></span><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>', $url, [
                                'title' => 'Unblock',
                                'class' => 'btn btn-success btn-sm',
                                'data-confirm' => Yii::t('yii', 'Are you sure you want to unblock this user ?'),
                                'data-method' => 'post',
                                'style' => ' text-decoration: none; }',
                            ]);
                        }
                    },
                    'delete' => function ($url, $model) {
                        return Html::a('<span class="fa fa-search"></span><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>', $url, [
                            'title' => 'Remove',
                            'class' => 'btn btn-danger btn-sm',
                            'data-confirm' => Yii::t('yii', 'Are you sure you want to remove this user?'),
                            'data-method' => 'post',
                            'style' => ' text-decoration: none; }',
                        ]);
                    },
                ],
            ],



        ],
    ]); ?>
    <?php Pjax::end(); ?>
</div>
