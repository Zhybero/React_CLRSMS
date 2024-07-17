using CLRSMSWEBAPI.FldrClass;
using CLRSMSWEBAPI.FldrModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Net;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class InsertController : ControllerBase
    {
        SqlConnection myconnection;
        SqlCommand mycommand, mycommand1;
        int RowNum = 1;
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InserttblProfiling")]
        public HttpResponseMessage InserttblProfiling(ModeltblProfiling Mdl1)
        {

            string SqlStatement = "INSERT INTO tblProfiling (DocNum, ControlNo, DDate, Remarks, PhotoName, APControlNo) Values (@_DocNum, @_ControlNo, @_DDate, @_Remarks, @_PhotoName, @_ControlNoAP)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_DocNum", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblProfilingAutoNum();
            mycommand.Parameters.Add("_ControlNo", SqlDbType.VarChar).Value = Mdl1.ControlNo;
            mycommand.Parameters.Add("_DDate", SqlDbType.VarChar).Value = Mdl1.DDate;
            mycommand.Parameters.Add("_Remarks", SqlDbType.VarChar).Value = Mdl1.Remarks;
            mycommand.Parameters.Add("_PhotoName", SqlDbType.VarChar).Value = Mdl1.PhotoName;
            mycommand.Parameters.Add("_ControlNoAP", SqlDbType.VarChar).Value = Mdl1.ControlNoAP;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertImage")]
        public async Task<HttpResponseMessage> InsertPicture()
        {
            var formFile = Request.Form.Files.FirstOrDefault();

            if (formFile == null || formFile.Length <= 0)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            var relativeFilePath = Path.Combine("FldrUploads/images", formFile.FileName);

            using (var stream = new FileStream(relativeFilePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        //CLRSMS

        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblProjects")]
        public HttpResponseMessage InsertModeltblProjects(ModeltblProjects Mdl1)
        {

            string SqlStatement = "INSERT INTO tblProjects (ProjCode, ProjName, ProjDate, UserCode) Values (@_ProjCode, @_ProjName, @_ProjDate, @_UserCode)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_ProjCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblProjectsAutoNum();
            mycommand.Parameters.Add("_ProjName", SqlDbType.VarChar).Value = Mdl1.ProjName;
            mycommand.Parameters.Add("_ProjDate", SqlDbType.VarChar).Value = DateTime.Now;
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblDocumentType")]
        public HttpResponseMessage InsertModeltblDocumentType(ModeltblDocumentType Mdl1)
        {

            string SqlStatement = "INSERT INTO tblDocumentType (DocTypeCode, DocTypeName, DocTypeDate, UserCode, ProjCode) Values (@_DocTypeCode, @_DocTypeName, @_DocTypeDate, @_UserCode, @_ProjCode)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_DocTypeCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblDocumentTypeAutoNum();
            mycommand.Parameters.Add("_DocTypeName", SqlDbType.VarChar).Value = Mdl1.DocTypeName;
            mycommand.Parameters.Add("_DocTypeDate", SqlDbType.VarChar).Value = DateTime.Now;
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
            mycommand.Parameters.Add("_ProjCode", SqlDbType.VarChar).Value = Mdl1.ProjCode;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblFileDocuments")]
        public async Task<HttpResponseMessage> InsertModeltblFileDocuments()
        {
            ModeltblFileDocuments Mdl1 = new ModeltblFileDocuments();
            int countFilesUploaded = 0;
            var formCollection = await Request.ReadFormAsync();
            var formFile = formCollection.Files;

            if (formFile != null || formFile.Count > 0)
            {
                foreach (var varfile in formFile)
                {
                    var relativeFilePath = Path.Combine("FldrUploads/files", varfile.FileName);

                    using (var stream = new FileStream(relativeFilePath, FileMode.Create))
                    {
                        await varfile.CopyToAsync(stream);
                        countFilesUploaded++;
                    }
                }
            }
            if (formCollection.ContainsKey("ModeltblFileDocuments"))
            {
                var secondContent = formCollection["ModeltblFileDocuments"];
                Mdl1 = JsonConvert.DeserializeObject<ModeltblFileDocuments>(secondContent);


                if (formFile.Count == countFilesUploaded && formFile.Count!=0)
                {
                    string SqlStatement = "INSERT INTO tblFileDocuments (DocNum, FileIC, CaseNum, DEncoded, ArchivedDate, Description, UserCode, DocTypeCode) Values (@_DocNum, @_FileIC, @_CaseNum, @_DEncoded, @_ArchivedDate, @_Description, @_UserCode, @_DocTypeCode)";
                    string strDocNum = new ClsAutoNumber().GettblFileDocumentsAutoNum(Mdl1.DocTypeCode);
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand = new SqlCommand(SqlStatement, myconnection);
                    mycommand.Parameters.Add("_DocNum", SqlDbType.VarChar).Value = strDocNum;
                    mycommand.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"FD{Mdl1.DocTypeCode}{strDocNum}";
                    mycommand.Parameters.Add("_CaseNum", SqlDbType.VarChar).Value = Mdl1.CaseNum;
                    mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
                    mycommand.Parameters.Add("_ArchivedDate", SqlDbType.DateTime).Value = Mdl1.ArchivedDate;
                    mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
                    //mycommand.Parameters.Add("_FileName", SqlDbType.VarChar).Value = Mdl1.FileName;
                    mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description; 
                    //mycommand.Parameters.Add("_ProjCode", SqlDbType.VarChar).Value = Mdl1.ProjCode; 
                    mycommand.Parameters.Add("_DocTypeCode", SqlDbType.VarChar).Value = Mdl1.DocTypeCode;
                    mycommand.ExecuteNonQuery();


                    if (Mdl1.SubModeltblFileDocuments1 != null)
                    {
                        foreach (var listTbl1 in Mdl1.SubModeltblFileDocuments1)
                        {
                            string SqlStatement1 = "INSERT INTO tblFileDocuments1 (FileIC, RowNum, FileName, FileNameGUID, FileSize, FileType) Values (@_FileIC, @_RowNum, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                            myconnection.Open();
                            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
                            mycommand1.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"FD{Mdl1.DocTypeCode}{strDocNum}";
                            mycommand1.Parameters.Add("_RowNum", SqlDbType.VarChar).Value = RowNum++;
                            mycommand1.Parameters.Add("_FileName", SqlDbType.VarChar).Value = listTbl1.FileName;
                            mycommand1.Parameters.Add("_FileNameGUID", SqlDbType.VarChar).Value = listTbl1.FileNameGUID;
                            mycommand1.Parameters.Add("_FileSize", SqlDbType.VarChar).Value = listTbl1.FileSize;
                            mycommand1.Parameters.Add("_FileType", SqlDbType.VarChar).Value = listTbl1.FileType;
                            mycommand1.ExecuteNonQuery();

                        }
                    }

                    myconnection.Close();
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }




                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }


        }

        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertFiles")]
        public async Task<HttpResponseMessage> InsertFiles()
        {
            var formCollection = await Request.ReadFormAsync();
            var formFile = formCollection.Files;

            if (formFile == null || formFile.Count <= 0)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            foreach (var varfile in formFile)
            {
                var relativeFilePath = Path.Combine("FldrUploads/files", varfile.FileName);

                using (var stream = new FileStream(relativeFilePath, FileMode.Create))
                {
                    await varfile.CopyToAsync(stream);
                }
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        //UserGroup 
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblGroup")]
        public HttpResponseMessage InsertModeltblGroup(ModeltblGroup Mdl1)
        { 
            string SqlStatement = "INSERT INTO tblGroup (GroupCode, GroupName) Values (@_GroupCode, @_GroupName)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_GroupCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblGroupAutoNum();
            mycommand.Parameters.Add("_GroupName", SqlDbType.VarChar).Value = Mdl1.GroupName; 
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
        //Permissions
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblPermission")]
        public HttpResponseMessage InsertModeltblPermission(ModeltblPermission Mdl1)
        { 
            string SqlStatement = "INSERT INTO tblPermission (GroupCode, ObjectName) Values (@_GroupCode, @_ObjectName)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_GroupCode", SqlDbType.VarChar).Value = Mdl1.GroupCode;
            mycommand.Parameters.Add("_ObjectName", SqlDbType.VarChar).Value = Mdl1.ObjectName; 
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        //APSchedule
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPSchedule")]
        public HttpResponseMessage InsertModeltblAPSchedule(ModeltblAPSchedule Mdl1)
        { 
            string SqlStatement = "INSERT INTO tblAPSchedule (Code, DateEncoded, APDate, Slots, UserCode, Description, Type) Values (@_Code, @_DateEncoded, @_APDate, @_Slots, @_UserCode, @_Description, @_Type)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_Code", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAPScheduleAutoNum();
            mycommand.Parameters.Add("_DateEncoded", SqlDbType.DateTime).Value = DateTime.Now; 
            mycommand.Parameters.Add("_APDate", SqlDbType.DateTime).Value = Mdl1.APDate; 
            mycommand.Parameters.Add("_Slots", SqlDbType.VarChar).Value = Mdl1.Slots; 
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode; 
            mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description; 
            mycommand.Parameters.Add("_Type", SqlDbType.VarChar).Value = Mdl1.Type; 
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        //Appointments
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAppointments")]
        public HttpResponseMessage InsertModeltblAppointments(ModeltblAppointments Mdl1)
        {
            DateTime day = DateTime.Parse(Mdl1.TxtCalendar);
            DateTime time = DateTime.Parse(Mdl1.TxtTime);
            DateTime combinedDateTime = day.Add(time.TimeOfDay);
            //string combinedDateTimeString = combinedDateTime.ToString("yyyy-MM-ddTHH:mm:ss");

            string SqlStatement = "INSERT INTO tblAppointments (APCode, APDate, APDesc, UserCode, APMCode, SchedCode, DEncoded, HDate) Values (@_APCode, @_APDate, @_APDesc, @_UserCode, @_APMCode, @_SchedCode, @_DEncoded, @_HDate)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_APCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAppointmentsAutoNum(); 
            mycommand.Parameters.Add("_APDate", SqlDbType.DateTime).Value = combinedDateTime; 
            mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now; 
            mycommand.Parameters.Add("_HDate", SqlDbType.DateTime).Value = combinedDateTime; 
            mycommand.Parameters.Add("_APDesc", SqlDbType.VarChar).Value = Mdl1.APDesc; 
            //mycommand.Parameters.Add("_FName", SqlDbType.VarChar).Value = Mdl1.FName; 
            //mycommand.Parameters.Add("_MName", SqlDbType.VarChar).Value = Mdl1.MName; 
            //mycommand.Parameters.Add("_LName", SqlDbType.VarChar).Value = Mdl1.LName; 
            //mycommand.Parameters.Add("_Address", SqlDbType.VarChar).Value = Mdl1.Address; 
            //mycommand.Parameters.Add("_Email", SqlDbType.VarChar).Value = Mdl1.Email; 
            //mycommand.Parameters.Add("_Contact", SqlDbType.VarChar).Value = Mdl1.Contact; 
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode; 
            mycommand.Parameters.Add("_APMCode", SqlDbType.VarChar).Value = Mdl1.APMCode; 
            mycommand.Parameters.Add("_SchedCode", SqlDbType.VarChar).Value = Mdl1.SchedCode; 
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
        //Appointments Type
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPMatter")]
        public HttpResponseMessage InsertModeltblAPMatter(ModeltblAPMatter Mdl1)
        {  
            string SqlStatement = "INSERT INTO tblAPMatter (APMCode, APMTitle, APMDesc) Values (@_APMCode, @_APMTitle, @_APMDesc)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_APMCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAPMatterAutoNum();  
            mycommand.Parameters.Add("_APMTitle", SqlDbType.VarChar).Value = Mdl1.APMTitle; 
            mycommand.Parameters.Add("_APMDesc", SqlDbType.VarChar).Value = Mdl1.APMDesc;  
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
        //Users
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblUser")]
        public HttpResponseMessage InsertModeltblUser(ModeltblUser Mdl1)
        {  
            string SqlStatement = "INSERT INTO tblUser (UserCode, PWord, GroupCode, UserName, FName, MName, LName, XName, Address, Email, Contact) Values (@_UserCode, @_PWord, @_GroupCode, @_UserName, @_FName, @_MName, @_LName, @_XName, @_Address, @_Email, @_Contact)";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblUserAutoNum();  
            mycommand.Parameters.Add("_PWord", SqlDbType.VarChar).Value = new ClsM5Hash().getMd5Hash(Mdl1.PWord); 
            mycommand.Parameters.Add("_GroupCode", SqlDbType.VarChar).Value = Mdl1.GroupCode;  
            mycommand.Parameters.Add("_UserName", SqlDbType.VarChar).Value = Mdl1.UserName;  
            mycommand.Parameters.Add("_FName", SqlDbType.VarChar).Value = Mdl1.FName;  
            mycommand.Parameters.Add("_MName", SqlDbType.VarChar).Value = Mdl1.MName;  
            mycommand.Parameters.Add("_LName", SqlDbType.VarChar).Value = Mdl1.LName;  
            mycommand.Parameters.Add("_XName", SqlDbType.VarChar).Value = Mdl1.XName;  
            mycommand.Parameters.Add("_Address", SqlDbType.VarChar).Value = Mdl1.Address;  
            mycommand.Parameters.Add("_Email", SqlDbType.VarChar).Value = Mdl1.Email;  
            mycommand.Parameters.Add("_Contact", SqlDbType.VarChar).Value = Mdl1.Contact;  
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblMessage")]
        public async Task<HttpResponseMessage> InsertModeltblMessage()
        {
            ModeltblMessage Mdl1 = new ModeltblMessage();
            int countFilesUploaded = 0;
            var formCollection = await Request.ReadFormAsync();
            var formFile = formCollection.Files;

            if (formFile != null || formFile.Count > 0)
            {
                foreach (var varfile in formFile)
                {
                    var relativeFilePath = Path.Combine("FldrUploads/files", varfile.FileName);

                    using (var stream = new FileStream(relativeFilePath, FileMode.Create))
                    {
                        await varfile.CopyToAsync(stream);
                        countFilesUploaded++;
                    }
                }
            }
            if (formCollection.ContainsKey("ModeltblMessage"))
            {
                var secondContent = formCollection["ModeltblMessage"];
                Mdl1 = JsonConvert.DeserializeObject<ModeltblMessage>(secondContent);


                if (formFile.Count == countFilesUploaded)
                {

                    string SqlStatement = "INSERT INTO tblMessage (FileIC, Code, ToUserEmail, UserCode, Subject, Message, DateEncoded) Values (@_FileIC, @_Code, @_ToUserEmail, @_UserCode, @_Subject, @_Message, @_DateEncoded)";
                    string strDocNum = new ClsAutoNumber().GettblMessageAutoNum();
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand = new SqlCommand(SqlStatement, myconnection);
                    mycommand.Parameters.Add("_Code", SqlDbType.VarChar).Value = strDocNum;
                    mycommand.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"M{Mdl1.UserCode}{strDocNum}";
                    mycommand.Parameters.Add("_ToUserEmail", SqlDbType.VarChar).Value = Mdl1.ToUserEmail;
                    mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
                    mycommand.Parameters.Add("_DateEncoded", SqlDbType.DateTime).Value = DateTime.Now;
                    mycommand.Parameters.Add("_Subject", SqlDbType.VarChar).Value = Mdl1.Subject; 
                    mycommand.Parameters.Add("_Message", SqlDbType.VarChar).Value = Mdl1.Message;
                    mycommand.ExecuteNonQuery();

                    int RowNum1 = 1;
                    if (Mdl1.SubModeltblMessage1 != null)
                    {
                        foreach (var listTbl1 in Mdl1.SubModeltblMessage1)
                        {
                            string SqlStatement1 = "INSERT INTO tblMessage1 (FileIC, RowNum, FileName, FileNameGUID, FileSize, FileType) Values (@_FileIC, @_RowNum, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                            myconnection.Open();
                            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
                            mycommand1.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"M{Mdl1.UserCode}{strDocNum}";
                            mycommand1.Parameters.Add("_RowNum", SqlDbType.VarChar).Value = RowNum1++;
                            mycommand1.Parameters.Add("_FileName", SqlDbType.VarChar).Value = listTbl1.FileName;
                            mycommand1.Parameters.Add("_FileNameGUID", SqlDbType.VarChar).Value = listTbl1.FileNameGUID;
                            mycommand1.Parameters.Add("_FileSize", SqlDbType.VarChar).Value = listTbl1.FileSize;
                            mycommand1.Parameters.Add("_FileType", SqlDbType.VarChar).Value = listTbl1.FileType;
                            mycommand1.ExecuteNonQuery();

                        }
                    }

                    myconnection.Close();
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }




                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }


        }


        //Archive
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblFileDocumentsArchive")]
        public HttpResponseMessage InsertModeltblFileDocumentsArchive(ModeltblFileDocumentsArchive Mdl1)
        {
            string SqlStatement = "INSERT INTO tblFileDocuments (DocNum, FileIC, CaseNum, DEncoded, ArchivedDate, Description, UserCode, DocTypeCode) Values (@_DocNum, @_FileIC, @_CaseNum, @_DEncoded, @_ArchivedDate, @_Description, @_UserCode, @_DocTypeCode)";
            string strDocNum = new ClsAutoNumber().GettblFileDocumentsAutoNum(Mdl1.DocTypeCode);
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_DocNum", SqlDbType.VarChar).Value = strDocNum;
            mycommand.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"AD{Mdl1.DocTypeCode}{strDocNum}";
            mycommand.Parameters.Add("_CaseNum", SqlDbType.VarChar).Value = Mdl1.CaseNum;
            mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
            mycommand.Parameters.Add("_ArchivedDate", SqlDbType.DateTime).Value = Mdl1.ArchivedDate;
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode; 
            mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description; 
            mycommand.Parameters.Add("_DocTypeCode", SqlDbType.VarChar).Value = Mdl1.DocTypeCode;
            mycommand.ExecuteNonQuery();


            if (Mdl1.SubModeltblFileDocuments1 != null)
            {
                foreach (var listTbl1 in Mdl1.SubModeltblFileDocuments1)
                {
                    string SqlStatement1 = "INSERT INTO tblFileDocuments1 (FileIC, RowNum, FileName, FileNameGUID, FileSize, FileType) Values (@_FileIC, @_RowNum, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand1 = new SqlCommand(SqlStatement1, myconnection);
                    mycommand1.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"AD{Mdl1.DocTypeCode}{strDocNum}";
                    mycommand1.Parameters.Add("_RowNum", SqlDbType.VarChar).Value = RowNum++;
                    mycommand1.Parameters.Add("_FileName", SqlDbType.VarChar).Value = listTbl1.FileName;
                    mycommand1.Parameters.Add("_FileNameGUID", SqlDbType.VarChar).Value = listTbl1.FileNameGUID;
                    mycommand1.Parameters.Add("_FileSize", SqlDbType.VarChar).Value = listTbl1.FileSize;
                    mycommand1.Parameters.Add("_FileType", SqlDbType.VarChar).Value = listTbl1.FileType;
                    mycommand1.ExecuteNonQuery();

                }
            }

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblUserCred")]
        public async Task<HttpResponseMessage> InsertModeltblUserCred()
        {
            ModeltblUserCred Mdl1 = new ModeltblUserCred();
            int countFilesUploaded = 0;
            var formCollection = await Request.ReadFormAsync();
            var formFile = formCollection.Files;

            if (formFile != null || formFile.Count > 0)
            {
                foreach (var varfile in formFile)
                {
                    var relativeFilePath = Path.Combine("FldrUploads/files", varfile.FileName);

                    using (var stream = new FileStream(relativeFilePath, FileMode.Create))
                    {
                        await varfile.CopyToAsync(stream);
                        countFilesUploaded++;
                    }
                }
            }
            if (formCollection.ContainsKey("ModeltblUserCred"))
            {
                var secondContent = formCollection["ModeltblUserCred"];
                Mdl1 = JsonConvert.DeserializeObject<ModeltblUserCred>(secondContent);


                if (formFile.Count == countFilesUploaded)
                { 
                    string SqlStatement1 = "INSERT INTO tblUserCred (UserCode, FileName, FileNameGUID, FileSize, FileType) Values (@_UserCode, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand1 = new SqlCommand(SqlStatement1, myconnection);  
                    mycommand1.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
                    mycommand1.Parameters.Add("_FileName", SqlDbType.VarChar).Value = Mdl1.FileName;
                    mycommand1.Parameters.Add("_FileNameGUID", SqlDbType.VarChar).Value = Mdl1.FileNameGUID;
                    mycommand1.Parameters.Add("_FileSize", SqlDbType.VarChar).Value = Mdl1.FileSize;
                    mycommand1.Parameters.Add("_FileType", SqlDbType.VarChar).Value = Mdl1.FileType;
                    mycommand1.ExecuteNonQuery();
                     
                    myconnection.Close();
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }




                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }


        }


        //APDecline
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPDecline")]
        public HttpResponseMessage InsertModeltblAPDecline(ModeltblAPDecline Mdl1)
        {
            string SqlStatement = "INSERT INTO tblAPDecline (DCode, APCode, Description, Type) Values (@_DCode, @_APCode, @_Description, @_Type)";
            string SqlStatement1 = $"UPDATE tblAppointments SET Decline=1, DEncoded=@_DEncoded WHERE APCode={Mdl1.APCode}";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
            mycommand.Parameters.Add("_DCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAPDeclineAutoNum();
            mycommand.Parameters.Add("_APCode", SqlDbType.VarChar).Value = Mdl1.APCode;
            mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description;
            mycommand.Parameters.Add("_Type", SqlDbType.VarChar).Value = Mdl1.Type;
            mycommand1.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
            mycommand.ExecuteNonQuery();
            mycommand1.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        //ReSchedule
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPDeclineReSchedule")]
        public HttpResponseMessage InsertModeltblAPDeclineReSchedule(ModeltblAPDeclineReSchedule Mdl1)
        {
            string SqlStatement = "INSERT INTO tblAPDecline (DCode, APCode, Description, Type) Values (@_DCode, @_APCode, @_Description, @_Type)";
            string SqlStatement1 = $"UPDATE tblAppointments SET APDate=@_APDate, HDate=@_HDate, DEncoded=@_DEncoded, Approve=1 WHERE APCode={Mdl1.APCode}";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
            mycommand.Parameters.Add("_DCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAPDeclineAutoNum();
            mycommand.Parameters.Add("_APCode", SqlDbType.VarChar).Value = Mdl1.APCode;
            mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description;
            mycommand.Parameters.Add("_Type", SqlDbType.VarChar).Value = Mdl1.Type;
            mycommand1.Parameters.Add("_APDate", SqlDbType.VarChar).Value = Mdl1.APDate;
            mycommand1.Parameters.Add("_HDate", SqlDbType.VarChar).Value = Mdl1.APDate;
            mycommand1.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
            mycommand.ExecuteNonQuery();
            mycommand1.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        //APTime
        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPSchedTime")]
        public HttpResponseMessage InsertModeltblAPSchedTime(ModeltblAPSchedTime Mdl1)
        {
            string SqlStatement = "INSERT INTO tblAPSchedTime (TCode, Code, TTime) Values (@_TCode, @_Code, @_TTime)"; 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.Parameters.Add("_TCode", SqlDbType.VarChar).Value = new ClsAutoNumber().GettblAPSchedTimeAutoNum();
            mycommand.Parameters.Add("_Code", SqlDbType.VarChar).Value = Mdl1.Code; 
            mycommand.Parameters.Add("_TTime", SqlDbType.VarChar).Value = Mdl1.TTime; 
            mycommand.ExecuteNonQuery(); 

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }



        [HttpPost]
        [Route("API/CLRSMSWEBAPI/InsertModeltblAPEvidence")]
        public async Task<HttpResponseMessage> InsertModeltblAPEvidence()
        {
            ModeltblAPEvidences Mdl1 = new ModeltblAPEvidences();
            int countFilesUploaded = 0;
            var formCollection = await Request.ReadFormAsync();
            var formFile = formCollection.Files;

            if (formFile != null || formFile.Count > 0)
            {
                foreach (var varfile in formFile)
                {
                    var relativeFilePath = Path.Combine("FldrUploads/files", varfile.FileName);

                    using (var stream = new FileStream(relativeFilePath, FileMode.Create))
                    {
                        await varfile.CopyToAsync(stream);
                        countFilesUploaded++;
                    }
                }
            }
            if (formCollection.ContainsKey("ModeltblAPEvidences"))
            {
                var secondContent = formCollection["ModeltblAPEvidences"];
                Mdl1 = JsonConvert.DeserializeObject<ModeltblAPEvidences>(secondContent);


                if (formFile.Count == countFilesUploaded)
                {

                    string SqlStatement = "INSERT INTO tblAPEvidences (FileIC, ECode, APCode, Type) Values (@_FileIC, @_ECode, @_APCode, @_Type)";
                    string strDocNum = new ClsAutoNumber().GettblAPEvidenceAutoNum();
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand = new SqlCommand(SqlStatement, myconnection);
                    mycommand.Parameters.Add("_ECode", SqlDbType.VarChar).Value = strDocNum;
                    mycommand.Parameters.Add("_APCode", SqlDbType.VarChar).Value = Mdl1.APCode;
                    mycommand.Parameters.Add("_Type", SqlDbType.VarChar).Value = Mdl1.Type;
                    mycommand.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"EV{Mdl1.APCode}{strDocNum}";
                    mycommand.ExecuteNonQuery();

                    int RowNum1 = 1;
                    if (Mdl1.SubModeltblAPEvidences1 != null)
                    {
                        foreach (var listTbl1 in Mdl1.SubModeltblAPEvidences1)
                        {
                            string SqlStatement1 = "INSERT INTO tblAPEvidences1 (FileIC, RowNum, FileName, FileNameGUID, FileSize, FileType) Values (@_FileIC, @_RowNum, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                            myconnection.Open();
                            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
                            mycommand1.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = $"EV{Mdl1.APCode}{strDocNum}";
                            mycommand1.Parameters.Add("_RowNum", SqlDbType.VarChar).Value = RowNum1++;
                            mycommand1.Parameters.Add("_FileName", SqlDbType.VarChar).Value = listTbl1.FileName;
                            mycommand1.Parameters.Add("_FileNameGUID", SqlDbType.VarChar).Value = listTbl1.FileNameGUID;
                            mycommand1.Parameters.Add("_FileSize", SqlDbType.VarChar).Value = listTbl1.FileSize;
                            mycommand1.Parameters.Add("_FileType", SqlDbType.VarChar).Value = listTbl1.FileType;
                            mycommand1.ExecuteNonQuery();

                        }
                    }

                    myconnection.Close();
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }




                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }


        }

    }
}
