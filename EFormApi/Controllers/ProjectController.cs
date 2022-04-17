using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using Newtonsoft.Json;
using System;
using System.Web.Http.Cors;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace EFormApi.Controllers
{

    // [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProjectController(IConfiguration configuration)
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

        [HttpGet]
        public String Get() {
            string query = @"
                SELECT project_id as ""project_id"",
                owned_by as ""owned_by"",
                project_title as ""title"",
                project_desc as ""project_desc"",
                is_in_bin as ""is_in_bin"",
                is_draft as ""is_draft""
                FROM public.""Projects""
            ";
            return runQuery(query);
        }

        [HttpGet("{id}")] // retrieve project by id - api/Project/[:id]
        public string Get(string id)
        {
            Console.WriteLine(id);
            string query = @"
                SELECT project_id as ""project_id"",
                owned_by as ""owned_by"",
                project_title as ""title"",
                project_desc as ""project_desc"",
                is_in_bin as ""is_in_bin"",
                is_draft as ""is_draft""
                FROM public.""Projects""
                WHERE project_id = " + id;
            string output = runQuery(query);
            if (output == "[]") {
                return "Project not found";
            } else {
                return output;
            }
        }

        [HttpPost]
        public string Post(int owner, string title, string desc)
        {
            string query = @"
                INSERT INTO public.""Projects"" (project_id, owned_by, project_title, project_desc, is_in_bin, is_draft)
                VALUES ((SELECT MAX(project_id)+1 FROM public.""Projects"")" + // not best practice but this will have to do for now
                ", " + owner + ", '" + title + "', '" + desc + "', false, false)" +
                "RETURNING project_id"; // 0 will auto increment primary key
            string output = runQuery(query);
            return output;
        }

        [HttpPut]
        public string Put(int id, int owner, string title, string desc, bool is_in_bin, bool is_draft)
        {
            string query = @"
                UPDATE public.""Projects""
                SET owned_by = " + owner + ", project_title = '" + title + "', project_desc = '" + desc + "', is_in_bin = " + is_in_bin + ", is_draft = " + is_draft +
                " WHERE project_id = " + id;
            string output = runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }

        [HttpDelete]
        public string Delete(int id)
        {
            string query1 = @"
                UPDATE public.""FormTemplates""
                SET is_in_bin = true
                WHERE project_id = " + id;
            string query2 = @"
                UPDATE public.""Projects""
                SET is_in_bin = true
                WHERE project_id = " + id;

            string output1 = runQuery(query1);

            string output2 = runQuery(query2);
            if (output1 == "[]" && output2 == "[]") {
                return "Success";
            } else {
                return output1 + " " + output2;
            }
        }
    }
}