using Microsoft.Data.SqlClient;
using System.Data.Common;

namespace CLRSMSWEBAPI.FldrClass
{
    public class ClsAutoNumber
    {
         
        SqlConnection myconnection;
        SqlCommand mycommand;
        SqlDataReader dr;

        //Profiling
        public string GettblProfilingAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand("SELECT Top 1 DocNum FROM tblProfiling ORDER BY DocNum DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["DocNum"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(7, '0');
            }
            else
            {
                pristrNumber = "0000001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        //Projects
        public string GettblProjectsAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand("SELECT Top 1 ProjCode FROM tblProjects ORDER BY ProjCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["ProjCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(3, '0');
            }
            else
            {
                pristrNumber = "001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        //DocType
        public string GettblDocumentTypeAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand("SELECT Top 1 DocTypeCode FROM tblDocumentType ORDER BY DocTypeCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["DocTypeCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(4, '0');
            }
            else
            {
                pristrNumber = "0001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        //FileDocuments
        public string GettblFileDocumentsAutoNum(string varDocTypeCode)
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 DocNum FROM tblFileDocuments WHERE DocTypeCode='{varDocTypeCode}' ORDER BY DocNum DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["DocNum"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(5, '0');
            }
            else
            {
                pristrNumber = "00001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        public string GettblFileDocuments1RowNum(string varFileIC)
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 RowNum FROM tblFileDocuments1 WHERE FileIC='{varFileIC}' ORDER BY RowNum DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["RowNum"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(1, '0');
            }
            else
            {
                pristrNumber = "1";
            }
            myconnection.Close();
            return pristrNumber;
        }
        public string GettblGroupAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 GroupCode FROM tblGroup ORDER BY GroupCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["GroupCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(2, '0');
            }
            else
            {
                pristrNumber = "01";
            }
            myconnection.Close();
            return pristrNumber;
        }
        public string GettblAPScheduleAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 Code FROM tblAPSchedule ORDER BY Code DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["Code"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(6, '0');
            }
            else
            {
                pristrNumber = "000001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        public string GettblAppointmentsAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 APCode FROM tblAppointments ORDER BY APCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["APCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(5, '0');
            }
            else
            {
                pristrNumber = "00001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        public string GettblAPMatterAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 APMCode FROM tblAPMatter ORDER BY APMCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["APMCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(3, '0');
            }
            else
            {
                pristrNumber = "001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        
        public string GettblUserAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            string CheckNoTransact = string.Format("SELECT Count(*) FROM tblUser");
            SqlCommand com = new SqlCommand(CheckNoTransact, myconnection);
            int CountData = int.Parse(com.ExecuteScalar().ToString());
            if (CountData > 0)
            {
                mycommand = new SqlCommand("SELECT Top 1 Right([UserCode],4) FROM tblUser ORDER BY Right([UserCode],4) DESC", myconnection);
                dr = mycommand.ExecuteReader();
                dr.Read();
                string no1 = null;
                int no2;
                no1 = dr[0].ToString();
                no2 = (int.Parse(no1)) + 1;
                pristrNumber = "A" + Convert.ToString(no2).PadLeft(4, '0');
                dr.Close();
            }
            else
            {
                pristrNumber = "A0001";
            }
            myconnection.Close();
            return pristrNumber;
        }

        //Messages
        public string GettblMessageAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 Code FROM tblMessage ORDER BY Code DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["Code"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(6, '0');
            }
            else
            {
                pristrNumber = "000001";
            }
            myconnection.Close();
            return pristrNumber;
        }

        //tblAPDecline 
        public string GettblAPDeclineAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 DCode FROM tblAPDecline ORDER BY DCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["DCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(5, '0');
            }
            else
            {
                pristrNumber = "00001";
            }
            myconnection.Close();
            return pristrNumber;
        }
        //tblAPSchedTime 
        public string GettblAPSchedTimeAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 TCode FROM tblAPSchedTime ORDER BY TCode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["TCode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(5, '0');
            }
            else
            {
                pristrNumber = "00001";
            }
            myconnection.Close();
            return pristrNumber;
        }

        //Evidence
        public string GettblAPEvidenceAutoNum()
        {
            string pristrNumber;
            myconnection = new SqlConnection(new ClsGetConnection().PlsConnect());
            myconnection.Open();
            mycommand = new SqlCommand($"SELECT Top 1 ECode FROM tblAPEvidences ORDER BY ECode DESC", myconnection);
            dr = mycommand.ExecuteReader();
            dr.Read();
            if (dr.HasRows)
            {
                int no2;
                no2 = int.Parse(dr["ECode"].ToString()) + 1;
                pristrNumber = Convert.ToString(no2).PadLeft(5, '0');
            }
            else
            {
                pristrNumber = "00001";
            }
            myconnection.Close();
            return pristrNumber;
        }

    }
}
