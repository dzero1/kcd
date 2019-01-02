<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\KcdUserDetailsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Kcd User Details';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="kcd-user-details-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Create Kcd User Details', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'user_id',
            'firstname',
            'lastname',
            'phone',
            //'dob',
            //'country',
            //'district',
            //'city',
            //'profile_image',
            //'married',
            //'education',
            //'tribe',
            //'children',
            //'language',
            //'map_location',
            //'gender',
            //'looking_for',
            //'created_at',
            //'updated_at',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
