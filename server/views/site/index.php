<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Side-dish Admin panel!</h1>
    </div>

    <div class="body-content">

        <div class="row">
            <div class="col-lg-4">
            </div>
            <div class="col-lg-4">
                <h3>Highlights</h3>

                <table>
                    <tr>
                        <td>Total number of registerd users: </td>
                        <td><?php echo $users_count; ?></td>
                    </tr>
                </table>

            </div>
            <div class="col-lg-4">
            </div>
        </div>

    </div>
</div>
