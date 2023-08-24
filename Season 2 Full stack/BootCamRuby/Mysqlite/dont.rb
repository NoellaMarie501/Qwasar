require 'csv'

class MySqliteRequest

  def initialize
    @table_name = nil
    @columns = []
    @where_conditions = []
    @join_conditions = []
    @order_by = nil
    @order_direction = nil
    @insert_table_name = nil
    @insert_data = {}
    @update_table_name = nil
    @update_data = {}
    @delete_conditions = []
  end

  def from(table_name)
    @table_name = table_name
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

  def insert_into(table_name)
    @insert_table_name = table_name
    self
  end

  def values(data)
    @insert_data = data
    self
  end

  def update(table_name)
    @update_table_name = table_name
    self
  end

  def set(data)
    @update_data = data
    self
  end

  def delete_from(table_name)
    @table_name = table_name
    self
  end

  def where_delete(column_name, value)
    @delete_conditions << { column_name: column_name, value: value }
    self
  end

  def run
    #checking if no table name specified
    if @table_name.nil?
      raise "No table specified"
    end

    #reading file 
    result = CSV.read(@table_name, headers: true)

    #checking for a join condition
    # if @join_conditions.any?
    #   result = result.map do |row|
    #     @join_conditions.each do |condition|
    #       join_table = CSV.read(condition[:filename_db_b], headers: true)
    #       matching_row = join_table.find { |join_row| join_row[condition[:column_on_db_b]] == row[condition[:column_on_db_a]] }
    #       row.merge!(matching_row)
    #     end
    #     row
    #   end
    # end
    #checking for where condition specified
    if @where_conditions.any?
      result = result.select do |row|
        @where_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
      end
    end

    if @order_by
      result = result.sort_by { |row| row[@order_by] }
      result.reverse! if @order_direction == "desc"
    end

    if @insert_table_name && @insert_data.any?
      CSV.open(@insert_table_name, 'a') do |csv|
        csv << @insert_data.values
      end
    end

    if @update_table_name && @update_data.any?
      result.each do |row|
        if @where_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
          @update_data.each { |key, value| row[key] = value }
        end
      end

      CSV.open(@update_table_name, 'w') do |csv|
        csv << result.headers
        result.each { |row| csv << row }
      end
    end

    if @delete_conditions.any?
      result.reject! do |row|
        @delete_conditions.all? { |condition| row[condition[:column_name]] == condition[:value] }
      end

      CSV.open(@table_name, 'w') do |csv|
        csv << result.headers
        result.each { |row| csv << row }
      end
    end

   puts result.map(&:to_h)
  end
end


request = MySqliteRequest.new()
# request = request.insert(data.csv)
# request = request.values
request = request.from('data.csv').select("name","year_end").where('position', 'G').order("name","desc").run