namespace CLRSMSWEBAPI.FldrClass
{
    public class ClsClass
    {
        public string GetContentType(string fileName)
        {
            string contentType;
            var fileExtension = Path.GetExtension(fileName);

            switch (fileExtension.ToLower())
            {
                case ".pdf":
                    contentType = "application/pdf";
                    break;
                case ".doc":
                    contentType = "application/msword";
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case ".xls":
                    contentType = "application/vnd.ms-excel";
                    break;
                case ".xlsx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case ".jpg":
                case ".jpeg":
                    contentType = "image/jpeg";
                    break;
                case ".png":
                    contentType = "image/png";
                    break;
                case ".gif":
                    contentType = "image/gif";
                    break; 
                default:
                    contentType = "application/octet-stream";  
                    break;
            }

            return contentType;
        }
    }
}
