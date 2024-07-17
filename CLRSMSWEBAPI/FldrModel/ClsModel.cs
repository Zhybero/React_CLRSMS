namespace CLRSMSWEBAPI.FldrModel
{ 
    public class ModeltblPersonnel
    {
        public string APControlNo { get; set; }
        public string APName { get; set; }
        public string NType { get; set; }
        public string APCode { get; set; }
    }
     
    public class ModeltblCustomer
    {
        public string ControlNo { get; set; }
        public string CustCode { get; set; }
        public string CustName { get; set; }
        public string NType { get; set; }
    }
     
    public class ModeltblProfiling
    {
        public string? DocNum { get; set; }
        public string ControlNo { get; set; }
        public DateTime DDate { get; set; }
        public string Remarks { get; set; }
        public string PhotoName { get; set; }
        public string ControlNoAP { get; set; } 
    }
    public class ModelViewProfiling
    { 
        public string DocNum { get; set; }
        public string ControlNo { get; set; }
        public DateTime DDate { get; set; }
        public string Remarks { get; set; }
        public string PhotoName { get; set; }
        public string ControlNoAP { get; set; }
        public string CControlNoAP { get; set; }
        public string CControlNo { get; set; }
    }


    //clrsms

    public class ModeltblProjects
    {
        public string? ProjCode { get; set; }
        public string ProjName { get; set; }
        public DateTime ProjDate { get; set; }
        public string UserCode { get; set; } 
    }
    public class ModeltblDocumentType
    {
        public string? DocTypeCode { get; set; }
        public string DocTypeName { get; set; }
        public DateTime DocTypeDate { get; set; }
        public string UserCode { get; set; }
        public string ProjCode { get; set; }
    }
    public class ModeltblFileDocuments
    { 
        public string CaseNum { get; set; } 
        public string DocNum { get; set; } 
        public string FileIC { get; set; } 
        public DateTime ArchivedDate { get; set; }
        //public string FileName { get; set; }
        public string Description { get; set; }
        public string UserCode { get; set; }
        //public string ProjCode { get; set; }
        public string DocTypeCode { get; set; }
        public List<ModeltblFileDocuments1> SubModeltblFileDocuments1 { get; set; }
    }
    public class ModeltblFileDocumentsList
    {
        public string? DocNum { get; set; }
        public string CaseNum { get; set; }
        public string FileIC { get; set; }
        public DateTime DEncoded { get; set; }
        public DateTime ArchivedDate { get; set; }
        //public string FileName { get; set; }
        public string Description { get; set; }
        public string UserCode { get; set; }
        //public string ProjCode { get; set; }
        public string DocTypeCode { get; set; } 
    }
    public class ModeltblFileDocuments1
    {
        public string FileIC { get; set; } 
        public int RowNum { get; set; } 
        public string FileName { get; set; } 
        public string FileNameGUID { get; set; }
        public decimal FileSize { get; set; }
        public string FileType { get; set; }
    }
    public class ModelViewArchived
    {
        public string UserCode { get; set; }
        public string ProjName { get; set; }
        public DateTime ProjDate { get; set; }
        public string DocTypeName { get; set; }
        public DateTime DocTypeDate { get; set; }
        public string ProjCode { get; set; }
        public string DocNum { get; set; }
        public string CaseNum { get; set; }
        public DateTime DEncoded { get; set; }
        public DateTime ArchivedDate { get; set; }
        public string Description { get; set; }
        public string DocTypeCode { get; set; }
        public string FileIC { get; set; }
        public int RowNum { get; set; } 
        public string FileName { get; set; }  
        public string FileType { get; set; }  
        public decimal FileSize { get; set; }
    }
    public class ModeltblGroup
    {
        public string? GroupCode { get; set; } 
        public string? GroupName { get; set; } 
    }
    public class ModeltblObjects
    {
        public string? ObjectName { get; set; } 
    }
    public class ModeltblPermission
    {
        public string? GroupCode { get; set; } 
        public string? ObjectName { get; set; } 
        public string? RowNum { get; set; } 
    }
    public class ModeltblAPSchedule
    {
        public string? Code { get; set; }
        public string? UserCode { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public DateTime DateEncoded { get; set; }
        public DateTime APDate { get; set; }
        public int Slots { get; set; }
    }
    public class ModeltblAPMatter
    {
        public string? APMCode { get; set; }
        public string? APMTitle { get; set; }
        public string? APMDesc { get; set; }
    }
    public class ModelViewAPName
    {
        public string? UserCode { get; set; }
        public DateTime APDate { get; set; }
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
    }

    public class ModeltblAppointments
    {
        public string? APCode { get; set; } 
        public string? TxtCalendar { get; set; }
        public string? TxtTime { get; set; }
        public string? APDesc { get; set; }
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string? UserCode { get; set; }
        public string? APMCode { get; set; } 
        public string? SchedCode { get; set; } 
    }

    public class ModeltblAppointmentsList
    {
        public string? APCode { get; set; }
        public DateTime APDate { get; set; } 
        public string? APDesc { get; set; }
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string? UserCode { get; set; }
        public string? APMCode { get; set; }
        public string? SchedCode { get; set; }
        public bool Approve { get; set; }
        public bool Active { get; set; }
        public bool Decline { get; set; }
        public bool Notif { get; set; }
        public DateTime DEncoded { get; set; }
        public DateTime HDate { get; set; }
        public string? APMTitle { get; set; }
    }
    public class ModeltblAppointmentsUpdate
    { 
        public string? APCode { get; set; }
        public DateTime HDate { get; set; }
        public bool Active { get; set; }
    }
    public class ModeltblUser
    { 
        public string? UserCode { get; set; }
        public string? PWord { get; set; }
        public string? GroupCode { get; set; }
        public string? UserName { get; set; } 
        public bool Active { get; set; }
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? XName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
    }
    public class ModeltblUserUpdate
    { 
        public string? UserCode { get; set; }
        public string? PWord { get; set; } 
        public string? UserName { get; set; }  
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? XName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
    }
     
    public class ModeltblMessage
    { 
        public string ToUserEmail { get; set; } 
        public string UserCode { get; set; } 
        //public string FileName { get; set; }
        public string Subject { get; set; }
        //public string ProjCode { get; set; }
        public string Message { get; set; }
        public List<ModeltblMessage1> SubModeltblMessage1 { get; set; }
    }

    public class ModeltblMessage1
    {
        public string FileIC { get; set; }
        public int RowNum { get; set; }
        public string FileName { get; set; }
        public string FileNameGUID { get; set; }
        public decimal FileSize { get; set; }
        public string FileType { get; set; }
    }
    public class ModelViewInboxName
    {
        public string? ToUserCode { get; set; } 
        public string? UserCode { get; set; } 
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? XName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
    }
    public class ModelViewInbox
    {
        public string? ToUserCode { get; set; } 
        public string? UserCode { get; set; } 
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? XName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string FileIC { get; set; }
        public string Code { get; set; }
        public DateTime DateEncoded { get; set; }
    }
    public class ModelViewNotification
    {
        public string? ToUserCode { get; set; }
        public string? UserCode { get; set; } 
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? XName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string FileIC { get; set; } 
        public DateTime DateEncoded { get; set; }
        public bool Notif { get; set; }
    }
    public class ModeltblMessageList
    { 
        public string FileIC { get; set; } 
        public string Code { get; set; } 
        public string ToUserEmail { get; set; }
        public string UserCode { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public DateTime DateEncoded { get; set; }
    }
    public class ModeltblFileDocumentsArchive
    {
        public string CaseNum { get; set; } 
        public DateTime ArchivedDate { get; set; }
        //public string FileName { get; set; }
        public string Description { get; set; }
        public string UserCode { get; set; }
        //public string ProjCode { get; set; }
        public string DocTypeCode { get; set; }
        public List<ModeltblFileDocuments1Archive> SubModeltblFileDocuments1 { get; set; }
    } 
    public class ModeltblFileDocuments1Archive
    { 
        public string FileName { get; set; }
        public string FileNameGUID { get; set; }
        public decimal FileSize { get; set; }
        public string FileType { get; set; }
    }
    public class ModeltblUserCred
    {  
        public string UserCode { get; set; }
        public string FileName { get; set; }
        public string FileNameGUID { get; set; }
        public decimal FileSize { get; set; }
        public string FileType { get; set; }
    }
    public class ModeltblMessageNotif
    {  
        public string UserCode { get; set; }
        public string FileIC { get; set; } 
    }

    public class ModeltblAPDecline
    {
        public string? DCode { get; set; }
        public string? APCode { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
    }
    public class ModeltblAPDeclineReSchedule
    {
        public string? DCode { get; set; }
        public DateTime APDate { get; set; }
        public string? APCode { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
    }
    public class ModeltblAPArchive
    {
        public string APCode { get; set; } 
    }
    public class ModeltblAPSchedTime
    { 
        public string Code { get; set; }  
        public string TTime { get; set; }
    }
    public class ModeltblAPSchedTimeList
    {
        public string TCode { get; set; }  
        public string Code { get; set; }  
        public string TTime { get; set; }
    }


    public class ModeltblAPEvidences
    { 
        public string APCode { get; set; } 
        public string Type { get; set; } 
        public List<ModeltblAPEvidences1> SubModeltblAPEvidences1 { get; set; }
    }
    public class ModeltblAPEvidencesList
    { 
        public string ECode { get; set; } 
        public string APCode { get; set; } 
        public string FileIC { get; set; } 
        public string Type { get; set; }  
    }

    public class ModeltblAPEvidences1
    {
        public string FileIC { get; set; }
        public int RowNum { get; set; }
        public string FileName { get; set; }
        public string FileNameGUID { get; set; }
        public decimal FileSize { get; set; }
        public string FileType { get; set; }
    } 
    public class ModelViewCountDE
    {
        public int CountDE { get; set; } 
        public string Year { get; set; }  
        public string Month { get; set; }  
    } 
    public class ModelViewCountAP
    {
        public int Approve { get; set; }  
        public int Finish { get; set; }  
        public int Pending { get; set; }  
        public int Decline { get; set; }  
    } 
}
