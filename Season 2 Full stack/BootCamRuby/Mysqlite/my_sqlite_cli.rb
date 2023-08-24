puts "MySQLite version 0.1 20XX-XX-XX"
loop do
  print "my_sqlite_cli> "
  input = gets.chomp

  case input
  when /^SELECT/
    # Code for SELECT command here
  when /^INSERT/
    # Code for INSERT command here
  when /^UPDATE/
    # Code for UPDATE command here
  when /^DELETE/
    # Code for DELETE command here
  when /^FROM/
    # Code for FROM command here
  when /^WHERE/
    # Code for WHERE command here
  when /^JOIN/
    # Code for JOIN command here
  when /^quit/
    break
  else
    puts "Invalid command"
  end
end
