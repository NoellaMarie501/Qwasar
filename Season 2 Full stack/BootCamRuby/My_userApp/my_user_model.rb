#gem install sqlite3
require 'sqlite3'
require 'json'


class User
    #Creating a new instance of the SQLite3::Database class that is new db
    @db = SQLite3::Database.new('db.sql')
    attr_accessor :firstname, :lastname, :age, :password, :email

  def initialize(firstname, lastname, age, password, email)
      @firstname = firstname
      @lastname = lastname
      @age = age
      @password = password
      @email = email
      User.create_table() #calling the create_table method to create table if not exist
      #@db.close
  end

  #Create a new user method
  def self.create(user_info)
    @db.execute("INSERT INTO users (firstname, lastname, age, password, email) VALUES (?, ?, ?, ?, ?)", user_info)
    if(@db.last_insert_row_id)
        puts "User created"
        id = @db.last_insert_row_id
        new_user = findId(id) #retriving the last inserted row to find out if user was created successfully  
      #  @db.close
        user = User.new(new_user[:firstname], new_user[:lastname], new_user[:age],'', new_user[:email])
        return user
    else
    #  @db.close
      return 0
    end
  end
 
 #Method for Finding a user by user email
 def self.findEmail(user_email)
    id, firstname, lastname, age, user_password, email = @db.execute("SELECT * FROM users WHERE email = ?", user_email).first
    user = { id: id, firstname: firstname, lastname: lastname, age: age, user_password:user_password, email: email } 
   # @db.close
    return user
   
  end

  #Method for Finding a user by user id
  def self.findId(user_id)
      id, firstname, lastname, age, user_password, email = @db.execute("SELECT * FROM users WHERE id = ?", user_id).first
      user = { id: id, firstname: firstname, lastname: lastname, age: age, user_password:user_password, email: email }
      #@db.close
      return user
      
  end


  #Retriving all users and placing them into a 'users' array containing a 'user' array with the various attributes
  def self.all
    users = {}
    @db.execute("SELECT * FROM users").each do |user|
      users[user[0]] = { firstname: user[1], lastname: user[2], age: user[3], email: user[5] }
    end 
    #@db.close
    return users
   
  end

  #Method to retrive all users to be displayed on the rendered html page
  def self.all_index
    users= []
    @db.execute("SELECT * FROM users").each do |user|
      id, firstname, lastname, age, user_password, email = user
      useful = {firstname: firstname, lastname: lastname, age: age, email: email }
      users.push(useful)#appending each user in the users array 
     
    end 
    #@db.close
    return users
   
  end

  #Updating a user using the user id
  def self.update(user_id, attribute, value)
    @db.execute("UPDATE users SET #{attribute} = ? WHERE id = ?", value, user_id)
    user = findId(user_id)#retrive the the user after updating
   # @db.close
    return user.reject { |key, value| key == :user_password }
    
  end


  #Deleting a user using the user id
  def self.destroy(user_id)
    num_deleted = @db.execute("DELETE FROM users WHERE id = ?", user_id)
    if !num_deleted
        puts "no user deleted deleted"
       # @db.close
        return false
    else
        puts "deleted successfully"
        #@db.close
        return true
    end
    
  end


  #Methode to authenticate user(create session)
  def self.authenticate(email, password)

   user = findEmail(email)
    if !user
     # @db.close
       return "no user matched"
    elsif user[:user_password] != password
      #@db.close
        return "password or email incorrect"
    else
        puts "authentication successful"
      #  @db.close
        return user.reject { |key, value| key == :user_password }
    end
  end
  


  private
  #method to create a table if it doesn't exist as a private method instances of the class do not call the method
  def self.create_table
    @db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, age INTEGER, password TEXT, email TEXT)")
  end
end




#user1 = User.new
# user_info = ['John', 'Doe', 30, 'password123', 'john.doe@example.com']
# id = user1.create(user_info)
# del = user1.destroy(id)
# puts del
#user1.update(1,'firstname', 'noel')