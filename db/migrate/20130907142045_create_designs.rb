class CreateDesigns < ActiveRecord::Migration
  def change
    create_table :designs do |t|
      t.integer :user_id
      t.string :status
      t.datetime :created
      t.datetime :submitted
      t.json :data

      t.timestamps
    end
    add_index :designs, :user_id
  end
end
