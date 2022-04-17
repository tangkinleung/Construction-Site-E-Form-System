using System;

namespace EFormApi.Models
{
    public interface Notifications
    {
         public int notification_id { get; set; }
         public int notification_type { get; set; }
         public int action_id { get; set; }
         public char message_content { get; set; }
         public bool is_read { get; set; }
         public bool is_draft { get; set; }
         public int user_id { get; set; }
    }
}