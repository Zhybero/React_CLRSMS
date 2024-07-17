namespace CLRSMSWEBAPI.FldrModel
{
    public class UserSession
    {
        public string UserCode { get; set; } 
        public string UserName { get; set; }
        public string Token { get; set; }
        public string GroupCode { get; set; }
        public int ExpiresIn { get; set; }
        public DateTime ExpiryTimeStamp { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string XName { get; set; }
    } 

    public class UserAccount
    {
        public string UserCode { get; set; }
        public string UserName { get; set; }
        public string PWord { get; set; }
        public string GroupCode { get; set; } 
        public bool Active { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string XName { get; set; }
    }
}
