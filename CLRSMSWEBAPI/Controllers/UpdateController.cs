using CLRSMSWEBAPI.FldrClass;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using System.Data;
using System.Net;
using CLRSMSWEBAPI.FldrModel;
using Newtonsoft.Json;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class UpdateController : ControllerBase
    {

        SqlConnection myconnection;
        SqlCommand mycommand, mycommand1;
        int RowNum = 1;

        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdatetblProfiling")]
        public HttpResponseMessage UpdatetblProfiling(ModeltblProfiling Mdl1)
        {
            string SqlStatement = $"Update tblProfiling SET ControlNo = @_ControlNo, DDate = @_DDate, Remarks = @_Remarks, PhotoName = @_PhotoName, APControlNo = @_ControlNoAP WHERE DocNum='{Mdl1.DocNum}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_ControlNo", SqlDbType.VarChar).Value = Mdl1.ControlNo;
            mycommand.Parameters.Add("_DDate", SqlDbType.VarChar).Value = Mdl1.DDate;
            mycommand.Parameters.Add("_Remarks", SqlDbType.VarChar).Value = Mdl1.Remarks;
            mycommand.Parameters.Add("_PhotoName", SqlDbType.VarChar).Value = Mdl1.PhotoName;
            mycommand.Parameters.Add("_ControlNoAP", SqlDbType.VarChar).Value = Mdl1.ControlNoAP; 
            mycommand.ExecuteNonQuery();


            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblFileDocuments")]
        public async Task<HttpResponseMessage> UpdateModeltblFileDocuments()
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
                if (formFile.Count == countFilesUploaded && formFile.Count != 0)
                {
                    string SqlStatement = $"Update tblFileDocuments SET CaseNum = @_CaseNum, DEncoded=@_DEncoded, ArchivedDate=@_ArchivedDate, Description=@_Description, UserCode=@_UserCode WHERE DocNum='{Mdl1.DocNum}' AND FileIC='{Mdl1.FileIC}'";
                    
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand = new SqlCommand(SqlStatement, myconnection); 
                    mycommand.Parameters.Add("_CaseNum", SqlDbType.VarChar).Value = Mdl1.CaseNum;
                    mycommand.Parameters.Add("_DEncoded", SqlDbType.VarChar).Value = DateTime.Now;
                    mycommand.Parameters.Add("_ArchivedDate", SqlDbType.VarChar).Value = Mdl1.ArchivedDate;
                    mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
                    //mycommand.Parameters.Add("_FileName", SqlDbType.VarChar).Value = Mdl1.FileName;
                    mycommand.Parameters.Add("_Description", SqlDbType.VarChar).Value = Mdl1.Description;
                    //mycommand.Parameters.Add("_ProjCode", SqlDbType.VarChar).Value = Mdl1.ProjCode; 
                    mycommand.ExecuteNonQuery();

                    if (Mdl1.SubModeltblFileDocuments1 != null)
                    {
                        RowNum = int.Parse(new ClsAutoNumber().GettblFileDocuments1RowNum(Mdl1.FileIC));
                        foreach (var listTbl1 in Mdl1.SubModeltblFileDocuments1)
                        {

                            string SqlStatement1 = "INSERT INTO tblFileDocuments1 (FileIC, RowNum, FileName, FileNameGUID, FileSize, FileType) Values (@_FileIC, @_RowNum, @_FileName, @_FileNameGUID, @_FileSize, @_FileType)";
                            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                            myconnection.Open();
                            mycommand1 = new SqlCommand(SqlStatement1, myconnection);
                            mycommand1.Parameters.Add("_FileIC", SqlDbType.VarChar).Value = Mdl1.FileIC;
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
                  
            }  
            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdatetblDocumentType")]
        public HttpResponseMessage UpdatetblDocumentType(ModeltblDocumentType Mdl1)
        {  
            string SqlStatement = $"Update tblDocumentType SET DocTypeName=@_DocTypeName, DocTypeDate=@_DocTypeDate, UserCode=@_UserCode WHERE DocTypeCode='{Mdl1.DocTypeCode}' AND ProjCode='{Mdl1.ProjCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.Parameters.Add("_DocTypeName", SqlDbType.VarChar).Value = Mdl1.DocTypeName;
            mycommand.Parameters.Add("_DocTypeDate", SqlDbType.VarChar).Value = DateTime.Now;
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblProjects")]
        public HttpResponseMessage UpdateModeltblProjects(ModeltblProjects Mdl1)
        {  
            string SqlStatement = $"Update tblProjects SET ProjName=@_ProjName, ProjDate=@_ProjDate, UserCode=@_UserCode WHERE ProjCode='{Mdl1.ProjCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.Parameters.Add("_ProjName", SqlDbType.VarChar).Value = Mdl1.ProjName;
            mycommand.Parameters.Add("_ProjDate", SqlDbType.VarChar).Value = DateTime.Now;
            mycommand.Parameters.Add("_UserCode", SqlDbType.VarChar).Value = Mdl1.UserCode;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAppointments")]
        public HttpResponseMessage UpdateModeltblAppointments(ModeltblAppointmentsUpdate Mdl1)
        {  
            string SqlStatement = $"Update tblAppointments SET Approve=@_Approve, DEncoded=@_DEncoded, Notif=1 WHERE APCode='{Mdl1.APCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.Parameters.Add("_Approve", SqlDbType.Bit).Value = 1; 
            mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now; 
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAppointmentsApprove")]
        public HttpResponseMessage UpdateModeltblAppointmentsApprove(ModeltblAppointmentsUpdate Mdl1)
        {
            if (Mdl1.Active == true)
            {
                string SqlStatement = $"Update tblAppointments SET HDate=@_HDate, Active=@_Active, DEncoded=@_DEncoded, Notif=1 WHERE APCode='{Mdl1.APCode}'";
                myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                myconnection.Open();
                mycommand = new SqlCommand(SqlStatement, myconnection);
                mycommand.Parameters.Add("_HDate", SqlDbType.DateTime).Value = Mdl1.HDate;
                mycommand.Parameters.Add("_Active", SqlDbType.Bit).Value = Mdl1.Active;
                mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
                mycommand.ExecuteNonQuery();
            }
            else if (Mdl1.Active == false) 
            {
                string SqlStatement = $"Update tblAppointments SET HDate=@_HDate, Active=@_Active, Approve=@_Approve, DEncoded=@_DEncoded, Notif=1 WHERE APCode='{Mdl1.APCode}'";
                myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                myconnection.Open();
                mycommand = new SqlCommand(SqlStatement, myconnection);
                mycommand.Parameters.Add("_HDate", SqlDbType.DateTime).Value = Mdl1.HDate;
                mycommand.Parameters.Add("_Active", SqlDbType.Bit).Value = Mdl1.Active;
                mycommand.Parameters.Add("_Approve", SqlDbType.Bit).Value = 0;
                mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
                mycommand.ExecuteNonQuery();
            }
            

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAppointmentsNotifications")]
        public HttpResponseMessage UpdateModeltblAppointmentsNotifications(ModeltblAppointmentsUpdate Mdl1)
        {
            string SqlStatement = $"Update tblAppointments SET Notif=@_Notif WHERE APCode='{Mdl1.APCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_Notif", SqlDbType.Bit).Value = 0;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblUserUpdate")]
        public HttpResponseMessage UpdateModeltblUserUpdate(ModeltblUserUpdate Mdl1)
        {  
            string SqlStatement = $"Update tblUser SET FName=@_FName, LName=@_LName, XName=@_XName, MName=@_MName, Address=@_Address, Email=@_Email, Contact=@_Contact, UserName=@_UserName, PWord=@_PWord WHERE UserCode='{Mdl1.UserCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);
            mycommand.Parameters.Add("_PWord", SqlDbType.VarChar).Value = new ClsM5Hash().getMd5Hash(Mdl1.PWord); 
            mycommand.Parameters.Add("_UserName", SqlDbType.VarChar).Value = Mdl1.UserName;
            mycommand.Parameters.Add("_FName", SqlDbType.VarChar).Value = Mdl1.FName;
            mycommand.Parameters.Add("_LName", SqlDbType.VarChar).Value = Mdl1.LName;
            mycommand.Parameters.Add("_XName", SqlDbType.VarChar).Value = Mdl1.XName;
            mycommand.Parameters.Add("_MName", SqlDbType.VarChar).Value = Mdl1.MName;
            mycommand.Parameters.Add("_Address", SqlDbType.VarChar).Value = Mdl1.Address;
            mycommand.Parameters.Add("_Email", SqlDbType.VarChar).Value = Mdl1.Email;
            mycommand.Parameters.Add("_Contact", SqlDbType.VarChar).Value = Mdl1.Contact;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

         
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblUserCred")]
        public async Task<HttpResponseMessage> UpdateModeltblUserCred()
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
                    string SqlStatement1 = $"UPDATE tblUserCred SET FileName=@_FileName, FileNameGUID=@_FileNameGUID, FileSize=@_FileSize, FileType=@_FileType WHERE UserCode='{Mdl1.UserCode}'";
                    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
                    myconnection.Open();
                    mycommand1 = new SqlCommand(SqlStatement1, myconnection); 
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


        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAppointmentsUpdate")]
        public HttpResponseMessage UpdateModeltblAppointmentsUpdate(ModeltblAppointments Mdl1)
        {
            DateTime day = DateTime.Parse(Mdl1.TxtCalendar);
            DateTime time = DateTime.Parse(Mdl1.TxtTime);
            DateTime combinedDateTime = day.Add(time.TimeOfDay); 

            string SqlStatement = $"UPDATE tblAppointments SET APDate=@_APDate, APDesc=@_APDesc, APMCode=@_APMCode, SchedCode=@_SchedCode, DEncoded=@_DEncoded, HDate=@_HDate WHERE APCode='{Mdl1.APCode}' AND UserCode='{Mdl1.UserCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection); 
            mycommand.Parameters.Add("_APDate", SqlDbType.DateTime).Value = combinedDateTime;
            mycommand.Parameters.Add("_DEncoded", SqlDbType.DateTime).Value = DateTime.Now;
            mycommand.Parameters.Add("_HDate", SqlDbType.DateTime).Value = combinedDateTime;
            mycommand.Parameters.Add("_APDesc", SqlDbType.VarChar).Value = Mdl1.APDesc;  
            mycommand.Parameters.Add("_APMCode", SqlDbType.VarChar).Value = Mdl1.APMCode;
            mycommand.Parameters.Add("_SchedCode", SqlDbType.VarChar).Value = Mdl1.SchedCode;
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblMessageNotifUpdate")]
        public HttpResponseMessage UpdateModeltblMessageNotifUpdate(ModeltblMessageNotif Mdl1)
        {  
            string SqlStatement = $"UPDATE tblMessage SET Notif=@_Notif WHERE FileIC='{Mdl1.FileIC}' AND UserCode='{Mdl1.UserCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);  
            mycommand.Parameters.Add("_Notif", SqlDbType.Bit).Value = 0;   
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAPArchive")]
        public HttpResponseMessage UpdateModeltblAPArchive(ModeltblAPArchive Mdl1)
        {  
            string SqlStatement = $"UPDATE tblAppointments SET Archive=@_Archive WHERE APCode='{Mdl1.APCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);  
            mycommand.Parameters.Add("_Archive", SqlDbType.Bit).Value = 1;   
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        [HttpPut]
        [Route("API/CLRSMSWEBAPI/UpdateModeltblAPUnArchive")]
        public HttpResponseMessage UpdateModeltblAPUnArchive(ModeltblAPArchive Mdl1)
        {  
            string SqlStatement = $"UPDATE tblAppointments SET Archive=@_Archive WHERE APCode='{Mdl1.APCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlStatement, myconnection);  
            mycommand.Parameters.Add("_Archive", SqlDbType.Bit).Value = 0;   
            mycommand.ExecuteNonQuery();

            myconnection.Close();
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
