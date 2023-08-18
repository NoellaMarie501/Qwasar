require 'sinatra'
require 'json'
require_relative 'my_user_model'

set :port, 3001

# GET all users
  get '/users' do
    users = User.all
    users.map { |user| user.except('password') }.to_json #converting each user to json string
  end

  # POST(create user)
  post '/users' do
    user_info = [params['firstname'], params['lastname'], params['age'], params['password'], params['email']]# receiving params from request
    user_id = User.create(user_info)
    User.find(user_id).except('password').to_json #returns user except password
  end
  
  # POST on /sign_in
  post '/sign_in' do
    email = params['email']
    password = params['password']
    user = User.authenticate(email, password)
    #session[:user_id] = user['id']
    user.except('password').to_json
  end
  
  # PUT on users(update password)
  put '/users' do
    #user = User.find(session[:user_id])
    id = params['id']
    password = params['password']
    user = User.find(id)
    user.update('password', password)
    user.except('password').to_json
  end
  
  # DELETE on /sign_out
  delete '/sign_out' do
    session.clear
    status 204
  end
  
  # DELETE on /users
  delete '/users' do
    user = User.find(session[:user_id])
    user.destroy
    session.clear
    status 204
  end
  