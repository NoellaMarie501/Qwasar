#gem install sqlite3
require 'sqlite3'

class User
    #Creating a new instance of the SQLite3::Database class that is new db
  def initialize
    @db = SQLite3::Database.new('db.sql')
    if !@db 
        puts "not connected"
    end
    create_table #calling the create_table method to create table if not exist
  end

  #Create a new user method
  def self.create(user_info)
    @db.execute("INSERT INTO users (firstname, lastname, age, password, email) VALUES (?, ?, ?, ?, ?)", user_info)
    if(@db.last_insert_row_id)
        puts "User created"
        puts "Id : ", @db.last_insert_row_id
        return @db.last_insert_row_id #retriving the last inserted row to find out if user was created successfully 
    else
        return 0
    end
  end
 
  

  #Method for Finding a user by user id
  def self.find(user_id)
    user = @db.execute("SELECT * FROM users WHERE id = ?", user_id)
    puts user
    return user
  end


  #Retriving all users and placing them into a 'users' array containing a 'user' array with the various attributes
  def self.all
    users = {}
    @db.execute("SELECT * FROM users").each do |user|
      users[user[0]] = { firstname: user[1], lastname: user[2], age: user[3], password: user[4], email: user[5] }
    end
    puts users
    return users
  end


  #Updating a user using the user id
  def self.update(user_id, attribute, value)
    @db.execute("UPDATE users SET #{attribute} = ? WHERE id = ?", value, user_id)
    find(user_id)#display the the user after updating
  end


  #Deeleting a user using the user id
  def self.destroy(user_id)
    num_deleted = @db.execute("DELETE FROM users WHERE id = ?", user_id)
    if !num_deleted
        puts "none deleted"
        return 0
    else
        puts "deleted successfully"
        return num_deleted
    end
  end


  #Methode to authenticate user(create session)
  def self.authenticate(email, password)
    user = @db.execute("SELECT * FROM users WHERE email = ?", email)
    if !user
      return "no user matched"
    else 
      return user
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