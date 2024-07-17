using CLRSMSWEBAPI.FldrClass;
using CLRSMSWEBAPI.FldrModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using System.Formats.Tar;
using System.Net;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class DeleteController : ControllerBase
    {

        SqlConnection myconnection;
        SqlCommand mycommand, mycommand1;
        SqlDataReader dr;
         

        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteModeltblFileDocuments")]
        public async Task<HttpResponseMessage> DeleteModeltblFileDocuments1(ClsModelDeleteltblFileDocuments1 Mdl1)
        {
            string SqlSentenceView = $"SELECT * FROM tblFileDocuments1 WHERE FileIC='{Mdl1.FileIC}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand1 = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand1.ExecuteReader();
            while (dr.Read())
            {
                var relativeFilePath = Path.Combine("FldrUploads/files", dr["FileNameGUID"].ToString());
                if (System.IO.File.Exists(relativeFilePath))
                {
                    System.IO.File.Delete(relativeFilePath);
                }
            }
            dr.Close();
            mycommand1.ExecuteNonQuery();

            string SqlStatement = $"DELETE FROM tblFileDocuments WHERE DocNum='{Mdl1.DocNum}' AND DocTypeCode='{Mdl1.DocTypeCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection);
           
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }

        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteModeltblDocumentType")]
        public async Task<HttpResponseMessage> DeleteModeltblDocumentType(ClsModelModeltblDocumentType Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblDocumentType WHERE DocTypeCode='{Mdl1.DocTypeCode}' AND ProjCode='{Mdl1.ProjCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteModeltblProjects")]
        public async Task<HttpResponseMessage> DeleteModeltblProjects(ClsModelDeletetblProjects Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblProjects WHERE ProjCode='{Mdl1.ProjCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteModeltblPermission")]
        public async Task<HttpResponseMessage> DeleteModeltblPermission(ClsDeleteModeltblPermission Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblPermission WHERE ObjectName='{Mdl1.ObjectName}' AND GroupCode='{Mdl1.GroupCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteModeltblAppointments")]
        public async Task<HttpResponseMessage> DeleteModeltblAppointments(ClsDeleteModeltblAppointments Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblAppointments WHERE APCode='{Mdl1.APCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblUser")]
        public async Task<HttpResponseMessage> DeleteClsDeleteModeltblUser(ClsDeleteModeltblUser Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblUser WHERE UserCode='{Mdl1.UserCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblMessage")]
        public async Task<HttpResponseMessage> DeleteClsDeleteModeltblMessage(ClsDeleteModeltblMessage Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblMessage WHERE FileIC='{Mdl1.FileIC}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblAPSchedule")]
        public async Task<HttpResponseMessage> DeleteClsDeleteModeltblAPSchedule(ClsDeleteModeltblAPSchedule Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblAPSchedule WHERE Code='{Mdl1.Code}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
        [HttpPost]
        [Route("API/WEBAPI/WEBAPIDelete/DeleteClsDeleteModeltblAPSchedTime")]
        public async Task<HttpResponseMessage> DeleteClsDeleteModeltblAPSchedTime(ClsDeleteModeltblAPSchedTime Mdl1)
        { 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();  
            string SqlStatement = $"DELETE FROM tblAPSchedTime WHERE TCode='{Mdl1.TCode}'"; 
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.ExecuteNonQuery();
            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);

        }
    }
}
