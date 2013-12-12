class AddFirstNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name,  :string
    add_column :users, :last_name, :string
    add_column :users, :company, :string
    add_column :users, :phone_number, :string
    add_column :users, :street_address1, :string
    add_column :users, :street_address2, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :string
  end
end
