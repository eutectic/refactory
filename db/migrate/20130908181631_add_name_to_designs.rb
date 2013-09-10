class AddNameToDesigns < ActiveRecord::Migration
  def change
    add_column :designs, :name, :string
  end
end
