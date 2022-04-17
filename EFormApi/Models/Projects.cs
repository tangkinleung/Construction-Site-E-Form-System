using System;

namespace EFormApi.Models
{
    public class Projects
    {
        public int project_id { get; set; }
        public int owned_by { get; set; }
        public char project_title { get; set; }
        public char project_desc { get; set; }
        public bool is_in_bin { get; set; }
        public bool is_draft { get; set; }

    }
}
