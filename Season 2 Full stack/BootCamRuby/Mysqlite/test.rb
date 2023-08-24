require 'csv'

class MySqliteRequest

  def initialize
    @table_name = nil
    @columns = []
    @where_conditions = []
    @join_conditions = []
    @order_by = nil
    @order_direction = nil
    @insert_data = {}
    @update_data = {}
    @delete_conditions = []
  end

  def from(table_name)
    @table_name = table_name
     #checking if no table name specified
    if @table_name.nil?
      raise "No table specified"
    end
    self
  end

  def select(*columns)
    @columns = columns
    self
  end

  def where(column_name, value)
    @where_conditions << { column_name: column_name, value: value }
    self
  end

  def join(column_on_db_a, filename_db_b, column_on_db_b)
    @join_conditions << { column_on_db_a: column_on_db_a, filename_db_b: filename_db_b, column_on_db_b: column_on_db_b }
    self
  end

  def order(order_by, order_direction = nil)
    @order_by = order_by
    @order_direction = order_direction
    self
  end

  def insert(table_name)
      #checking if no table name specified
      @table_name = table_name
      if @table_name.nil?
        raise "No table specified"
      end
      self
  end

  def values(data)
    @insert_data = data
    self
  end

  def update(table_name)
    @table_name = table_name
    self
  end

  def set(*data)
    @update_data = data
    self
  end

  def delete
    @delete_conditions = @where_conditions
    self
  end

  # def where_delete(column_name, value)
  #   @delete_conditions << { column_name: column_name, value: value }
  #   self
  # end

  def run
   #reading file spcifying that it contains headers
   result = CSV.read(@table_name, headers: true)
    
    #checking if where clause specified if not choose all columns
    if @columns.empty?
      @columns = result.headers
    end
   
    #checking for a join condition
    if @join_conditions.any?
      result = result.map do |row|
        @join_conditions.each do |condition|
          join_table = CSV.read(condition[:filename_db_b], headers: true)
          matching_row = join_table.find { |join_row| join_row[condition[:column_on_db_b]] == row[condition[:column_on_db_a]] }
          puts row
          row.to_h.merge!(matching_row.to_h)
        end
        row
      end
    end
    
    # #checking for where condition specified
    # if @where_conditions.any?
    #   puts @where_conditions
    #   result = result.select do |row|
    #     @where_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
    #   end
    # end

    #Handling or displaying only specified columns
    # if @columns
    #   result = result.map { |row| row.select { |k, v| @columns.include?(k)} }
    #   #puts result
    # end

    #ordering the columns to be displayed if order clause is specified
    # if @order_by
    #   #puts @order_by
    #   result = result.sort_by { |row| row[@order_by.to_i] } if @order_direction == "asc"
    #   result = result.sort_by { |row| row[@order_by.to_i] }.reverse if @order_direction == "desc"
    # end

    # #inserting data at the end of the table
    # if @table_name && @insert_data.any?
    #   puts @table_name, @insert_data
    #   CSV.open(@table_name, 'a') do |csv|
    #     csv << @insert_data.values
    #   end
    # end

    # if @table_name && @update_data.any?
    #   puts @table_name, @update_data
    #   result.each do |row|
    #     if @where_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
    #       @update_data.each { |key, value| row[key] = value }
    #     end
    #   end

    #   #rewritting the headers and rows to ensure that data was updated and current data is not stale
    #   CSV.open(@table_name, 'w') do |csv|
    #     csv << result.headers
    #     result.each { |row| csv << row }
    #   end
    # end

    
  #   if @delete_conditions.any? 
  #     result.delete_if { |row|  
  #       @delete_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
  #     }
     
  #     #rewritting the headers and rows to ensure that data was deleted and current data is not stale
  #     CSV.open(@table_name, 'w') do |csv|
  #       csv << result.headers
  #       result.each { |row| csv << row }
  #     end
  #   end

  puts result.map(&:to_h).inspect
   end
end


request = MySqliteRequest.new()
#request = request.from('data.csv').select("name").where('position', 'G').order("name","desc").run
#request = request.update("data.csv").set({"position" => "G"}).where("name","Mahmoud Abdul-Rauf").run
request = request.from('data.csv').select.join("year_start","data1.csv","year_end").run