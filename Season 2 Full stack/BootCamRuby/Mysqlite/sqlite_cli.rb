require 'readline'
require_relative 'test'

puts "MySQLite version 0.1 #{Time.now.strftime('%Y-%m-%d')}"
prompt = "my_sqlite_cli> "

loop do
  input = Readline.readline(prompt, true)
  #puts input
  #break if input == "quit\n"

  begin
    # Parse the user input
    command, rest = input.split(" ", 2)
   # query = rest.split(" ")
   # puts command
    
    case command.downcase
    when "select"  
      request = MySqliteRequest.new

        if rest.include?("ORDER BY") && rest.include?("JOIN")
          rest, orderby = rest.split(" ORDER BY ", 2)
          column, order = orderby.split(" ")
          rest, join = rest.split(" JOIN ", 2)
          join_table, join_clause = join.split(" ON ",2)
          column_on_db_a, column_on_db_b = join_clause.gsub(/[ ]/, '').split('=')
          request = request.join(column_on_db_a, join_table, column_on_db_b).order(column, order.downcase)
        elsif rest.include?("JOIN")
          rest, join = rest.split(" JOIN ", 2)
          request = request.join()
        elsif rest.include?("ORDER BY")
          rest, orderby = rest.split(" ORDER BY ", 2)
          column, order = orderby.split(" ")
          request = request.order(column, order)
        end
        #getting the columns
        columnset, rest = rest.split(" FROM ")
        columns = nil
        columns = columnset.gsub(/[ ]/, '').split(',')if columnset != '*'  #getting columns to be displayes triming off spaces
        
        #Getting the table name and where conditions
        if rest.include?("WHERE")
          table, conditionset = rest.split(" WHERE ") 
          column_name, value = conditionset.split(" = ")
          column_name = column_name.gsub(/[ "';]/, "")
          value = value.gsub(/["';]/, "")
         
        else 
          table = rest
        end
      # puts columns
       request = request.from(table).select(*columns).where(column_name, value)

    when "insert"
      table_keys, values = rest.split(" VALUES ")
      table_keys = table_keys.split(" ",3)
      table = table_keys[1]#gettintg table or file name
      hash_data = nil
      if table_keys.count() == 3 
         keys = table_keys[2].gsub(/[( ';)"]/, '').split(',')#ontaining keys if passed in request
      else 
        csv = CSV.read(table, headers: true)
        keys = csv.headers#obtaining keys from csv file if not passed in request
      end
      values = values.gsub(/[( ";')]/, '').split(",")#gettintg the values to be inserted and removing special characters
      hash_data = keys.zip(values).to_h# creating a hash the values
      request = MySqliteRequest.new.insert(table).values(hash_data)

    when "update"

      table, rest = rest.split(" SET ")
      values, conditions_set = rest.split(" WHERE ")
      values = values.gsub(/[( ';")]/, '').split(',')
      hash_values = values.map { |pair| pair.split('=') }.to_h
      column, value = conditions_set.gsub(/[ ;'"]/, '').split("=")
      #puts "table= #{table}", "hash_values= #{hash_values}", "column= #{column}", "value= #{value}"
      request = MySqliteRequest.new.update(table).set(hash_values).where(column,value)

    when "delete"
      table, conditions = rest.split(" WHERE ")
      table = table.split(" ").last
      column, value = conditions.gsub(/[ ';"]/, '').split("=")
      #puts "table= #{table}","column= #{column}", "value= #{value}"
      request = MySqliteRequest.new.delete.from(table).where(column, value)

    when "quit"
        puts "Bye!"
        break
    else
      puts "Invalid command"
      next
    end

    # Execute the request and print the result
    request.run
  rescue StandardError => e
    puts "Error: #{e.message}"
  end
end



#INSERT INTO noel.csv ("type", "name", "age") VALUES ("John", "john@johndoe.com", "A")
#SELECT name, email FROM noel.csv WHERE name = "Marie" ORDER BY age DESC
#SELECT name, email FROM noel.csv WHERE name = "Marie" JOIN marie.csv ON age = amount  ORDER BY age DESC
#UPDATE noel.csv SET email = 'jane@janedoe.com', age = '123456' WHERE name = 'Marie';
#DELETE FROM noel.csv WHERE name = 'Marie'