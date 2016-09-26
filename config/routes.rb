Rails.application.routes.draw do

  resources :projects, :defaults => { :format => 'json' }, only: [:index, :new, :create] do
  end
  
  get 'session_handler/show'

  get "/auth/:provider/callback" => "session_handler#create"

  get "/signout" => "session_handler#destroy", :as => :signout

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
