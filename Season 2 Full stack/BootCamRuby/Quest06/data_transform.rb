require 'date'

def my_data_transform(csv_content)
  lines = csv_content.split("\n")
  header = lines.shift
  transformed_lines = [header]

  lines.each do |line|
    values = line.split(',')
    email = values[4]
    age = values[5].to_i
    order_at = DateTime.parse(values[9]).strftime('%H:%M:%S')

    # Transform email provider
    email_provider = email.split('@').last
    values[4] = email_provider

    # Transform age group
    if age >= 1 && age <= 20
      values[5] = '1->20'
    elsif age >= 21 && age <= 40
      values[5] = '21->40'
    elsif age >= 41 && age <= 65
      values[5] = '41->65'
    elsif age >= 66 && age <= 99
      values[5] = '66->99'
    end

    # Transform order at group
    if order_at >= '06:00:00' && order_at <= '11:59:59'
      values[9] = 'morning'
    elsif order_at >= '12:00:00' && order_at <= '17:59:59'
      values[9] = 'afternoon'
    elsif order_at >= '18:00:00' && order_at <= '23:59:59'
      values[9] = 'evening'
    end

    transformed_lines << values.join(',')
  end

  transformed_lines
end
