using CLRSMSWEBAPI.FldrClass;
using CLRSMSWEBAPI.FldrModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.Data.SqlClient;

namespace CLRSMSWEBAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {

        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;



        //==================================================
        //          S E C U R I T Y
        //==================================================

        [HttpGet]
        [Route("API/WebAPI/LoginUser/Permission")]
        public string GetUserPermission(string strGroupCode, string strObjectName)
        {
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            string CheckNoTransact = string.Format("SELECT Count(*) FROM tblPermission WHERE GroupCode = '" + strGroupCode + "' AND ObjectName='" + strObjectName + "'");
            SqlCommand com = new SqlCommand(CheckNoTransact, myconnection);
            int CountData = int.Parse(com.ExecuteScalar().ToString());
            myconnection.Close();

            if (CountData > 0)
            {
                return "1"; //Permitted
            }
            else
            {
                return "2";//Not permitted
            }
        }


        [HttpGet]
        [Route("API/WebAPI/tblCustomer/GetAllCustomerList")]
        public IEnumerable<ModeltblCustomer> GetAllCustomerList()
        {
            List<ModeltblCustomer> MSSQL = new List<ModeltblCustomer>();
            string SqlSentenceView = $"SELECT * FROM tblCustomer";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblCustomer Mdl1 = new ModeltblCustomer
                {
                    ControlNo = dr["ControlNo"].ToString(),
                    CustCode = dr["CustCode"].ToString(),
                    CustName = dr["CustName"].ToString(),
                    NType = dr["NType"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/tblCustomer/GetAllPersonnelList")]
        public IEnumerable<ModeltblPersonnel> GetAllPersonnelList()
        {
            List<ModeltblPersonnel> MSSQL = new List<ModeltblPersonnel>();
            string SqlSentenceView = $"SELECT * FROM tblPersonnel";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblPersonnel Mdl1 = new ModeltblPersonnel
                {
                    APControlNo = dr["APControlNo"].ToString(),
                    APCode = dr["APCode"].ToString(),
                    APName = dr["APName"].ToString(),
                    NType = dr["NType"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/ModeltblProfiling/GetModeltblProfilingList")]
        public IEnumerable<ModelViewProfiling> GetModeltblProfilingList()
        {
            List<ModelViewProfiling> MSSQL = new List<ModelViewProfiling>();
            string SqlSentenceView = $"SELECT * FROM ViewProfiling";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewProfiling Mdl1 = new ModelViewProfiling
                {
                    DocNum = dr["DocNum"].ToString(),
                    ControlNo = dr["ControlNo"].ToString(),
                    DDate = DateTime.Parse(dr["DDate"].ToString()),
                    Remarks = dr["Remarks"].ToString(),
                    PhotoName = dr["PhotoName"].ToString(),
                    ControlNoAP = dr["APControlNo"].ToString(),
                    CControlNo = dr["CustName"].ToString(),
                    CControlNoAP = dr["APName"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        //[HttpGet]
        //[Route("API/WebAPI/getfileUploaded/getfile")]
        //public IActionResult GetFile(string fileName)
        //{
        //    var filePath = Path.Combine("FldrUploads/files", fileName);

        //    if (!System.IO.File.Exists(filePath))
        //    {
        //        return NotFound();
        //    }
        //    //var stream = System.IO.File.OpenRead(imagePath);
        //    //return File(stream, "application/octet-stream");
        //    return PhysicalFile(filePath, "application/octet-stream"); // No specific content type
        //}
        [HttpGet]
        [Route("API/WebAPI/getfileUploaded/getfile")]
        public IActionResult GetFile(string fileName)
        {
            var filePath = Path.Combine("FldrUploads/files", fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }
            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "application/octet-stream");
        }
        [HttpGet]
        [Route("API/WebAPI/DownloadFileGuid")]
        public IActionResult DownloadFile(string fileName)
        {
            var filePath = Path.Combine("FldrUploads/files", fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // File not found
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileContent = new FileContentResult(fileBytes, "application/octet-stream")
            {
                FileDownloadName = fileName
            };

            return fileContent;
        }
        [HttpGet]
        [Route("API/WebAPI/GetFilePrint")]
        public async Task<IActionResult> GetFilePrint(string fileName)
        {
            var filePath = Path.Combine("FldrUploads/files", fileName);
            var memory = new MemoryStream();

            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            // Determine the file's MIME type based on the file extension
            var contentType = new ClsClass().GetContentType(fileName);

            return File(memory, contentType, fileName);
        }


        [HttpGet]
        [Route("API/WebAPI/GetModeltblProjectsList")]
        public IEnumerable<ModeltblProjects> GetModeltblProjectsList()
        {
            List<ModeltblProjects> MSSQL = new List<ModeltblProjects>();
            string SqlSentenceView = $"SELECT * FROM tblProjects";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblProjects Mdl1 = new ModeltblProjects
                {
                    ProjCode = dr["ProjCode"].ToString(),
                    ProjName = dr["ProjName"].ToString(),
                    ProjDate = DateTime.Parse(dr["ProjDate"].ToString()),
                    UserCode = dr["UserCode"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }


        [HttpGet]
        [Route("API/WebAPI/GetModeltblDocumentTypeList")]
        public IEnumerable<ModeltblDocumentType> GetModeltblDocumentTypeList(string varProjCode)
        {
            List<ModeltblDocumentType> MSSQL = new List<ModeltblDocumentType>();
            string SqlSentenceView = $"SELECT * FROM tblDocumentType WHERE ProjCode='{varProjCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblDocumentType Mdl1 = new ModeltblDocumentType
                {
                    DocTypeCode = dr["DocTypeCode"].ToString(),
                    DocTypeName = dr["DocTypeName"].ToString(),
                    DocTypeDate = DateTime.Parse(dr["DocTypeDate"].ToString()),
                    UserCode = dr["UserCode"].ToString(),
                    ProjCode = dr["ProjCode"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblFileDocumentsList")]
        public IEnumerable<ModeltblFileDocumentsList> GetModeltblFileDocumentsList(string varDocTypeCode)
        {
            List<ModeltblFileDocumentsList> MSSQL = new List<ModeltblFileDocumentsList>();
            string SqlSentenceView = $"SELECT * FROM tblFileDocuments WHERE DocTypeCode='{varDocTypeCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblFileDocumentsList Mdl1 = new ModeltblFileDocumentsList
                {
                    DocNum = dr["DocNum"].ToString(),
                    FileIC = dr["FileIC"].ToString(),
                    DocTypeCode = dr["DocTypeCode"].ToString(),
                    CaseNum = dr["CaseNum"].ToString(),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    ArchivedDate = DateTime.Parse(dr["ArchivedDate"].ToString()),
                    //FileName = dr["FileName"].ToString(),
                    Description = dr["Description"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblFileDocumentsList1")]
        public IEnumerable<ModeltblFileDocuments1> GetModeltblFileDocumentsList1(string varFileIC)
        {
            string SqlSentenceView;
            List<ModeltblFileDocuments1> MSSQL = new List<ModeltblFileDocuments1>();
            if (varFileIC == "All")
            {
                SqlSentenceView = $"SELECT * FROM tblFileDocuments1 ORDER BY FileName";
            }
            else
            {
                SqlSentenceView = $"SELECT * FROM tblFileDocuments1 WHERE FileIC='{varFileIC}'";
            }
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblFileDocuments1 Mdl1 = new ModeltblFileDocuments1
                {
                    FileIC = dr["FileIC"].ToString(),
                    RowNum = int.Parse(dr["RowNum"].ToString()),
                    FileNameGUID = dr["FileNameGUID"].ToString(),
                    FileName = dr["FileName"].ToString(),
                    FileSize = decimal.Parse(dr["FileSize"].ToString()),
                    FileType = dr["FileType"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        
        [HttpGet]
        [Route("API/WebAPI/GetModelViewArchived")]
        public IEnumerable<ModelViewArchived> GetModelViewArchived()
        {
            string SqlSentenceView;
            List<ModelViewArchived> MSSQL = new List<ModelViewArchived>();
             
            SqlSentenceView = $"SELECT * FROM ViewArchived ORDER BY FileName"; 
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewArchived Mdl1 = new ModelViewArchived
                {
                    FileIC = dr["FileIC"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    ProjName = dr["ProjName"].ToString(),
                    DocTypeName = dr["DocTypeName"].ToString(),
                    ProjCode = dr["ProjCode"].ToString(),
                    DocNum = dr["DocNum"].ToString(),
                    CaseNum = dr["CaseNum"].ToString(),
                    Description = dr["Description"].ToString(),
                    DocTypeCode = dr["DocTypeCode"].ToString(), 
                    ProjDate = DateTime.Parse(dr["ProjDate"].ToString()),
                    DocTypeDate = DateTime.Parse(dr["DocTypeDate"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    ArchivedDate = DateTime.Parse(dr["ArchivedDate"].ToString()),  
                    RowNum = int.Parse(dr["RowNum"].ToString()), 
                    FileName = dr["FileName"].ToString(),
                    FileType = dr["FileType"].ToString(),
                    FileSize = decimal.Parse(dr["FileSize"].ToString()), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModeltblGroup")]
        public IEnumerable<ModeltblGroup> GetModeltblGroup()
        {
            List<ModeltblGroup> MSSQL = new List<ModeltblGroup>();
            string SqlSentenceView = $"SELECT * FROM tblGroup WHERE GroupCode!='04'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblGroup Mdl1 = new ModeltblGroup
                {
                    GroupCode = dr["GroupCode"].ToString(), 
                    GroupName = dr["GroupName"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblObjects")]
        public IEnumerable<ModeltblObjects> GetModeltblObjects()
        {
            List<ModeltblObjects> MSSQL = new List<ModeltblObjects>();
            string SqlSentenceView = $"SELECT * FROM tblObjects";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblObjects Mdl1 = new ModeltblObjects
                {
                    ObjectName = dr["ObjectName"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblPermission")]
        public IEnumerable<ModeltblPermission> GetModeltblPermission(string strGroupCode)
        {
            List<ModeltblPermission> MSSQL = new List<ModeltblPermission>();
            string SqlSentenceView = $"SELECT * FROM tblPermission WHERE GroupCode='{strGroupCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblPermission Mdl1 = new ModeltblPermission
                {
                    GroupCode = dr["GroupCode"].ToString(), 
                    ObjectName = dr["ObjectName"].ToString(),
                    RowNum = dr["RowNum"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPSchedule")]
        public IEnumerable<ModeltblAPSchedule> GetModeltblAPSchedule(DateTime varFilterDate)
        {
            List<ModeltblAPSchedule> MSSQL = new List<ModeltblAPSchedule>();
            string SqlSentenceView = $"SELECT * FROM tblAPSchedule WHERE APDate>='{varFilterDate}' AND Type='APS' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPSchedule Mdl1 = new ModeltblAPSchedule
                {
                    Code = dr["Code"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    Description = dr["Description"].ToString(),
                    Type = dr["Type"].ToString(),
                    DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString()),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    Slots = int.Parse(dr["Slots"].ToString()), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPScheduleTasks")]
        public IEnumerable<ModeltblAPSchedule> GetModeltblAPScheduleTasks(DateTime varFilterDate)
        {
            List<ModeltblAPSchedule> MSSQL = new List<ModeltblAPSchedule>();
            string SqlSentenceView = $"SELECT * FROM tblAPSchedule WHERE APDate>='{varFilterDate}' AND Type='APT' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPSchedule Mdl1 = new ModeltblAPSchedule
                {
                    Code = dr["Code"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    Description = dr["Description"].ToString(),
                    Type = dr["Type"].ToString(),
                    DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString()),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    Slots = int.Parse(dr["Slots"].ToString()), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPScheduleSpecific")]
        public ModeltblAPSchedule GetModeltblAPScheduleSpecific(DateTime varFilterDate)
        {
            ModeltblAPSchedule MdlAPSched = new ModeltblAPSchedule();
            string SqlSentenceView = $"SELECT * FROM tblAPSchedule WHERE APDate='{varFilterDate}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read(); 
            if (dr.HasRows)
            {
                 MdlAPSched = new ModeltblAPSchedule
                {
                    Code = dr["Code"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    Description = dr["Description"].ToString(),
                    DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString()),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    Slots = int.Parse(dr["Slots"].ToString()),
                };
            }
            myconnection.Close();
            return MdlAPSched;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPMatter")]
        public IEnumerable<ModeltblAPMatter> GetModeltblAPMatter()
        {
            List<ModeltblAPMatter> MSSQL = new List<ModeltblAPMatter>();
            string SqlSentenceView = $"SELECT * FROM tblAPMatter ORDER BY APMTitle";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPMatter Mdl1 = new ModeltblAPMatter
                {
                    APMCode = dr["APMCode"].ToString(),
                    APMTitle = dr["APMTitle"].ToString(),
                    APMDesc = dr["APMDesc"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        //Appointments Name Pending
        [HttpGet]
        [Route("API/WebAPI/GetModelViewAPNamePending")]
        public IEnumerable<ModelViewAPName> GetModelViewAPNamePending()
        {
            List<ModelViewAPName> MSSQL = new List<ModelViewAPName>();
            string SqlSentenceView = $"SELECT * FROM ViewAPNamePending ORDER BY LName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewAPName Mdl1 = new ModelViewAPName
                {
                    UserCode = dr["UserCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Appointments Name Approve
        [HttpGet]
        [Route("API/WebAPI/GetModelViewAPNameApprove")]
        public IEnumerable<ModelViewAPName> GetModelViewAPNameApprove()
        {
            List<ModelViewAPName> MSSQL = new List<ModelViewAPName>();
            string SqlSentenceView = $"SELECT * FROM ViewAPNameApprove ORDER BY LName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewAPName Mdl1 = new ModelViewAPName
                {
                    UserCode = dr["UserCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Appointments Name Hearing
        [HttpGet]
        [Route("API/WebAPI/GetModelViewAPNameHearing")]
        public IEnumerable<ModelViewAPName> GetModelViewAPNameHearing()
        {
            List<ModelViewAPName> MSSQL = new List<ModelViewAPName>();
            string SqlSentenceView = $"SELECT * FROM ViewAPNameHearing ORDER BY LName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewAPName Mdl1 = new ModelViewAPName
                {
                    UserCode = dr["UserCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Appointments Name Finish
        [HttpGet]
        [Route("API/WebAPI/GetModelViewAPNameFinish")]
        public IEnumerable<ModelViewAPName> GetModelViewAPNameFinish()
        {
            List<ModelViewAPName> MSSQL = new List<ModelViewAPName>();
            string SqlSentenceView = $"SELECT * FROM ViewAPNameFinish ORDER BY LName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewAPName Mdl1 = new ModelViewAPName
                {
                    UserCode = dr["UserCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Appointments Name Archived
        [HttpGet]
        [Route("API/WebAPI/GetModelViewAPNameArchived")]
        public IEnumerable<ModelViewAPName> GetModelViewAPNameArchived()
        {
            List<ModelViewAPName> MSSQL = new List<ModelViewAPName>();
            string SqlSentenceView = $"SELECT * FROM ViewAPNameArchived ORDER BY LName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewAPName Mdl1 = new ModelViewAPName
                {
                    UserCode = dr["UserCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Appointments 
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsAll")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsAll()
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Decline=0 ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointments")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointments(string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Approve=0 AND Active=1 AND Decline=0 AND Archive=0 AND UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(), 
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsApproved")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsApproved( string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Approve=1 AND Active=1 AND Decline=0 AND Archive=0 AND UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsApprovedforHearing")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsApprovedforHearing(string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Approve=1 AND Active=1 AND HDate>'{DateTime.Now}' AND Decline=0 AND Archive=0 AND UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsFinishedHearing")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsFinishedHearing( string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Approve=0 AND Active=0 AND Decline=0 AND Archive=0 AND UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsFinishedHearingArchived")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsFinishedHearingArchived(string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE Approve=0 AND Active=0 AND Decline=0 AND Archive=1 AND UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsforUser")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsforUser(string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE UserCode='{varUserCode}' ORDER BY APDate";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    Decline = bool.Parse(dr["Decline"].ToString()),
                    Notif = bool.Parse(dr["Notif"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAppointmentsforNotifications")]
        public IEnumerable<ModeltblAppointmentsList> GetModeltblAppointmentsforNotifications(string varUserCode)
        {
            List<ModeltblAppointmentsList> MSSQL = new List<ModeltblAppointmentsList>();
            string SqlSentenceView = $"SELECT * FROM ViewAppointmentsApprove WHERE UserCode='{varUserCode}' ORDER BY DEncoded DESC";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAppointmentsList Mdl1 = new ModeltblAppointmentsList
                {
                    APCode = dr["APCode"].ToString(),
                    APDate = DateTime.Parse(dr["APDate"].ToString()),
                    APDesc = dr["APDesc"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    APMCode = dr["APMCode"].ToString(),
                    SchedCode = dr["SchedCode"].ToString(),
                    Approve = bool.Parse(dr["Approve"].ToString()),
                    Active = bool.Parse(dr["Active"].ToString()),
                    Decline = bool.Parse(dr["Decline"].ToString()),
                    Notif = bool.Parse(dr["Notif"].ToString()),
                    DEncoded = DateTime.Parse(dr["DEncoded"].ToString()),
                    HDate = DateTime.Parse(dr["HDate"].ToString()),
                    APMTitle = dr["APMTitle"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        //Users - Secretary
        [HttpGet]
        [Route("API/WebAPI/GetModeltblUser")]
        public IEnumerable<ModeltblUser> GetModeltblUser()
        {
            List<ModeltblUser> MSSQL = new List<ModeltblUser>();
            string SqlSentenceView = $"SELECT * FROM tblUser WHERE GroupCode='03' ORDER BY FName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblUser Mdl1 = new ModeltblUser
                {
                    UserCode = dr["UserCode"].ToString(),
                    PWord = dr["PWord"].ToString(),
                    GroupCode = dr["GroupCode"].ToString(),
                    UserName = dr["UserName"].ToString(),
                    Active = bool.Parse(dr["Active"].ToString()),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //Users 
        [HttpGet]
        [Route("API/WebAPI/GetModeltblUserSpecific")]
        public ModeltblUser GetModeltblUserSpecific(string varUserCode)
        {
            ModeltblUser MSSQL = new ModeltblUser();
            string SqlSentenceView = $"SELECT * FROM tblUser WHERE UserCode='{varUserCode}' ORDER BY FName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                MSSQL = new ModeltblUser
                {
                    UserCode = dr["UserCode"].ToString(),
                    PWord = dr["PWord"].ToString(),
                    GroupCode = dr["GroupCode"].ToString(),
                    UserName = dr["UserName"].ToString(),
                    Active = bool.Parse(dr["Active"].ToString()),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                };
            }
            myconnection.Close();
            return MSSQL;
        }


        //Count Appointment
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointment")]
        public int GetCountAppointment(string varCode)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE SchedCode='{varCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Count Appointment
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentByDate")]
        public int GetCountAppointmentByDate(DateTime varapDate)
        {
            int varCount = 0;
            string formattedDate = varapDate.ToString("yyyy-MM-dd");
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE CONVERT(DATE, APDate) = '{formattedDate}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Count Today
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentToday")]
        public int GetCountAppointmentToday()
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE APDate = '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentTodayUser")]
        public int GetCountAppointmentTodayUser(string varUser)
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE UserCode='{varUser}' AND APDate = '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Count Upcoming
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentUpcoming")]
        public int GetCountAppointmentUpcoming()
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE APDate > '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentUpcomingUser")]
        public int GetCountAppointmentUpcomingUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE UserCode='{varUser}' AND APDate > '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Count Missed
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentMissed")]
        public int GetCountAppointmentMissed()
        {
            int varCount = 0;
            string formattedDate = DateTime.Now.ToString("yyyy-MM-dd");
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE APDate < '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentMissedUser")]
        public int GetCountAppointmentMissedUser(string varUser)
        {
            int varCount = 0;
            string formattedDate = DateTime.Now.ToString("yyyy-MM-dd");
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE UserCode='{varUser}' AND APDate < '{DateTime.Now}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Count Archiving
        [HttpGet]
        [Route("API/WebAPI/GetCountfiles")]
        public int GetCountfiles()
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblFileDocuments1";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountCases")]
        public int GetCountCases()
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblFileDocuments";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //countUsers
        [HttpGet]
        [Route("API/WebAPI/GetCountUsers")]
        public int GetCountUsers()
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblUser";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //countNotifications
        [HttpGet]
        [Route("API/WebAPI/GetCountNotif")]
        public int GetCountNotif(string strUserCode)
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM ViewInbox WHERE ToUserCode='{strUserCode}' AND Notif=1";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //countNotificationsAP
        [HttpGet]
        [Route("API/WebAPI/GetCountNotifAppointments")]
        public int GetCountNotifAppointments(string strUserCode)
        {
            int varCount = 0; 
            string SqlSentenceView = $"SELECT COUNT(*) FROM ViewAppointmentsApprove WHERE UserCode='{strUserCode}' AND Notif=1";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount =  int.Parse(mycommand.ExecuteScalar().ToString()); 
            myconnection.Close();
            return varCount;
        }
        //Users - Secretary
        string SqlSentenceView1;
        [HttpGet]
        [Route("API/WebAPI/GetModeltblUserForMessage")]
        public IEnumerable<ModeltblUser> GetModeltblUserForMessage(string strGroupCode)
        {
            List<ModeltblUser> MSSQL = new List<ModeltblUser>(); 
            if (strGroupCode=="04")
            {
                SqlSentenceView1 = $"SELECT * FROM tblUser WHERE GroupCode!='04' ORDER BY FName";
            }
            else
            {
                SqlSentenceView1 = $"SELECT * FROM tblUser WHERE GroupCode!='{strGroupCode}' ORDER BY FName";
            }
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView1, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblUser Mdl1 = new ModeltblUser
                {
                    UserCode = dr["UserCode"].ToString(),
                    PWord = dr["PWord"].ToString(),
                    GroupCode = dr["GroupCode"].ToString(),
                    UserName = dr["UserName"].ToString(),
                    Active = bool.Parse(dr["Active"].ToString()),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModelViewInboxName")]
        public IEnumerable<ModelViewInboxName> GetModelViewInboxName(string varUserCode)
        {
            List<ModelViewInboxName> MSSQL = new List<ModelViewInboxName>();
            string SqlSentenceView = $"SELECT * FROM ViewInboxFromName WHERE ToUserCode='{varUserCode}' ORDER BY FName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewInboxName Mdl1 = new ModelViewInboxName
                {
                    ToUserCode = dr["ToUserCode"].ToString(), 
                    UserCode = dr["UserCode"].ToString(), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        } 
        [HttpGet]
        [Route("API/WebAPI/GetModelViewSentboxName")]
        public IEnumerable<ModelViewInboxName> GetModelViewSentboxName(string varUserCode)
        {
            List<ModelViewInboxName> MSSQL = new List<ModelViewInboxName>();
            string SqlSentenceView = $"SELECT * FROM ViewInboxName WHERE UserCode='{varUserCode}' ORDER BY FName";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewInboxName Mdl1 = new ModelViewInboxName
                {
                    ToUserCode = dr["ToUserCode"].ToString(), 
                    UserCode = dr["UserCode"].ToString(), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        } 
        [HttpGet]
        [Route("API/WebAPI/GetModelViewInbox")]
        public IEnumerable<ModelViewInbox> GetModelViewInbox(string varUserCode, string varToUserCode)
        {
            List<ModelViewInbox> MSSQL = new List<ModelViewInbox>();
            string SqlSentenceView = $"SELECT * FROM ViewInbox WHERE UserCode='{varToUserCode}' AND ToUserCode='{varUserCode}' ORDER BY DateEncoded DESC";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewInbox Mdl1 = new ModelViewInbox
                {
                    ToUserCode = dr["ToUserCode"].ToString(), 
                    UserCode = dr["UserCode"].ToString(), 
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    FileIC = dr["FileIC"].ToString(),
                    Code = dr["Code"].ToString(), 
                    Subject = dr["Subject"].ToString(),
                    Message = dr["Message"].ToString(),
                    DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString())
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModelViewNotification")]
        public IEnumerable<ModelViewNotification> GetModelViewNotification(string varUserCode)
        {
            List<ModelViewNotification> MSSQL = new List<ModelViewNotification>();
            string SqlSentenceView = $"SELECT * FROM ViewNotification WHERE ToUserCode='{varUserCode}' ORDER BY DateEncoded DESC";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewNotification Mdl1 = new ModelViewNotification
                {
                    ToUserCode = dr["ToUserCode"].ToString(),
                    UserCode = dr["UserCode"].ToString(),
                    FName = dr["FName"].ToString(),
                    MName = dr["MName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(),
                    Address = dr["Address"].ToString(),
                    Email = dr["Email"].ToString(),
                    Contact = dr["Contact"].ToString(),
                    FileIC = dr["FileIC"].ToString(), 
                    Subject = dr["Subject"].ToString(),
                    Message = dr["Message"].ToString(),
                    DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString()),
                    Notif = bool.Parse(dr["Notif"].ToString())
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        //[HttpGet]
        //[Route("API/WebAPI/GetModeltblMessageList")]
        //public IEnumerable<ModeltblMessageList> GetModeltblMessageList(string varemail)
        //{
        //    List<ModeltblMessageList> MSSQL = new List<ModeltblMessageList>();
        //    string SqlSentenceView = $"SELECT * FROM tblMessage WHERE ToUserEmail='{varemail}' ORDER BY DateEncoded DESC";
        //    myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
        //    myconnection.Open();
        //    mycommand = new SqlCommand(SqlSentenceView, myconnection);
        //    dr = mycommand.ExecuteReader();
        //    while (dr.Read())
        //    {
        //        ModeltblMessageList Mdl1 = new ModeltblMessageList
        //        { 
        //            FileIC = dr["FileIC"].ToString(),
        //            Code = dr["Code"].ToString(),
        //            ToUserEmail = dr["ToUserEmail"].ToString(),
        //            UserCode = dr["UserCode"].ToString(),
        //            Subject = dr["Subject"].ToString(),
        //            Message = dr["Message"].ToString(),
        //            DateEncoded = DateTime.Parse(dr["DateEncoded"].ToString()) 
        //        };
        //        MSSQL.Add(Mdl1);
        //    }
        //    myconnection.Close();
        //    return MSSQL;
        //}
        [HttpGet]
        [Route("API/WebAPI/GetModeltblMessage1List1")]
        public IEnumerable<ModeltblMessage1> GetModeltblMessage1List1(string varFileIC)
        {
            string SqlSentenceView;
            List<ModeltblMessage1> MSSQL = new List<ModeltblMessage1>();
            if (varFileIC == "All")
            {
                SqlSentenceView = $"SELECT * FROM tblMessage1 ORDER BY FileName";
            }
            else
            {
                SqlSentenceView = $"SELECT * FROM tblMessage1 WHERE FileIC='{varFileIC}'";
            }
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblMessage1 Mdl1 = new ModeltblMessage1
                {
                    FileIC = dr["FileIC"].ToString(),
                    RowNum = int.Parse(dr["RowNum"].ToString()),
                    FileNameGUID = dr["FileNameGUID"].ToString(),
                    FileName = dr["FileName"].ToString(),
                    FileSize = decimal.Parse(dr["FileSize"].ToString()),
                    FileType = dr["FileType"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModeltblUserCredSpecific")]
        public ModeltblUserCred GetModeltblUserCredSpecific(string varUserCode)
        {
            ModeltblUserCred Mdl1 = new ModeltblUserCred();
            string SqlSentenceView = $"SELECT * FROM tblUserCred WHERE UserCode='{varUserCode}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                Mdl1 = new ModeltblUserCred
                { 
                    UserCode = dr["UserCode"].ToString(), 
                    FileName = dr["FileName"].ToString(),
                    FileNameGUID = dr["FileNameGUID"].ToString(),
                    FileSize = decimal.Parse(dr["FileSize"].ToString()),
                    FileType = dr["FileType"].ToString(),
                };
            }
            myconnection.Close();
            return Mdl1;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPSchedTime")]
        public IEnumerable<ModeltblAPSchedTimeList> GetModeltblAPSchedTime(string varCode)
        {
            List<ModeltblAPSchedTimeList> MSSQL = new List<ModeltblAPSchedTimeList>();
            string SqlSentenceView = $"SELECT * FROM tblAPSchedTime WHERE Code='{varCode}' ORDER BY TTime";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPSchedTimeList Mdl1 = new ModeltblAPSchedTimeList
                {
                    TCode = dr["TCode"].ToString(),
                    Code = dr["Code"].ToString(),
                    TTime = dr["TTime"].ToString(), 
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
         
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPEvidencesList")]
        public IEnumerable<ModeltblAPEvidencesList> GetModeltblAPEvidencesList(string varAPCode, string varFileType)
        { 
            List<ModeltblAPEvidencesList> MSSQL = new List<ModeltblAPEvidencesList>();

            string SqlSentenceView = $"SELECT * FROM tblAPEvidences WHERE APCode='{varAPCode}' AND Type='{varFileType}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPEvidencesList Mdl1 = new ModeltblAPEvidencesList
                {
                    ECode = dr["ECode"].ToString(),
                    APCode = dr["APCode"].ToString(),
                    FileIC = dr["FileIC"].ToString(),
                    Type = dr["Type"].ToString()
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModeltblAPEvidences1")]
        public IEnumerable<ModeltblAPEvidences1> GetModeltblAPEvidences1(string varfileIC)
        {
            string SqlSentenceView;
            List<ModeltblAPEvidences1> MSSQL = new List<ModeltblAPEvidences1>();
            
            SqlSentenceView = $"SELECT * FROM tblAPEvidences1 WHERE FileIC='{varfileIC}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModeltblAPEvidences1 Mdl1 = new ModeltblAPEvidences1
                {
                    FileIC = dr["FileIC"].ToString(),
                    RowNum = int.Parse(dr["RowNum"].ToString()),
                    FileNameGUID = dr["FileNameGUID"].ToString(),
                    FileName = dr["FileName"].ToString(),
                    FileSize = decimal.Parse(dr["FileSize"].ToString()),
                    FileType = dr["FileType"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetModelViewCountDE")]
        public IEnumerable<ModelViewCountDE> GetModelViewCountDE()
        {
            string SqlSentenceView;
            List<ModelViewCountDE> MSSQL = new List<ModelViewCountDE>();
            
            SqlSentenceView = $"SELECT * FROM ViewCountDE";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                ModelViewCountDE Mdl1 = new ModelViewCountDE
                {
                    CountDE = int.Parse(dr["CountDE"].ToString()),
                    Year = dr["Year"].ToString(),
                    Month = dr["Month"].ToString(),
                };
                MSSQL.Add(Mdl1);
            }
            myconnection.Close();
            return MSSQL;
        }
        [HttpGet]
        [Route("API/WebAPI/GetModelViewCountAP")]
        public ModelViewCountAP GetModelViewCountAP()
        {
            string SqlSentenceView;
            ModelViewCountAP MSSQL = new ModelViewCountAP();
            
            SqlSentenceView = $"SELECT * FROM ViewCountAP";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                MSSQL = new ModelViewCountAP
                {
                    Approve = int.Parse(dr["Approve"].ToString()), 
                    Finish = int.Parse(dr["Finish"].ToString()), 
                    Decline = int.Parse(dr["Decline"].ToString()), 
                    Pending = int.Parse(dr["Pending"].ToString()), 
                }; 
            }
            myconnection.Close();
            return MSSQL;
        }

        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentPendingUser")]
        public int GetCountAppointmentPendingUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE Approve=0 AND Active=1 AND Decline=0 AND Archive=0 AND UserCode='{varUser}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount = int.Parse(mycommand.ExecuteScalar().ToString());
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentApprovedUser")]
        public int GetCountAppointmentApprovedUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE Approve=1 AND Active=1 AND Decline=0 AND Archive=0 AND UserCode='{varUser}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount = int.Parse(mycommand.ExecuteScalar().ToString());
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentOngoingUser")]
        public int GetCountAppointmentOngoingUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE Approve=1 AND Active=1 AND HDate>'{DateTime.Now}' AND Decline=0 AND Archive=0 AND UserCode='{varUser}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount = int.Parse(mycommand.ExecuteScalar().ToString());
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentFinishUser")]
        public int GetCountAppointmentFinishUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE Approve=0 AND Active=0 AND Decline=0 AND Archive=0 AND  UserCode='{varUser}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount = int.Parse(mycommand.ExecuteScalar().ToString());
            myconnection.Close();
            return varCount;
        }
        [HttpGet]
        [Route("API/WebAPI/GetCountAppointmentDeclineUser")]
        public int GetCountAppointmentDeclineUser(string varUser)
        {
            int varCount = 0;
            string SqlSentenceView = $"SELECT COUNT(*) FROM tblAppointments WHERE Decline=1 AND UserCode='{varUser}'";
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            varCount = int.Parse(mycommand.ExecuteScalar().ToString());
            myconnection.Close();
            return varCount;
        }
    }
}
