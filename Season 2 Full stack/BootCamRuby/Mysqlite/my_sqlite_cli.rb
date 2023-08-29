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
    command, table, rest = input.split(" ", 3)
    puts table, rest
    case command.downcase
    when "select"
      columns = rest.split(" ") unless rest.nil?
      request = MySqliteRequest.new.select(*columns).from(table)
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
