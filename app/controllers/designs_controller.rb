class DesignsController < ApplicationController
   before_filter do
     params[:design] &&= design_params
  end
  load_and_authorize_resource
  
  def index
    
    
    @designs = Design.where(:user_id => current_user.id)
    
   end
  
  def show
    
  end 
  
  def new

    @design = Design.new()
     end

 

   

  
  
  def create
     
    @design = Design.new(design_params)
    @design.save

  end
  
  def show
  
  end
  
  private
  def design_params
    params.require(:design).permit(:user_id, :name, :data)
  end
  

end
  

