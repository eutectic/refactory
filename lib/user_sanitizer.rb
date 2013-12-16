class User::ParameterSanitizer < Devise::ParameterSanitizer
    private
    def account_update
      default_params.permit(:first_name, :last_name,:company,:street_address1, :street_address2, :city, :state,:zip,:phone_number, :email, :password, :password_confirmation, :current_password)
    end
  
    def sign_up
      default_params.permit(:first_name, :last_name,:company,:street_address1, :street_address2, :city, :state,:zip,:phone_number, :email, :password, :password_confirmation, :current_password)
    end
end

# this is from this http://blog.12spokes.com/web-design-development/adding-custom-fields-to-your-devise-user-model-in-rails-4/ blog