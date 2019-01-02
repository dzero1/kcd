<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\KcdUserDetails;

/**
 * KcdUserDetailsSearch represents the model behind the search form of `app\models\KcdUserDetails`.
 */
class KcdUserDetailsSearch extends KcdUserDetails
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'married', 'children'], 'integer'],
            [['firstname', 'lastname', 'phone', 'dob', 'country', 'district', 'city', 'profile_image', 'education', 'tribe', 'language', 'map_location', 'gender', 'looking_for', 'created_at', 'updated_at'], 'safe'],
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
        $query = KcdUserDetails::find();

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
        $query->andFilterWhere([
            'id' => $this->id,
            'user_id' => $this->user_id,
            'married' => $this->married,
            'children' => $this->children,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);

        $query->andFilterWhere(['like', 'firstname', $this->firstname])
            ->andFilterWhere(['like', 'lastname', $this->lastname])
            ->andFilterWhere(['like', 'phone', $this->phone])
            ->andFilterWhere(['like', 'dob', $this->dob])
            ->andFilterWhere(['like', 'country', $this->country])
            ->andFilterWhere(['like', 'district', $this->district])
            ->andFilterWhere(['like', 'city', $this->city])
            ->andFilterWhere(['like', 'profile_image', $this->profile_image])
            ->andFilterWhere(['like', 'education', $this->education])
            ->andFilterWhere(['like', 'tribe', $this->tribe])
            ->andFilterWhere(['like', 'language', $this->language])
            ->andFilterWhere(['like', 'map_location', $this->map_location])
            ->andFilterWhere(['like', 'gender', $this->gender])
            ->andFilterWhere(['like', 'looking_for', $this->looking_for]);

        return $dataProvider;
    }
}
