module Midsommar
    class SongConverter < Jekyll::Converter
      safe true
      priority :low
  
      def matches(ext)
        ext =~ /^\.txt$/i
      end
  
      def output_ext(ext)
        ".html"
      end
  
      def convert(content)
        content.gsub(/\[([^\]]*)\]/, '<span data-chord="\1"></span>')
      end
    end
  end