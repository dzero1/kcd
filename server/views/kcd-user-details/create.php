<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\KcdUserDetails */

$this->title = 'Create Kcd User Details';
$this->params['breadcrumbs'][] = ['label' => 'Kcd User Details', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="kcd-user-details-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
