using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using Newtonsoft.Json;
using System.Text.Json;
using System;
using Microsoft.Extensions.Configuration;
using System.Web;

namespace EFormApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class FormTemplateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public FormTemplateController(IConfiguration configuration)
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

        [HttpGet("all")] // retrieve all form
        public String GetAllForms() {
            string query = @"SELECT form_id, project_id, form_name, form_desc, expiry_date::date, created_date::date FROM public.""FormTemplates"" WHERE is_in_bin = false";
            return runQuery(query);
        }


        [HttpGet("archived")] // retrieve all form
        public String GetAllArchivedForms() {
            string query = @"SELECT form_id, project_id, form_name, form_desc, expiry_date::date, created_date::date FROM public.""FormTemplates"" WHERE is_in_bin = true";
            return runQuery(query);
        }

        [HttpGet("allTemplates")] // retrieve all form
        public String GetAllTemplates() {
            string query = @"SELECT form_id, project_id, form_name, form_template FROM public.""FormTemplates"" WHERE is_in_bin = false";
            return runQuery(query);
        }
        

        [HttpGet("{id}")] // retrieve project by id for both manager n worker - api/[controller]/manager
        public String Get(string id) {
            string query = @"
                SELECT form_id as ""form_id"",
                owned_by as ""owned_by"",
                project_id as ""project_id"",
                form_name as ""form_name"",
                form_desc as ""form_desc"",
                form_template as ""form_template"",
                expiry_date as ""expiry_date"",
                created_date as ""created_date"",
                is_enabled as ""is_enable"",
                is_draft as ""is_draft"",       
                is_in_bin as ""is_in_bin""
                FROM public.""FormTemplates""
                WHERE project_id = " + id;
            
            return runQuery(query);
        }
        
        [HttpGet("form/{id}")] // retrieve project by id for both manager and worker
        public String GetForm(string id) {    //this is the form id
         string query = @"
                SELECT form_id as ""form_id"",
                owned_by as ""owned_by"",
                project_id as ""project_id"",
                form_name as ""form_name"",
                form_desc as ""form_desc"",
                form_template as ""form_template"",
                expiry_date as ""expiry_date"",
                created_date as ""created_date"",
                is_enabled as ""is_enable"",
                is_draft as ""is_draft"",       
                is_in_bin as ""is_in_bin""
                FROM public.""FormTemplates""
                WHERE form_id = " + id.ToString();
            
            return runQuery(query);
        }


        [HttpPost]
        public string Post(int owned_by, int project_id, string form_name, string form_desc, string form_template, string expiry_date, string created_date)
        {
            form_template = form_template.Replace("'", "''");
            string query = @"
                INSERT INTO public.""FormTemplates"" (form_id, owned_by, project_id, form_name, form_desc, form_template,expiry_date,
                created_date, is_enabled, is_draft, is_in_bin)
                VALUES ((SELECT MAX(form_id)+1 FROM public.""FormTemplates"")" + // not best practice but this will have to do for now
                ", '" + owned_by
                + "', '" + project_id
                + "', '" + form_name
                + "', '" + form_desc 
                + "', '" + JsonConvert.DeserializeObject(form_template)
                + "', DATE '" + expiry_date
                + "', DATE '" + created_date
                + "', false, false, false)"; // 0 will auto increment primary key
            string output = runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }

        [HttpPut]
        public string Put(int form_id, int owned_by, int project_id, string form_name, string form_desc, string form_template, string expiry_date, string created_date,bool is_enabled, bool is_in_bin, bool is_draft)
        {

            form_template = form_template.Replace("'", "''");
            string query = @"
                UPDATE public.""FormTemplates""
                SET owned_by = " + owned_by 
                + ", project_id = '" + project_id
                + "', form_name = '" + form_name
                + "', form_desc = '" + form_desc
                + "', form_template = '" + form_template
                + "', expiry_date = DATE '" + expiry_date
                + "', created_date = DATE '" + created_date
                + "', is_enabled = '" + is_enabled
                + "', is_in_bin = " + is_in_bin 
                + ", is_draft = " + is_draft +
                " WHERE form_id = " + form_id;

            string output = runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }

        [HttpDelete]
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
