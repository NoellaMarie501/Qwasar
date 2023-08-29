require 'readline'
require_relative 'test'

puts "MySQLite version 0.1 #{Time.now.strftime('%Y-%m-%d')}"
prompt = "my_sqlite_cli> "

loop do
  input = Readline.readline(prompt, true)
  puts input
  #break if input == "quit\n"

  begin
    # Parse the user input
    command, rest = input.split(" ", 2)
   # query = rest.split(" ")
   # puts command
   request = nil
    case command.downcase
    when "select"
        # if query[1] == '*'
        #     columns = []
        # else
        # columns = query[1].split(,)
        # end
        #getting the columns
        columnset, rest = rest.split(" FROM ")
        columnset = columnset.split(',')
        columns = []
        columnset.each do |column|
          columns << column.strip
        end

        #Getting the table name and where conditions
        table, conditionset = rest.split(" WHERE ")
        column_name, value = conditionset.split(" = ")
        value = value.gsub(/"/, "")
       

        #where = rest.split(" WHERE ")
        puts "columns =", columns
        puts "table =", table
        puts "column name =", column_name
        puts "value =", value

        request = MySqliteRequest.new.from(table).select(columns).where(column_name, value)
    when "insert"
      data = rest.split(",") unless rest.nil?
      request = MySqliteRequest.new.insert(table).values(data)
    when "update"
      set_clause, where_clause = rest.split(" where ")
      data = Hash[set_clause.split(",").map { |pair| pair.split("=").map(&:strip) }]
      column, value = where_clause.split("=").map(&:strip)
      request = MySqliteRequest.new.update(table).set(data).where(column, value)
    when "delete"
      column, value = rest.split("=").map(&:strip)
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
