using System;

namespace EFormApi.Models
{
    public class FormTemplates
    {
        public int form_id { get; set; }
        public int owned_by { get; set; }
        public char project_id { get; set; }
        public char form_name { get; set; }
        public char form_desc { get; set; }
        public string form_template { get; set; }
        public DateTime expiry_date { get; set; }
        public DateTime created_date { get; set; }
        public bool is_enabled { get; set; }
        public bool is_draft { get; set; }
        public bool is_in_bin { get; set; }
    }
}
