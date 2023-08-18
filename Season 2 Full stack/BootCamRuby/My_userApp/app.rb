require 'sinatra'
require 'json'
require_relative 'my_user_model'
require 'erb'

enable :sessions
set :session_secret, "65b17d02a096d87115b496e4bcd6a083dcc94f0cfdd4fcc015f53e3dfd8aa499"
set :session_expire_after, 90 # Expires after 1 hour

configure do
  set('views', './views')# setting the view directory path for sinatra not to use the defalut path
end

set :port, 3000

#User = User.new()#creating user instance preferable for manipulation

# GET all users
  get '/users' do
    users = User.all
   return users.to_json #converting each user to json string
  end

  # POST(create user)
  post '/users' do
    user_info = [params['firstname'], params['lastname'], params['age'], params['password'], params['email']]# receiving params from request
    user = User.create(user_info)
    return user.to_json
  end
  
  # POST on /sign_in
  post '/sign_in' do
    email = params['email']
    password = params['password']
    user = User.authenticate(email, password)
    if user == "no user matched" || user == "password or email incorrect"
      # Return an error message if authentication fails
      return { error: "Invalid email or password" }.to_json
    else
      # Set the user ID in the session and return the user data
      session[:user_id] = user[:id]
      return user.to_json
    end
  end
  
  
  # PUT on users(update password)
  put '/users' do
    user = User.findId(session[:user_id])
    email = params['email']
    password = params['password']
    user_email = User.findEmail(email)
    if !session[:user_id] || !user_email
      return "User not logged in or not found"
    end
    id = user[:id]
   updated_user = User.update(id,'password', password)
   puts "User updated"
   return updated_user.to_json
    #user.except('password').to_json
  end
  
  # DELETE on /sign_out
  delete '/sign_out' do
    session.clear
    if session[:user_id]
      return "User not signed out"
    end
    puts "User signed out"
    status 204
    
  end
  
  # DELETE on /users
  delete '/users' do
   if !session[:user_id]
      return "User not logged in"
   end
   user = User.findId(session[:user_id])
   session.clear
   User.destroy(user[:id])
   status 204
  end
  #route to render html page
  get '/' do
    users = User.all_index
    erb :'index.html', locals: { users: users }
  end