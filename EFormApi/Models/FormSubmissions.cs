using System;

namespace EFormApi.Models
{
    public interface FormSubmissions
    {
         public int submission_id { get; set; }
 
         public int form_id { get; set; }

        public int submitted_by { get; set; }

        public int reviewed_by { get; set; }

        public int form_status { get; set; }

        public string reject_reason { get; set; }

        public DateTime created_date { get; set; }

        public string submission_data { get; set; }
    } 
}