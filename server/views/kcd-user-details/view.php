<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\KcdUserDetails */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Kcd User Details', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="kcd-user-details-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'user_id',
            'firstname',
            'lastname',
            'phone',
            'dob',
            'country',
            'district',
            'city',
            'profile_image',
            'married',
            'education',
            'tribe',
            'children',
            'language',
            'map_location',
            'gender',
            'looking_for',
            'created_at',
            'updated_at',
        ],
    ]) ?>

</div>
