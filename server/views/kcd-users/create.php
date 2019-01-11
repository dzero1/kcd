<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\KcdUsers */

$this->title = 'Create Kcd Users';
$this->params['breadcrumbs'][] = ['label' => 'Kcd Users', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="kcd-users-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
