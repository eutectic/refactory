class UsersController < ApplicationController
  before_filter :authenticate_user!

  def create
    Users.create{params[:user]}
  end
  
  def index
    authorize! :index, @user, :message => 'Not authorized as an administrator.'
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    authorize! :update, @user, :message => 'Not authorized as an administrator.'
    @user = User.find(params[:id])
    #user_params = params.require(current_user.admin?).permit(:role)
    #if @user.update_attributes(params[:user], :as => :admin)
    
    if @user.update_attributes(params[:user].permit(:role_ids))
   
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user."
    end
  end

  def destroy
    authorize! :destroy, @user, :message => 'Not authorized as an administrator.'
    user = User.find(params[:id])
    unless user == current_user
      user.destroy
      redirect_to users_path, :notice => "User deleted."
    else
      redirect_to users_path, :notice => "Can't delete yourself."
    end
  end
end