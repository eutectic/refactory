class User < ActiveRecord::Base
  has_many :designs
  before_create :setup_default_role_for_new_users
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  private
  def setup_default_role_for_new_users
    if not(self.has_any_role?)
      self.add_role "user"
    end
  end
    
end
