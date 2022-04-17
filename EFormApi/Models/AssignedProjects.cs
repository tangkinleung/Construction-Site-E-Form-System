using System;

namespace EFormApi.Models
{
    public interface AssignedProjects
    {
         public int assignment_id { get; set; }

         public int worker_id { get; set; }

         public int project_id { get; set; }
    }
}