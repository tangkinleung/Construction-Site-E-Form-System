using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using Newtonsoft.Json;
using System.Text.Json;
using System;
using Microsoft.Extensions.Configuration;

namespace EFormApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AssignedProjectsController : ControllerBase
    {
         private readonly IConfiguration _configuration;
        public AssignedProjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string runQuery(string query) {

            DataTable table = new DataTable();
            string output = "";
            string sqlDataSource = _configuration.GetConnectionString("FormCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(NpgsqlCommand myCommand=new NpgsqlCommand(query, myCon))
                {
                    Console.WriteLine("Connected to PostgreSQL database");
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    output = JsonConvert.SerializeObject(table, Formatting.Indented);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return output;
        }

        [HttpGet("{id}")]
        public String Get(int id) {
            string query = @"
                SELECT assignment_id as ""assignment_id"",
                worker_id as ""worker_id"",
                project_id as ""project_id""
                FROM public.""AssignedProjects""
                WHERE worker_id = " + id;

            return runQuery(query);
        }

        [HttpGet("worker/{id}")]
        public String GetWorker(int id){
            string query = @"
            SELECT worker_id as ""worker_id""
            FROM public.""AssignedProjects""
            WHERE worker_id = " +id;

            return runQuery(query);
        }

        [HttpGet("project/{id}")]
        public String GetProject(int id){
            string query = @"
            SELECT project_id as ""project_id""
            FROM public.""AssignedProjects""
            WHERE worker_id = " +id;

            return runQuery(query);
        }

        [HttpPost("worker/{id}")]
        public String Post(int worker_id, int project_id){
            string query =@"
            INSERT INTO public.""AssignedProjects"" (assignment_id, worker_id, project_id)
            VALUES((SELECT MAX(assignment_id)+1 FROM public.""AssignedProjects"")" + " ,"  +worker_id + " ," + project_id+")";
            return runQuery(query);
        }

        [HttpDelete("worker/{id}")]
        public string Delete(int form_id)
        {
            string query = @"
                UPDATE public.""FormTemplates""
                SET is_in_bin = true
                WHERE form_id = " + form_id;
            string output = runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }
    }
}