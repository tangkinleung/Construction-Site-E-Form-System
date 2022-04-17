using System;
 
namespace EFormApi.Models
{
    public class News
    {
        public int news_id { get; set; }
        public int owned_by { get; set; }
        public char news_title { get; set; }
        public char news_desc { get; set; }
        public DateTime created_date { get; set; }
        public DateTime last_edited_date { get; set; }

    }
}
