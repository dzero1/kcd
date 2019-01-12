<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\KcdUsers;

/**
 * KcdUsersSearch represents the model behind the search form of `app\models\KcdUsers`.
 */
class KcdUsersSearch extends KcdUsers
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['username', 'password', 'access_token', 'created', 'lastlogin', 
                'firstname', 'lastname',  'phone', 'phone2', 'blocked'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = KcdUsers::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->select('kcd_users.*, kcd_user_details.*');
        $query->innerJoin('kcd_user_details', 'kcd_user_details.user_id = kcd_users.id');
        $query->andFilterWhere([
            'id' => $this->id,
            'created' => $this->created,
            'lastlogin' => $this->lastlogin,
        ]);

        $query->andFilterWhere(['like', 'username', $this->username])
            ->andFilterWhere(['like', 'password', $this->password])
            ->andFilterWhere(['like', 'kcd_user_details.firstname', $this->firstname])
            ->andFilterWhere(['like', 'kcd_user_details.lastname', $this->lastname])
            ->andFilterWhere(['like', 'access_token', $this->access_token]);

        return $dataProvider;
    }
}
