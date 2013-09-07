class VisitorsController < ApplicationController

  def new

  end
  
  def user
    @users = User.all
  end

end