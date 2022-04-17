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
    public class FormSubmissionsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public FormSubmissionsController(IConfiguration configuration)
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

        [HttpGet("reviewed")] 
        public String GetReview() {    
        string query = @"
                SELECT s.submission_id as ""submission_id"",
                s.form_id as ""form_id"",
                s.submitted_by as ""submitted_by"",
                s.reviewed_by as ""reviewed_by"",
                s.form_status as ""form_status"",
                s.reject_reason as ""reject_reason"",
                s.created_date as ""created_date"",
                s.submission_data as ""submission_data"",
                f.form_name as ""form_name"",
                p.project_title as ""project_title""
                FROM public.""FormSubmissions"" s
                INNER JOIN public.""FormTemplates"" f
                ON s.form_id = f.form_id
                INNER JOIN public.""Projects"" p
                ON f.project_id = p.project_id
                WHERE s.form_status > 0";
            
            return runQuery(query);
        }
        

        [HttpGet("pending")] 
        public String GetPending() {    
         string query = @"
                SELECT s.submission_id as ""submission_id"",
                s.form_id as ""form_id"",
                s.submitted_by as ""submitted_by"",
                s.reviewed_by as ""reviewed_by"",
                s.form_status as ""form_status"",
                s.reject_reason as ""reject_reason"",
                s.created_date as ""created_date"",
                s.submission_data as ""submission_data"",
                f.form_name as ""form_name"",
                p.project_title as ""project_title""
                FROM public.""FormSubmissions"" s
                INNER JOIN public.""FormTemplates"" f
                ON s.form_id = f.form_id
                INNER JOIN public.""Projects"" p
                ON f.project_id = p.project_id
                WHERE s.form_status = 0";
            
            return runQuery(query);
        }


        [HttpGet("{id}")] 
        public String Getsubmisisons(string id) {    //this is the submission id
        string query = @"
                SELECT s.submission_id as ""submission_id"",
                s.form_id as ""form_id"",
                s.submitted_by as ""submitted_by"",
                s.reviewed_by as ""reviewed_by"",
                s.form_status as ""form_status"",
                s.reject_reason as ""reject_reason"",
                s.created_date as ""created_date"",
                s.submission_data as ""submission_data"",
                f.form_name as ""form_name"",
                p.project_title as ""project_title""
                FROM public.""FormSubmissions"" s
                INNER JOIN public.""FormTemplates"" f
                ON s.form_id = f.form_id
                INNER JOIN public.""Projects"" p
                ON f.project_id = p.project_id
                WHERE s.submission_id = " + id;
            
            return runQuery(query);
        }


        [HttpPost("manager/approve")]
        public String PostApprove(int submission_id)
        {
            string query =@"
            UPDATE public.""FormSubmissions""
            SET form_status = '1'
            WHERE submission_id = " + submission_id;
            string output= runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }

        [HttpPost("manager/reject")]
        public String PostReject(int submission_id, string reject_reason)
        {     
            string query = @"
                UPDATE public.""FormSubmissions""
                SET form_status = 2, reject_reason = '" + reject_reason +
                "' WHERE submission_id = " + submission_id;
            string output= runQuery(query);
            if (output == "[]") {
                return "Success";
            } else {
                return output;
            }
        }

        [HttpGet("worker/user/{user_id}")] 
        public String getFormSubmissionByUser(int user_id){
            string query = @"
            SELECT s.submission_id as ""submission_id"",
            s.form_id as ""form_id"",
            s.submitted_by as ""submitted_by"",
            s.reviewed_by as ""reviewed_by"",
            s.form_status as ""form_status"",
            s.reject_reason as ""reject_reason"",
            s.created_date as ""created_date"",
            s.submission_data as ""submission_data"",
            f.form_name as ""form_name""
            FROM public.""FormSubmissions"" s
            INNER JOIN public.""FormTemplates"" f
            ON s.form_id = f.form_id
            WHERE s.submitted_by="+user_id; 
            return runQuery(query);
        }


        [HttpGet("worker/submission/{submission_id}")]
        public String GetSubmission(int submission_id){
            string query = @"
            SELECT submission_id as ""submission_id"",
            form_id as ""form_id"",
            submitted_by as ""submitted_by"",
            reviewed_by as ""reviewed_by"",
            form_status as ""form_status"",
            reject_reason as ""reject_reason"",
            created_date as ""created_date"",
            submission_data as ""submission_data""
            FROM public.""FormSubmissions""
            WHERE submission_id="+submission_id; 
            return runQuery(query);
        }

        [HttpPost("worker")] 
        
        public String Post(int form_id, int submitted_by, string submission_data, string created_date){

            submission_data = submission_data.Replace("'", "''");
            
            string query = @"
            INSERT INTO public.""FormSubmissions""(submission_id, form_id, submitted_by, reviewed_by, form_status, reject_reason,created_date, submission_data)
            VALUES ((SELECT MAX(submission_id)+1 FROM public.""FormSubmissions""), '" + form_id + "', '" + submitted_by + "', '0', '0', null, DATE '" + created_date + "', '" + submission_data + "')";
            return runQuery(query);
        }
        
    }
}
