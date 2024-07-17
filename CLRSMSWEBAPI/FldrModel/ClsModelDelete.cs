namespace CLRSMSWEBAPI.FldrModel
{
    public class ClsModelDeleteltblFileDocuments1
    { 
        public string DocNum { get; set; } 
        public string DocTypeCode { get; set; } 
        public string FileIC { get; set; }
    }
    public class ClsModelModeltblDocumentType
    {
        public string DocTypeCode { get; set; }
        public string ProjCode { get; set; }
    }
    public class ClsModelDeletetblProjects
    { 
        public string ProjCode { get; set; }
    }
    public class ClsDeleteModeltblPermission
    {
        public string? GroupCode { get; set; }
        public string? ObjectName { get; set; }
        public string? RowNum { get; set; }
    } 
    public class ClsDeleteModeltblAppointments
    {
        public string? APCode { get; set; }
    }
    public class ClsDeleteModeltblUser
    {
        public string? UserCode { get; set; }
    }
    public class ClsDeleteModeltblMessage
    {
        public string? FileIC { get; set; }
    }
    public class ClsDeleteModeltblAPSchedule
    {
        public string? Code { get; set; }
    }
    public class ClsDeleteModeltblAPSchedTime
    {
        public string? TCode { get; set; }
    }
}
