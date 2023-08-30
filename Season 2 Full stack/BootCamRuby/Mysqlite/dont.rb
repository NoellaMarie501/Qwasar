require 'csv'
options = { col_sep: ',', quote_char: '"' }

class MySqliteRequest

  def initialize
    @table_name = nil
    @columns = []
    @where_conditions = []
    @join_condition = nil
    @order_by = nil
    @order_direction = nil
    @insert_data = {}
    @update_data = {}
    @delete_conditions = []
    @update_conditions = []
    @select = nil
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
    @select = true
    self
  end

  def where(column_name, value)
    @where_conditions << { column_name: column_name, value: value }
    self
  end

  def join(column_on_db_a, filename_db_b, column_on_db_b)
    @join_condition = { column_on_db_a: column_on_db_a, filename_db_b: filename_db_b, column_on_db_b: column_on_db_b }
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
    @update_conditions = @where_conditions
    self
  end

  def set(data)
    @update_data = data
   
    self
  end

  def delete
    @delete_conditions = @where_conditions
    self
  end

  def run
      #reading file spcifying that it contains headers
      result = CSV.read(@table_name, headers: true)
    
      #checking if where clause specified if not choose all columns
      if @columns.empty? && @select
        puts "columns empty"
        @columns = result.headers
      end

      #checking for where condition specified
      if @where_conditions.any? &&  !@columns.empty?
         #puts @where_conditions, @columns
        result = result.select do |row|
          @where_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
        end
       
        if !@join_condition
          result = result.map { |row| row.select { |k, v| @columns.include?(k)} }
        end
      end
     #puts result

      #checking for a join condition
      if @join_condition
            actual = nil
            matching_row = nil
            join_table = CSV.read(@join_condition[:filename_db_b], headers: true)
            join_table.each { |join_row|
                result.each do |row|
                  if (join_row[@join_condition[:column_on_db_b]] == row[@join_condition[:column_on_db_a]] )
                    matching_row = join_row.to_h 
                    actual = row.to_h
                    
                    break
                  end
                end
                break if matching_row  
            }
            result = matching_row.merge(actual)
            result = result.select { |k, v| @columns.include?(k) }
            
      end

      
      #ordering the columns to be displayed if order clause is specified
      if @order_by 
        
        result = result.sort_by { |row| row[@order_by.to_i] } if @order_direction == "asc"
        result = result.sort_by { |row| row[@order_by.to_i] }.reverse if @order_direction == "desc"
      
        result = [result.to_h]if @join_condition
      end
    
    
      #insertresult
        #puts @table_name, @insert_data
        CSV.open(@table_name, 'a') do |csv|
          csv << @insert_data.values
        end
     

      #Updating tables using the where conditions 
      if @table_name && @update_data.any?
        puts @table_name, @update_data, @update_conditions
        result.each do |row|
          if @update_conditions.all? { |condition|  
            row[condition[:column_name]] == condition[:value]}
            
            @update_data.each { |key, value| 
              row[key] = value
            }
          end 
          row
        end

        #rewritting the headers and rows to ensure that data was updated and current data is not stale
        CSV.open(@table_name, 'w') do |csv|
          csv << result.headers
          result.each { |row| csv << row }
        end
      end

      #deleting tables using the where conditions
      if @delete_conditions.any? 
        result.delete_if { |row|  
          @delete_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
        }
      
        #rewritting the headers and rows to ensure that data was deleted and current data is not stale
        CSV.open(@table_name, 'w') do |csv|
          csv << result.headers
          result.each { |row| csv << row }
        end
      end
      #puts result.inspect
      puts result.map(&:to_h).inspect
   end
  end


#request = MySqliteRequest.new()
#request = request.where('position', 'G').select("name","year_end").from('data.csv').order("name","desc").run
#request = request.update("data.csv").set("position" => "H", "year_end" => "1234").where("name","John Abramovic").run
#request = request.from('data.csv').delete.where("name","John Abramovic").run
#request = request.from('data.csv').select("name").join("year_start","data1.csv","year_end").run




#request = MySqliteRequest.new()
#request = request.from('noel.csv').select("name","age").where('name', 'Marie').order("age","desc").run
#request = request.update("noel.csv").set("name" => "Marie", "age" => "23").where("name","Noella").run
#request = request.from('noel.csv').delete.where("name","Marie").run
#request = request.from('noel.csv').select("name","age").where('name', 'Marie').join("age","marie.csv","amount").order("name","desc").run