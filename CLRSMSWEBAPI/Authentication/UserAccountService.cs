using Microsoft.Data.SqlClient;
using CLRSMSWEBAPI.FldrClass; 
using System.Data.Common;
using CLRSMSWEBAPI.FldrModel;

namespace CLRSMSWEBAPI.Authentication
{
    public class UserAccountService
    {
        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;
        private List<UserAccount> _userAccountList;
        public UserAccountService() {

            _userAccountList = new List<UserAccount>();
            string SqlSentenceView = $"SELECT * FROM tblUser";

            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand(SqlSentenceView, myconnection);
            dr = mycommand.ExecuteReader();
            while (dr.Read())
            {
                UserAccount Mdl1 = new UserAccount
                {
                    UserCode = dr["UserCode"].ToString(),
                    UserName = dr["UserName"].ToString(),
                    PWord = dr["PWord"].ToString(), 
                    GroupCode = dr["GroupCode"].ToString(),
                    Active = bool.Parse(dr["Active"].ToString()),
                    FName = dr["FName"].ToString(),
                    LName = dr["LName"].ToString(),
                    XName = dr["XName"].ToString(), 
                };
                _userAccountList.Add(Mdl1);
            }
            myconnection.Close();
        }


        
        public UserAccount? GetUserAccountByUserName(string userName)
        {
            return _userAccountList.FirstOrDefault(x => x.UserName == userName);
        }
    } 
}
