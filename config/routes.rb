Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      get '/places', to: "places#index"
      post '/internet_speeds/create', to: 'internet_speeds#create'
    end
  end

  get '*path', to: "application#index"
  root 'application#index'
end
