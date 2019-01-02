<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\KcdUserDetailsSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="kcd-user-details-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'user_id') ?>

    <?= $form->field($model, 'firstname') ?>

    <?= $form->field($model, 'lastname') ?>

    <?= $form->field($model, 'phone') ?>

    <?php // echo $form->field($model, 'dob') ?>

    <?php // echo $form->field($model, 'country') ?>

    <?php // echo $form->field($model, 'district') ?>

    <?php // echo $form->field($model, 'city') ?>

    <?php // echo $form->field($model, 'profile_image') ?>

    <?php // echo $form->field($model, 'married') ?>

    <?php // echo $form->field($model, 'education') ?>

    <?php // echo $form->field($model, 'tribe') ?>

    <?php // echo $form->field($model, 'children') ?>

    <?php // echo $form->field($model, 'language') ?>

    <?php // echo $form->field($model, 'map_location') ?>

    <?php // echo $form->field($model, 'gender') ?>

    <?php // echo $form->field($model, 'looking_for') ?>

    <?php // echo $form->field($model, 'created_at') ?>

    <?php // echo $form->field($model, 'updated_at') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
