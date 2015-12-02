Rails.application.routes.draw do
  resources :todos
  mount_ember_app :frontend, to: "/app"
end
