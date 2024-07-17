using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.IO;
using System.Diagnostics;

namespace CLRSMSWEBAPI.FldrClass
{
    class ClsGetConnection
    {
        public string PlsConnect()
        {
            return "Data Source=YTTRIUM\\SQLEXPRESS; Initial Catalog=CLRSMS_BE; Integrated Security=SSPI; TrustServerCertificate=True;";

        }
    }
}
