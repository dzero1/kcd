<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\KcdUserDetails */

$this->title = 'Update Kcd User Details: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Kcd User Details', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="kcd-user-details-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
